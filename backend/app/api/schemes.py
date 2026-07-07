from fastapi import APIRouter
from typing import List, Optional
from app.services import mock_db

router = APIRouter(prefix="/schemes", tags=["Schemes"])

@router.get("", response_model=List[dict])
def read_schemes(query: Optional[str] = None):
    all_schemes = mock_db.get_all_schemes()
    if query:
        query_lower = query.lower()
        return [
            s for s in all_schemes
            if query_lower in s["title"].lower() or query_lower in s["details"].lower()
        ]
    return all_schemes
