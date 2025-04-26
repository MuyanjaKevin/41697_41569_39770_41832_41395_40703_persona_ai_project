from flask import Blueprint, request, jsonify

from flask_jwt_extended import jwt_required, get_jwt_identity

from bson.objectid import ObjectId

import datetime

import openai

import os
 
# Initialize blueprint

style_bp = Blueprint('style', __name__)
 
# Create or update style profile

@style_bp.route('/profile', methods=['POST'])

@jwt_required()

def create_or_update_profile():

    try:

        # Get current user ID from JWT token

        current_user_id = get_jwt_identity()

        # Get profile data from request

        data = request.get_json()

        # Check if required fields are present

        if 'preferences' not in data:

            return jsonify({"error": "Missing preferences data"}), 400

        # Get or create style profile

        existing_profile = style_bp.mongo.db.style_profiles.find_one(

            {'user_id': ObjectId(current_user_id)}

        )

        # Generate AI analysis based on preferences

        ai_analysis = generate_ai_analysis(data['preferences'])

        if existing_profile:

            # Update existing profile

            style_bp.mongo.db.style_profiles.update_one(

                {'_id': existing_profile['_id']},

                {'$set': {

                    'preferences': data['preferences'],

                    'ai_analysis': ai_analysis,

                    'updated_at': datetime.utcnow()

                }}

            )

            profile_id = existing_profile['_id']

        else:

            # Create new profile

            from models import create_style_profile

            new_profile = create_style_profile(

                user_id=ObjectId(current_user_id),

                preferences=data['preferences'],

                ai_analysis=ai_analysis

            )

            result = style_bp.mongo.db.style_profiles.insert_one(new_profile)

            profile_id = result.inserted_id

            # Update user document with style profile reference

            style_bp.mongo.db.users.update_one(

                {'_id': ObjectId(current_user_id)},

                {'$set': {'style_profile': profile_id}}

            )

        return jsonify({

            "message": "Style profile saved successfully",

            "profile_id": str(profile_id),

            "ai_analysis": ai_analysis

        }), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500
 
# Get user's style profile

@style_bp.route('/profile', methods=['GET'])

@jwt_required()

def get_profile():

    try:

        # Get current user ID from JWT token

        current_user_id = get_jwt_identity()

        # Find profile in database

        profile = style_bp.mongo.db.style_profiles.find_one(

            {'user_id': ObjectId(current_user_id)}

        )

        if not profile:

            return jsonify({

                "message": "No style profile found",

                "has_profile": False

            }), 200

        # Format for response

        profile['_id'] = str(profile['_id'])

        profile['user_id'] = str(profile['user_id'])

        # Convert datetime objects

        if 'created_at' in profile:

            profile['created_at'] = profile['created_at'].isoformat()

        if 'updated_at' in profile:

            profile['updated_at'] = profile['updated_at'].isoformat()

        return jsonify({

            "profile": profile,

            "has_profile": True

        }), 200

    except Exception as e:

        return jsonify({"error": str(e)}), 500
 
# Function to generate AI analysis of style preferences

def generate_ai_analysis(preferences):

    try:

        # Set up OpenAI client

        api_key = os.environ.get('OPENAI_API_KEY')

        if not api_key:

            raise ValueError("OpenAI API key not found")

        client = openai.OpenAI(api_key=api_key)

        # Create prompt based on preferences

        prompt = create_style_prompt(preferences)

        # Call OpenAI API

        response = client.chat.completions.create(

            model="gpt-3.5-turbo",

            messages=[

                {"role": "system", "content": "You are a professional fashion stylist and personal shopper with expertise in analyzing style preferences."},

                {"role": "user", "content": prompt}

            ],

            max_tokens=500

        )

        # Parse and structure the response

        analysis_text = response.choices[0].message.content

        # Structure the analysis

        return {

            "description": analysis_text,

            "keywords": extract_style_keywords(analysis_text),

            "generated_at": datetime.utcnow().isoformat()

        }

    except Exception as e:

        print(f"Error generating AI analysis: {e}")

        return {

            "description": "Unable to generate style analysis at this time.",

            "error": str(e)

        }
 
# Helper function to create prompt from preferences

def create_style_prompt(preferences):

    prompt = "Based on the following style preferences, provide a comprehensive analysis of this person's style profile:\n\n"

    for category, value in preferences.items():

        prompt += f"- {category.replace('_', ' ').title()}: {value}\n"

    prompt += "\nPlease provide:\n"

    prompt += "1. A summary of their overall style aesthetic\n"

    prompt += "2. Key style elements that define their look\n"

    prompt += "3. Recommendations for clothing items and accessories\n"

    prompt += "4. Color palette suggestions\n"

    prompt += "5. Brands or stores that would match their style\n"

    return prompt
 
# Helper function to extract key style keywords

def extract_style_keywords(analysis_text):

    # This is a simple implementation - could be enhanced with NLP

    common_style_words = [

        "casual", "formal", "bohemian", "preppy", "vintage", "minimalist",

        "classic", "edgy", "streetwear", "elegant", "sophisticated",

        "athletic", "sporty", "comfortable", "trendy", "conservative"

    ]

    found_keywords = []

    for word in common_style_words:

        if word.lower() in analysis_text.lower():

            found_keywords.append(word)

    # Ensure we have at least a few keywords

    if len(found_keywords) < 3:

        # Default fallbacks

        found_keywords = ["personalized", "balanced", "thoughtful"]

    return found_keywords[:5]  # Return up to 5 keywords
 