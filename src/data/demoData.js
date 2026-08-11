// =============================================
// VENTRIDROP DEMO DATA
// =============================================

export const REGIONS = {
  buea: {
    name: 'Buea',
    areas: ['Molyko', 'Great Soppo', 'Small Soppo', 'Bonduma', 'Mile 16', 'Mile 17', 'Clerks Quarter', 'Federal Quarter', 'Bokwai', 'Wokoko']
  },
  douala: {
    name: 'Douala',
    areas: ['Akwa', 'Bonanjo', 'Bepanda', 'New Bell', 'Deido', 'Makepe', 'Logbessou', 'Ndokoti', 'Bonaberi', 'PK8', 'PK14', 'Mboppi']
  },
  yaounde: {
    name: 'Yaoundé',
    areas: ['Bastos', 'Biyem-Assi', 'Melen', 'Nlongkak', 'Mvog-Mbi', 'Essos', 'Ekounou', 'Nsam', 'Emana', 'Simbock', 'Obili', 'Cradat']
  }
};

export const PRODUCT_CATEGORIES = [
  'Food & Groceries', 'Electronics', 'Fashion & Clothing', 'Beauty & Health',
  'Home & Living', 'Sports & Fitness', 'Books & Education', 'Baby & Kids',
  'Agriculture', 'Services', 'Phones & Accessories', 'Vehicles & Parts'
];

export const EMOJI_CATEGORIES = {
  'Food & Groceries': ['🍎', '🍕', '🍗', '🥩', '🥦', '🌽', '🍞', '🥚', '🧅', '🧄', '🍌', '🍊', '🥛', '🧀', '🥬', '🍅', '🫙', '🫘', '🌶️', '🥜'],
  'Electronics': ['📱', '💻', '🖥️', '⌨️', '🖱️', '📷', '📸', '🎮', '🕹️', '📺', '📻', '🔋', '💡', '🔌', '📡', '🖨️'],
  'Fashion & Clothing': ['👗', '👔', '👟', '👠', '👒', '🧣', '🧤', '🧥', '👜', '👝', '🎒', '💍', '⌚', '💎', '🩴', '🥿', '👡', '👞'],
  'Beauty & Health': ['💄', '💅', '🪥', '🧴', '🧼', '💊', '🩺', '🌸', '🌹', '🪞', '✂️', '💆', '🛁', '🪒', '🧹'],
  'Home & Living': ['🛋️', '🪑', '🛏️', '🚿', '🛁', '🪴', '🕯️', '🪟', '🚪', '🧺', '🧹', '🫧', '🪣', '🔑', '🧲', '🔧', '🪛'],
  'Sports & Fitness': ['⚽', '🏀', '🎾', '🏐', '🏈', '🥊', '🏋️', '🧘', '🚴', '🏊', '🎿', '🏇', '⛹️', '🤸', '🏃'],
  'Books & Education': ['📚', '📖', '✏️', '🖊️', '📐', '📏', '🔬', '🔭', '🗂️', '📋', '📊', '🎓', '🏫', '📝'],
  'Baby & Kids': ['🍼', '🧸', '🎠', '🎪', '🎡', '🪀', '🪁', '🧩', '🎯', '🎨', '🖍️', '🎀', '👶', '🚼'],
  'Agriculture': ['🌱', '🌾', '🚜', '🌻', '🫚', '🧺', '🪴', '🌿', '🍃', '🥬', '🌰', '🫛', '🪱', '🐄', '🐓', '🐟'],
  'Services': ['🔧', '🪛', '🔨', '💼', '📊', '🖨️', '🚗', '🏠', '💈', '🎭', '🎵', '📸', '🍽️', '🧑‍💻'],
  'Phones & Accessories': ['📱', '📲', '🔋', '🔌', '🎧', '🖲️', '💿', '📀', '🖱️', '⌨️', '💻', '📡', '🔊', '🎙️'],
  'Vehicles & Parts': ['🚗', '🚕', '🚙', '🏍️', '🛵', '🚐', '🚌', '🛻', '⛽', '🔧', '🛞', '🔩', '🪛', '🚘']
};

