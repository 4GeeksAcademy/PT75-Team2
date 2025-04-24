"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import jsonify
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Itinerary, Wishlist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
import requests
import sendgrid
from sendgrid.helpers.mail import Mail
import secrets
from datetime import datetime, timedelta


def generate_reset_token():
    return secrets.token_urlsafe(32)


api = Blueprint('api', __name__)
# CORS(api, origins=["https://miniature-invention-r4pp9wq9p46rh5x7q-3000.app.github.dev"], supports_credentials=True)
# Allow CORS requests to this API
# CORS(api)


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


@api.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200


@api.route("/account", methods=["PATCH"])
@jwt_required()
def update_account():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    user.name = data.get("name", user.name)
    db.session.commit()

    return jsonify({"message": "Profile updated", "user": user.serialize()}), 200


@api.route("/account/password", methods=["PATCH"])
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    data = request.get_json()
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not user or not current_password or not new_password:
        return jsonify({"error": "Missing fields"}), 400

    if not user.check_password(current_password):
        return jsonify({"error": "Current password is incorrect"}), 403

    user.set_password(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


UPLOAD_FOLDER = os.path.join("static", "avatars")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


@api.route("/account/avatar", methods=["POST"])
@jwt_required()
def upload_avatar():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if 'avatar' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['avatar']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS:
        return jsonify({"error": "File type not allowed"}), 400

    # Ensure upload folder exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    filename = secure_filename(f"user_{user.id}_{file.filename}")
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Store the relative path or full URL if preferred
    user.avatar = f"/static/avatars/{filename}"
    db.session.commit()

    return jsonify({"message": "Avatar uploaded", "avatar_url": user.avatar}), 200


def get_location_image_url(location, GOOGLE_API_KEY):
    try:
        query = f"{location} tourism"
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={GOOGLE_API_KEY}"
        res = requests.get(url)
        data = res.json()
        if data.get("results"):
            place = data["results"][0]
            if "photos" in place:
                photo_ref = place["photos"][0]["photo_reference"]
                return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
    except Exception as e:
        print(f"Failed to fetch location image for {location}: {str(e)}")
    return "https://source.unsplash.com/700x200/?travel"


@api.route("/itinerary", methods=["POST"])
@jwt_required()
def add_to_itinerary():
    print("User ID from token:", get_jwt_identity())
    user_id = get_jwt_identity()
    data = request.get_json()

    new_item = Itinerary(
        user_id=user_id,
        location=data.get("location"),
        start_date=data.get("start_date"),
        end_date=data.get("end_date"),
        note=data.get("note")
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.serialize()), 201


@api.route("/itinerary/<int:id>", methods=["PUT"])
@jwt_required()
def edit_to_itinerary(id):
    print("User ID from token:", get_jwt_identity())
    user_id = get_jwt_identity()
    data = request.get_json()

    itinerary_item = Itinerary.query.filter_by(id=id, user_id=user_id).first()

    if not itinerary_item:
        return jsonify({"error": "Itinerary item not found"}), 404

    itinerary_item.location = data.get("location", itinerary_item.location)
    itinerary_item.start_date = data.get(
        "start_date", itinerary_item.start_date)
    itinerary_item.end_date = data.get("end_date", itinerary_item.end_date)

    db.session.commit()

    return jsonify(itinerary_item.serialize()), 201


@api.route("/itinerary", methods=["GET"])
@jwt_required()
def get_itinerary():
    user_id = get_jwt_identity()
    itinerary_items = Itinerary.query.filter_by(user_id=user_id).all()

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    enriched_itinerary = []

    for item in itinerary_items:
        location = item.location

        # ---- Fetch Hotel ----
        hotel_image_url = None
        try:
            hotel_query = f"hotel in {location}"
            hotel_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={hotel_query}&key={GOOGLE_API_KEY}"
            hotel_response = requests.get(hotel_url)
            hotel_data = hotel_response.json()
            if hotel_data.get("results"):
                first_hotel = hotel_data["results"][0]
                if "photos" in first_hotel:
                    photo_ref = first_hotel["photos"][0]["photo_reference"]
                    hotel_image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
                else:
                    hotel_image_url = "/placeholder.jpg"
        except:
            hotel_image_url = "/placeholder.jpg"

        # ---- Fetch Attractions ----
        attractions = []
        try:
            attraction_query = f"tourist attractions in {location}"
            attraction_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={attraction_query}&key={GOOGLE_API_KEY}"
            attraction_response = requests.get(attraction_url)
            attraction_data = attraction_response.json()

            if attraction_data.get("results"):
                for place in attraction_data["results"][:3]:
                    photo_url = "/placeholder.jpg"
                    if "photos" in place:
                        photo_ref = place["photos"][0]["photo_reference"]
                        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={GOOGLE_API_KEY}"

                    attractions.append({
                        "name": place.get("name"),
                        "photo_url": photo_url
                    })
        except Exception as e:
            print("Error fetching attractions:", e)

        location_image_url = get_location_image_url(location, GOOGLE_API_KEY)

        enriched_itinerary.append({
            **item.serialize(),
            "hotel_image_url": hotel_image_url,
            "location_image_url": location_image_url,
            "attractions": attractions
        })

    return jsonify(enriched_itinerary), 200


@api.route("/itinerary/<int:item_id>", methods=["DELETE"])
@jwt_required()
def remove_itinerary_item(item_id):
    item = Itinerary.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item removed"}), 200


@api.route('/shared/itinerary/<int:user_id>', methods=['GET'])
def shared_itinerary(user_id):
    user = User.query.get(user_id)
    itinerary_items = Itinerary.query.filter_by(user_id=user_id).all()

    if not user or not itinerary_items:
        return jsonify({"error": "Itinerary not found"}), 404

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    enriched_itinerary = []

    for item in itinerary_items:
        location = item.location

        # --- Hotel image ---
        hotel_image_url = "/placeholder.jpg"
        try:
            hotel_query = f"hotel in {location}"
            hotel_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={hotel_query}&key={GOOGLE_API_KEY}"
            hotel_res = requests.get(hotel_url).json()
            if hotel_res.get("results"):
                photo_ref = hotel_res["results"][0].get(
                    "photos", [{}])[0].get("photo_reference")
                if photo_ref:
                    hotel_image_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
        except Exception as e:
            print("Hotel image fetch error:", e)

        # --- Attractions (if needed) ---
        attractions = []
        try:
            query = f"tourist attractions in {location}"
            url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={GOOGLE_API_KEY}"
            results = requests.get(url).json().get("results", [])
            for place in results[:3]:
                photo = place.get("photos", [{}])[0].get("photo_reference", "")
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo}&key={GOOGLE_API_KEY}" if photo else "/placeholder.jpg"
                attractions.append(
                    {"name": place.get("name"), "photo_url": photo_url})
        except Exception as e:
            print("Attraction fetch error:", e)

        location_image_url = get_location_image_url(location, GOOGLE_API_KEY)

        enriched_itinerary.append({
            **item.serialize(),
            "hotel_image_url": hotel_image_url,
            "location_image_url": location_image_url,
            "attractions": attractions
        })

    return jsonify(enriched_itinerary), 200


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

    # Validate incoming data
    if not data or "place_id" not in data:
        return jsonify({"error": "Missing or invalid JSON payload"}), 400

    # Prevent duplicates
    existing = Wishlist.query.filter_by(
        user_id=user_id, place_id=data["place_id"]
    ).first()
    if existing:
        return jsonify({"error": "Already in wishlist"}), 409

    new_item = Wishlist(
        user_id=user_id,
        place_id=data["place_id"],
        name=data.get("name"),
        address=data.get("address"),
        rating=data.get("rating"),
        photo_reference=data.get("photo_reference")
    )
    db.session.add(new_item)
    db.session.commit()
    print("Received wishlist payload:", data)
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


