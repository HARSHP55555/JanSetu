import React, { useState } from 'react';

export default function DocumentsView({ documentsList, onUploadDocument }) {
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('Caste Certificate');
  const [fileSelected, setFileSelected] = useState(null);

  const docTypesList = [
    'Aadhaar Card',
    'Income Certificate',
    'Caste Certificate',
    'Ration Card',
    'Land Registry Deed',
    'Pan Card'
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileSelected({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      });
      if (!docName) {
        // Auto-fill doc name if empty
        setDocName(file.name.split('.')[0].replace(/_/g, ' '));
      }
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!docName || !fileSelected) {
      alert("Please select a file and name your document.");
      return;
    }

    onUploadDocument({
      name: docName,
      type: docType,
      fileName: fileSelected.name,
      fileSize: fileSelected.size
    });

    setDocName('');
    setFileSelected(null);
    alert("Document uploaded successfully to your Digital Locker. It is queued for government verification.");
  };

  return (
    <div className="subpage-grid-2col">
      {/* Left Column: Upload New Document */}
      <div className="form-view-container">
        <div className="form-header-row">
          <h3>Upload Document to Locker</h3>
          <p>Securely store your official documents for quick digital scheme verifications.</p>
        </div>

        <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Document Display Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Caste Certificate 2026, Ration Card Copy" 
              className="form-input"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Document Category Type *</label>
            <select 
              className="form-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              {docTypesList.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Attach File *</label>
            <div className="file-upload-zone" style={{ position: 'relative' }}>
              <input 
                type="file" 
                onChange={handleFileChange}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  opacity: 0, 
                  cursor: 'pointer' 
                }} 
              />
              <div className="file-upload-icon" style={{ color: 'var(--primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
              </div>
              {fileSelected ? (
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)' }}>{fileSelected.name}</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Size: {fileSelected.size} • Ready to Upload</p>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '500' }}>Click here to select a file</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Supports PDF, JPG, PNG (max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Verify & Save to Locker
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Digital Locker Documents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🔒</span>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>My Verified Locker</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {documentsList.map((doc, idx) => (
            <div key={idx} className="app-tracker-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyCentert: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ margin: 'auto' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div>
                  <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{doc.name}</h5>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.type} • {doc.size}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`status-tag ${doc.status === 'Verified' ? 'tag-success' : 'tag-warning'}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