export const DEMO_PRODUCTS = [
  { id: 'p1', name: 'Fresh Tomatoes (1kg)', price: 500, category: 'Food & Groceries', emoji: '🍅', sellerId: 's1', sellerName: 'Mama Grace Store', region: 'buea', area: 'Molyko', rating: 4.5, orders: 142, description: 'Fresh tomatoes picked daily from local farms. Perfect for soups and sauces.' },
  { id: 'p2', name: 'iPhone 13 Case', price: 2500, category: 'Phones & Accessories', emoji: '📱', sellerId: 's2', sellerName: 'TechHub Douala', region: 'douala', area: 'Akwa', rating: 4.8, orders: 89, description: 'Premium silicone case for iPhone 13. Drop-proof and stylish.' },
  { id: 'p3', name: 'African Print Dress', price: 12000, category: 'Fashion & Clothing', emoji: '👗', sellerId: 's3', sellerName: 'Kamer Fashion', region: 'yaounde', area: 'Bastos', rating: 4.7, orders: 56, description: 'Beautiful Ankara print dress. Available in all sizes. Handmade with love.' },
  { id: 'p4', name: 'Wireless Earbuds', price: 15000, category: 'Electronics', emoji: '🎧', sellerId: 's2', sellerName: 'TechHub Douala', region: 'douala', area: 'Akwa', rating: 4.3, orders: 34, description: 'True wireless earbuds with 20hr battery life and noise cancellation.' },
  { id: 'p5', name: 'Palm Oil (5L)', price: 3500, category: 'Food & Groceries', emoji: '🫚', sellerId: 's1', sellerName: 'Mama Grace Store', region: 'buea', area: 'Molyko', rating: 4.9, orders: 203, description: 'Pure red palm oil from Muyuka farms. Unrefined and natural.' },
  { id: 'p6', name: 'Hair Braiding Service', price: 5000, category: 'Services', emoji: '💆', sellerId: 's4', sellerName: 'Beauty by Carine', region: 'buea', area: 'Great Soppo', rating: 5.0, orders: 78, description: 'Professional hair braiding. Box braids, knotless, cornrows and more.' },
  { id: 'p7', name: 'Laptop Bag', price: 8000, category: 'Electronics', emoji: '💻', sellerId: 's2', sellerName: 'TechHub Douala', region: 'douala', area: 'Deido', rating: 4.4, orders: 21, description: 'Waterproof laptop bag fits up to 15.6 inch laptops.' },
  { id: 'p8', name: 'Baby Diapers (Pack of 40)', price: 4500, category: 'Baby & Kids', emoji: '🍼', sellerId: 's5', sellerName: 'Baby World YDE', region: 'yaounde', area: 'Biyem-Assi', rating: 4.6, orders: 167, description: 'Premium soft diapers for babies 0-6 months. Leak-proof sides.' },
  { id: 'p9', name: 'Garden Vegetables Mix', price: 1200, category: 'Agriculture', emoji: '🥬', sellerId: 's1', sellerName: 'Mama Grace Store', region: 'buea', area: 'Molyko', rating: 4.7, orders: 94, description: 'Fresh mix of seasonal vegetables from Buea gardens.' },
  { id: 'p10', name: 'Bluetooth Speaker', price: 18000, category: 'Electronics', emoji: '🔊', sellerId: 's2', sellerName: 'TechHub Douala', region: 'douala', area: 'Makepe', rating: 4.5, orders: 45, description: 'Waterproof portable speaker with 360° sound and 12hr battery.' },
  { id: 'p11', name: 'Facial Cream (50ml)', price: 3000, category: 'Beauty & Health', emoji: '🧴', sellerId: 's4', sellerName: 'Beauty by Carine', region: 'buea', area: 'Great Soppo', rating: 4.8, orders: 112, description: 'Brightening cream with shea butter and vitamin C. Made for African skin.' },
  { id: 'p12', name: 'Men\'s Casual Sneakers', price: 22000, category: 'Fashion & Clothing', emoji: '👟', sellerId: 's3', sellerName: 'Kamer Fashion', region: 'yaounde', area: 'Nlongkak', rating: 4.2, orders: 33, description: 'Stylish casual sneakers. Sizes 39-46 available.' },
];

