import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Package, Truck, Star, ArrowRight, CheckCircle, Zap, Shield, MapPin, ChevronRight } from 'lucide-react';

const FEATURES = [
  { icon: '🏪', title: 'Open Your Shop', desc: 'List products, manage orders, and grow your business online — all in one place.', color: 'var(--green)' },
  { icon: '🛍️', title: 'Shop with Confidence', desc: 'Browse verified sellers, pay securely via Mobile Money, and track every order live.', color: '#3b82f6' },
  { icon: '🏍️', title: 'Earn as a Rider', desc: 'Accept nearby deliveries, navigate with maps, and get paid instantly to your MoMo wallet.', color: '#f59e0b' },
  { icon: '📍', title: 'Douala · Yaoundé · Buea', desc: 'Serving Cameroon\'s three major cities with hyper-local delivery in every neighbourhood.', color: '#e63946' },
];

const STATS = [
  { value: '500+', label: 'Verified Sellers' },
  { value: '12K+', label: 'Happy Buyers' },
  { value: '2.4K+', label: 'Deliveries Done' },
  { value: '4.8⭐', label: 'Average Rating' },
];

const HOW = [
  { emoji: '🛒', num: '01', title: 'Browse & Order', desc: 'Find products from local sellers, add to cart, and place your order in seconds.' },
  { emoji: '💳', num: '02', title: 'Pay via MoMo', desc: 'Pay securely with MTN MoMo or Orange Money — no cash needed at your door.' },
  { emoji: '🏍️', num: '03', title: 'Rider Picks Up', desc: 'A verified rider is assigned and collects the package from the seller.' },
  { emoji: '📦', num: '04', title: 'Track & Receive', desc: 'Watch your delivery in real time. Confirm with a 4-digit code when it arrives.' },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-alt)', fontFamily: 'var(--font-body)' }}>

      {/* Sticky Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scroll > 40 ? 'rgba(222, 226, 231, 0.92)' : 'transparent',
        backdropFilter: scroll > 40 ? 'blur(14px)' : 'none',
        borderBottom: scroll > 40 ? '1px solid var(--border)' : 'none',
        padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#0e7a45,#12a05a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚀</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: scroll > 40 ? 'var(--ink)' : 'white' }}>
            Ventri<span style={{ color: 'rgba(237, 194, 64, 0.82)' }}>Drop</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link to="/login" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: scroll > 40 ? 'var(--ink)' : 'white', border: `1.5px solid ${scroll > 40 ? 'var(--border)' : 'rgba(255,255,255,0.35)'}` }}>
            Sign In
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            Get Started <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(150deg, #0c1118 0%, #0b3d24 55%, #1a5c38 100%)',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        position: 'relative', overflow: 'hidden', minHeight: 560,
      }}>
        {/* Decorative blobs */}
        {[['-80px','-80px','400px','rgba(14,122,69,0.15)'],['auto','-60px','300px','rgba(244,168,28,0.08)'],['auto','-80px','350px','rgba(14,122,69,0.1)']].map(([t,l,s,c], i) => (
          <div key={i} style={{ position: 'absolute', top: t, left: l, right: i===1?'-60px':undefined, bottom: i===2?'-80px':undefined, width: s, height: s, background: c, borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none' }} />
        ))}

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 99, background: 'rgba(14,122,69,0.3)', border: '1px solid rgba(14,122,69,0.5)', marginBottom: 28 }}>
          <Zap size={13} color="var(--gold)" />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}>🛒 Now serving Douala · Yaoundé · Buea</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,7vw,72px)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: 22, maxWidth: 800, letterSpacing: '-1px' }}>
          Cameroon's Marketplace,{' '}
          <span style={{ background: 'linear-gradient(90deg,#f4a81c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Delivered.
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px,2vw,19px)', maxWidth: 580, lineHeight: 1.7, marginBottom: 40 }}>
          The all-in-one platform for sellers to grow, buyers to shop, and riders to earn — with real-time tracking, Mobile Money payments, and Proof of Delivery.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg" style={{ fontSize: 16, gap: 10 }}>
            Start for Free <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/login?demo=buyer')} style={{ padding: '14px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', backdropFilter: 'blur(8px)' }}>
            Sign-in
          </button>
        </div>

        {/* Mock phone UI */}
        <div style={{ position: 'relative', maxWidth: 320, width: '100%', margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.12)', padding: 20, backdropFilter: 'blur(20px)', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 14, padding: '14px', marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>📍 Bonamoussadi, Douala</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[['👗','Ankara Dress','15,000'],['📿','Beaded Set','8,500'],['👜','Leather Bag','25,000'],['👠','Platform Heels','18,000']].map(([e,n,p]) => (
                  <div key={n} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 24 }}>{e}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.2 }}>{n}</div>
                    <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, marginTop: 4 }}>{p} F</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(14,122,69,0.3)', borderRadius: 10 }}>
              <span style={{ fontSize: 16 }}>🏍️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>Jonas Fomba · En route</div>
                <div style={{ fontSize: 10, color: 'var(--gold)' }}>ETA: 18 minutes ⭐ 4.9</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s infinite' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--green)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 20, textAlign: 'center' }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'white' }}>{value}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,40px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900, color: 'var(--ink)' }}>
            One platform. <span style={{ color: 'var(--green)' }}>Three roles.</span> Infinite possibilities.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            Whether you're selling, buying, or delivering — VentriDrop has everything you need.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '28px 24px', border: '1.5px solid var(--border)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'var(--surface)', padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,40px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,38px)', fontWeight: 900, color: 'var(--ink)' }}>How it works</h2>
            <p style={{ color: 'var(--muted)', marginTop: 10 }}>From order to doorstep in 4 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 24, position: 'relative' }}>
            {HOW.map((step, i) => (
              <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg,var(--green),#12a05a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', boxShadow: '0 6px 20px rgba(14,122,69,0.25)' }}>
                  {step.emoji}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--green)', letterSpacing: 2, marginBottom: 6 }}>{step.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg,#0c1118,#0b3d24)',
        padding: 'clamp(50px,8vw,80px) clamp(20px,5vw,60px)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(14,122,69,0.3)', border: '1px solid rgba(14,122,69,0.4)', marginBottom: 24 }}>
          <Shield size={13} color="var(--gold)" />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600 }}>Secure · Trusted · Local</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: 'white', marginBottom: 16 }}>
          Ready to grow your business?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
          Join hundreds of Cameroonian sellers, buyers, and riders already using VentriDrop every day.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg" style={{ gap: 10, fontSize: 16 }}>
            Create Free Account <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate('/login')} style={{ padding: '14px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            Sign In
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0c1118', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>© 2026 VentriDrop · Made with ❤️ for Ventrix</span>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>Douala · Yaoundé · Buea</span>
      </div>
    </div>
  );
}









