import React, { useState } from 'react';

export default function LanguageView({ currentLanguage, onLanguageChange }) {
  const [selectedLang, setSelectedLang] = useState(currentLanguage);

  const languagesList = [
    { code: 'English', label: 'English', native: 'English' },
    { code: 'Hindi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'Tamil', label: 'Tamil', native: 'தமிழ்' },
    { code: 'Telugu', label: 'Telugu', native: 'తెలుగు' },
    { code: 'Marathi', label: 'Marathi', native: 'मराठी' },
    { code: 'Bengali', label: 'Bengali', native: 'বাংলা' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    onLanguageChange(selectedLang);
    alert(`Language preferences updated to ${selectedLang}.`);
  };

  return (
    <div className="form-view-container" style={{ maxWidth: '600px' }}>
      <div className="form-header-row">
        <h3>Language Preferences</h3>
        <p>Choose your preferred language for government communications and assistant support.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {languagesList.map(lang => (
            <label 
              key={lang.code} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px 16px',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: selectedLang === lang.code ? 'var(--primary-light)' : 'transparent',
                borderColor: selectedLang === lang.code ? 'var(--info-border)' : 'var(--border-light)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="radio" 
                  name="language" 
                  value={lang.code}
                  checked={selectedLang === lang.code}
                  onChange={() => setSelectedLang(lang.code)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{lang.label}</span>
              </div>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>{lang.native}</span>
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
