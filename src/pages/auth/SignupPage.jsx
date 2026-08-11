import { ArrowLeft, ArrowRight, Package, ShoppingBag, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { REGIONS } from '../../data/demoData';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    role: '', name: '', email: '', password: '', phone: '',
    region: '', area: '', shopName: '', momoNumber: '', network: 'MTN'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = signup(form);
    setLoading(false);
    if (result.success) {
      navigate('/login', { state: { signedUp: true } });
    }
  };

  const roles = [
    { value: 'buyer', icon: ShoppingBag, title: 'Buyer', desc: 'Browse and order products' },
    { value: 'seller', icon: Package, title: 'Seller', desc: 'List and sell your products' },
    { value: 'rider', icon: Truck, title: 'Rider', desc: 'Deliver and earn money' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(180deg, #08121b 0%, #0f172a 58%, #111827 100%)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 20,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 25%, rgba(16,185,129,0.14) 0%, transparent 24%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.1) 0%, transparent 18%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 120, right: 40, width: 220, height: 220, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(72px)', pointerEvents: 'none' }} />

      <div className="fade-in" style={{
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 30,
        padding: 40, width: '100%', maxWidth: 520,
        boxShadow: '0 40px 90px rgba(0,0,0,0.45)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #10b981, #22c55e)', borderRadius: 18, display: 'grid', placeItems: 'center', color: 'white', fontSize: 24, boxShadow: '0 12px 28px rgba(16,185,129,0.24)' }}>🚀</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 24, color: 'white' }}>Create your account</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Choose your role and join VentriDrop.</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 30, justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ flex: 1, height: 6, borderRadius: 999, background: s <= step ? '#10b981' : 'rgba(255,255,255,0.12)' }} />
          ))}
        </div>

        {step === 1 ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {roles.map(role => (
              <button
                key={role.value}
                type="button"
                onClick={() => { set('role', role.value); setStep(2); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: form.role === role.value ? 'rgba(16,185,129,0.16)' : 'rgba(255,255,255,0.06)',
                  border: `1.5px solid ${form.role === role.value ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 20, padding: '18px 20px', cursor: 'pointer', color: 'white', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 45px rgba(16,185,129,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <role.icon size={28} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{role.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{role.desc}</div>
                </div>
                <ArrowRight size={18} color={form.role === role.value ? '#10b981' : 'rgba(255,255,255,0.35)'} />
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 14 }}>
              {form.role === 'seller' && (
                <div className="input-group">
                  <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Shop Name</label>
                  <input className="input" placeholder="e.g. Grace's Store" value={form.shopName} onChange={e => set('shopName', e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
                </div>
              )}
              <div className="input-group">
                <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Full Name</label>
                <input className="input" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
              </div>
              <div className="input-group">
                <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Email</label>
                <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
              </div>
              <div className="input-group">
                <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Password</label>
                <input className="input" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
              </div>
              <div className="input-group">
                <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Phone Number</label>
                <input className="input" type="tel" placeholder="6XX XXX XXX" value={form.phone} onChange={e => set('phone', e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                <div className="input-group">
                  <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Region</label>
                  <select className="select" value={form.region} onChange={e => { set('region', e.target.value); set('area', ''); }} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: form.region ? 'white' : 'rgba(255,255,255,0.45)', borderRadius: 16, padding: '14px 16px' }}>
                    <option value="">Select</option>
                    {Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Area</label>
                  <select className="select" value={form.area} onChange={e => set('area', e.target.value)} required disabled={!form.region} style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: form.area ? 'white' : 'rgba(255,255,255,0.45)', borderRadius: 16, padding: '14px 16px' }}>
                    <option value="">Select</option>
                    {form.region && REGIONS[form.region]?.areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {form.role === 'rider' && (
                <>
                  <div className="input-group">
                    <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>MoMo Number</label>
                    <input className="input" placeholder="6XX XXX XXX" value={form.momoNumber} onChange={e => set('momoNumber', e.target.value)} required style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }} />
                  </div>
                  <div className="input-group">
                    <label style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 8, display: 'block' }}>Network</label>
                    <select className="select" value={form.network} onChange={e => set('network', e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px' }}>
                      <option>MTN</option>
                      <option>Orange</option>
                    </select>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '14px 16px', cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <ArrowLeft size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Back
                </button>
                <button type="submit" disabled={loading} style={{ flex: 2, background: '#10b981', border: 'none', color: 'white', borderRadius: 16, padding: '14px 16px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  {loading ? 'Creating account…' : 'Create Account'} {!loading && <ArrowRight size={16} style={{ marginLeft: 8 }} />}
                </button>
              </div>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, flexWrap: 'wrap', gap: 12 }}>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 16, padding: '12px 18px', cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            Already have an account?
          </button>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