export const DEMO_SELLERS = [
  { id: 's1', name: 'Mama Grace Store', owner: 'Grace Ngwa', email: 'seller@demo.com', phone: '677123456', region: 'buea', area: 'Molyko', rating: 4.7, sales: 439, joined: '2024-03-15', categories: ['Food & Groceries', 'Agriculture'], verified: true, avatar: '👩‍🍳', bio: 'Fresh farm produce delivered to your door in Buea and environs.' },
  { id: 's2', name: 'TechHub Douala', owner: 'Eric Mbah', email: 'tech@demo.com', phone: '699234567', region: 'douala', area: 'Akwa', rating: 4.5, sales: 189, joined: '2024-05-20', categories: ['Electronics', 'Phones & Accessories'], verified: true, avatar: '👨‍💻', bio: 'Your one-stop shop for electronics and accessories in Douala.' },
  { id: 's3', name: 'Kamer Fashion', owner: 'Diane Fon', email: 'fashion@demo.com', phone: '655345678', region: 'yaounde', area: 'Bastos', rating: 4.7, sales: 89, joined: '2024-06-01', categories: ['Fashion & Clothing'], verified: true, avatar: '👩‍🎨', bio: 'Authentic African fashion and contemporary styles for every occasion.' },
  { id: 's4', name: 'Beauty by Carine', owner: 'Carine Tchamba', email: 'beauty@demo.com', phone: '677456789', region: 'buea', area: 'Great Soppo', rating: 4.9, sales: 190, joined: '2024-04-10', categories: ['Beauty & Health', 'Services'], verified: true, avatar: '💄', bio: 'Professional beauty services and skincare products for all.' },
  { id: 's5', name: 'Baby World YDE', owner: 'Pauline Mba', email: 'baby@demo.com', phone: '699567890', region: 'yaounde', area: 'Biyem-Assi', rating: 4.6, sales: 167, joined: '2024-07-05', categories: ['Baby & Kids'], verified: true, avatar: '👶', bio: 'Everything your baby needs, delivered with care.' },
];

export const DEMO_RIDERS = [
  { id: 'r1', name: 'Paul Bih', email: 'rider@demo.com', phone: '677111222', momoNumber: '677111222', network: 'MTN', region: 'buea', areas: ['Molyko', 'Great Soppo', 'Small Soppo', 'Bonduma'], online: true, rating: 4.8, deliveries: 234, vehicle: 'Motorcycle', plateNumber: 'LT 1234 SW', avatar: '🏍️', verified: true },
  { id: 'r2', name: 'Jean Fotso', email: 'rider2@demo.com', phone: '699222333', momoNumber: '699222333', network: 'Orange', region: 'douala', areas: ['Akwa', 'Bonanjo', 'Deido', 'Makepe'], online: true, rating: 4.6, deliveries: 189, vehicle: 'Motorcycle', plateNumber: 'LT 5678 LT', avatar: '🛵', verified: true },
  { id: 'r3', name: 'Emmanuel Ndi', email: 'rider3@demo.com', phone: '677333444', momoNumber: '677333444', network: 'MTN', region: 'yaounde', areas: ['Bastos', 'Biyem-Assi', 'Nlongkak', 'Melen'], online: false, rating: 4.4, deliveries: 98, vehicle: 'Bicycle', plateNumber: 'N/A', avatar: '🚴', verified: true },
  { id: 'r4', name: 'Boris Tchatchou', email: 'rider4@demo.com', phone: '655444555', momoNumber: '655444555', network: 'MTN', region: 'buea', areas: ['Mile 16', 'Mile 17', 'Molyko', 'Clerks Quarter'], online: true, rating: 4.9, deliveries: 312, vehicle: 'Motorcycle', plateNumber: 'LT 9012 SW', avatar: '🏍️', verified: true },
];

