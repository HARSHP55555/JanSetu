from fastapi import APIRouter
from typing import List
from app.services import mock_db

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("", response_model=List[dict])
def read_alerts():
    return mock_db.get_all_alerts()
