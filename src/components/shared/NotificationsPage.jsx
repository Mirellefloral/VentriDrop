import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from './DashboardLayout';

export default function NotificationsPage() {
  const { user, getMyNotifications, markNotificationRead } = useApp();
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const notifications = getMyNotifications();
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const handleClick = (id) => {
    markNotificationRead(user?.role, id);
    setExpanded(expanded === id ? null : id);
  };

  const typeColors = {
    order: 'info', delivery: 'success', rider: 'orange', payment: 'success',
    message: 'muted', review: 'warning', job: 'orange', system: 'muted', rating: 'warning'
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontSize: 24 }}>🔔 Notifications</h1>
          <span className="badge badge-danger">{notifications.filter(n => !n.read).length} unread</span>
        </div>
        <div className="tabs">
          <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`tab-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</button>
        </div>
      </div>

      <div className="page-content">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          filtered.map(n => (
            <div
              key={n.id}
              className={`notif-item ${!n.read ? 'unread' : ''} fade-in`}
              onClick={() => handleClick(n.id)}
            >
              <div className="notif-header">
                <div>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-summary">{n.summary}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <div className="notif-time">{n.time}</div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-primary)' }} />}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{expanded === n.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === n.id && (
                <div className="notif-body">
                  {n.body}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
