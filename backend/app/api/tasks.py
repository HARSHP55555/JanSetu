from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.task import TaskResponse, TaskToggle
from app.services import mock_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("", response_model=List[TaskResponse])
def read_tasks():
    # Convert tasks to schema response shape
    tasks_data = mock_db.get_all_tasks()
    return [TaskResponse(**t) for t in tasks_data]

@router.post("/toggle", response_model=TaskResponse)
def toggle_task_status(payload: TaskToggle):
    updated = mock_db.toggle_task(payload.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskResponse(**updated)
