"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Itinerary
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
