import React from 'react';

export default function NotificationsView({ notificationsList, onClearNotifications }) {
  return (
    <div className="form-view-container" style={{ maxWidth: '700px' }}>
      <div className="form-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px' }}>
        <div>
          <h3>Notification Inbox</h3>
          <p>Important welfare reminders, verification alerts, and district announcements.</p>
        </div>
        {notificationsList.length > 0 && (
          <button 
            className="btn-secondary" 
            onClick={onClearNotifications}
            style={{ padding: '8px 14px', fontSize: '12px', color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
          >
            Clear All
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
        {notificationsList.map((notif) => (
          <div 
            key={notif.id} 
            style={{ 
              display: 'flex', 
              gap: '14px', 
              padding: '16px', 
              border: '1px solid var(--border-light)', 
              borderRadius: '12px',
              backgroundColor: '#ffffff'
            }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: notif.type === 'alert' ? 'var(--saffron-light)' : 'var(--primary-light)', 
              color: notif.type === 'alert' ? 'var(--saffron)' : 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {notif.type === 'alert' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{notif.title}</h4>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{notif.time}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{notif.message}</p>
            </div>
          </div>
        ))}

        {notificationsList.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '32px' }}>📭</span>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginTop: '12px' }}>Your Inbox is Empty</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>You will receive alerts here when updates occur.</p>
          </div>
        )}
      </div>
    </div>
  );
}
