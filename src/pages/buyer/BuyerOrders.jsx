import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';

const STATUS_STEPS = ['pending','confirmed','in_transit','delivered'];
const STATUS_LABELS = { pending: 'Pending', confirmed: 'Confirmed', in_transit: 'In Transit', delivered: 'Delivered', cancelled: 'Cancelled' };
const STATUS_ICONS = { pending: '⏳', confirmed: '✅', in_transit: '🛵', delivered: '🎉', cancelled: '❌' };

function TrackingModal({ order, onClose, onConfirmDelivery }) {
  const [riderPos, setRiderPos] = useState({ x: 15, y: 60 });
  const [phase, setPhase] = useState(0);
  const positions = [{ x: 15, y: 60 }, { x: 35, y: 45 }, { x: 55, y: 55 }, { x: 70, y: 40 }, { x: 82, y: 52 }];

  useState(() => {
    if (order.status !== 'in_transit') return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < positions.length) setRiderPos(positions[i]);
      else { clearInterval(iv); }
    }, 2500);
    return () => clearInterval(iv);
  });

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3>📍 Live Tracking</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ background: 'var(--bg-input)', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>{order.productEmoji} {order.productName}</div>
            <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>📍 Delivering to: {order.area} — {order.address}</div>
            {order.riderName && <div style={{ marginTop: 4 }}>🏍️ Rider: <strong>{order.riderName}</strong></div>}
          </div>

          {/* Map simulation */}
          <div className="map-container" style={{ height: 200, marginBottom: 16 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' }} />
            {/* Roads */}
            <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, height: 8, background: '#A5D6A7', borderRadius: 4 }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 8, background: '#A5D6A7', borderRadius: 4 }} />
            <div style={{ position: 'absolute', top: '65%', left: '20%', right: '20%', height: 6, background: '#B2DFDB', borderRadius: 4, transform: 'rotate(-15deg)' }} />

            {/* Seller pin */}
            <div className="map-pin" style={{ left: '12%', top: '35%' }}>🏪</div>
            {/* Buyer pin */}
            <div className="map-pin" style={{ left: '78%', top: '44%' }}>📍</div>
            {/* Rider dot */}
            {order.status === 'in_transit' && (
              <div className="rider-dot" style={{ left: `${riderPos.x}%`, top: `${riderPos.y}%` }}>
                🛵
              </div>
            )}
            {/* Status overlay */}
            <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>
              {order.status === 'in_transit' ? '🟢 Rider is on the way' : order.status === 'delivered' ? '✅ Delivered' : '⏳ Awaiting pickup'}
            </div>
          </div>

          {/* Progress */}
          <div className="order-progress">
            {STATUS_STEPS.map((s, i) => {
              const idx = STATUS_STEPS.indexOf(order.status);
              const state = i < idx ? 'done' : i === idx ? 'active' : 'pending';
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                  {i > 0 && <div style={{ width: '100%', height: 2, background: i <= idx ? 'var(--brand-primary)' : 'var(--border)', marginBottom: 8 }} />}
                  <div className={`order-step ${state}`}>
                    <div className="step-dot">{i <= idx ? STATUS_ICONS[s] : (i + 1)}</div>
                    <div className="step-label">{STATUS_LABELS[s]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {order.status === 'delivered' && !order.rated && (
            <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={() => { onConfirmDelivery(order.id); onClose(); }}>
              ✅ Confirm Receipt & Rate →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function RatingModal({ order, onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3>⭐ Rate Your Experience</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{order.productEmoji}</div>
            <div style={{ fontWeight: 700 }}>{order.productName}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>from {order.sellerName}</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>How was your experience?</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  style={{ fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', opacity: n <= rating ? 1 : 0.3, transition: 'opacity 0.15s' }}
                >
                  ⭐
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--brand-primary)', fontWeight: 700, marginTop: 8 }}>
              {['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Excellent 🤩'][rating]}
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: 20 }}>
            <label>Leave a comment (optional)</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Share your experience..."
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>Skip</button>
            <button className="btn btn-primary" onClick={() => onSubmit(order.id, rating, review)} style={{ flex: 2 }}>Submit Rating ⭐</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuyerOrders() {
  const { getMyOrders, updateOrder, addNotification } = useApp();
  const [filter, setFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);

  const allOrders = getMyOrders();
  const filtered = filter === 'all' ? allOrders : allOrders.filter(o => o.status === filter);

  const handleConfirmDelivery = (orderId) => {
    updateOrder(orderId, { status: 'delivered', buyerConfirmed: true });
    const order = allOrders.find(o => o.id === orderId);
    setRatingOrder(order);
  };

  const handleRating = (orderId, rating, review) => {
    updateOrder(orderId, { rating, review, rated: true });
    addNotification('seller', {
      title: '⭐ New Review!',
      summary: `You received ${rating} stars`,
      body: `A buyer rated their order ${rating}/5 stars${review ? `: "${review}"` : ''}. This review is now visible on your profile.`,
      type: 'review'
    });
    setRatingOrder(null);
  };

  const statusColors = { pending: 'warning', confirmed: 'info', in_transit: 'orange', delivered: 'success', cancelled: 'danger' };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>📦 My Orders</h1>
        <div className="tabs">
          {[['all', 'All'], ['pending', '⏳ Pending'], ['in_transit', '🛵 In Transit'], ['delivered', '✅ Delivered']].map(([val, label]) => (
            <button key={val} className={`tab-btn ${filter === val ? 'active' : ''}`} onClick={() => setFilter(val)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="page-content">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Browse the marketplace to place your first order.</p>
          </div>
        ) : (
          filtered.map(order => (
            <div key={order.id} className="order-card fade-in">
              <div className="order-header">
                <div>
                  <div className="order-id">#{order.id}</div>
                  <div className="order-product">{order.productEmoji} {order.productName}</div>
                </div>
                <span className={`badge badge-${statusColors[order.status] || 'muted'}`}>
                  {STATUS_ICONS[order.status]} {STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="order-meta">
                <div className="order-meta-item">🏪 {order.sellerName}</div>
                <div className="order-meta-item">📍 {order.area}</div>
                <div className="order-meta-item">🔢 Qty: {order.quantity}</div>
                <div className="order-meta-item" style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
                  {(order.total + order.deliveryFee).toLocaleString()} FCFA
                </div>
                {order.riderName && <div className="order-meta-item">🏍️ {order.riderName}</div>}
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', gap: 0, marginTop: 14, alignItems: 'center' }}>
                {STATUS_STEPS.map((s, i) => {
                  const idx = STATUS_STEPS.indexOf(order.status);
                  const done = i < idx;
                  const active = i === idx;
                  return (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      {i > 0 && <div style={{ flex: 1, height: 2, background: done || active ? 'var(--brand-primary)' : 'var(--border)' }} />}
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        background: done ? 'var(--brand-primary)' : active ? 'var(--brand-secondary)' : 'var(--bg-input)',
                        color: (done || active) ? 'white' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700,
                        boxShadow: active ? '0 0 0 4px rgba(255,107,53,0.2)' : 'none'
                      }}>
                        {done ? '✓' : i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                {STATUS_STEPS.map((s, i) => (
                  <div key={s} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>{STATUS_LABELS[s]}</div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {(order.status === 'in_transit' || order.status === 'confirmed') && (
                  <button className="btn btn-primary btn-sm" onClick={() => setTrackingOrder(order)}>
                    📍 Track Live
                  </button>
                )}
                {order.status === 'delivered' && !order.rated && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setRatingOrder(order)}>
                    ⭐ Rate Order
                  </button>
                )}
                {order.rated && (
                  <div style={{ display: 'flex', gap: 2, alignItems: 'center', fontSize: 13, color: 'var(--brand-gold)' }}>
                    {'⭐'.repeat(order.rating)} <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>Rated</span>
                  </div>
                )}
                {order.status === 'delivered' && order.buyerConfirmed && !order.rated && (
                  <span className="badge badge-success">Receipt Confirmed</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {trackingOrder && (
        <TrackingModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
          onConfirmDelivery={handleConfirmDelivery}
        />
      )}
      {ratingOrder && (
        <RatingModal
          order={ratingOrder}
          onClose={() => setRatingOrder(null)}
          onSubmit={handleRating}
        />
      )}
    </DashboardLayout>
  );
}
