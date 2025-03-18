"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Itinerary
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/signup", methods=['POST'])
def add_to_user_database():
    data = request.get_json()
    email = data.get("email")
    password =data.get("password")

    if not data.get("email") and not data.get("password"):
        return jsonify({"message": "Missing Credentials"})
    
    
    new_user = User(email=email, password=password, is_active = True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message":"User created successfully"})

@api.route("/itinerary", methods=["POST"])
@jwt_required()
def add_to_itinerary():
    user_id = get_jwt_identity()
    data = request.get_json()


    new_item = Itinerary(
        user_id= user_id,
        location = data.get("location"),
        start_date= data.get("start_date"),
        end_date= data.get("end_date")
    )
    
    db.session.add(new_item)
    db.session.commit()
    
    return jsonify(new_item.serialize()), 201



@api.route("/itinerary", methods=["GET"])
@jwt_required()
def get_itinerary():
    user_id = get_jwt_identity()
    itinerary_items = Itinerary.query.filter_by(user_id=user_id).all()
    
    return jsonify({itinerary_items}), 200


@api.route("/itinerary/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_itinerary_item(item_id):
    item = Itinerary.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item removed"}), 200




    
