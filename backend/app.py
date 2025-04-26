from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv
from datetime import timedelta
import logging
from style_profile import style_bp

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MongoDB with better error handling
try:
    app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://localhost:27017/personashop")
    logger.debug(f"Attempting MongoDB connection with URI: {app.config['MONGO_URI']}")
    mongo = PyMongo(app)
    # Test connection
    mongo.db.command('ping')
    logger.info("MongoDB connected successfully!")
except Exception as e:
    logger.error(f"MongoDB connection error: {e}")
    print(f"CRITICAL ERROR: MongoDB connection failed: {e}")

# Configure JWT
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key-change-in-production")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Import and register blueprints
from auth import auth_bp

# Add mongo to auth blueprint
auth_bp.mongo = mongo
style_bp.mongo = mongo
# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(style_bp, url_prefix='/api/style')
# Test route
@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Backend is working!"})

# Test MongoDB connection
@app.route('/api/db-test', methods=['GET'])
def test_db():
    try:
        # Attempt to fetch a document from the database
        result = mongo.db.test_collection.find_one({})
        
        # If we get here, the connection is working
        return jsonify({
            "message": "Database connection successful!",
            "data": str(result)
        })
    except Exception as e:
        logger.error(f"Database test failed: {e}")
        return jsonify({
            "message": "Database connection failed",
            "error": str(e)
        }), 500

# Add test data
@app.route('/api/create-test-data', methods=['GET'])
def create_test_data():
    try:
        from models import create_product
        
        # Sample products
        products = [
            create_product(
                name="Blue T-Shirt",
                description="A comfortable cotton t-shirt",
                price=19.99,
                image_url="https://example.com/blue-tshirt.jpg",
                categories=["clothing", "casual", "t-shirts"],
                attributes={"color": "blue", "material": "cotton", "gender": "unisex"}
            ),
            create_product(
                name="Black Jeans",
                description="Classic black denim jeans",
                price=49.99,
                image_url="https://example.com/black-jeans.jpg",
                categories=["clothing", "casual", "jeans"],
                attributes={"color": "black", "material": "denim", "gender": "unisex"}
            )
        ]
        
        # Insert products into database
        result = mongo.db.products.insert_many(products)
        
        return jsonify({
            "message": f"Created {len(result.inserted_ids)} test products",
            "product_ids": [str(id) for id in result.inserted_ids]
        })
    except Exception as e:
        logger.error(f"Error creating test data: {e}")
        return jsonify({"error": str(e)}), 500

# Get all products
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = list(mongo.db.products.find())
        
        # Convert ObjectId to string for JSON serialization
        for product in products:
            product['_id'] = str(product['_id'])
            product['created_at'] = product['created_at'].isoformat()
            product['updated_at'] = product['updated_at'].isoformat()
        
        return jsonify({
            "products": products,
            "count": len(products)
        })
    except Exception as e:
        logger.error(f"Error fetching products: {e}")
        return jsonify({"error": str(e)}), 500

# Start the server
if __name__ == '__main__':
    app.run(debug=True)