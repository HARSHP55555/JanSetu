# JanSetu AI Government Assistant Backend

This is the organized FastAPI backend implementation for the JanSetu dashboard.

## Structure
- `app/main.py`: Entrypoint initializing the app and mounting API routers.
- `app/config.py`: Centralized CORS configuration and app setup.
- `app/api/`: Domain-specific routing (`chat.py`, `schemes.py`, `complaints.py`, `tasks.py`, `alerts.py`).
- `app/schemas/`: Input/Output validation and serialization serialization using Pydantic.
- `app/services/`: Memory storage (`mock_db.py`) and conversational assistant processing (`ai_assistant.py`).

## Installation & Setup

1. **Navigate to the Backend Folder**:
   ```bash
   cd backend
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Development Server**:
   ```bash
   python run.py
   ```
   *The server will start on [http://localhost:8000](http://localhost:8000).*

## API Documentation
Once the server is running, you can explore, test, and execute endpoints interactively:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
