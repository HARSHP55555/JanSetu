# JanSetu Dashboard — Project Overview

**JanSetu** is an AI-powered Government Assistant dashboard built with a FastAPI backend and Next.js frontend.

## Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Backend   | Python, FastAPI       |
| Frontend  | Next.js 16, React 19  |
| Styling   | Tailwind CSS v4       |
| AI        | Google Gemini API     |
| Database  | In-memory (mock_db)   |

---

## Folder Structure

```
jansetu-dashboard/
│
├── backend/                          # FastAPI Python backend
│   ├── app/
│   │   ├── api/                      # Route handlers
│   │   │   ├── alerts.py             #   GET /api/alerts
│   │   │   ├── chat.py               #   POST /api/chat
│   │   │   ├── complaints.py          #   GET/POST /api/complaints
│   │   │   ├── schemes.py            #   GET /api/schemes
│   │   │   └── tasks.py              #   GET/POST /api/tasks
│   │   ├── schemas/                  # Pydantic models
│   │   │   ├── chat.py
│   │   │   ├── complaint.py
│   │   │   └── task.py
│   │   ├── services/                 # Business logic
│   │   │   ├── ai_assistant.py       #   Gemini + keyword fallback
│   │   │   └── mock_db.py            #   In-memory data store
│   │   ├── config.py                 # CORS & app settings
│   │   ├── main.py                   # FastAPI app factory
│   │   └── __init__.py
│   ├── .env                          # GEMINI_API_KEY
│   ├── requirements.txt
│   └── run.py                        # Dev server entry
│
├── frontend/                         # Next.js 16 React app
│   ├── public/
│   │   └── assets/                   # Static images
│   │       ├── profile.jpg
│   │       ├── solar_panel.jpg
│   │       └── water_tap.jpg
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css           # Tailwind base styles
│   │   │   ├── layout.js             # Root layout
│   │   │   └── page.js               # SPA entry point
│   │   ├── components/
│   │   │   ├── layout/               # Shell components
│   │   │   │   ├── ChatAssistant.js  #   Floating chat modal
│   │   │   │   ├── Header.js         #   Top bar
│   │   │   │   ├── RightPanel.js     #   Right sidebar
│   │   │   │   └── Sidebar.js        #   Left navigation
│   │   │   └── views/                # Page-level views
│   │   │       ├── ApplicationsView.js
│   │   │       ├── AssistantView.js
│   │   │       ├── ComplaintsView.js
│   │   │       ├── DocumentsView.js
│   │   │       ├── HelpView.js
│   │   │       ├── LanguageView.js
│   │   │       ├── MainDashboard.js
│   │   │       ├── NotificationsView.js
│   │   │       ├── SchemesView.js
│   │   │       └── SettingsView.js
│   │   └── utils/
│   │       └── translations.js       # i18n (7 languages)
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
├── requirements.txt                  # Root-level dependencies
└── Project_Overview.md               # This file
```
