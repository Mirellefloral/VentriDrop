import { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, DEMO_PRODUCTS, DEMO_ORDERS, DEMO_NOTIFICATIONS, DEMO_MESSAGES, DEMO_RIDERS } from '../data/demoData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('vd_theme') || 'light');
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [riders, setRiders] = useState(DEMO_RIDERS);
  const [cart, setCart] = useState([]);
  const [isDemo, setIsDemo] = useState(true);
  const [sellerProducts, setSellerProducts] = useState(
    DEMO_PRODUCTS.filter(p => p.sellerId === 's1')
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vd_theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('vd_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch(e) {}
    }
  }, []);

  const login = (email, password) => {
    const demoUser = Object.values(DEMO_USERS).find(
      u => u.email === email && u.password === password
    );
    if (demoUser) {
      const { password: _, ...safeUser } = demoUser;
      setUser(safeUser);
      localStorage.setItem('vd_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (data) => {
    const newUser = { ...data, id: `u_${Date.now()}`, joined: new Date().toISOString() };
    setUser(newUser);
    localStorage.setItem('vd_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vd_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('vd_user', JSON.stringify(updated));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: `p_${Date.now()}`, sellerId: user?.id || 's1', sellerName: user?.shopName || user?.name, orders: 0, rating: 0 };
    setProducts(prev => [...prev, newProduct]);
    setSellerProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    setSellerProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setSellerProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `o_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paid: false,
      riderPaid: false,
    };
    setOrders(prev => [newOrder, ...prev]);
    // Add notification to seller
    addNotification('seller', {
      title: '🛒 New Order!',
      summary: `${orderData.buyerName} ordered ${orderData.productName}`,
      body: `New order! ${orderData.buyerName} ordered ${orderData.quantity}x ${orderData.productName} totaling ${orderData.total} FCFA + ${orderData.deliveryFee} FCFA delivery to ${orderData.area}.`,
      type: 'order'
    });
    return newOrder;
  };

  const updateOrder = (id, updates) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const assignRider = (orderId, rider) => {
    updateOrder(orderId, { riderId: rider.id, riderName: rider.name, status: 'in_transit' });
    addNotification('buyer', {
      title: '🛵 Rider Assigned',
      summary: `${rider.name} is on the way`,
      body: `Your delivery has been assigned to ${rider.name} (${rider.phone}). Track your order in real-time from your dashboard.`,
      type: 'rider'
    });
    addNotification('rider', {
      title: '📦 New Delivery Job!',
      summary: `Delivery to ${orders.find(o=>o.id===orderId)?.area}`,
      body: `New delivery assigned. Check your active deliveries for details.`,
      type: 'job'
    });
  };

  const confirmDelivery = (orderId, proofData) => {
    updateOrder(orderId, { status: 'delivered', deliveredAt: new Date().toISOString(), proof: proofData });
    addNotification('seller', {
      title: '✅ Delivery Confirmed',
      summary: 'Rider confirmed delivery',
      body: `Delivery confirmed! Please process rider payment.`,
      type: 'delivery'
    });
    addNotification('buyer', {
      title: '📦 Package Delivered!',
      summary: 'Your order has arrived',
      body: `Your order has been delivered. Please confirm receipt and rate your experience.`,
      type: 'delivery'
    });
  };

  const addNotification = (role, notification) => {
    const newNotif = { ...notification, id: `notif_${Date.now()}`, time: 'Just now', read: false };
    setNotifications(prev => ({
      ...prev,
      [role]: [newNotif, ...(prev[role] || [])]
    }));
  };

  const markNotificationRead = (role, id) => {
    setNotifications(prev => ({
      ...prev,
      [role]: prev[role].map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const sendMessage = (conversationId, text, senderId) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today'
    };
    setMessages(prev => prev.map(conv =>
      conv.id === conversationId
        ? { ...conv, messages: [...conv.messages, newMsg] }
        : conv
    ));
    return newMsg;
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const getMyOrders = () => {
    if (!user) return [];
    if (user.role === 'buyer') return orders.filter(o => o.buyerId === user.id || o.buyerId === 'b1');
    if (user.role === 'seller') return orders.filter(o => o.sellerId === user.id || o.sellerId === 's1');
    if (user.role === 'rider') return orders.filter(o => o.riderId === user.id || o.riderId === 'r1');
    return [];
  };

  const getMyNotifications = () => {
    if (!user) return [];
    return notifications[user.role] || [];
  };

  const unreadCount = () => getMyNotifications().filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user, theme, toggleTheme, isDemo,
      products, sellerProducts, orders, notifications, messages, riders, cart,
      login, signup, logout, updateUser,
      addProduct, updateProduct, deleteProduct,
      placeOrder, updateOrder, assignRider, confirmDelivery,
      addNotification, markNotificationRead, sendMessage,
      addToCart, removeFromCart, clearCart,
      getMyOrders, getMyNotifications, unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}
