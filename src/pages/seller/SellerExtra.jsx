import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { DEMO_RIDERS, REGIONS } from '../../data/demoData';

/* ── FIND RIDERS PAGE ─────────────────────────────── */
export function SellerRiders() {
  const { riders = DEMO_RIDERS } = useApp();
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);

  const filtered = (riders || DEMO_RIDERS).filter(r => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = !filterRegion || r.region === filterRegion;
    const matchArea = !filterArea || r.areas?.includes(filterArea);
    const matchOnline = !filterOnline || r.online;
    return matchSearch && matchRegion && matchArea && matchOnline;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>🛵 Find Riders</h1>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <span>🔍</span>
            <input placeholder="Search by rider name..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="select" style={{ maxWidth: 150 }} value={filterRegion} onChange={e => { setFilterRegion(e.target.value); setFilterArea(''); }}>
            <option value="">All Regions</option>
            {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
          {filterRegion && (
            <select className="select" style={{ maxWidth: 160 }} value={filterArea} onChange={e => setFilterArea(e.target.value)}>
              <option value="">All Areas</option>
              {REGIONS[filterRegion]?.areas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'var(--bg-card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0 14px', fontSize: 13, fontWeight: 600 }}>
            <input type="checkbox" checked={filterOnline} onChange={e => setFilterOnline(e.target.checked)} style={{ accentColor: 'var(--brand-primary)' }} />
            Online only
          </label>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{filtered.length} rider{filtered.length !== 1 ? 's' : ''} found</div>
      </div>

      <div className="page-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">🏍️</div><h3>No riders found</h3><p>Try adjusting your filters.</p></div>
          ) : filtered.map(r => (
            <div key={r.id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <div className="avatar" style={{ width: 56, height: 56, fontSize: '1.8em' }}>{r.avatar}</div>
                    <div className={r.online ? 'online-dot' : 'offline-dot'} style={{ position: 'absolute', bottom: 2, right: 2 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{r.name}</div>
                      <span className={`badge ${r.online ? 'badge-success' : 'badge-muted'}`}>{r.online ? '🟢 Online' : '⚫ Offline'}</span>
                      {r.verified && <span className="badge badge-info">✓ Verified</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                      📍 {r.region?.charAt(0).toUpperCase() + r.region?.slice(1)} · {r.vehicle}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {r.areas?.map(a => (
                        <span key={a} className="chip" style={{ fontSize: 11 }}>📍 {a}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      <span className="badge badge-success">⭐ {r.rating}/5</span>
                      <span className="badge badge-muted">🚚 {r.deliveries} deliveries</span>
                      <span className="badge badge-info">{r.network} MoMo</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 120 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📞 {r.phone}</div>
                    <a href={`tel:${r.phone}`} className="btn btn-outline btn-sm">📞 Call</a>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={!r.online}
                      onClick={() => alert(`Rider ${r.name} will be notified about your delivery request.`)}
                    >
                      {r.online ? '🛵 Request' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ── LIVE TRACKING PAGE ───────────────────────────── */
export function SellerTracking() {
  const { getMyOrders } = useApp();
  const orders = getMyOrders().filter(o => o.status === 'in_transit');
  const [selected, setSelected] = useState(orders[0] || null);
  const [riderPos, setRiderPos] = useState({ x: 18, y: 55 });

  useEffect(() => {
    if (!selected) return;
    const positions = [
      { x: 18, y: 55 }, { x: 30, y: 45 }, { x: 45, y: 50 },
      { x: 58, y: 42 }, { x: 70, y: 55 }, { x: 80, y: 48 }
    ];
    let i = 0;
    const iv = setInterval(() => {
      i = (i + 1) % positions.length;
      setRiderPos(positions[i]);
    }, 2000);
    return () => clearInterval(iv);
  }, [selected]);

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24 }}>📍 Live Tracking</h1>
      </div>
      <div className="page-content">
        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📍</div>
            <h3>No active deliveries</h3>
            <p>Live tracking will appear here when orders are in transit.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Order list */}
            <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Active Deliveries ({orders.length})</div>
              {orders.map(o => (
                <div
                  key={o.id}
                  onClick={() => setSelected(o)}
                  style={{
                    padding: 14, borderRadius: 12, cursor: 'pointer',
                    border: `1.5px solid ${selected?.id === o.id ? 'var(--brand-primary)' : 'var(--border)'}`,
                    background: selected?.id === o.id ? 'rgba(0,195,123,0.06)' : 'var(--bg-card)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{o.productEmoji} {o.productName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>👤 {o.buyerName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>📍 {o.area}</div>
                  <div style={{ fontSize: 12, color: 'var(--brand-secondary)', fontWeight: 600, marginTop: 4 }}>🏍️ {o.riderName || 'Rider assigned'}</div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{ flex: 1, minWidth: 300 }}>
              {selected && (
                <>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
                    <div style={{ fontWeight: 700 }}>{selected.productEmoji} {selected.productName}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                      🏍️ {selected.riderName} → 📍 {selected.area}
                    </div>
                  </div>
                  <div className="map-container" style={{ height: 340, position: 'relative' }}>
                    {/* Map background */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #E8F5E9 0%, #C8E6C9 60%, #B2DFDB 100%)' }} />
                    {/* Roads */}
                    <div style={{ position: 'absolute', top: '44%', left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.6)', borderRadius: 5 }} />
                    <div style={{ position: 'absolute', left: '40%', top: 0, bottom: 0, width: 10, background: 'rgba(255,255,255,0.6)', borderRadius: 5 }} />
                    <div style={{ position: 'absolute', top: '65%', left: '20%', width: '60%', height: 7, background: 'rgba(255,255,255,0.4)', borderRadius: 5, transform: 'rotate(-10deg)' }} />
                    {/* Grid lines */}
                    {[20, 60, 80].map(v => (
                      <div key={v} style={{ position: 'absolute', top: `${v}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                    ))}
                    {/* Seller pin */}
                    <div style={{ position: 'absolute', left: '10%', top: '25%', fontSize: 26, zIndex: 4 }}>🏪</div>
                    <div style={{ position: 'absolute', left: '6%', top: '50%', fontSize: 10, fontWeight: 700, background: 'var(--bg-sidebar)', color: 'white', borderRadius: 6, padding: '2px 6px', zIndex: 4 }}>SELLER</div>
                    {/* Buyer pin */}
                    <div style={{ position: 'absolute', right: '12%', top: '40%', fontSize: 26, zIndex: 4 }}>🏠</div>
                    <div style={{ position: 'absolute', right: '8%', top: '58%', fontSize: 10, fontWeight: 700, background: 'var(--brand-primary)', color: 'white', borderRadius: 6, padding: '2px 6px', zIndex: 4 }}>BUYER</div>
                    {/* Rider */}
                    <div className="rider-dot" style={{ left: `${riderPos.x}%`, top: `${riderPos.y}%`, fontSize: 14 }}>🛵</div>
                    {/* Pulse ring */}
                    <div style={{
                      position: 'absolute', left: `calc(${riderPos.x}% - 12px)`, top: `calc(${riderPos.y}% - 12px)`,
                      width: 44, height: 44, borderRadius: '50%',
                      border: '2px solid var(--brand-secondary)', opacity: 0.4,
                      animation: 'pulse 2s infinite', transition: 'left 2s ease, top 2s ease', zIndex: 3
                    }} />
                    {/* Status badge */}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: 10, padding: '6px 14px', fontSize: 12, fontWeight: 600 }}>
                      🟢 {selected.riderName} is on the way
                    </div>
                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: 10, padding: '6px 14px', fontSize: 12 }}>
                      ETA ~15 min
                    </div>
                  </div>

                  {/* Rider info */}
                  <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                    <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🏍️ Rider Info</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selected.riderName}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>⭐ 4.8 · 234 deliveries</div>
                    </div>
                    <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📦 Delivery</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selected.area}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.address}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

/* ── ANALYTICS PAGE ───────────────────────────────── */
export function SellerAnalytics() {
  const { getMyOrders, sellerProducts } = useApp();
  const orders = getMyOrders();
  const revenue = orders.filter(o => o.paid).reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? Math.round(revenue / orders.length) : 0;

  const byStatus = {
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    in_transit: orders.filter(o => o.status === 'in_transit').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  const topProducts = sellerProducts
    .sort((a, b) => (b.orders || 0) - (a.orders || 0))
    .slice(0, 5);

  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const mockRevenue = [45000, 78000, 52000, 91000, 64000, revenue];

  const maxRev = Math.max(...mockRevenue);

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24 }}>📊 Analytics</h1>
      </div>
      <div className="page-content">
        {/* KPIs */}
        <div className="stats-grid stagger-1">
          {[
            { icon: '💰', label: 'Total Revenue', value: `${revenue.toLocaleString()} FCFA`, color: 'var(--brand-primary)', bg: 'rgba(0,195,123,0.1)' },
            { icon: '📦', label: 'Total Orders', value: orders.length, color: 'var(--info)', bg: 'rgba(59,130,246,0.1)' },
            { icon: '📈', label: 'Avg Order Value', value: `${avgOrder.toLocaleString()} F`, color: 'var(--brand-secondary)', bg: 'rgba(255,107,53,0.1)' },
            { icon: '✅', label: 'Delivery Rate', value: orders.length ? `${Math.round(byStatus.delivered / orders.length * 100)}%` : '0%', color: 'var(--brand-primary)', bg: 'rgba(0,195,123,0.1)' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <div className="stat-value" style={{ fontSize: 22 }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="card stagger-2" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20 }}>📈 Revenue (Last 6 months)</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 160 }}>
              {months.map((m, i) => (
                <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                    {mockRevenue[i] >= 1000 ? `${Math.round(mockRevenue[i]/1000)}k` : mockRevenue[i]}
                  </div>
                  <div style={{
                    width: '100%', background: `linear-gradient(to top, var(--brand-primary), rgba(0,195,123,0.4))`,
                    height: `${(mockRevenue[i] / maxRev) * 130}px`,
                    borderRadius: '6px 6px 0 0', minHeight: 4, transition: 'height 0.6s ease',
                    opacity: i === months.length - 1 ? 1 : 0.6
                  }} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-2 stagger-3">
          {/* Order status */}
          <div className="card">
            <div className="card-body">
              <div style={{ fontWeight: 800, marginBottom: 16 }}>📋 Order Status</div>
              {Object.entries(byStatus).map(([s, count]) => (
                <div key={s} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{s.replace('_', ' ')}</span>
                    <span style={{ fontWeight: 700 }}>{count}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${orders.length ? (count / orders.length) * 100 : 0}%`,
                      background: s === 'delivered' ? 'var(--brand-primary)' : s === 'in_transit' ? 'var(--brand-secondary)' : s === 'confirmed' ? 'var(--info)' : 'var(--warning)',
                      borderRadius: 3, transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <div className="card-body">
              <div style={{ fontWeight: 800, marginBottom: 16 }}>🏆 Top Products</div>
              {topProducts.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No products yet</div>
              ) : topProducts.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: i === 0 ? 'var(--brand-gold)' : 'var(--text-muted)', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 20 }}>{p.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.orders || 0} orders</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--brand-primary)', fontSize: 13 }}>{p.price.toLocaleString()} F</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
