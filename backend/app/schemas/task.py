from pydantic import BaseModel

class TaskResponse(BaseModel):
    id: str
    title: str
    subtitle: str
    status: str  # "completed" or "pending"

class TaskToggle(BaseModel):
    id: str
    completed: bool
