import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from './DashboardLayout';
import { REGIONS } from '../../data/demoData';

export default function SettingsPage() {
  const { user, updateUser, theme, toggleTheme, logout, deleteProduct, sellerProducts, riders } = useApp();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const fileRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('avatarUrl', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleChangePassword = () => {
    if (!pwForm.current) { setPwError('Enter current password'); return; }
    if (pwForm.newPw.length < 6) { setPwError('New password min 6 chars'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match'); return; }
    setPwError('');
    setPwForm({ current: '', newPw: '', confirm: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 style={{ fontSize: 24 }}>⚙️ Settings</h1>
      </div>
      <div className="page-content">
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Tab Nav */}
          <div style={{ width: 200, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['profile', '👤 Profile'],
                ['security', '🔒 Security'],
                ['appearance', '🎨 Appearance'],
                ...(user?.role === 'seller' ? [['products', '🏪 Products']] : []),
                ...(user?.role === 'seller' ? [['riders', '🏍️ Blocked Riders']] : []),
                ...(user?.role === 'rider' ? [['payout', '💰 Payout Info']] : []),
                ['danger', '⚠️ Danger Zone'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  style={{
                    textAlign: 'left', padding: '10px 14px', borderRadius: 10,
                    border: 'none', cursor: 'pointer',
                    background: tab === key ? 'rgba(0,195,123,0.12)' : 'transparent',
                    color: tab === key ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: tab === key ? 700 : 500,
                    fontSize: 14, transition: 'var(--transition)'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, maxWidth: 560 }}>
            {saved && (
              <div style={{ background: 'rgba(0,195,123,0.12)', border: '1px solid rgba(0,195,123,0.3)', borderRadius: 10, padding: '10px 16px', marginBottom: 16, color: 'var(--brand-primary)', fontWeight: 600, fontSize: 13 }}>
                ✅ Changes saved successfully!
              </div>
            )}

            {tab === 'profile' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 20 }}>Profile Information</h3>
                  {/* Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <div
                      className="avatar pointer"
                      style={{ width: 72, height: 72, fontSize: '2em', border: '3px solid var(--border)', overflow: 'hidden' }}
                      onClick={() => fileRef.current?.click()}
                    >
                      {form.avatarUrl ? <img src={form.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} alt="avatar" /> : (form.avatar || form.name?.[0] || '👤')}
                    </div>
                    <div>
                      <button className="btn btn-outline btn-sm" onClick={() => fileRef.current?.click()}>📷 Upload Photo</button>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>JPG, PNG up to 2MB</div>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {user?.role === 'seller' && (
                      <div className="input-group">
                        <label>Shop Name</label>
                        <input className="input" value={form.shopName || ''} onChange={e => set('shopName', e.target.value)} />
                      </div>
                    )}
                    <div className="input-group">
                      <label>Full Name</label>
                      <input className="input" value={form.name || ''} onChange={e => set('name', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Email</label>
                      <input className="input" type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Phone</label>
                      <input className="input" value={form.phone || ''} onChange={e => set('phone', e.target.value)} />
                    </div>
                    {user?.role === 'buyer' && (
                      <div className="input-group">
                        <label>Default Address</label>
                        <input className="input" value={form.address || ''} onChange={e => set('address', e.target.value)} />
                      </div>
                    )}
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Region</label>
                        <select className="select" value={form.region || ''} onChange={e => { set('region', e.target.value); set('area', ''); }}>
                          <option value="">Select</option>
                          {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                        </select>
                      </div>
                      <div className="input-group">
                        <label>Area</label>
                        <select className="select" value={form.area || ''} onChange={e => set('area', e.target.value)}>
                          <option value="">Select</option>
                          {form.region && REGIONS[form.region]?.areas.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'security' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 20 }}>Change Password</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="input-group">
                      <label>Current Password</label>
                      <input className="input" type="password" value={pwForm.current} onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))} />
                    </div>
                    <div className="input-group">
                      <label>New Password</label>
                      <input className="input" type="password" value={pwForm.newPw} onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))} />
                    </div>
                    <div className="input-group">
                      <label>Confirm Password</label>
                      <input className="input" type="password" value={pwForm.confirm} onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))} />
                    </div>
                    {pwError && <div style={{ color: 'var(--danger)', fontSize: 13 }}>❌ {pwError}</div>}
                    <button className="btn btn-primary" onClick={handleChangePassword}>Update Password</button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'appearance' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 20 }}>Appearance</h3>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['light', 'dark'].map(t => (
                      <button
                        key={t}
                        onClick={() => theme !== t && toggleTheme()}
                        style={{
                          flex: 1, padding: '16px', borderRadius: 12,
                          border: `2px solid ${theme === t ? 'var(--brand-primary)' : 'var(--border)'}`,
                          background: theme === t ? 'rgba(0,195,123,0.08)' : 'var(--bg-input)',
                          cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif'
                        }}
                      >
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{t === 'light' ? '☀️' : '🌙'}</div>
                        <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{t} Mode</div>
                        {theme === t && <div style={{ color: 'var(--brand-primary)', fontSize: 12, marginTop: 4 }}>Active ✓</div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'products' && user?.role === 'seller' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 16 }}>Manage Products ({sellerProducts.length})</h3>
                  {sellerProducts.length === 0 ? (
                    <div className="empty-state"><div className="empty-icon">🏪</div><h3>No products</h3></div>
                  ) : sellerProducts.map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 28 }}>{p.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                        <div style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: 13 }}>{p.price.toLocaleString()} FCFA</div>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'riders' && user?.role === 'seller' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 16 }}>Blocked Riders</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
                    No riders have been blocked yet. You can block riders from the Find Riders page if they have issues.
                  </div>
                </div>
              </div>
            )}

            {tab === 'payout' && user?.role === 'rider' && (
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: 20 }}>Payout Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="input-group">
                      <label>MoMo Number</label>
                      <input className="input" value={form.momoNumber || ''} onChange={e => set('momoNumber', e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>Mobile Network</label>
                      <select className="select" value={form.network || 'MTN'} onChange={e => set('network', e.target.value)}>
                        <option>MTN</option>
                        <option>Orange</option>
                      </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>Update Payout Info</button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'danger' && (
              <div className="card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                <div className="card-body">
                  <h3 style={{ color: 'var(--danger)', marginBottom: 16 }}>⚠️ Danger Zone</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ padding: 16, background: 'rgba(239,68,68,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>Sign Out</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sign out from this device</div>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={logout}>Sign Out</button>
                    </div>
                    <div style={{ padding: 16, background: 'rgba(239,68,68,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>Delete Account</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Permanently delete your account</div>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => alert('Contact support to delete account')}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
