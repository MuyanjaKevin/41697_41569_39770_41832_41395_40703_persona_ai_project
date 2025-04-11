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