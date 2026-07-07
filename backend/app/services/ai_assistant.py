from datetime import datetime

def generate_chat_reply(message: str) -> dict:
    user_msg = message.lower()
    
    # Generate intelligent responses for government queries
    if "caste" in user_msg:
        reply = (
            "To apply for a **Caste Certificate**, you need the following documents:\n"
            "1. Identity Proof (Aadhaar Card, Voter ID)\n"
            "2. Address Proof (Ration Card, Electricity Bill)\n"
            "3. Proof of Caste (Father's caste certificate or school leaving certificate)\n\n"
            "Would you like me to guide you to the application portal?"
        )
    elif "kisan" in user_msg or "pm kisan" in user_msg:
        reply = (
            "Under the **PM Kisan Samman Nidhi** scheme, small and marginal farmers get:\n"
            "- Income support of **₹6,000 per year** in three equal installments.\n"
            "- Direct bank transfers to Aadhaar-linked accounts.\n\n"
            "Your profile indicates you are eligible. Would you like me to start the application process for you?"
        )
    elif "road" in user_msg or "damage" in user_msg or "pothole" in user_msg:
        reply = (
            "I've logged a complaint for road damage. I will need the location details. "
            "Please describe the landmark or street name, and I will submit a complaint to the Municipal Corporation."
        )
    elif "water" in user_msg or "tap" in user_msg:
        reply = (
            "To apply for a **New Water Connection** in your area, you need to:\n"
            "1. Fill out the application form on the Municipal Corporation Portal.\n"
            "2. Upload proof of ownership (Property tax receipt or sale deed).\n"
            "3. Upload Identity and Address proof.\n\n"
            "Would you like me to initiate this request?"
        )
    elif "solar" in user_msg or "rooftop" in user_msg:
        reply = (
            "Under the **Solar Rooftop Subsidy Scheme** (PM Surya Ghar: Muft Bijli Yojana), "
            "you can get a subsidy up to **₹78,000** for installing solar panels (up to 3kW).\n"
            "This can reduce your electricity bill to zero!\n\n"
            "Would you like to calculate your subsidy and apply?"
        )
    elif "hello" in user_msg or "hi" in user_msg:
        reply = "Hello Radha! I am JanSetu, your AI Government Assistant. How can I help you today?"
    else:
        reply = (
            "I can help you search for schemes, apply for certificates (like caste/income), file complaints, "
            "or check document verification status. What would you like to do today?"
        )
        
    return {
        "reply": reply,
        "timestamp": datetime.now().strftime("%H:%M")
    }
