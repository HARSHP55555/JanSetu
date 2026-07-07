import React, { useState } from 'react';

export default function SchemesView({ onApplyScheme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // Application Form state
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Radha Devi',
    gender: 'Female',
    age: '32',
    income: '48000',
    aadhaarNumber: 'XXXX-XXXX-4567',
    bankAccount: '',
    ifscCode: '',
    landRegistryNo: ''
  });

  const schemes = [
    {
      id: 'pm-kisan',
      title: 'PM Kisan Samman Nidhi',
      category: 'Agriculture',
      status: 'You are eligible',
      statusType: 'eligible',
      benefit: 'Get up to ₹6,000 annually',
      desc: 'PM Kisan provides ₹6,000/- per year in three equal installments of ₹2,000 directly to small and marginal farmer families\' bank accounts.',
      documents: ['Aadhaar Card', 'Land Registry Copy', 'Bank Passbook'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: 'green'
    },
    {
      id: 'ayushman-bharat',
      title: 'Ayushman Bharat (PM-JAY)',
      category: 'Healthcare',
      status: 'Likely Eligible',
      statusType: 'likely',
      benefit: 'Free health insurance up to ₹5 lakh',
      desc: 'Provides cashless secondary and tertiary hospitalization cover up to ₹5 Lakh per family per year to eligible poor and vulnerable families.',
      documents: ['Aadhaar Card', 'Ration Card (NFSA)', 'Income Certificate'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          <path d="M12 5v14M5 12h14"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'pm-awas',
      title: 'PM Awas Yojana (PMAY-G)',
      category: 'Housing',
      status: 'Check Eligibility',
      statusType: 'check',
      benefit: 'Get assistance for your dream home',
      desc: 'Provides financial assistance up to ₹1.2 Lakh in plains and ₹1.3 Lakh in hilly areas to build a pucca house with basic amenities.',
      documents: ['Aadhaar Card', 'Ration Card', 'Bank Passbook', 'Affidavit of No Pucca House'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      color: 'purple'
    }
  ];

  const handleApplyClick = (scheme) => {
    setSelectedScheme(scheme);
    setFormStep(1);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onApplyScheme({
      schemeId: selectedScheme.id,
      schemeTitle: selectedScheme.title,
      category: selectedScheme.category,
      applicantName: formData.fullName,
      submittedAt: new Date().toLocaleDateString(),
      details: formData
    });
    setSelectedScheme(null);
  };

  const categories = ['All', 'Agriculture', 'Healthcare', 'Housing'];

  const filteredSchemes = schemes.filter(s => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesQuery = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="form-view-container">
      <div className="form-header-row">
        <h3>Government Schemes Browser</h3>
        <p>Explore central and state welfare benefits you qualify for and apply instantly.</p>
      </div>

      {/* Filter and Search controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', width: '260px' }}>
          <input
            type="text"
            placeholder="Search schemes..."
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '32px' }}
          />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" style={{ position: 'absolute', left: '10px', top: '14px' }}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="schemes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '12px' }}>
        {filteredSchemes.map(scheme => (
          <div key={scheme.id} className="scheme-card" style={{ height: '100%' }}>
            <div className="scheme-card-header">
              <div className={`scheme-icon-circle bg-${scheme.color}`}>
                {scheme.icon}
              </div>
              <div className="scheme-title-block">
                <h4>{scheme.title}</h4>
                <span className={`scheme-badge badge-${scheme.statusType}`}>
                  {scheme.status}
                </span>
              </div>
            </div>
            <div className="scheme-card-body" style={{ marginTop: '8px' }}>
              <h5 style={{ fontSize: '13px', color: '#1e293b', fontWeight: '700', marginBottom: '4px' }}>{scheme.benefit}</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{scheme.desc}</p>
              
              <div style={{ marginTop: '12px' }}>
                <h6 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Required Documents:</h6>
                <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {scheme.documents.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="scheme-card-footer" style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, padding: '8px 10px', fontSize: '12px' }}
                onClick={() => alert(`Details for ${scheme.title}:\n\nCategory: ${scheme.category}\nBenefits: ${scheme.benefit}\n\n${scheme.desc}`)}
              >
                View Guidelines
              </button>
              <button 
                className="btn-primary" 
                style={{ flex: 1, padding: '8px 10px', fontSize: '12px', backgroundColor: 'var(--green)', borderColor: 'var(--green)', boxShadow: 'none' }}
                onClick={() => handleApplyClick(scheme)}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <p style={{ textAlign: 'center', gridColumn: 'span 3', padding: '40px', color: 'var(--text-secondary)' }}>
            No schemes found matching your search.
          </p>
        )}
      </div>

      {/* Multi-step Application Modal */}
      {selectedScheme && (
        <div className="scheme-modal-overlay">
          <div className="scheme-modal-card">
            <div className="scheme-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🇮🇳</span>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>Application Portal</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Applying for: {selectedScheme.title}</p>
                </div>
              </div>
              <button onClick={() => setSelectedScheme(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="scheme-modal-body">
              {/* Stepper progress tracker */}
              <div className="stepper-container">
                <div className="stepper-line-active" style={{ width: `${(formStep - 1) * 50}%` }}></div>
                <div className={`stepper-step ${formStep >= 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}>
                  <div className="step-circle">1</div>
                  <span className="step-label">Personal Info</span>
                </div>
                <div className={`stepper-step ${formStep >= 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}>
                  <div className="step-circle">2</div>
                  <span className="step-label">Verification Docs</span>
                </div>
                <div className={`stepper-step ${formStep >= 3 ? 'active' : ''}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">Bank Account</span>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {/* Step 1: Personal Details */}
                {formStep === 1 && (
                  <div className="form-grid">
                    <div className="form-group span-2">
                      <label className="form-label">Full Name (As in Aadhaar)</label>
                      <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleFormChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <input type="number" name="age" className="form-input" value={formData.age} onChange={handleFormChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select name="gender" className="form-select" value={formData.gender} onChange={handleFormChange}>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group span-2">
                      <label className="form-label">Annual Household Income (₹)</label>
                      <input type="number" name="income" className="form-input" value={formData.income} onChange={handleFormChange} required />
                    </div>
                  </div>
                )}

                {/* Step 2: Verification Docs */}
                {formStep === 2 && (
                  <div className="form-grid full-width">
                    <div className="form-group">
                      <label className="form-label">Aadhaar Number</label>
                      <input type="text" name="aadhaarNumber" className="form-input" value={formData.aadhaarNumber} onChange={handleFormChange} required />
                    </div>
                    {selectedScheme.id === 'pm-kisan' && (
                      <div className="form-group">
                        <label className="form-label">Land Registry Khasra/Khatauni Number</label>
                        <input type="text" name="landRegistryNo" placeholder="Enter land record ID" className="form-input" value={formData.landRegistryNo} onChange={handleFormChange} required />
                      </div>
                    )}
                    <div className="form-group" style={{ marginTop: '8px' }}>
                      <label className="form-label">Upload Documents Proof</label>
                      <div className="file-upload-zone">
                        <div className="file-upload-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>Drop PDFs here or click to browse</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Required: Aadhaar.pdf and Income_Certificate.pdf</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Bank Details */}
                {formStep === 3 && (
                  <div className="form-grid">
                    <div className="form-group span-2">
                      <label className="form-label">Aadhaar-Linked Bank Account Number</label>
                      <input type="text" name="bankAccount" placeholder="Enter bank account number" className="form-input" value={formData.bankAccount} onChange={handleFormChange} required />
                    </div>
                    <div className="form-group span-2">
                      <label className="form-label">Bank IFSC Code</label>
                      <input type="text" name="ifscCode" placeholder="SBIN0001234" className="form-input" value={formData.ifscCode} onChange={handleFormChange} required />
                    </div>
                    <div style={{ gridColumn: 'span 2', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--saffron-light)', border: '1px solid var(--saffron-border)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px' }}>ℹ️</span>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                        Welfare payouts will be transferred directly to this bank account using Direct Benefit Transfer (DBT) via Aadhaar bridge system.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation actions */}
                <div className="form-actions">
                  {formStep > 1 && (
                    <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                      Back
                    </button>
                  )}
                  {formStep < 3 ? (
                    <button type="button" className="btn-primary" onClick={handleNextStep}>
                      Continue
                    </button>
                  ) : (
                    <button type="submit" className="btn-success-solid">
                      Submit Application
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
