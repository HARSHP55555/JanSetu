'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MainDashboard from '@/components/MainDashboard';
import RightPanel from '@/components/RightPanel';
import ChatAssistant from '@/components/ChatAssistant';

// View imports
import AssistantView from '@/components/AssistantView';
import SchemesView from '@/components/SchemesView';
import ComplaintsView from '@/components/ComplaintsView';
import DocumentsView from '@/components/DocumentsView';
import ApplicationsView from '@/components/ApplicationsView';

// Settings & Utilities imports
import LanguageView from '@/components/LanguageView';
import HelpView from '@/components/HelpView';
import SettingsView from '@/components/SettingsView';
import NotificationsView from '@/components/NotificationsView';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialMsg, setChatInitialMsg] = useState('');
  
  // Custom States
  const [language, setLanguage] = useState('English');

  // Tasks State
  const [tasks, setTasks] = useState([
    {
      id: "task-aadhaar",
      title: "Upload Aadhaar Card",
      subtitle: "Required for verification",
      status: "pending",
    },
    {
      id: "task-income",
      title: "Upload Income Certificate",
      subtitle: "Required for scheme eligibility",
      status: "pending",
    },
    {
      id: "task-mobile",
      title: "Verify Mobile Number",
      subtitle: "Add your mobile number",
      status: "pending",
    }
  ]);

  // Activities State
  const [activities, setActivities] = useState([
    {
      id: "act-1",
      type: "complaint",
      title: "Complaint #14567 submitted",
      subtitle: "Water logging on MG Road, Bangalore",
      status: "Resolved",
      statusType: "success",
      time: "Yesterday, 10:30 AM"
    },
    {
      id: "act-2",
      type: "document",
      title: "Document uploaded",
      subtitle: "Aadhaar Card • 2.4 MB",
      status: "Verified",
      statusType: "info",
      time: "2 hours ago"
    },
    {
      id: "act-3",
      type: "application",
      title: "Application submitted",
      subtitle: "Ration Card Application",
      status: "In Review",
      statusType: "warning",
      time: "3 days ago"
    }
  ]);

  // Alerts State
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Heavy Rainfall Alert",
      details: "Bangalore Urban, Karnataka",
      time: "2 hours ago",
      type: "weather",
    },
    {
      id: 2,
      title: "Road Maintenance Work",
      details: "MG Road, Indiranagar",
      time: "1 day ago",
      type: "maintenance",
    }
  ]);

  // Complaints State
  const [complaints, setComplaints] = useState([
    {
      id: "compl-1",
      title: "Water Logging & Flooding",
      subtitle: "Water logging on MG Road, Bangalore",
      status: "Resolved",
      time: "Yesterday, 10:30 AM"
    },
    {
      id: "compl-2",
      title: "Streetlight Malfunction",
      subtitle: "Lights out on street 4, Indiranagar",
      status: "In Review",
      time: "3 days ago"
    }
  ]);

  // Documents State
  const [documents, setDocuments] = useState([
    {
      name: "Aadhaar Card",
      type: "Aadhaar Card",
      size: "2.4 MB",
      status: "Verified"
    },
    {
      name: "Income Certificate 2026",
      type: "Income Certificate",
      size: "1.2 MB",
      status: "Verified"
    }
  ]);

  // Scheme Applications State
  const [applications, setApplications] = useState([
    {
      schemeId: "ration-card",
      schemeTitle: "Ration Card Application",
      category: "Food Security",
      status: "In Review",
      submittedAt: "04-07-2026",
      step: 2
    },
    {
      schemeId: "pm-kisan-pre",
      schemeTitle: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      status: "Approved",
      submittedAt: "15-05-2026",
      step: 4
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      type: "check",
      title: "Aadhaar Verification Complete",
      message: "Your Aadhaar Card document has been verified by the Central UIDAI bridge database.",
      time: "2 hours ago"
    },
    {
      id: "notif-2",
      type: "alert",
      title: "Heavy Rainfall Red Alert",
      message: "IMD has issued a heavy rainfall alert for Bangalore Urban district. Stay indoors if possible.",
      time: "2 hours ago"
    },
    {
      id: "notif-3",
      type: "check",
      title: "Ration Card Review Update",
      message: "Your Ration Card application is now under blocks review. Local audit successfully completed.",
      time: "3 days ago"
    }
  ]);

  // Fetch starting values from FastAPI backend (Graceful Offline fallback)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsRes, tasksRes, activitiesRes] = await Promise.all([
          fetch('http://localhost:8000/api/alerts'),
          fetch('http://localhost:8000/api/tasks'),
          fetch('http://localhost:8000/api/activities'),
        ]);

        if (alertsRes.ok) setAlerts(await alertsRes.json());
        if (tasksRes.ok) setTasks(await tasksRes.json());
        if (activitiesRes.ok) setActivities(await activitiesRes.json());
      } catch (err) {
        console.log("FastAPI backend is offline, running on mock data fallback.");
      }
    };
    fetchData();
  }, []);

  // Shared Actions handlers
  const handleAskQuestion = (questionText) => {
    if (activeTab === 'ai-assistant') {
      setChatInitialMsg(questionText);
    } else {
      setChatInitialMsg(questionText);
      setChatOpen(true);
    }
  };

  const handleStartChat = () => {
    if (activeTab === 'ai-assistant') {
      setChatInitialMsg('');
    } else {
      setChatInitialMsg('');
      setChatOpen(true);
    }
  };

  const handleActionClick = (actionId) => {
    if (actionId === 'find-schemes' || actionId === 'view-schemes') {
      setActiveTab('schemes');
    } else if (actionId === 'file-complaint') {
      setActiveTab('complaints');
    } else if (actionId === 'check-documents') {
      setActiveTab('documents');
    } else if (actionId === 'track-application' || actionId === 'view-activities') {
      setActiveTab('applications');
    } else if (actionId === 'view-alerts') {
      setActiveTab('help');
    } else if (actionId.startsWith('details-pm-kisan')) {
      setActiveTab('schemes');
    } else if (actionId.startsWith('details-ayushman-bharat')) {
      setActiveTab('schemes');
    } else if (actionId.startsWith('details-pm-awas')) {
      setActiveTab('schemes');
    } else if (actionId === 'solar-rooftop') {
      handleAskQuestion('Tell me about Solar Rooftop Subsidy');
    } else if (actionId === 'water-connection') {
      handleAskQuestion('How do I apply for a Water Connection?');
    } else if (actionId === 'task-aadhaar') {
      setActiveTab('documents');
    } else if (actionId === 'task-income') {
      setActiveTab('documents');
    } else if (actionId === 'task-mobile') {
      handleAskQuestion('How to verify my Mobile Number?');
    } else {
      alert(`Navigating to flow detail: ${actionId}`);
    }
  };

  const toggleTaskCompleted = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed'
        };
      }
      return task;
    }));
  };

  // State Mutation Handlers
  const handleApplyScheme = (applicationDetails) => {
    const newApp = {
      schemeId: applicationDetails.schemeId,
      schemeTitle: applicationDetails.schemeTitle,
      category: applicationDetails.category,
      status: "Submitted",
      submittedAt: applicationDetails.submittedAt,
      step: 1
    };

    setApplications(prev => [newApp, ...prev]);

    // Insert into Activities
    const newActivity = {
      id: `act-${Math.random().toString(36).substr(2, 6)}`,
      type: "application",
      title: "Application submitted",
      subtitle: `${applicationDetails.schemeTitle} - Pending Approval`,
      status: "Submitted",
      statusType: "info",
      time: "Just now"
    };
    setActivities(prev => [newActivity, ...prev]);

    // Automatically navigate to applications tracker so they see the timeline step
    setActiveTab('applications');
  };

  const handleFileComplaint = (complaintDetails) => {
    const newId = `compl-${Math.random().toString(36).substr(2, 6)}`;
    const newComplaint = {
      id: newId,
      title: complaintDetails.title,
      subtitle: `${complaintDetails.category} at ${complaintDetails.location}`,
      status: "In Review",
      time: "Just now"
    };

    setComplaints(prev => [newComplaint, ...prev]);

    // Insert into Activities
    const newActivity = {
      id: `act-${Math.random().toString(36).substr(2, 6)}`,
      type: "complaint",
      title: `Complaint #${Math.random().toString(36).substr(2, 5).toUpperCase()} filed`,
      subtitle: `${complaintDetails.title} at ${complaintDetails.location}`,
      status: "In Review",
      statusType: "warning",
      time: "Just now"
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleUploadDocument = (docDetails) => {
    const newDoc = {
      name: docDetails.name,
      type: docDetails.type,
      size: docDetails.fileSize,
      status: "Pending Verification"
    };

    setDocuments(prev => [newDoc, ...prev]);

    // Insert into Activities
    const newActivity = {
      id: `act-${Math.random().toString(36).substr(2, 6)}`,
      type: "document",
      title: "Document uploaded",
      subtitle: `${docDetails.name} • ${docDetails.fileSize}`,
      status: "Verified",
      statusType: "info",
      time: "Just now"
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
  };

  // Render view depending on active navigation tab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <MainDashboard 
            onAskQuestion={handleAskQuestion}
            onActionClick={handleActionClick}
            recentActivities={activities}
            language={language}
          />
        );
      case 'ai-assistant':
        return (
          <AssistantView initialMessage={chatInitialMsg} />
        );
      case 'schemes':
        return (
          <SchemesView onApplyScheme={handleApplyScheme} />
        );
      case 'complaints':
        return (
          <ComplaintsView 
            complaintsList={complaints} 
            onFileComplaint={handleFileComplaint} 
          />
        );
      case 'documents':
        return (
          <DocumentsView 
            documentsList={documents} 
            onUploadDocument={handleUploadDocument} 
          />
        );
      case 'applications':
        return (
          <ApplicationsView applicationsList={applications} />
        );
      case 'language':
        return (
          <LanguageView 
            currentLanguage={language} 
            onLanguageChange={handleLanguageChange} 
          />
        );
      case 'help':
        return (
          <HelpView />
        );
      case 'settings':
        return (
          <SettingsView />
        );
      case 'notifications':
        return (
          <NotificationsView 
            notificationsList={notifications} 
            onClearNotifications={handleClearNotifications}
          />
        );
      default:
        return (
          <div className="empty-state-view">
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000080" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3>Flow Detail Placeholder</h3>
            <p>You have navigated to the &ldquo;{activeTab.toUpperCase()}&rdquo; section.</p>
            <button className="btn-primary" onClick={() => setActiveTab('home')}>Return to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className={`dashboard-app-container ${sidebarOpen ? 'sidebar-drawer-active' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
        onStartChat={handleStartChat}
        language={language}
      />

      {/* Main Container */}
      <div className="main-layout-container">
        {/* Header Bar */}
        <Header 
          activeTab={activeTab} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onStartChat={handleStartChat}
          // Dynamic Language and Notification feeds
          notificationCount={notifications.length}
          currentLanguage={language}
          onLanguageClick={() => setActiveTab('language')}
          onNotificationClick={() => setActiveTab('notifications')}
        />

        {/* Content body split into Main Area + Right Sidebar Panel */}
        <div className="dashboard-content-grid">
          {/* Central Main Dashboard */}
          <main className="dashboard-main-area">
            {renderActiveView()}
          </main>

          {/* Right Sidebar panels */}
          <RightPanel 
            onActionClick={handleActionClick}
            tasks={tasks}
            toggleTaskCompleted={toggleTaskCompleted}
            alerts={alerts}
          />
        </div>
      </div>

      {/* Backdrop overlay for mobile sidebar */}
      <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>

      {/* Floating AI Chat Assistant Modal */}
      <ChatAssistant 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)}
        initialMessage={chatInitialMsg}
      />
    </div>
  );
}
