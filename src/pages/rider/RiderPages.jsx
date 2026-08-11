import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { DEMO_ORDERS, REGIONS } from '../../data/demoData';

/* ── RIDER HOME ───────────────────────────────────── */
export function RiderHome() {
  const { user, updateUser, getMyOrders } = useApp();
  const navigate = useNavigate();
  const [online, setOnline] = useState(user?.online !== false);
  const orders = getMyOrders();
  const active = orders.filter(o => o.status === 'in_transit');
  const delivered = orders.filter(o => o.status === 'delivered');
  const earnings = delivered.reduce((s, o) => s + (o.deliveryFee || 500), 0);

  const handleToggleOnline = () => {
    const newVal = !online;
    setOnline(newVal);
    updateUser({ online: newVal });
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Welcome back 🏍️</div>
            <h1 style={{ fontSize: 26 }}>{user?.name}</h1>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {user?.vehicle || 'Motorcycle'} · {user?.areas?.slice(0, 2).join(', ')}
            </div>
          </div>
          {/* Online toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div
              onClick={handleToggleOnline}
              style={{
                width: 64, height: 34, borderRadius: 17,
                background: online ? 'var(--brand-primary)' : 'var(--bg-input)',
                border: `2px solid ${online ? 'var(--brand-primary)' : 'var(--border)'}`,
                cursor: 'pointer', position: 'relative', transition: 'all 0.3s'
              }}
            >
              <div style={{
                width: 26, height: 26, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 2, left: online ? 34 : 2,
                transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: online ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
              {online ? '🟢 ONLINE' : '⚫ OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Status banner */}
        {online ? (
          <div style={{ background: 'linear-gradient(135deg, rgba(0,195,123,0.12), rgba(0,195,123,0.05))', border: '1px solid rgba(0,195,123,0.25)', borderRadius: 14, padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--brand-primary)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700 }}>You're online and accepting deliveries</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>New delivery requests will be sent to you automatically</div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>⚫ You're offline</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Toggle online above to start receiving delivery requests</div>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid stagger-1">
          {[
            { icon: '💰', label: 'Total Earnings', value: `${earnings.toLocaleString()} FCFA`, bg: 'rgba(0,195,123,0.1)', color: 'var(--brand-primary)' },
            { icon: '📦', label: 'Deliveries', value: delivered.length, bg: 'rgba(59,130,246,0.1)', color: 'var(--info)' },
            { icon: '🚚', label: 'Active Jobs', value: active.length, bg: 'rgba(255,107,53,0.1)', color: 'var(--brand-secondary)' },
            { icon: '⭐', label: 'Rating', value: `${user?.rating || 4.8}/5`, bg: 'rgba(245,158,11,0.1)', color: 'var(--brand-gold)' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="stagger-2">
          <div className="section-header"><h2>Quick Actions</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {[
              { icon: '📦', label: 'My Deliveries', path: '/rider/deliveries', color: '#00C37B' },
              { icon: '📋', label: 'History', path: '/rider/history', color: '#3B82F6' },
              { icon: '💰', label: 'Earnings', path: '/rider/earnings', color: '#F59E0B' },
              { icon: '⚙️', label: 'Settings', path: '/rider/settings', color: '#8B5CF6' },
            ].map((a, i) => (
              <button key={i} onClick={() => navigate(a.path)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14,
                padding: '18px 10px', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'var(--transition)'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{a.icon}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active jobs */}
        {active.length > 0 && (
          <div className="stagger-3" style={{ marginTop: 24 }}>
            <div className="section-header"><h2>🔴 Active Jobs</h2></div>
            {active.map(o => (
              <div key={o.id} style={{ background: 'var(--bg-card)', border: '2px solid var(--brand-secondary)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{o.productEmoji} {o.productName}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>📍 Drop-off: {o.area} — {o.address}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>👤 {o.buyerName} · {o.buyerPhone}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--brand-primary)', fontSize: 18 }}>+{o.deliveryFee?.toLocaleString()} FCFA</div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }} onClick={() => navigate('/rider/deliveries')}>
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ── RIDER DELIVERIES ─────────────────────────────── */
function ProofModal({ order, onClose, onSubmit }) {
  const [note, setNote] = useState('');
  const [code] = useState(`VD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  const [photoUrl, setPhotoUrl] = useState(null);
  const fileRef = useState(null);
  const inputRef = { current: null };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 460 }}>
        <div className="modal-header">
          <h3>📸 Submit Proof of Delivery</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>{order.productEmoji} {order.productName}</div>
            <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>📍 {order.area} — {order.address}</div>
          </div>
          <div style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: 12, padding: 14, marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>DELIVERY CONFIRMATION CODE</div>
            <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 800, color: 'var(--brand-accent)', letterSpacing: '0.1em' }}>{code}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Share this code with the buyer to confirm receipt</div>
          </div>
          {/* Photo upload */}
          <div
            className="proof-upload"
            style={{ marginBottom: 16 }}
            onClick={() => inputRef.current?.click()}
          >
            {photoUrl ? (
              <img src={photoUrl} alt="proof" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
            ) : (
              <>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Upload Delivery Photo</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Take a photo of the package at the delivery location</div>
              </>
            )}
          </div>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
          <div className="input-group" style={{ marginBottom: 20 }}>
            <label>Additional Notes (optional)</label>
            <textarea className="textarea" rows={2} placeholder="e.g. Left with security guard, No one home so left at door..." value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={() => onSubmit({ code, note, imageUrl: photoUrl, time: new Date().toLocaleTimeString() })} style={{ flex: 2 }}>
              ✅ Confirm Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RiderDeliveries() {
  const { getMyOrders, updateOrder, confirmDelivery, user } = useApp();
  const [tab, setTab] = useState('active');
  const [proofOrder, setProofOrder] = useState(null);
  const [newRequest, setNewRequest] = useState(null);

  const orders = getMyOrders();
  const active = orders.filter(o => o.status === 'in_transit');
  const pending = orders.filter(o => o.status === 'confirmed' && !o.riderId);

  // Simulate incoming delivery request
  useEffect(() => {
    if (user?.online !== false && active.length === 0) {
      const timer = setTimeout(() => {
        setNewRequest({
          id: 'new_req_1',
          productEmoji: '📦',
          productName: 'Palm Oil (5L)',
          sellerName: 'Mama Grace Store',
          sellerArea: 'Molyko',
          area: 'Great Soppo',
          address: 'St Joseph College Road',
          buyerName: 'Alice Kom',
          total: 3500,
          deliveryFee: 500,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleAccept = () => {
    if (newRequest) {
      setNewRequest(null);
      // In real app, this would update the order in DB
    }
  };

  const handleProofSubmit = (proof) => {
    confirmDelivery(proofOrder.id, proof);
    setProofOrder(null);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>📦 Deliveries</h1>
        <div className="tabs">
          <button className={`tab-btn ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>Active ({active.length})</button>
          <button className={`tab-btn ${tab === 'available' ? 'active' : ''}`} onClick={() => setTab('available')}>Available</button>
        </div>
      </div>

      <div className="page-content">
        {/* Incoming request popup */}
        {newRequest && (
          <div style={{
            background: 'linear-gradient(135deg, #00C37B, #00A968)', borderRadius: 16, padding: 20,
            marginBottom: 20, color: 'white', animation: 'fadeIn 0.4s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>🔔 New Delivery Request!</div>
                <div style={{ opacity: 0.9, fontSize: 14 }}>{newRequest.productEmoji} {newRequest.productName}</div>
                <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>📍 Pickup: {newRequest.sellerArea} → Drop-off: {newRequest.area}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>👤 {newRequest.buyerName} · {newRequest.address}</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 8 }}>+{newRequest.deliveryFee?.toLocaleString()} FCFA</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)' }} onClick={() => setNewRequest(null)}>Decline</button>
                <button className="btn btn-sm" style={{ background: 'white', color: '#00C37B', fontWeight: 800 }} onClick={handleAccept}>Accept ✓</button>
              </div>
            </div>
            <div style={{ marginTop: 12, background: 'rgba(0,0,0,0.1)', borderRadius: 8, height: 4 }}>
              <div style={{ height: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 8, animation: 'countdown 30s linear forwards' }} />
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>Request expires in 30 seconds</div>
          </div>
        )}

        {tab === 'active' && (
          active.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛵</div>
              <h3>No active deliveries</h3>
              <p>You'll see your active deliveries here when you accept a job.</p>
            </div>
          ) : active.map(o => (
            <div key={o.id} style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 16, padding: 18, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{o.productEmoji} {o.productName}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>🏪 Pickup: {o.sellerName}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 Drop-off: {o.area}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>🏠 {o.address}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>👤 {o.buyerName} · {o.buyerPhone}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--brand-primary)', fontSize: 22 }}>+{o.deliveryFee?.toLocaleString()} FCFA</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Paid on delivery</div>
                </div>
              </div>

              {/* How to complete guide */}
              <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10, padding: 12, marginBottom: 14, fontSize: 13 }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--info)' }}>📋 How to Complete This Delivery:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--text-secondary)' }}>
                  <div>1️⃣ Pick up the package from <strong>{o.sellerName}</strong></div>
                  <div>2️⃣ Navigate to <strong>{o.address}, {o.area}</strong></div>
                  <div>3️⃣ Deliver to <strong>{o.buyerName}</strong> — call if needed: <a href={`tel:${o.buyerPhone}`} style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{o.buyerPhone}</a></div>
                  <div>4️⃣ Take a photo and get the confirmation code signed</div>
                  <div>5️⃣ Click "Confirm Delivery" — your payment will be sent automatically 💰</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={`tel:${o.buyerPhone}`} className="btn btn-outline btn-sm">📞 Call Buyer</a>
                <button className="btn btn-primary btn-sm" onClick={() => setProofOrder(o)}>
                  📸 Confirm Delivery
                </button>
              </div>
            </div>
          ))
        )}

        {tab === 'available' && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Delivery requests matching your area will appear here.
            </div>
            {newRequest ? (
              <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 14, padding: 16 }}>
                <div style={{ fontWeight: 700 }}>{newRequest.productEmoji} {newRequest.productName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>From {newRequest.sellerArea} → {newRequest.area}</div>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)', marginTop: 8, fontSize: 18 }}>+{newRequest.deliveryFee} FCFA</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setNewRequest(null)}>Decline</button>
                  <button className="btn btn-primary btn-sm" onClick={handleAccept}>Accept Job ✓</button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📡</div>
                <h3>Listening for requests...</h3>
                <p>Stay online and new delivery jobs will appear here automatically.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {proofOrder && (
        <ProofModal
          order={proofOrder}
          onClose={() => setProofOrder(null)}
          onSubmit={handleProofSubmit}
        />
      )}
    </DashboardLayout>
  );
}

/* ── RIDER HISTORY ────────────────────────────────── */
export function RiderHistory() {
  const { getMyOrders } = useApp();
  const orders = getMyOrders().filter(o => o.status === 'delivered');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24 }}>📋 Delivery History</h1>
      </div>
      <div className="page-content">
        {orders.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📋</div><h3>No deliveries yet</h3></div>
        ) : orders.map(o => (
          <div key={o.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{o.productEmoji} {o.productName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>📍 {o.area} · 👤 {o.buyerName}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{new Date(o.createdAt).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>+{o.deliveryFee?.toLocaleString()} FCFA</div>
                <span className={`badge ${o.riderPaid ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: 4, display: 'block' }}>
                  {o.riderPaid ? '✅ Paid' : '⏳ Pending Payment'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ── RIDER EARNINGS ───────────────────────────────── */
export function RiderEarnings() {
  const { getMyOrders, user } = useApp();
  const orders = getMyOrders().filter(o => o.status === 'delivered');
  const paid = orders.filter(o => o.riderPaid);
  const pending = orders.filter(o => !o.riderPaid);
  const totalEarned = paid.reduce((s, o) => s + (o.deliveryFee || 500), 0);
  const pendingAmount = pending.reduce((s, o) => s + (o.deliveryFee || 500), 0);

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24 }}>💰 Earnings</h1>
      </div>
      <div className="page-content">
        <div className="stats-grid stagger-1">
          {[
            { icon: '💰', label: 'Total Earned', value: `${totalEarned.toLocaleString()} FCFA`, bg: 'rgba(0,195,123,0.1)', color: 'var(--brand-primary)' },
            { icon: '⏳', label: 'Pending Payout', value: `${pendingAmount.toLocaleString()} FCFA`, bg: 'rgba(245,158,11,0.1)', color: 'var(--warning)' },
            { icon: '🚚', label: 'Total Trips', value: orders.length, bg: 'rgba(59,130,246,0.1)', color: 'var(--info)' },
            { icon: '📅', label: 'This Month', value: `${Math.round(totalEarned * 0.4).toLocaleString()} F`, bg: 'rgba(79,70,229,0.1)', color: 'var(--brand-accent)' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card stagger-2" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div style={{ fontWeight: 800, marginBottom: 12 }}>💳 Payout Account</div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'var(--bg-input)', borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 32 }}>{user?.network === 'Orange' ? '🟠' : '🟡'}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{user?.network || 'MTN'} Mobile Money</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{user?.momoNumber || '677 111 222'}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>
              💡 Payments are sent automatically after each confirmed delivery.
            </div>
          </div>
        </div>

        <div className="stagger-3">
          <div className="section-header"><h2>Transaction History</h2></div>
          {orders.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">💸</div><h3>No earnings yet</h3></div>
          ) : orders.map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: o.riderPaid ? 'rgba(0,195,123,0.1)' : 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                {o.riderPaid ? '✅' : '⏳'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{o.productEmoji} {o.productName}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {o.area} · {new Date(o.createdAt).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand-primary)' }}>+{(o.deliveryFee || 500).toLocaleString()} FCFA</div>
                <div style={{ fontSize: 11, color: o.riderPaid ? 'var(--brand-primary)' : 'var(--warning)', fontWeight: 600 }}>
                  {o.riderPaid ? 'Paid' : 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
