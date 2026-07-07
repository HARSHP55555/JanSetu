from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    sender: str  # "user" or "ai"
    text: str
    timestamp: str

class ChatRequest(BaseModel):
    message: str
    chat_history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    timestamp: str
