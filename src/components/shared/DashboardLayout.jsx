import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Logo = () => (
  <div className="sidebar-logo">
    <div className="logo-mark">
      <div className="logo-icon">🛵</div>
      <div>
        <div className="logo-text">VentriDrop</div>
        <div className="logo-sub">Marketplace</div>
      </div>
    </div>
  </div>
);

const navConfig = {
  buyer: [
    { label: 'Main', items: [
      { path: '/buyer', icon: '🏠', label: 'Home' },
      { path: '/buyer/marketplace', icon: '🛍️', label: 'Marketplace' },
      { path: '/buyer/orders', icon: '📦', label: 'My Orders' },
      { path: '/buyer/messages', icon: '💬', label: 'Messages', badge: true },
    ]},
    { label: 'Account', items: [
      { path: '/buyer/notifications', icon: '🔔', label: 'Notifications', badge: true },
      { path: '/buyer/settings', icon: '⚙️', label: 'Settings' },
    ]},
  ],
  seller: [
    { label: 'Main', items: [
      { path: '/seller', icon: '🏠', label: 'Dashboard' },
      { path: '/seller/products', icon: '🏪', label: 'My Products' },
      { path: '/seller/orders', icon: '📋', label: 'Orders' },
      { path: '/seller/riders', icon: '🛵', label: 'Find Riders' },
      { path: '/seller/tracking', icon: '📍', label: 'Live Tracking' },
      { path: '/seller/messages', icon: '💬', label: 'Messages', badge: true },
    ]},
    { label: 'Account', items: [
      { path: '/seller/analytics', icon: '📊', label: 'Analytics' },
      { path: '/seller/notifications', icon: '🔔', label: 'Notifications', badge: true },
      { path: '/seller/settings', icon: '⚙️', label: 'Settings' },
    ]},
  ],
  rider: [
    { label: 'Main', items: [
      { path: '/rider', icon: '🏠', label: 'Dashboard' },
      { path: '/rider/deliveries', icon: '📦', label: 'Deliveries' },
      { path: '/rider/history', icon: '📋', label: 'History' },
      { path: '/rider/earnings', icon: '💰', label: 'Earnings' },
    ]},
    { label: 'Account', items: [
      { path: '/rider/notifications', icon: '🔔', label: 'Notifications', badge: true },
      { path: '/rider/settings', icon: '⚙️', label: 'Settings' },
    ]},
  ],
};

export default function DashboardLayout({ children }) {
  const { user, logout, unreadCount, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) { navigate('/login'); return null; }

  const sections = navConfig[user.role] || [];
  const notifCount = unreadCount();

  const handleNav = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Logo />
        <nav className="sidebar-nav">
          {sections.map(section => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map(item => (
                <button
                  key={item.path}
                  className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNav(item.path)}
                >
                  <span className="s-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && notifCount > 0 && (
                    <span className="badge-dot">{notifCount}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          {/* User profile mini */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', marginBottom: 8 }}>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: '1.2em', background: 'rgba(0,195,123,0.2)' }}>
              {user.avatar || user.name?.[0] || '👤'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.shopName || user.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
          <button className="sidebar-item" onClick={toggleTheme}>
            <span className="s-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button className="sidebar-item" onClick={handleLogout} style={{ color: 'rgba(239,68,68,0.8)' }}>
            <span className="s-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top bar */}
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: 'none' }}
              id="mobile-menu-btn"
            >☰</button>
            <style>{`@media(max-width:768px){#mobile-menu-btn{display:flex!important}}`}</style>
            <span className="topbar-title">
              {sections.flatMap(s => s.items).find(i => i.path === location.pathname)?.label || 'VentriDrop'}
            </span>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-ghost btn-icon" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="btn btn-ghost btn-icon"
              style={{ position: 'relative' }}
              onClick={() => handleNav(`/${user.role}/notifications`)}
            >
              🔔
              {notifCount > 0 && (
                <span style={{
                  position: 'absolute', top: 2, right: 2,
                  background: 'var(--danger)', color: 'white',
                  borderRadius: '50%', width: 16, height: 16,
                  fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{notifCount}</span>
              )}
            </button>
            <div
              className="avatar pointer"
              style={{ width: 36, height: 36 }}
              onClick={() => handleNav(`/${user.role}/settings`)}
              title="Settings"
            >
              {user.avatar || user.name?.[0] || '👤'}
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
