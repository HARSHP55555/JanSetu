from fastapi import APIRouter
from app.schemas.complaint import ComplaintCreate, ComplaintResponse
from app.services import mock_db

router = APIRouter(prefix="/complaints", tags=["Complaints"])

@router.post("", response_model=ComplaintResponse)
def file_complaint(complaint: ComplaintCreate):
    result = mock_db.add_complaint_activity(
        title=complaint.title,
        location=complaint.location,
        description=complaint.description
    )
    return ComplaintResponse(**result)

@router.get("", response_model=list)
def read_activities():
    return mock_db.get_all_activities()
