from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import chat, schemes, complaints, tasks, alerts
from app.services import mock_db

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESC,
    version=settings.PROJECT_VERSION,
)

# Enable CORS using configuration settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount sub-routers
app.include_router(chat.router, prefix="/api")
app.include_router(schemes.router, prefix="/api")
app.include_router(complaints.router, prefix="/api")
app.include_router(tasks.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")

# Direct endpoint for matching frontend activity fetch requests
@app.get("/api/activities", tags=["Activities"])
def read_recent_activities():
    return mock_db.get_all_activities()

@app.get("/", tags=["Root"])
def root_status():
    return {
        "status": "online",
        "message": f"Welcome to the organized {settings.PROJECT_NAME} backend!",
        "docs_url": "/docs"
    }
