from pydantic import BaseModel

class ComplaintCreate(BaseModel):
    title: str
    description: str
    location: str

class ComplaintResponse(BaseModel):
    id: str
    title: str
    description: str
    location: str
    status: str  # "Resolved", "In Review", "Pending"
    timestamp: str