export const DEMO_ORDERS = [
  { id: 'o1', productId: 'p1', productName: 'Fresh Tomatoes (1kg)', productEmoji: '🍅', buyerId: 'b1', buyerName: 'Alice Kom', buyerPhone: '677900111', sellerId: 's1', sellerName: 'Mama Grace Store', riderId: 'r1', riderName: 'Paul Bih', price: 500, quantity: 3, total: 1500, deliveryFee: 500, status: 'delivered', region: 'buea', area: 'Molyko', address: 'Behind UB Junction', createdAt: '2025-06-01T08:30:00', deliveredAt: '2025-06-01T11:00:00', paymentMethod: 'MTN MoMo', paid: true, riderPaid: true, rating: 5, review: 'Very fresh, delivered quickly!' },
  { id: 'o2', productId: 'p2', productName: 'iPhone 13 Case', productEmoji: '📱', buyerId: 'b2', buyerName: 'David Bah', buyerPhone: '699900222', sellerId: 's2', sellerName: 'TechHub Douala', riderId: 'r2', riderName: 'Jean Fotso', price: 2500, quantity: 1, total: 2500, deliveryFee: 800, status: 'in_transit', region: 'douala', area: 'Deido', address: 'Near Carrefour Deido', createdAt: '2025-06-01T09:00:00', paymentMethod: 'Orange Money', paid: true, riderPaid: false },
  { id: 'o3', productId: 'p5', productName: 'Palm Oil (5L)', productEmoji: '🫚', buyerId: 'b1', buyerName: 'Alice Kom', buyerPhone: '677900111', sellerId: 's1', sellerName: 'Mama Grace Store', riderId: null, riderName: null, price: 3500, quantity: 1, total: 3500, deliveryFee: 500, status: 'confirmed', region: 'buea', area: 'Great Soppo', address: 'St Joseph College Road', createdAt: '2025-06-01T10:00:00', paymentMethod: 'MTN MoMo', paid: true, riderPaid: false },
  { id: 'o4', productId: 'p3', productName: 'African Print Dress', productEmoji: '👗', buyerId: 'b3', buyerName: 'Esther Nkeng', buyerPhone: '655900333', sellerId: 's3', sellerName: 'Kamer Fashion', riderId: null, riderName: null, price: 12000, quantity: 1, total: 12000, deliveryFee: 1000, status: 'pending', region: 'yaounde', area: 'Nlongkak', address: 'Opposite Total Nlongkak', createdAt: '2025-06-01T11:00:00', paymentMethod: 'MTN MoMo', paid: false, riderPaid: false },
];

export const DEMO_NOTIFICATIONS = {
  buyer: [
    { id: 'n1', title: '🎉 Order Delivered!', summary: 'Your Fresh Tomatoes have arrived', body: 'Your order of Fresh Tomatoes (3kg) has been successfully delivered by Paul Bih. Please rate your experience to help other buyers.', time: '2 hours ago', read: false, type: 'delivery' },
    { id: 'n2', title: '📦 Order Confirmed', summary: 'Palm Oil order accepted by seller', body: 'Mama Grace Store has confirmed your order for Palm Oil (5L). A delivery rider will be assigned shortly. Expected delivery: Today, 2:00 PM - 4:00 PM.', time: '1 hour ago', read: false, type: 'order' },
    { id: 'n3', title: '🛵 Rider Assigned', summary: 'Paul Bih is on his way', body: 'Your delivery has been assigned to Paul Bih (677111222). He will pick up your Palm Oil and deliver to Great Soppo. Track your order in real-time from your dashboard.', time: '30 mins ago', read: true, type: 'rider' },
    { id: 'n4', title: '💬 New Message', summary: 'Mama Grace Store replied to you', body: 'Hello! Thank you for your order. Your tomatoes will be packed fresh. Delivery expected by 12:00 PM today. Payment via MTN MoMo to 677123456. Thank you for choosing us!', time: '45 mins ago', read: true, type: 'message' },
  ],
  seller: [
    { id: 'n1', title: '🛒 New Order!', summary: 'Alice Kom ordered Fresh Tomatoes', body: 'New order received! Alice Kom (677900111) has ordered 3x Fresh Tomatoes (1kg) totaling 1,500 FCFA + 500 FCFA delivery to Molyko. Please confirm and assign a rider.', time: '3 hours ago', read: false, type: 'order' },
    { id: 'n2', title: '✅ Delivery Confirmed', summary: 'Paul Bih delivered successfully', body: 'Paul Bih has confirmed delivery of order #o1 to Alice Kom. Proof of delivery photo uploaded. Please process rider payment of 500 FCFA to MTN MoMo 677111222.', time: '2 hours ago', read: false, type: 'delivery' },
    { id: 'n3', title: '⭐ New Review', summary: 'Alice Kom rated you 5 stars', body: 'Alice Kom left a 5-star review: "Very fresh, delivered quickly!" - This review is now visible on your shop profile.', time: '2 hours ago', read: true, type: 'review' },
    { id: 'n4', title: '💬 New Message', summary: 'David Bah sent you a message', body: 'David Bah: "Hello, do you have the iPhone 13 case in black color? I want to order 2 pieces. Can you give me a small discount?" — Reply now to close the sale!', time: '1 hour ago', read: true, type: 'message' },
  ],
  rider: [
    { id: 'n1', title: '📦 New Delivery Request!', summary: 'Pickup from Mama Grace Store', body: 'New delivery job! Pickup: Mama Grace Store, Molyko. Drop-off: Alice Kom, Great Soppo (St Joseph College Road). Package: Palm Oil (5L). Delivery fee: 500 FCFA. Accept or decline within 2 minutes.', time: '30 mins ago', read: false, type: 'job' },
    { id: 'n2', title: '💰 Payment Received!', summary: '500 FCFA sent to your MoMo', body: 'Payment confirmed! Mama Grace Store has sent 500 FCFA to your MTN MoMo account (677111222) for delivery of order #o1. Total earnings today: 3,500 FCFA.', time: '2 hours ago', read: false, type: 'payment' },
    { id: 'n3', title: '⭐ New Rating', summary: 'You received a 5-star rating!', body: 'Alice Kom rated your delivery 5 stars! Your overall rating is now 4.8/5. Keep up the excellent work!', time: '2 hours ago', read: true, type: 'rating' },
    { id: 'n4', title: '📋 Profile Verified', summary: 'Your KYC is complete', body: 'Your VentriDrop rider profile has been fully verified. You can now accept deliveries across Buea. Make sure your MoMo number is always up to date in settings.', time: '1 day ago', read: true, type: 'system' },
  ]
};

