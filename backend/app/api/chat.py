from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services import ai_assistant

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("", response_model=ChatResponse)
def chat_with_assistant(request: ChatRequest):
    reply_data = ai_assistant.generate_chat_reply(request.message)
    return ChatResponse(
        reply=reply_data["reply"],
        timestamp=reply_data["timestamp"]
    )
