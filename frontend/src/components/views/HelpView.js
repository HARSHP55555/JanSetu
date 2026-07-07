import React, { useState } from 'react';

export default function HelpView() {
  const [ticket, setTicket] = useState({ topic: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How do I apply for a new Caste Certificate?",
      a: "Navigate to the 'AI Assistant' or 'Government Schemes' page. You will need Aadhaar Card, Address Proof, and proof of family caste origins. Fill out the application, upload documents to your Digital Locker, and submit."
    },
    {
      q: "What is the timeline for PM Kisan Samman Nidhi payouts?",
      a: "The income support payouts of ₹6,000 annually are disbursed in three equal installments of ₹2,000 every four months directly via Direct Benefit Transfer (DBT) to your Aadhaar-linked bank account."
    },
    {
      q: "How can I verify if my phone number is linked to Aadhaar?",
      a: "You can check this under 'Settings' or use the 'AI Assistant' to run a verification check. Alternatively, visit the official UIDAI portal and use the 'Verify Email/Mobile Number' tool."
    },
    {
      q: "How to check active alerts in my area?",
      a: "All high-priority weather and maintenance notices are dynamically served on the right-side panel under 'Government Alerts'."
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticket.topic || !ticket.message) return;
    alert(`Support Ticket Filed!\n\nSubject: ${ticket.topic}\n\nWe have sent a tracking token to your registered mobile number.`);
    setTicket({ topic: '', message: '' });
  };

  return (
    <div className="subpage-grid-2col">
      {/* Left Column: FAQs & Contact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* FAQs */}
        <div className="form-view-container">
          <div className="form-header-row" style={{ marginBottom: '12px' }}>
            <h3>Frequently Asked Questions</h3>
            <p>Quick guides and answers to common government assistance queries.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                style={{ 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '12px', 
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    fontSize: '13px',
                    backgroundColor: activeFaq === idx ? 'var(--primary-light)' : '#ffffff',
                    color: activeFaq === idx ? 'var(--primary)' : 'var(--text-primary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{faq.q}</span>
                  <svg 
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: '#fcfcfd', borderTop: '1px solid var(--border-light)', lineHeight: '1.4' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact help line */}
        <div className="form-view-container" style={{ borderLeft: '4px solid var(--saffron)' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Emergency Helpdesk</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Get in touch with national district administrators and digital coordinators.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Toll-Free Helpline:</span>
              <strong style={{ color: 'var(--primary)' }}>1800-11-1947</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>AI Support Email:</span>
              <strong style={{ color: 'var(--primary)' }}>support.jansetu@gov.in</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Support Form */}
      <div className="form-view-container">
        <div className="form-header-row">
          <h3>File Help Ticket</h3>
          <p>If you face technical glitches uploading documents or tracking payouts, message us.</p>
        </div>

        <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Issue Subject *</label>
            <input 
              type="text" 
              placeholder="e.g. Aadhaar verification stuck" 
              className="form-input" 
              value={ticket.topic}
              onChange={(e) => setTicket({ ...ticket, topic: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message Details *</label>
            <textarea 
              placeholder="Describe your issue with document names, dates, or error codes..." 
              className="form-textarea"
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
