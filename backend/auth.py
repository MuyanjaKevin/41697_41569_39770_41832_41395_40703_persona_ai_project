from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from models import create_user
from bson.objectid import ObjectId  # Add this import

# Initialize blueprint and bcrypt
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

# User Registration
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        # Get user data from request
        data = request.get_json()
        
        # Check if required fields are present
        if not all(k in data for k in ['username', 'email', 'password']):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Check if user already exists (by email)
        existing_user = auth_bp.mongo.db.users.find_one({'email': data['email']})
        if existing_user:
            return jsonify({"error": "Email already registered"}), 409
        
        # Check if username is taken
        existing_username = auth_bp.mongo.db.users.find_one({'username': data['username']})
        if existing_username:
            return jsonify({"error": "Username already taken"}), 409
        
        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Create new user object
        new_user = create_user(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password
        )
        
        # Insert into database
        user_id = auth_bp.mongo.db.users.insert_one(new_user).inserted_id
        
        # Remove password from response
        new_user.pop('password', None)
        new_user['_id'] = str(user_id)
        
        # Convert datetime to string
        if 'created_at' in new_user:
            new_user['created_at'] = new_user['created_at'].isoformat()
        
        return jsonify({
            "message": "User registered successfully",
            "user": new_user
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# User Login
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        # Get login data
        data = request.get_json()
        
        # Check if required fields are present
        if not all(k in data for k in ['email', 'password']):
            return jsonify({"error": "Missing email or password"}), 400
        
        # Find user by email
        user = auth_bp.mongo.db.users.find_one({'email': data['email']})
        
        # Check if user exists and password is correct
        if user and bcrypt.check_password_hash(user['password'], data['password']):
            # Create access token (expires in 1 day)
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(
                identity=str(user['_id']),
                expires_delta=expires
            )
            
            return jsonify({
                "message": "Login successful",
                "token": access_token,
                "user_id": str(user['_id']),
                "username": user['username'],
                "email": user['email']  # Add email to response
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get current user profile
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        # Get current user ID from JWT token
        current_user_id = get_jwt_identity()
        
        # Find user in database - convert string ID to ObjectId
        user = auth_bp.mongo.db.users.find_one({'_id': ObjectId(current_user_id)})
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Remove password from response
        user.pop('password', None)
        user['_id'] = str(user['_id'])
        
        # Convert datetime objects to strings for JSON serialization
        if 'created_at' in user:
            user['created_at'] = user['created_at'].isoformat()
        
        return jsonify({
            "user": user
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500