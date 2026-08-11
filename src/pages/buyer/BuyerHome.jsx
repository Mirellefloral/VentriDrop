import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { DEMO_PRODUCTS, DEMO_SELLERS } from '../../data/demoData';

export default function BuyerHome() {
  const { user, cart, addToCart, getMyOrders } = useApp();
  const navigate = useNavigate();
  const myOrders = getMyOrders();
  const activeOrders = myOrders.filter(o => !['delivered','cancelled'].includes(o.status));
  const featuredProducts = DEMO_PRODUCTS.slice(0, 6);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Good day 👋</div>
            <h1 style={{ fontSize: 26, fontWeight: 800 }}>{user?.name?.split(' ')[0]}</h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              📍 {user?.area}, {user?.region?.charAt(0).toUpperCase() + user?.region?.slice(1)}
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/buyer/marketplace')}
            style={{ borderRadius: 12 }}
          >
            🛍️ Browse Market
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="stats-grid stagger-1">
          {[
            { icon: '📦', label: 'Total Orders', value: myOrders.length, bg: 'rgba(59,130,246,0.1)', color: 'var(--info)', emoji: '📦' },
            { icon: '🚚', label: 'Active Deliveries', value: activeOrders.length, bg: 'rgba(255,107,53,0.1)', color: 'var(--brand-secondary)', emoji: '🚚' },
            { icon: '✅', label: 'Delivered', value: myOrders.filter(o=>o.status==='delivered').length, bg: 'rgba(0,195,123,0.1)', color: 'var(--brand-primary)', emoji: '✅' },
            { icon: '🛒', label: 'Cart Items', value: cart.length, bg: 'rgba(245,158,11,0.1)', color: 'var(--brand-gold)', emoji: '🛒' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-bg">{s.emoji}</div>
            </div>
          ))}
        </div>

        {/* Active Order Banner */}
        {activeOrders.length > 0 && (
          <div className="stagger-2" style={{
            background: 'linear-gradient(135deg, rgba(0,195,123,0.12), rgba(79,70,229,0.08))',
            border: '1px solid rgba(0,195,123,0.25)',
            borderRadius: 16, padding: '16px 20px', marginBottom: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                🛵 Active Delivery in Progress
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 3 }}>
                {activeOrders[0].productEmoji} {activeOrders[0].productName} — {activeOrders[0].area}
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/buyer/orders')}>
              Track Order →
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="stagger-2" style={{ marginBottom: 28 }}>
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {[
              { icon: '🔍', label: 'Search Products', path: '/buyer/marketplace', color: '#4F46E5' },
              { icon: '📦', label: 'My Orders', path: '/buyer/orders', color: '#00C37B' },
              { icon: '💬', label: 'Messages', path: '/buyer/messages', color: '#FF6B35' },
              { icon: '⚙️', label: 'Settings', path: '/buyer/settings', color: '#F59E0B' },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => navigate(a.path)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '20px 12px', cursor: 'pointer',
                  transition: 'var(--transition)', fontFamily: 'Plus Jakarta Sans, sans-serif'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {a.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="stagger-3">
          <div className="section-header">
            <h2>Featured Products</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/buyer/marketplace')}>See all →</button>
          </div>
          <div className="grid-auto">
            {featuredProducts.map(p => (
              <div key={p.id} className="product-card" onClick={() => navigate('/buyer/marketplace')}>
                <div className="product-img">{p.emoji}</div>
                <div className="product-body">
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">{p.price.toLocaleString()} FCFA</div>
                  <div className="product-seller">🏪 {p.sellerName}</div>
                  <div className="product-rating">
                    <span>⭐</span>
                    <span style={{ fontWeight: 600 }}>{p.rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({p.orders})</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>📍 {p.area}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm btn-full"
                    style={{ marginTop: 10, borderRadius: 8 }}
                    onClick={e => { e.stopPropagation(); addToCart(p); }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="stagger-4" style={{ marginTop: 28 }}>
          <div className="section-header">
            <h2>Top Sellers</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DEMO_SELLERS.slice(0, 3).map(s => (
              <div key={s.id} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '16px', display: 'flex', alignItems: 'center', gap: 14
              }}>
                <div className="avatar" style={{ width: 48, height: 48, fontSize: '1.6em', flexShrink: 0 }}>{s.avatar}</div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>📍 {s.area}, {s.region}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span className="badge badge-success">⭐ {s.rating}</span>
                    <span className="badge badge-muted">{s.sales} sales</span>
                    {s.verified && <span className="badge badge-info">✓ Verified</span>}
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/buyer/marketplace')}>Shop</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