@api.route("/place-details/<place_id>", methods=["GET"])
def get_place_details(place_id):
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    if not GOOGLE_API_KEY:
        return jsonify({"error": "Google API Key not found"}), 500

    try:
        fields = "formatted_phone_number,website,user_ratings_total"
        url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields={fields}&key={GOOGLE_API_KEY}"

        response = requests.get(url)
        data = response.json()

        if data.get("status") != "OK":
            return jsonify({"error": "Failed to fetch place details", "details": data}), 500

        return jsonify(data.get("result", {})), 200

    except Exception as e:
        print("Error fetching place details:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@api.route("/attractions", methods=["GET"])
def get_attractions():
    destination = request.args.get("destination")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    if not GOOGLE_API_KEY:
        return jsonify({"error": "Google API Key not found"}), 500

    if not destination:
        return jsonify({"error": "Destination is required"}), 400

    try:
        # We'll fetch both restaurants and attractions
        queries = [
            f"restaurant in {destination}",
            f"tourist_attraction in {destination}"
        ]

        all_results = []

        for query in queries:
            url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={GOOGLE_API_KEY}"
            response = requests.get(url)
            data = response.json()

            if data.get("status") == "OK":
                all_results.extend(data.get("results", []))

        # Add photo_url for each place
        for place in all_results:
            if "photos" in place:
                photo_ref = place["photos"][0]["photo_reference"]
                place[
                    "photo_url"] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
            else:
                place["photo_url"] = "/placeholder.jpg"

        return jsonify({"results": all_results}), 200

    except Exception as e:
        print("Error fetching attractions:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@api.route("/top-destinations", methods=["GET"])
def get_top_destinations():
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    query = request.args.get("query")

    if not GOOGLE_API_KEY:
        return jsonify({"error": "Google API Key not found"}), 500

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    try:
        url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={GOOGLE_API_KEY}"
        response = requests.get(url)
        data = response.json()

        for place in data.get("results", []):
            if "photos" in place:
                photo_ref = place["photos"][0]["photo_reference"]
                place[
                    "photo_url"] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_ref}&key={GOOGLE_API_KEY}"
            else:
                place["photo_url"] = "/placeholder.jpg"

        return jsonify({"results": data.get("results", [])}), 200

    except Exception as e:
        print("Error fetching destinations:", e)
        return jsonify({"error": "Internal Server Error"}), 500


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_name(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"username": user.name}), 200


