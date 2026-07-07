import uuid
from datetime import datetime

# In-memory database structures
MOCK_SCHEMES = [
    {
        "id": "pm-kisan",
        "title": "PM Kisan Samman Nidhi",
        "eligibility": "You are eligible",
        "benefit": "Get up to ₹6,000 annually",
        "category": "Agriculture",
        "icon": "leaf",
        "details": "PM Kisan is a Central Sector scheme with 100% funding from Government of India. Under the scheme an income support of Rs. 6,000/- per year in three equal installments will be provided to all land-holding farmer families."
    },
    {
        "id": "ayushman-bharat",
        "title": "Ayushman Bharat",
        "eligibility": "Likely Eligible",
        "benefit": "Free health insurance up to ₹5 lakh",
        "category": "Healthcare",
        "icon": "heart",
        "details": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY) is a flagship scheme of Government of India to provide cashless secondary and tertiary care hospitalization benefit of up to Rs. 5 Lakh per family per year to over 12 crore poor and vulnerable families."
    },
    {
        "id": "pm-awas",
        "title": "PM Awas Yojana",
        "eligibility": "Check Eligibility",
        "benefit": "Get assistance for your dream home",
        "category": "Housing",
        "icon": "home",
        "details": "Pradhan Mantri Awas Yojana (PMAY) is an initiative by the Government of India in which affordable housing will be provided to the urban and rural poor with a target of building 2 crore affordable houses."
    }
]

MOCK_ALERTS = [
    {
        "id": 1,
        "title": "Heavy Rainfall Alert",
        "details": "Bangalore Urban, Karnataka",
        "time": "2 hours ago",
        "type": "weather",
        "severity": "high"
    },
    {
        "id": 2,
        "title": "Road Maintenance Work",
        "details": "MG Road, Indiranagar",
        "time": "1 day ago",
        "type": "maintenance",
        "severity": "medium"
    }
]

MOCK_TASKS = [
    {
        "id": "task-aadhaar",
        "title": "Upload Aadhaar Card",
        "subtitle": "Required for verification",
        "status": "pending",
    },
    {
        "id": "task-income",
        "title": "Upload Income Certificate",
        "subtitle": "Required for scheme eligibility",
        "status": "pending",
    },
    {
        "id": "task-mobile",
        "title": "Verify Mobile Number",
        "subtitle": "Add your mobile number",
        "status": "pending",
    }
]

MOCK_ACTIVITIES = [
    {
        "id": "act-1",
        "type": "complaint",
        "title": "Complaint #14567 submitted",
        "subtitle": "Water logging on MG Road, Bangalore",
        "status": "Resolved",
        "statusType": "success",
        "time": "Yesterday, 10:30 AM"
    },
    {
        "id": "act-2",
        "type": "document",
        "title": "Document uploaded",
        "subtitle": "Aadhaar Card • 2.4 MB",
        "status": "Verified",
        "statusType": "info",
        "time": "2 hours ago"
    },
    {
        "id": "act-3",
        "type": "application",
        "title": "Application submitted",
        "subtitle": "Ration Card Application",
        "status": "In Review",
        "statusType": "warning",
        "time": "3 days ago"
    }
]

# Database operations helpers
def get_all_schemes():
    return MOCK_SCHEMES

def get_all_alerts():
    return MOCK_ALERTS

def get_all_tasks():
    return MOCK_TASKS

def toggle_task(task_id: str):
    for task in MOCK_TASKS:
        if task["id"] == task_id:
            task["status"] = "completed" if task["status"] == "pending" else "pending"
            return task
    return None

def get_all_activities():
    return MOCK_ACTIVITIES

def add_complaint_activity(title: str, location: str, description: str):
    new_id = f"act-{uuid.uuid4().hex[:6]}"
    activity_title = f"Complaint #{uuid.uuid4().hex[:5].upper()} submitted"
    
    new_activity = {
        "id": new_id,
        "type": "complaint",
        "title": activity_title,
        "subtitle": f"{title} at {location}",
        "status": "In Review",
        "statusType": "warning",
        "time": "Just now"
    }
    MOCK_ACTIVITIES.insert(0, new_activity)
    
    return {
        "id": new_id,
        "title": activity_title,
        "description": description,
        "location": location,
        "status": "In Review",
        "timestamp": datetime.now().strftime("%I:%M %p, Today")
    }
