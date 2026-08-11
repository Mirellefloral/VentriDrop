import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { DEMO_RIDERS } from '../../data/demoData';

function AssignRiderModal({ order, onClose, onAssign }) {
  const { riders } = useApp();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const available = (riders || DEMO_RIDERS).filter(r => {
    const matchArea = r.areas?.some(a => a.toLowerCase().includes(order.area?.toLowerCase() || '')) || true;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return r.online && matchSearch;
  });

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3>🛵 Assign Rider</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>📦 {order.productEmoji} {order.productName}</div>
            <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>📍 Deliver to: {order.area} — {order.address}</div>
          </div>

          <div className="search-bar" style={{ marginBottom: 14 }}>
            <span>🔍</span>
            <input placeholder="Search riders by name or area..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 300, overflowY: 'auto' }}>
            {available.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 20, fontSize: 13 }}>
                No available riders found
              </div>
            ) : available.map(r => (
              <div
                key={r.id}
                onClick={() => setSelected(r.id === selected ? null : r.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                  borderRadius: 12, border: `1.5px solid ${selected === r.id ? 'var(--brand-primary)' : 'var(--border)'}`,
                  background: selected === r.id ? 'rgba(0,195,123,0.06)' : 'var(--bg-card)',
                  cursor: 'pointer', transition: 'var(--transition)'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div className="avatar" style={{ width: 44, height: 44 }}>{r.avatar}</div>
                  <div className={r.online ? 'online-dot' : 'offline-dot'} style={{ position: 'absolute', bottom: 0, right: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    📍 {r.areas?.slice(0, 2).join(', ')}
                    {r.areas?.length > 2 ? ` +${r.areas.length - 2}` : ''}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <span className="badge badge-success" style={{ fontSize: 10 }}>⭐ {r.rating}</span>
                    <span className="badge badge-muted" style={{ fontSize: 10 }}>{r.deliveries} deliveries</span>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>{r.vehicle}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--brand-primary)', fontWeight: 700 }}>{r.network}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.phone}</div>
                </div>
                {selected === r.id && <span style={{ color: 'var(--brand-primary)', fontSize: 20 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            disabled={!selected}
            onClick={() => { onAssign((riders || DEMO_RIDERS).find(r => r.id === selected)); onClose(); }}
          >
            Assign Rider 🛵
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerOrders() {
  const { getMyOrders, updateOrder, assignRider, addNotification } = useApp();
  const [filter, setFilter] = useState('all');
  const [assigningOrder, setAssigningOrder] = useState(null);

  const all = getMyOrders();
  const filtered = filter === 'all' ? all : all.filter(o => o.status === filter);

  const handleConfirm = (id) => {
    updateOrder(id, { status: 'confirmed' });
    addNotification('buyer', {
      title: '✅ Order Confirmed',
      summary: 'Seller confirmed your order',
      body: 'Your order has been confirmed by the seller. A rider will be assigned shortly.',
      type: 'order'
    });
  };

  const handleAssignRider = (rider) => {
    assignRider(assigningOrder.id, rider);
  };

  const handlePayRider = (order) => {
    updateOrder(order.id, { riderPaid: true });
    addNotification('rider', {
      title: '💰 Payment Sent!',
      summary: `${order.deliveryFee?.toLocaleString()} FCFA sent to your MoMo`,
      body: `Payment of ${order.deliveryFee?.toLocaleString()} FCFA sent to your ${order.riderNetwork || 'MTN'} MoMo for delivery of order #${order.id}.`,
      type: 'payment'
    });
  };

  const statusBadge = { pending: 'warning', confirmed: 'info', in_transit: 'orange', delivered: 'success', cancelled: 'danger' };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>📋 Orders</h1>
        <div className="tabs">
          {[['all','All'],['pending','⏳ Pending'],['confirmed','✅ Confirmed'],['in_transit','🛵 In Transit'],['delivered','📦 Delivered']].map(([v, l]) => (
            <button key={v} className={`tab-btn ${filter === v ? 'active' : ''}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="page-content">
        {filtered.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📋</div><h3>No orders here</h3></div>
        ) : filtered.map(o => (
          <div key={o.id} className="order-card fade-in">
            <div className="order-header">
              <div>
                <div className="order-id">Order #{o.id}</div>
                <div className="order-product">{o.productEmoji} {o.productName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  👤 {o.buyerName} · 📞 {o.buyerPhone}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`badge badge-${statusBadge[o.status] || 'muted'}`} style={{ marginBottom: 6, display: 'block' }}>
                  {o.status.replace('_', ' ')}
                </span>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)', fontSize: 16 }}>{o.total.toLocaleString()} FCFA</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>+{o.deliveryFee?.toLocaleString()} delivery</div>
              </div>
            </div>

            <div className="order-meta" style={{ marginTop: 10 }}>
              <div className="order-meta-item">📍 {o.area}</div>
              <div className="order-meta-item">🏠 {o.address}</div>
              <div className="order-meta-item">🔢 Qty: {o.quantity}</div>
              <div className="order-meta-item">💳 {o.paymentMethod}</div>
              {o.riderId && <div className="order-meta-item">🏍️ {o.riderName}</div>}
            </div>

            {/* Proof of delivery */}
            {o.proof && (
              <div style={{ marginTop: 12, background: 'rgba(0,195,123,0.08)', border: '1px solid rgba(0,195,123,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 4 }}>📸 Proof of Delivery</div>
                <div style={{ color: 'var(--text-secondary)' }}>{o.proof.note || 'Delivery confirmed by rider.'}</div>
                {o.proof.imageUrl && <img src={o.proof.imageUrl} alt="proof" style={{ marginTop: 8, maxWidth: 200, borderRadius: 8 }} />}
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Code: <strong>{o.proof.code}</strong> · {o.proof.time}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {o.status === 'pending' && (
                <button className="btn btn-primary btn-sm" onClick={() => handleConfirm(o.id)}>
                  ✅ Confirm Order
                </button>
              )}
              {o.status === 'confirmed' && !o.riderId && (
                <button className="btn btn-secondary btn-sm" onClick={() => setAssigningOrder(o)}>
                  🛵 Assign Rider
                </button>
              )}
              {o.status === 'in_transit' && (
                <button className="btn btn-outline btn-sm" style={{ borderColor: 'var(--info)', color: 'var(--info)' }}>
                  📍 Track Live
                </button>
              )}
              {o.status === 'delivered' && o.proof && !o.riderPaid && (
                <button className="btn btn-primary btn-sm" onClick={() => handlePayRider(o)}>
                  💰 Pay Rider ({o.deliveryFee?.toLocaleString()} FCFA)
                </button>
              )}
              {o.riderPaid && (
                <span className="badge badge-success">💰 Rider Paid</span>
              )}
              {o.paid && <span className="badge badge-success">✅ Payment Received</span>}
            </div>
          </div>
        ))}
      </div>

      {assigningOrder && (
        <AssignRiderModal
          order={assigningOrder}
          onClose={() => setAssigningOrder(null)}
          onAssign={handleAssignRider}
        />
      )}
    </DashboardLayout>
  );
}
