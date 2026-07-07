import React, { useState } from 'react';

export default function SettingsView() {
  const [profile, setProfile] = useState({
    name: 'Radha Devi',
    email: 'radha.devi@email.com',
    phone: '+91 98765 43210',
    district: 'Bangalore Urban',
    state: 'Karnataka'
  });

  const [toggles, setToggles] = useState({
    smsAlerts: true,
    emailAlerts: false,
    dbtAlerts: true,
    highContrast: false
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile settings successfully updated.");
  };

  const handleToggle = (key) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="subpage-grid-2col">
      {/* Left Column: Profile Form */}
      <div className="form-view-container">
        <div className="form-header-row">
          <h3>Profile Settings</h3>
          <p>Update your personal info, locality addresses, and email alerts contacts.</p>
        </div>

        <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required 
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input 
                type="text" 
                className="form-input" 
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required 
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">District Locality</label>
              <input 
                type="text" 
                className="form-input" 
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input 
                type="text" 
                className="form-input" 
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                required 
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Alerts & Preferences Toggles */}
      <div className="form-view-container">
        <div className="form-header-row">
          <h3>Preferences</h3>
          <p>Control notifications, Direct Benefit Transfer alerts, and system display adjustments.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SMS Alerts toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>SMS Alerts</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive application updates via mobile SMS</p>
            </div>
            <button 
              onClick={() => handleToggle('smsAlerts')}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '30px',
                backgroundColor: toggles.smsAlerts ? 'var(--green)' : 'var(--border-light)',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: '3px',
                left: toggles.smsAlerts ? '21px' : '3px',
                transition: 'left 0.2s ease'
              }}></div>
            </button>
          </div>

          {/* Email alerts */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Email Notifications</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Receive weekly digest of new eligible schemes</p>
            </div>
            <button 
              onClick={() => handleToggle('emailAlerts')}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '30px',
                backgroundColor: toggles.emailAlerts ? 'var(--green)' : 'var(--border-light)',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: '3px',
                left: toggles.emailAlerts ? '21px' : '3px',
                transition: 'left 0.2s ease'
              }}></div>
            </button>
          </div>

          {/* DBT verification alert */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>DBT Payout Reminders</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Get instant notifications when scheme cash is disbursed</p>
            </div>
            <button 
              onClick={() => handleToggle('dbtAlerts')}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '30px',
                backgroundColor: toggles.dbtAlerts ? 'var(--green)' : 'var(--border-light)',
                position: 'relative',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: '3px',
                left: toggles.dbtAlerts ? '21px' : '3px',
                transition: 'left 0.2s ease'
              }}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
