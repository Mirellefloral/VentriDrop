import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';

export default function SellerHome() {
  const { user, sellerProducts, getMyOrders } = useApp();
  const navigate = useNavigate();
  const orders = getMyOrders();
  const pending = orders.filter(o => o.status === 'pending').length;
  const inTransit = orders.filter(o => o.status === 'in_transit').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const revenue = orders.filter(o => o.paid).reduce((s, o) => s + o.total, 0);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Welcome back 👋</div>
            <h1 style={{ fontSize: 26 }}>{user?.shopName || user?.name}</h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>📍 {user?.area}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/seller/orders')}>📋 Orders</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/seller/products')}>+ Add Product</button>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="stats-grid stagger-1">
          {[
            { icon: '💰', label: 'Total Revenue', value: `${revenue.toLocaleString()} F`, bg: 'rgba(0,195,123,0.1)', color: 'var(--brand-primary)' },
            { icon: '📦', label: 'Total Orders', value: orders.length, bg: 'rgba(59,130,246,0.1)', color: 'var(--info)' },
            { icon: '⏳', label: 'Pending', value: pending, bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)' },
            { icon: '🛵', label: 'In Transit', value: inTransit, bg: 'rgba(255,107,53,0.1)', color: 'var(--brand-secondary)' },
            { icon: '✅', label: 'Delivered', value: delivered, bg: 'rgba(0,195,123,0.1)', color: 'var(--brand-primary)' },
            { icon: '🏪', label: 'Products', value: sellerProducts.length, bg: 'rgba(79,70,229,0.1)', color: 'var(--brand-accent)' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="stagger-2" style={{ marginBottom: 24 }}>
          <div className="section-header"><h2>Quick Actions</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            {[
              { icon: '➕', label: 'Add Product', path: '/seller/products', color: '#00C37B' },
              { icon: '📋', label: 'View Orders', path: '/seller/orders', color: '#3B82F6' },
              { icon: '🛵', label: 'Find Riders', path: '/seller/riders', color: '#FF6B35' },
              { icon: '📍', label: 'Live Track', path: '/seller/tracking', color: '#F59E0B' },
              { icon: '💬', label: 'Messages', path: '/seller/messages', color: '#8B5CF6' },
              { icon: '📊', label: 'Analytics', path: '/seller/analytics', color: '#EC4899' },
            ].map((a, i) => (
              <button key={i} onClick={() => navigate(a.path)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                padding: '18px 10px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'var(--transition)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{a.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="stagger-3">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/seller/orders')}>See all →</button>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📦</div><h3>No orders yet</h3><p>Orders will appear here when buyers place them.</p></div>
          ) : orders.slice(0, 5).map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 28 }}>{o.productEmoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{o.productName}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>👤 {o.buyerName} · 📍 {o.area}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{o.total.toLocaleString()} F</div>
                <span className={`badge badge-${o.status === 'delivered' ? 'success' : o.status === 'in_transit' ? 'orange' : o.status === 'confirmed' ? 'info' : 'warning'}`} style={{ fontSize: 10 }}>
                  {o.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
