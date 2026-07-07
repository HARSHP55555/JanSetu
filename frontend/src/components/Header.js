import React from 'react';
import { translate } from '@/utils/translations';

export default function Header({ 
  activeTab, 
  sidebarOpen, 
  setSidebarOpen, 
  onStartChat,
  notificationCount = 3,
  currentLanguage = 'English',
  onLanguageClick,
  onNotificationClick
}) {
  // Convert tab id to readable page title
  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return translate('tab_home', currentLanguage);
      case 'ai-assistant': return translate('tab_ai_assistant', currentLanguage);
      case 'schemes': return translate('tab_schemes', currentLanguage);
      case 'complaints': return translate('tab_complaints', currentLanguage);
      case 'documents': return translate('tab_documents', currentLanguage);
      case 'applications': return translate('tab_applications', currentLanguage);
      case 'notifications': return translate('tab_notifications', currentLanguage);
      case 'language': return translate('tab_language', currentLanguage);
      case 'help': return translate('tab_help', currentLanguage);
      case 'settings': return translate('tab_settings', currentLanguage);
      default: return translate('tab_home', currentLanguage);
    }
  };

  return (
    <header className="header">
      {/* Left items: Menu toggle & Page Title */}
      <div className="header-left">
        <button 
          className="sidebar-toggle-btn" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
        <h2 className="page-title">{getPageTitle()}</h2>
      </div>

      {/* Center item: Search bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder={translate('searchPlaceholder', currentLanguage)} 
            className="search-input"
            id="global-search"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Right items: Lang, Notification, User Profile */}
      <div className="header-right">
        {/* Language selector */}
        <div className="language-selector" onClick={onLanguageClick}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lang-globe-icon">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="lang-text">{currentLanguage === 'English' ? 'English' : currentLanguage === 'Hindi' ? 'हिन्दी' : 'ಕನ್ನಡ'}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        {/* Notifications */}
        <button className="notification-btn" aria-label="View notifications" onClick={onNotificationClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </button>

        {/* User Profile */}
        <div className="user-profile">
          <div className="profile-img-container">
            {/* Using generated profile image */}
            <img src="/assets/profile.jpg" alt="Radha Devi" className="profile-img" />
          </div>
          <span className="user-name">{translate('userName', currentLanguage)}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="profile-chevron">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
