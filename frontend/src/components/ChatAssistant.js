import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant({ isOpen, onClose, initialMessage }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Radha! I am JanSetu, your AI Government Assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initial message from welcome banner prompt
  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!textToSend) {
      setInputText('');
    }

    // Add user message
    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Call FastAPI backend with fallback
    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          chat_history: messages
        }),
      });

      if (!response.ok) {
        throw new Error('API failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: data.reply,
        timestamp: data.timestamp
      }]);
    } catch (error) {
      // Fallback response generator (matches FastAPI logic)
      setTimeout(() => {
        let reply = '';
        const userMsgLower = text.toLowerCase();
        
        if (userMsgLower.includes('caste')) {
          reply = "To apply for a **Caste Certificate**, you need these documents:\n1. Identity Proof (Aadhaar, Voter ID)\n2. Address Proof (Ration Card, Utility Bill)\n3. Proof of Caste (Father's caste certificate or school leaving certificate).\n\nWould you like me to open the portal?";
        } else if (userMsgLower.includes('kisan') || userMsgLower.includes('pm kisan')) {
          reply = "Under **PM Kisan Samman Nidhi**, small and marginal farmers receive **₹6,000 annually** in 3 equal installments directly to Aadhaar-linked accounts.\n\nYour profile indicates you are eligible. Shall we start applying?";
        } else if (userMsgLower.includes('road') || userMsgLower.includes('damage') || userMsgLower.includes('pothole')) {
          reply = "I can log a complaint for road damage. Please provide the location, landmark or street name, and I will submit it to the Municipal Corporation.";
        } else if (userMsgLower.includes('water') || userMsgLower.includes('tap')) {
          reply = "To apply for a **New Water Connection**, you must:\n1. Register on the Municipal Corporation Portal.\n2. Upload property tax receipt/ownership deed.\n3. Upload Identity/Address proof.\n\nWould you like me to initiate this?";
        } else if (userMsgLower.includes('solar') || userMsgLower.includes('rooftop')) {
          reply = "The **Solar Rooftop Subsidy Scheme** offers up to **₹78,000** subsidy for installing panels up to 3kW. This can reduce your electricity bill to zero!\n\nWould you like to calculate your subsidy and apply?";
        } else if (userMsgLower.includes('hello') || userMsgLower.includes('hi')) {
          reply = "Hello Radha! I am JanSetu, your AI Government Assistant. How can I help you today?";
        } else {
          reply = "I can assist you with schemes, certificates (caste/income), complaints (e.g. road repair), and checking document verifications. What can I do for you?";
        }

        setMessages(prev => [...prev, {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-brand">
            <div className="chat-brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#ffffff" stroke="#ffffff" strokeWidth="2"/>
              </svg>
            </div>
            <div className="chat-brand-info">
              <h3>JanSetu AI</h3>
              <div className="status-indicator">
                <span className="dot"></span>
                <span>Online Assistant</span>
              </div>
            </div>
          </div>
          <button className="chat-close-btn" onClick={onClose} aria-label="Close Chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages Log */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message-bubble ${msg.sender}`}>
              <div className="message-content-wrapper">
                <div className="message-avatar">
                  {msg.sender === 'ai' ? (
                    <div className="avatar-circle ai">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="16" height="12" x="4" y="8" rx="2"/>
                        <path d="M9 13h.01M15 13h.01M9 17h6"/>
                      </svg>
                    </div>
                  ) : (
                    <img src="/assets/profile.jpg" alt="Radha" className="avatar-circle user" />
                  )}
                </div>
                <div className="message-bubble">
                  <div className="message-text">
                    {/* Parse simple bold markdown */}
                    {msg.text.split('\n').map((paragraph, index) => (
                      <p key={index} className="message-paragraph">
                        {paragraph.split('**').map((part, pIndex) => 
                          pIndex % 2 === 1 ? <strong key={pIndex}>{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="chat-message-bubble ai loading">
              <div className="message-content-wrapper">
                <div className="message-avatar">
                  <div className="avatar-circle ai">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="16" height="12" x="4" y="8" rx="2"/>
                    </svg>
                  </div>
                </div>
                <div className="message-bubble typing">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="Type your message here..."
            className="chat-text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
