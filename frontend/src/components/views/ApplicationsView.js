import React, { useState } from 'react';

export default function ApplicationsView({ applicationsList }) {
  const [selectedAppIdx, setSelectedAppIdx] = useState(0);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'tag-success';
      case 'In Review': return 'tag-warning';
      case 'Rejected': return 'tag-danger';
      case 'Submitted':
      default: return 'tag-info';
    }
  };

  const activeApp = applicationsList[selectedAppIdx];

  return (
    <div className="subpage-grid-2col">
      {/* Left Column: Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Your Submitted Applications</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {applicationsList.map((app, idx) => (
            <div 
              key={idx} 
              className={`app-tracker-card ${selectedAppIdx === idx ? 'active' : ''}`}
              onClick={() => setSelectedAppIdx(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="scheme-badge badge-likely" style={{ fontSize: '10px', backgroundColor: 'rgba(0, 0, 128, 0.05)', color: 'var(--primary)' }}>
                  {app.category}
                </span>
                <span className={`status-tag ${getStatusClass(app.status)}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                  {app.status}
                </span>
              </div>
              <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{app.schemeTitle}</h5>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Applied on: {app.submittedAt}</p>
            </div>
          ))}
          {applicationsList.length === 0 && (
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
              No applications submitted yet. Apply in the "Government Schemes" page.
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Timelines Stepper */}
      {activeApp ? (
        <div className="form-view-container">
          <div className="form-header-row" style={{ paddingBottom: '12px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px' }}>Application Timeline</h3>
            <p style={{ fontSize: '12px' }}>Tracking: {activeApp.schemeTitle}</p>
          </div>

          <div className="timeline-vertical">
            {/* Node 1: Submitted */}
            <div className="timeline-node completed">
              <div className="timeline-dot"></div>
              <div className="timeline-node-title">Application Submitted</div>
              <div className="timeline-node-desc">Your application form and details were logged in the central government database on {activeApp.submittedAt}.</div>
            </div>

            {/* Node 2: In Review */}
            <div className={`timeline-node ${activeApp.step >= 2 ? 'completed' : activeApp.step === 1 ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-node-title">Under Administrative Review</div>
              <div className="timeline-node-desc">Local Block Officers are inspecting details and verifying land records/income limits.</div>
            </div>

            {/* Node 3: Verification */}
            <div className={`timeline-node ${activeApp.step >= 3 ? 'completed' : activeApp.step === 2 ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-node-title">Document Audit & Verification</div>
              <div className="timeline-node-desc">Cross-referencing Aadhaar, bank credentials, and digital lockers.</div>
            </div>

            {/* Node 4: Disbursed / Approved */}
            <div className={`timeline-node ${activeApp.step >= 4 ? 'completed' : activeApp.step === 3 ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-node-title">Scheme Approved & Disbursed</div>
              <div className="timeline-node-desc">Cash payouts/welfare benefits scheduled via Direct Benefit Transfer (DBT).</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-view-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Select an application to track progress.</p>
        </div>
      )}
    </div>
  );
}
