import React, { useState } from 'react';

export default function ComplaintsView({ complaintsList, onFileComplaint }) {
  const [complaintForm, setComplaintForm] = useState({
    title: '',
    category: 'Road Infrastructure',
    location: '',
    description: '',
    landmark: ''
  });

  const handleInputChange = (e) => {
    setComplaintForm({
      ...complaintForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!complaintForm.title || !complaintForm.location || !complaintForm.description) {
      alert("Please fill out all required fields.");
      return;
    }

    onFileComplaint({
      title: complaintForm.title,
      category: complaintForm.category,
      location: complaintForm.location,
      description: complaintForm.description,
      landmark: complaintForm.landmark
    });

    // Clear form
    setComplaintForm({
      title: '',
      category: 'Road Infrastructure',
      location: '',
      description: '',
      landmark: ''
    });
    alert("Your complaint has been successfully filed with the Municipal Corporation!");
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Resolved': return 'tag-success';
      case 'In Review': return 'tag-warning';
      case 'Pending':
      default: return 'tag-info';
    }
  };

  return (
    <div className="subpage-grid-2col">
      {/* Left Column: Filing Form */}
      <div className="form-view-container">
        <div className="form-header-row">
          <h3>File a New Complaint</h3>
          <p>Submit public grievances directly to city administrators. Track progress in real-time.</p>
        </div>

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Subject / Short Title *</label>
            <input 
              type="text" 
              name="title" 
              placeholder="e.g. Broken streetlight, road potholes" 
              className="form-input" 
              value={complaintForm.title}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Department / Category *</label>
              <select 
                name="category" 
                className="form-select"
                value={complaintForm.category}
                onChange={handleInputChange}
              >
                <option>Road Infrastructure</option>
                <option>Water & Sewage</option>
                <option>Waste Management</option>
                <option>Electricity Grid</option>
                <option>Public Safety</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Area Location (MG Road, Indiranagar, etc.) *</label>
              <input 
                type="text" 
                name="location" 
                placeholder="Enter locality name" 
                className="form-input" 
                value={complaintForm.location}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Landmark / Specific Location Details</label>
            <input 
              type="text" 
              name="landmark" 
              placeholder="e.g. Opposite post office, near central park gate" 
              className="form-input" 
              value={complaintForm.landmark}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description of Problem *</label>
            <textarea 
              name="description" 
              placeholder="Describe the issue in detail, including how long it has been present..." 
              className="form-textarea"
              value={complaintForm.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Photo Proof (Optional)</label>
            <div className="file-upload-zone" style={{ padding: '20px 10px' }}>
              <div className="file-upload-icon" style={{ color: 'var(--saffron)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>Upload image (JPG/PNG max 5MB)</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--saffron)', borderColor: 'var(--saffron)', boxShadow: '0 4px 12px rgba(255, 153, 51, 0.15)' }}>
              Submit Grievance
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Complaints History List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Your Active Gripes</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {complaintsList.map((c, i) => (
            <div key={c.id || i} className="app-tracker-card" style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`status-tag ${getStatusBadgeClass(c.status)}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                  {c.status}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.time}</span>
              </div>
              <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{c.title}</h5>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{c.subtitle}</p>
            </div>
          ))}
          {complaintsList.length === 0 && (
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
              No complaints filed yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
