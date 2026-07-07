from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    PROJECT_NAME: str = "JanSetu AI API"
    PROJECT_DESC: str = "Clean modular API endpoints for JanSetu Government Assistant"
    PROJECT_VERSION: str = "1.0.0"
    
    # CORS setup
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

settings = Settings()