@api.route("/verify-user", methods=["POST"])
def verify_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Both name and email are required."}), 400

    user = User.query.filter_by(name=name, email=email).first()
    if not user:
        return jsonify({"error": "No matching user found."}), 404

    return jsonify({"message": "User verified."}), 200


def send_email(to, subject, content):
    sg = sendgrid.SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
    email = Mail(
        from_email=os.getenv("SENDGRID_FROM_EMAIL"),
        to_emails=to,
        subject=subject,
        plain_text_content=content
    )
    sg.send(email)


@api.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found"}), 404

    import random
    code = f"{random.randint(100000, 999999)}"
    user.reset_code = code
    user.reset_code_expiry = datetime.utcnow() + timedelta(minutes=15)
    db.session.commit()

    # Send the 6-digit code using SendGrid
    send_email(
        to=email,
        subject="TripSync Password Reset Code",
        content=f"Your password reset code is: {code}\n\nThis code will expire in 15 minutes."
    )

    return jsonify({"message": "Reset code sent"}), 200


@api.route("/verify-reset-code", methods=["POST"])
def verify_reset_code():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    user = User.query.filter_by(email=email).first()
    if not user or user.reset_code != code:
        return jsonify({"error": "Invalid code"}), 400

    if datetime.utcnow() > user.reset_code_expiry:
        return jsonify({"error": "Code expired"}), 403

    return jsonify({"message": "Code verified"}), 200


@api.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("new_password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.set_password(new_password)
    user.reset_code = None
    user.reset_code_expiry = None
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200
