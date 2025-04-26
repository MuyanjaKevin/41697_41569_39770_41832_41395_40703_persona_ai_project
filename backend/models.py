from datetime import datetime

# User model structure
def create_user(username, email, password_hash):
    return {
        "username": username,
        "email": email,
        "password": password_hash,
        "created_at": datetime.utcnow(),
        "style_profile": None,
        "cart": [],
        "orders": []
    }

# Product model structure
def create_product(name, description, price, image_url, categories, attributes):
    return {
        "name": name,
        "description": description,
        "price": price,
        "image_url": image_url,
        "categories": categories,
        "attributes": attributes,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

# Style profile model structure
def create_style_profile(user_id, preferences):
    return {
        "user_id": user_id,
        "preferences": preferences,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
# Update models.py with style profile structure

def create_style_profile(user_id, preferences=None, ai_analysis=None, style_board=None):

    """

    Create a new style profile for a user

    preferences: Dict of user's style preferences from questionnaire

    ai_analysis: OpenAI's analysis of the user's style

    style_board: A collection of visual elements representing the style

    """

    return {

        "user_id": user_id,

        "preferences": preferences or {},

        "ai_analysis": ai_analysis or {},

        "style_board": style_board or [],

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()

    }
 