import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { REGIONS, PRODUCT_CATEGORIES, DEMO_PRODUCTS, DEMO_SELLERS, DELIVERY_PERIODS } from '../../data/demoData';

function OrderModal({ product, onClose, onOrder }) {
  const { user } = useApp();
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState(user?.address || '');
  const [payMethod, setPayMethod] = useState('MTN MoMo');
  const [payConfirmed, setPayConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSameCity = product.region === user?.region;
  const isSameArea = product.area === user?.area;
  const delivery = isSameArea ? DELIVERY_PERIODS.same_area : isSameCity ? DELIVERY_PERIODS.same_city : DELIVERY_PERIODS.different_city;
  const total = product.price * qty;
  const grandTotal = total + delivery.fee;

  const handleConfirmOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    onOrder({ product, qty, address, payMethod, delivery, total, grandTotal });
    setStep(4);
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <div className="modal-header">
          <h3>{step === 4 ? '🎉 Order Placed!' : `Order - ${product.name}`}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', gap: 16, background: 'var(--bg-input)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 40 }}>{product.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{product.name}</div>
                  <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: 18 }}>{product.price.toLocaleString()} FCFA</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>🏪 {product.sellerName}</div>
                </div>
              </div>
              <div style={{ background: 'rgba(0,195,123,0.08)', border: '1px solid rgba(0,195,123,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>🤖 Auto-Reply from {product.sellerName}:</div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Hello! Thank you for your interest in <strong>{product.name}</strong>. 
                  Delivery to {user?.area} ({delivery.label}): <strong>{delivery.time}</strong>. 
                  Delivery fee: <strong>{delivery.fee.toLocaleString()} FCFA</strong>. 
                  Do you agree to proceed?
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: 16 }}>
                <label>Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span style={{ fontWeight: 700, fontSize: 18, minWidth: 30, textAlign: 'center' }}>{qty}</span>
                  <button className="btn btn-outline btn-sm" onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>
              <div className="input-group">
                <label>Delivery Address</label>
                <input className="input" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your address" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 13 }}>
                <span>Subtotal:</span><span>{total.toLocaleString()} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 4 }}>
                <span>Delivery:</span><span>{delivery.fee.toLocaleString()} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <span>Total:</span><span style={{ color: 'var(--brand-primary)' }}>{grandTotal.toLocaleString()} FCFA</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setStep(2)} style={{ flex: 2 }} disabled={!address}>
                  I Agree, Proceed to Pay →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>🤖 Payment Instructions:</div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Please send <strong>{grandTotal.toLocaleString()} FCFA</strong> to:<br/>
                  📱 MTN MoMo: <strong>677 123 456</strong> (Grace Ngwa)<br/>
                  🟠 Orange Money: <strong>699 234 567</strong><br/>
                  After payment, confirm below to proceed.
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: 20 }}>
                <label>Payment Method</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['MTN MoMo', 'Orange Money'].map(m => (
                    <button
                      key={m} type="button"
                      onClick={() => setPayMethod(m)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 10, border: `1.5px solid ${payMethod === m ? 'var(--brand-primary)' : 'var(--border)'}`,
                        background: payMethod === m ? 'rgba(0,195,123,0.08)' : 'var(--bg-input)',
                        cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        color: payMethod === m ? 'var(--brand-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      {m === 'MTN MoMo' ? '🟡' : '🟠'} {m}
                    </button>
                  ))}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20, padding: 14, background: 'var(--bg-input)', borderRadius: 12 }}>
                <input type="checkbox" checked={payConfirmed} onChange={e => setPayConfirmed(e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--brand-primary)' }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>I have completed the payment of {grandTotal.toLocaleString()} FCFA</span>
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>← Back</button>
                <button className="btn btn-primary" onClick={handleConfirmOrder} disabled={!payConfirmed || loading} style={{ flex: 2 }}>
                  {loading ? <><span className="spinner" /> Processing...</> : 'Confirm Payment ✓'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
              <h3 style={{ marginBottom: 8 }}>Order Placed Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                Your order for <strong>{product.name}</strong> has been placed.<br />
                The seller has been notified and will assign a rider shortly.<br />
                Expected delivery: <strong>{delivery.time}</strong>
              </p>
              <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Payment:</span><span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>✅ Confirmed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Paid:</span><span style={{ fontWeight: 700 }}>{grandTotal.toLocaleString()} FCFA</span>
                </div>
              </div>
              <button className="btn btn-primary btn-full" onClick={onClose}>View My Orders →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BuyerMarketplace() {
  const { user, addToCart, placeOrder } = useApp();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [orderProduct, setOrderProduct] = useState(null);
  const [cartAdded, setCartAdded] = useState({});

  const filteredProducts = DEMO_PRODUCTS.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sellerName.toLowerCase().includes(search.toLowerCase());
    const matchRegion = !selectedRegion || p.region === selectedRegion;
    const matchArea = !selectedArea || p.area === selectedArea;
    const matchCat = !selectedCategory || p.category === selectedCategory;
    return matchSearch && matchRegion && matchArea && matchCat;
  });

  const handleAddCart = (p, e) => {
    e.stopPropagation();
    addToCart(p);
    setCartAdded(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => setCartAdded(prev => ({ ...prev, [p.id]: false })), 1500);
  };

  const handleOrder = (orderData) => {
    placeOrder({
      productId: orderData.product.id,
      productName: orderData.product.name,
      productEmoji: orderData.product.emoji,
      buyerId: user?.id || 'b1',
      buyerName: user?.name || 'Guest',
      buyerPhone: user?.phone || '',
      sellerId: orderData.product.sellerId,
      sellerName: orderData.product.sellerName,
      price: orderData.product.price,
      quantity: orderData.qty,
      total: orderData.total,
      deliveryFee: orderData.delivery.fee,
      region: user?.region || orderData.product.region,
      area: user?.area || orderData.product.area,
      address: orderData.address,
      paymentMethod: orderData.payMethod,
      paid: true,
    });
    setOrderProduct(null);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>🛍️ Marketplace</h1>

        {/* Search */}
        <div className="search-bar" style={{ marginBottom: 16, maxWidth: 500 }}>
          <span>🔍</span>
          <input
            placeholder="Search products or sellers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="btn btn-ghost btn-sm" onClick={() => setSearch('')} style={{ padding: '2px 6px' }}>✕</button>}
        </div>

        {/* Region / Area Filter */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <select
            className="select"
            style={{ maxWidth: 160 }}
            value={selectedRegion}
            onChange={e => { setSelectedRegion(e.target.value); setSelectedArea(''); }}
          >
            <option value="">🌍 All Regions</option>
            {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
          {selectedRegion && (
            <select
              className="select"
              style={{ maxWidth: 180 }}
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
            >
              <option value="">📍 All Areas</option>
              {REGIONS[selectedRegion]?.areas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          )}
          {(selectedRegion || selectedArea || selectedCategory || search) && (
            <button className="btn btn-outline btn-sm" onClick={() => { setSelectedRegion(''); setSelectedArea(''); setSelectedCategory(''); setSearch(''); }}>
              Clear Filters ✕
            </button>
          )}
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className={`chip ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >All</button>
          {PRODUCT_CATEGORIES.map(c => (
            <button
              key={c}
              className={`chip ${selectedCategory === c ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === c ? '' : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content">
        <div style={{ marginBottom: 12, color: 'var(--text-muted)', fontSize: 13 }}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {selectedRegion && ` in ${REGIONS[selectedRegion]?.name}`}
          {selectedArea && `, ${selectedArea}`}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => { setSearch(''); setSelectedRegion(''); setSelectedArea(''); setSelectedCategory(''); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid-auto">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-img" onClick={() => setOrderProduct(p)}>
                  {p.emoji}
                  <div style={{ position: 'absolute', top: 8, right: 8 }}>
                    <span className="badge badge-muted" style={{ fontSize: 10 }}>📍 {p.area}</span>
                  </div>
                </div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">{p.price.toLocaleString()} FCFA</div>
                  <div className="product-seller">🏪 {p.sellerName}</div>
                  <div className="product-rating">
                    ⭐ <strong>{p.rating}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>({p.orders} orders)</span>
                  </div>
                  {p.description && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>{p.description}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                      onClick={(e) => handleAddCart(p, e)}
                    >
                      {cartAdded[p.id] ? '✓ Added' : '🛒 Cart'}
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => setOrderProduct(p)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
          onOrder={handleOrder}
        />
      )}
    </DashboardLayout>
  );
}
