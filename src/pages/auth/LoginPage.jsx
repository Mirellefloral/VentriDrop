import { ArrowLeft, ArrowRight, Eye, EyeOff, Package, ShoppingBag, Truck } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const signedUp = location.state?.signedUp;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(`/${result.user.role}`);
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(180deg, #08121b 0%, #0f172a 58%, #111827 100%)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 20,
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.16) 0%, transparent 24%), radial-gradient(circle at 80% 25%, rgba(251,191,36,0.12) 0%, transparent 20%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute', top: 140, left: 40, width: 220, height: 220,
        background: 'rgba(255,255,255,0.04)', borderRadius: '50%', filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div className="fade-in" style={{
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 30,
        padding: 40, width: '100%', maxWidth: 460,
        boxShadow: '0 40px 90px rgba(0,0,0,0.45)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #10b981, #22c55e)', borderRadius: 18, display: 'grid', placeItems: 'center', color: 'white', fontSize: 24, boxShadow: '0 12px 30px rgba(16,185,129,0.25)' }}>🚀</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 24, color: 'white' }}>VentriDrop</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>Sign in to continue</div>
          </div>
        </div>

        {signedUp && (
          <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.24)', borderRadius: 16, padding: '14px 16px', color: 'white', marginBottom: 20 }}>
            <div style={{ fontWeight: 700 }}>Account created successfully.</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Please login with your new credentials.</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: 16 }}>
            <label style={{ color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 8 }}>Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: 'white', borderRadius: 16, padding: '14px 16px' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: 8 }}>
            <label style={{ color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', color: 'white', borderRadius: 16, padding: '14px 48px 14px 16px' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 12, width: 34, height: 34, display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.72)' }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.16)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: 16, padding: '12px 14px', color: '#fecaca', fontSize: 14, marginBottom: 16 }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 10, borderRadius: 16, padding: '14px 0', fontSize: 15, fontWeight: 700, transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(16,185,129,0.24)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <ArrowRight size={16} style={{ marginLeft: 10, verticalAlign: 'middle' }} />}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, flexWrap: 'wrap', gap: 12 }}>
          <button
            onClick={() => navigate('/signup')}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.14)', color: 'white', borderRadius: 14, padding: '12px 18px', cursor: 'pointer', fontWeight: 700, transition: 'transform 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            Create account
          </button>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, cursor: 'pointer' }}
          >
            <ArrowLeft size={14} style={{ verticalAlign: 'middle' }} /> Back to home
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 32 }}>
          {[
            { icon: ShoppingBag, label: 'Buyer' },
            { icon: Package, label: 'Seller' },
            { icon: Truck, label: 'Rider' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: 14, display: 'grid', placeItems: 'center', gap: 8 }}>
              <item.icon size={20} color="white" />
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
