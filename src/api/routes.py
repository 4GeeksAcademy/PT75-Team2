"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Itinerary, Wishlist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# SIGNUP (REGISTER USER)


@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already in use"}), 409

    new_user = User(name=name, email=email)
    new_user.set_password(password)  # Hash the password before saving
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# LOGIN (AUTHENTICATE USER)
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"message": "Login successful", "token": token, "user": user.serialize()})

# PROTECTED ROUTE (REQUIRES AUDTH)


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": "Access granted", "user": current_user}), 200


@api.route("/itinerary", methods=["POST"])
@jwt_required()
def add_to_itinerary():
    user_id = get_jwt_identity()
    data = request.get_json()

    new_item = Itinerary(
        user_id=user_id,
        location=data.get("location"),
        start_date=data.get("start_date"),
        end_date=data.get("end_date")
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.serialize()), 201


@api.route("/itinerary", methods=["GET"])
@jwt_required()
def get_itinerary():
    user_id = get_jwt_identity()
    itinerary_items = Itinerary.query.filter_by(user_id=user_id).all()

    return jsonify([item.serialize() for item in itinerary_items]), 200


@api.route("/itinerary/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_itinerary_item(item_id):
    item = Itinerary.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item removed"}), 200


@api.route("/hotels", methods=["GET"])
def get_hotels():
    try:
        destination = request.args.get("destination")
        if not destination:
            return jsonify({"error": "Destination is required"}), 400

        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

        if not GOOGLE_API_KEY:
            return jsonify({"error": "Google API Key not found"}), 500

        print("Destination:", destination)
        print("GOOGLE_API_KEY exists:", bool(GOOGLE_API_KEY))

        # Step 1: Get coordinates
        geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={destination}&key={GOOGLE_API_KEY}"
        geo_response = requests.get(geocode_url)
        geo_data = geo_response.json()

        print("Geocoding response:", geo_data)

        if geo_data["status"] != "OK":
            return jsonify({"error": "Failed to get coordinates"}), 500

        location = geo_data["results"][0]["geometry"]["location"]
        lat = location["lat"]
        lng = location["lng"]

        print("Coordinates:", lat, lng)

        # Step 2: Get hotels
        places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=5000&type=lodging&key={GOOGLE_API_KEY}"
        places_response = requests.get(places_url)
        places_data = places_response.json()

        print("Places response:", places_data)

        if places_data["status"] != "OK":
            return jsonify({"error": "Failed to fetch hotels", "details": places_data}), 500

        return jsonify(places_data["results"]), 200

    except Exception as e:
        print("Server error:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


@api.route("/wishlist", methods=["POST"])
@jwt_required()
def add_to_wishlist():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Prevent duplicates
    existing = Wishlist.query.filter_by(
        user_id=user_id, place_id=data["place_id"]).first()
    if existing:
        return jsonify({"error": "Already in wishlist"}), 409

    new_item = Wishlist(
        user_id=user_id,
        place_id=data["place_id"],
        name=data["name"],
        address=data.get("address"),
        rating=data.get("rating"),
        photo_reference=data.get("photo_reference")
    )
    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.serialize()), 201


@api.route("/wishlist/<string:place_id>", methods=["DELETE"])
@jwt_required()
def remove_from_wishlist(place_id):
    user_id = get_jwt_identity()
    item = Wishlist.query.filter_by(user_id=user_id, place_id=place_id).first()

    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Removed from wishlist"}), 200


@api.route("/wishlist", methods=["GET"])
@jwt_required()
def get_wishlist():
    user_id = get_jwt_identity()
    items = Wishlist.query.filter_by(user_id=user_id).all()
    return jsonify([item.serialize() for item in items]), 200