export const DEMO_MESSAGES = [
  {
    id: 'conv1',
    participants: ['b1', 's1'],
    otherParty: { id: 's1', name: 'Mama Grace Store', avatar: '👩‍🍳', role: 'seller' },
    messages: [
      { id: 'm1', senderId: 'b1', text: 'Hello, I would like to order fresh tomatoes. Do you deliver to Molyko?', time: '09:00', date: 'Today' },
      { id: 'm2', senderId: 's1', text: 'Hello! Welcome to Mama Grace Store 🌿 Yes we deliver to Molyko! Our tomatoes are picked fresh every morning. Delivery takes about 1-2 hours. Would you like to place an order?', time: '09:02', date: 'Today', isAuto: true },
      { id: 'm3', senderId: 'b1', text: 'Yes please, 3kg. How do I pay?', time: '09:05', date: 'Today' },
      { id: 'm4', senderId: 's1', text: 'Great choice! 3kg = 1,500 FCFA + 500 FCFA delivery = 2,000 FCFA total. Please pay via MTN MoMo to 677123456 (Grace Ngwa) and send screenshot here. We\'ll dispatch immediately! 🚀', time: '09:06', date: 'Today', isAuto: true },
      { id: 'm5', senderId: 'b1', text: 'Payment sent!', time: '09:15', date: 'Today' },
      { id: 'm6', senderId: 's1', text: 'Payment confirmed! ✅ Your order is being prepared. Rider Paul Bih (677111222) will deliver by 11:00 AM. Thank you for shopping with us! 💚', time: '09:16', date: 'Today' },
    ]
  }
];

export const DELIVERY_PERIODS = {
  same_area: { label: 'Same Area', time: '1-2 hours', fee: 500 },
  same_city: { label: 'Same City', time: '2-4 hours', fee: 800 },
  different_city: { label: 'Different City', time: '1-2 days', fee: 2000 },
};

export const DEMO_USERS = {
  buyer: { id: 'b1', name: 'Alice Kom', email: 'buyer@demo.com', password: 'demo123', role: 'buyer', phone: '677900111', region: 'buea', area: 'Molyko', address: 'Behind UB Junction', avatar: '👩', joined: '2025-01-10' },
  seller: { id: 's1', name: 'Grace Ngwa', email: 'seller@demo.com', password: 'demo123', role: 'seller', phone: '677123456', shopName: 'Mama Grace Store', region: 'buea', area: 'Molyko', avatar: '👩‍🍳', joined: '2024-03-15' },
  rider: { id: 'r1', name: 'Paul Bih', email: 'rider@demo.com', password: 'demo123', role: 'rider', phone: '677111222', momoNumber: '677111222', network: 'MTN', region: 'buea', areas: ['Molyko', 'Great Soppo', 'Small Soppo'], avatar: '🏍️', joined: '2024-06-20' },
};
