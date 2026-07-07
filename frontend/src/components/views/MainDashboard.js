import React, { useState } from 'react';
import { translate } from '@/utils/translations';

export default function MainDashboard({ onAskQuestion, onActionClick, recentActivities, language = 'English' }) {
  const [promptInput, setPromptInput] = useState('');

  const quickActions = [
    { id: 'find-schemes', titleKey: 'action_find_schemes', color: 'blue', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    )},
    { id: 'file-complaint', titleKey: 'action_file_complaint', color: 'green', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )},
    { id: 'check-documents', titleKey: 'action_check_docs', color: 'purple', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )},
    { id: 'track-application', titleKey: 'action_track_app', color: 'orange', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    )},
    { id: 'emergency-services', titleKey: 'action_emergency', color: 'red', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    )}
  ];

  const recommendedSchemes = [
    {
      id: 'pm-kisan',
      title: 'PM Kisan Samman Nidhi',
      statusKey: 'status_eligible',
      statusType: 'eligible',
      descKey: 'scheme_kisan_desc',
      actionTextKey: 'btn_details',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'ayushman-bharat',
      title: 'Ayushman Bharat',
      statusKey: 'status_likely',
      statusType: 'likely',
      descKey: 'scheme_ayushman_desc',
      actionTextKey: 'btn_learn',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          <path d="M12 5v14M5 12h14"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'pm-awas',
      title: 'PM Awas Yojana',
      statusKey: 'status_check',
      statusType: 'check',
      descKey: 'scheme_awas_desc',
      actionTextKey: 'btn_check',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: 'purple'
    }
  ];

  const suggestionPills = [
    { textKey: 'pill_caste', textVal: 'I want a caste certificate' },
    { textKey: 'pill_pmkisan', textVal: 'How to apply for PM Kisan?' },
    { textKey: 'pill_road', textVal: 'My road is damaged' }
  ];

  const handleSubmitPrompt = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onAskQuestion(promptInput);
    setPromptInput('');
  };

  const handlePillClick = (textVal) => {
    onAskQuestion(textVal);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'complaint':
        return (
          <div className="activity-icon-circle success">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="activity-icon-circle info">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
        );
      case 'application':
      default:
        return (
          <div className="activity-icon-circle warning">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
        );
    }
  };

  // Safe translation mappings for custom added states in recent activities
  const getActivityTitle = (act) => {
    if (act.id === 'act-1') return translate('act_complaint_title', language);
    if (act.id === 'act-2') return translate('act_doc_title', language);
    if (act.id === 'act-3') return translate('act_app_title', language);
    return act.title;
  };

  const getActivitySubtitle = (act) => {
    if (act.id === 'act-1') return translate('act_complaint_sub', language);
    if (act.id === 'act-2') return translate('act_doc_sub', language);
    if (act.id === 'act-3') return translate('act_app_sub', language);
    return act.subtitle;
  };

  const getActivityStatus = (status) => {
    if (status === 'Resolved') return translate('act_resolved', language);
    if (status === 'Verified') return translate('act_verified', language);
    if (status === 'In Review') return translate('act_in_review', language);
    return status;
  };

  const getActivityTime = (time) => {
    if (time === 'Yesterday, 10:30 AM') return translate('time_yesterday', language);
    if (time === '2 hours ago') return translate('time_2h', language);
    if (time === '3 days ago') return translate('time_3d', language);
    return time;
  };

  return (
    <div className="main-dashboard-content">
      {/* Welcome Card & Greeting */}
      <section className="welcome-banner">
        <div className="welcome-header">
          <h1>{translate('greeting', language)}</h1>
          <p>{translate('subGreeting', language)}</p>
        </div>

        {/* Prompt Card */}
        <div className="prompt-card">
          <form onSubmit={handleSubmitPrompt} className="prompt-input-wrapper">
            <div className="prompt-sparkle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff9933" strokeWidth="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder={translate('promptPlaceholder', language)} 
              className="prompt-input"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
            />
            
            {/* Action buttons inside the prompt box */}
            <div className="prompt-left-actions">
              <button type="button" className="prompt-action-btn" aria-label="Use Microphone" onClick={() => onAskQuestion("Speak now: list schemes available for me")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                </svg>
              </button>
              <button type="button" className="prompt-action-btn" aria-label="Scan Document" onClick={() => onAskQuestion("Scan document: Aadhaar verification check")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </button>
            </div>

            <button type="submit" className="prompt-submit-btn" aria-label="Submit prompt">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </form>

          {/* Pill tags */}
          <div className="prompt-pills">
            {suggestionPills.map((pill, i) => (
              <button 
                key={i} 
                className="suggestion-pill"
                onClick={() => handlePillClick(pill.textVal)}
              >
                &ldquo;{translate(pill.textKey, language)}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h3 className="section-title">{translate('quickActionsTitle', language)}</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button 
              key={action.id} 
              className={`quick-action-card border-${action.color}`}
              onClick={() => onActionClick(action.id)}
            >
              <div className={`action-icon-wrapper bg-${action.color}`}>
                {action.icon}
              </div>
              <div className="action-info">
                <h4>{translate(action.titleKey, language)}</h4>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="action-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Schemes */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h3 className="section-title">{translate('recommendedTitle', language)}</h3>
          <button className="view-all-link" onClick={() => onActionClick('view-schemes')}>{translate('viewAll', language)}</button>
        </div>
        <div className="schemes-carousel-container">
          <div className="schemes-grid">
            {recommendedSchemes.map((scheme) => (
              <div key={scheme.id} className="scheme-card">
                <div className="scheme-card-header">
                  <div className={`scheme-icon-circle bg-${scheme.color}`}>
                    {scheme.icon}
                  </div>
                  <div className="scheme-title-block">
                    <h4>{scheme.title}</h4>
                    <span className={`scheme-badge badge-${scheme.statusType}`}>
                      {translate(scheme.statusKey, language)}
                    </span>
                  </div>
                </div>
                <div className="scheme-card-body">
                  <p>{translate(scheme.descKey, language)}</p>
                </div>
                <div className="scheme-card-footer">
                  <button 
                    className={`scheme-action-btn text-${scheme.color}`}
                    onClick={() => onActionClick(`details-${scheme.id}`)}
                  >
                    <span>{translate(scheme.actionTextKey, language)}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="action-arrow">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Next Arrow */}
          <button className="carousel-next-btn" aria-label="Next recommended items" onClick={() => onActionClick('scroll-schemes')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h3 className="section-title">{translate('recentActivityTitle', language)}</h3>
          <button className="view-all-link" onClick={() => onActionClick('view-activities')}>{translate('viewAll', language)}</button>
        </div>
        <div className="activity-list">
          {recentActivities.map((activity, i) => (
            <div key={activity.id || i} className="activity-item">
              <div className="activity-item-left">
                {getActivityIcon(activity.type)}
                <div className="activity-details">
                  <h4>{getActivityTitle(activity)}</h4>
                  <p>{getActivitySubtitle(activity)}</p>
                </div>
              </div>
              <div className="activity-item-right">
                <span className={`status-tag tag-${activity.statusType || 'default'}`}>
                  {getActivityStatus(activity.status)}
                </span>
                <span className="activity-time">{getActivityTime(activity.time)}</span>
                <button 
                  className="activity-chevron-btn" 
                  aria-label="View activity detail"
                  onClick={() => onActionClick(`activity-details-${activity.id}`)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
