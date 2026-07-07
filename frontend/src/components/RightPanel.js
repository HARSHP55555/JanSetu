import React from 'react';

export default function RightPanel({ onActionClick, tasks, toggleTaskCompleted, alerts }) {
  return (
    <aside className="right-panel">
      {/* AI Suggestions Section */}
      <section className="right-section bg-gradient-suggestions">
        <div className="right-section-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" className="sparkle-heading-icon">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
          <h3>AI Suggestions</h3>
        </div>

        <div className="suggestion-cards-container">
          {/* Solar Rooftop Card */}
          <div className="suggestion-card">
            <div className="suggestion-card-content">
              <p>You may be eligible for <strong>Solar Rooftop Subsidy</strong></p>
              <button className="suggestion-card-link" onClick={() => onActionClick('solar-rooftop')}>
                <span>Check Now</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <div className="suggestion-card-image-box">
              <img src="/assets/solar_panel.jpg" alt="Solar Rooftop Illustration" className="suggestion-img" />
            </div>
          </div>

          {/* Water Connection Card */}
          <div className="suggestion-card">
            <div className="suggestion-card-content">
              <p>Apply for <strong>Water Connection</strong> in your area</p>
              <button className="suggestion-card-link" onClick={() => onActionClick('water-connection')}>
                <span>Learn More</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <div className="suggestion-card-image-box">
              <img src="/assets/water_tap.jpg" alt="Water Tap Illustration" className="suggestion-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Pending Tasks Section */}
      <section className="right-section border-top-gray">
        <div className="right-section-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          <h3>Pending Tasks</h3>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
              <button 
                className={`task-checkbox-btn ${task.id}`} 
                onClick={() => toggleTaskCompleted(task.id)}
                aria-label={`Mark ${task.title} as complete`}
              >
                <div className={`checkbox-circle ${task.status}`}>
                  {task.status === 'completed' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </button>
              <div className="task-content">
                <h4>{task.title}</h4>
                <p>{task.subtitle}</p>
              </div>
              <button 
                className="task-arrow-btn" 
                onClick={() => onActionClick(task.id)}
                aria-label="View task details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Government Alerts Section */}
      <section className="right-section border-top-gray">
        <div className="right-section-header-row">
          <div className="right-section-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <h3>Government Alerts</h3>
          </div>
          <button className="view-all-link text-xs" onClick={() => onActionClick('view-alerts')}>View All</button>
        </div>

        <div className="alert-list">
          {alerts.map((alert) => (
            <div key={alert.id} className="alert-item">
              <div className="alert-item-left">
                {alert.type === 'weather' ? (
                  <div className="alert-icon-circle blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 15.25"/>
                      <path d="M8 16v6M12 16v6M16 16v6"/>
                    </svg>
                  </div>
                ) : (
                  <div className="alert-icon-circle orange">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                )}
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.details}</p>
                </div>
              </div>
              <span className="alert-time">{alert.time}</span>
            </div>
          ))}
        </div>

        <button className="btn-all-alerts" onClick={() => onActionClick('view-alerts')}>
          <span>View All Alerts</span>
        </button>
      </section>
    </aside>
  );
}
