import React, { useState } from "react";
import { motion } from "framer-motion";
import "../syncSpin.css";


const cities = [
    "Paris", "Tokyo", "New York", "Sydney", "Barcelona",
    "Dubai", "Cape Town", "Rio de Janeiro", "Rome", "Bangkok",
    "Madrid", "London", "Dublin", "Istanbul", "San Francisco", "New Orleans", "Milan",
    "Berlin", "Cairo", "Dubai", "Mexico City", "Vancouver", "Prague", "Manila", "Seoul",
    "Johannesburg", "Beunos Aires", "Amsterdam", "Nassau"
];


const getRandomRotation = () => {
    const spins = 5 + Math.floor(Math.random() * 5);
    const stopAngle = (360 / cities.length) * Math.floor(Math.random() * cities.length);
    return spins * 360 + stopAngle;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const getPhotoUrl = (place) => {
    // If the backend already provided a photo_url, use it.
    if (place.photo_url) {
        return place.photo_url;
    }
    // If there are photos in the response, generate a URL using the photo_reference.
    if (place.photos && place.photos.length > 0) {
        const photoRef = place.photos[0].photo_reference;
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
    }
    // Fallback placeholder
    return "/placeholder.jpg";
};

const getAddress = (place) => {
    return place.vicinity || place.formatted_address || "Address not available";
};

const SyncSpin = () => {
    const [rotation, setRotation] = useState(0);
    const [selectedCity, setSelectedCity] = useState("");
    const [hotel, setHotel] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [attraction, setAttraction] = useState(null);

    const fetchData = async (city) => {
        try {
            const hotelResponse = await fetch(`${BACKEND_URL}hotels?destination=${city}`);
            const hotelData = await hotelResponse.json();
            setHotel(hotelData[0] || null);

            const attractionResponse = await fetch(`${BACKEND_URL}attractions?destination=${city}`);
            const attractionData = await attractionResponse.json();

            const restaurantResult = attractionData.results.find(place => place.types && place.types.includes("restaurant"));
            const attractionResult = attractionData.results.find(place => place.types && place.types.includes("tourist_attraction"));

            setRestaurant(restaurantResult || null);
            setAttraction(attractionResult || null);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const spinWheel = () => {
        const newRotation = getRandomRotation();
        setRotation(newRotation);

        setTimeout(() => {
            const index = Math.floor((newRotation % 360) / (360 / cities.length));
            const selected = cities[index];
            setSelectedCity(cities[index]);
            fetchData(selected);
        }, 3000);
    };

    return (
        <div>
            <div className="row container-row inline-block">
                <div className="col-6">
                    <div className="row m-4">
                        <div className="col wheel-col">
                            <motion.div
                                className="wheel-container"
                                animate={{ rotate: rotation }}
                                transition={{ type: "tween", duration: 3, ease: "easeOut" }}
                            >
                                <div className="wheel-arrow"></div>
                            </motion.div>
                        </div>
                        <div className="col button-col mt-5">
                            <div className="row">
                                <h1 className="display-5 destination-announce">Your next destination:</h1>
                                {selectedCity && <h2 className="mt-1 mx-4 font-bold selected-city">{selectedCity}!</h2>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container jumbotron-container">
                            <h1 className="display-4">What is SyncSpin?</h1>
                            <p className="lead">Not sure where to jet-off to next? Leave that to SyncSpin. Spin the wheel and we'll take care of the rest!</p>
                            <p className="lead">
                                <button type="button" className="btn btn-light btn-lg spin-button" onClick={spinWheel}>
                                    Spin the Wheel!
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container card-container">
                <div className="container d-flex justify-content-center align-items-center p-2">
                    <div className="row mt-4">

                        {hotel && (
                            <div className="col-md-4">
                                <h2 className="display-6 text-center">Hotel</h2>
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={getPhotoUrl(hotel)}
                                        className="card-img-top"
                                        alt={hotel.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{hotel.name}</h5>
                                        <p className="card-text">{getAddress(hotel)}</p>
                                        <a
                                            href={`https://www.google.com/maps/place/?q=place_id:${hotel.place_id}`}
                                            className="btn btn-outline-primary maps-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i class="fa-solid fa-location-dot"></i>View on Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {restaurant && (
                            <div className="col-md-4">
                                <h2 className="display-6 text-center">Restaurant</h2>
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={getPhotoUrl(restaurant)}
                                        className="card-img-top"
                                        alt={restaurant.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{restaurant.name}</h5>
                                        <p className="card-text">{getAddress(restaurant)}</p>
                                        <a
                                            href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}
                                            className="btn btn-outline-primary maps-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i class="fa-solid fa-location-dot"></i>View on Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {attraction && (
                            <div className="col-md-4">
                                <h2 className="display-6 text-center">Attraction</h2>
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={getPhotoUrl(attraction)}
                                        className="card-img-top"
                                        alt={attraction.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{attraction.name}</h5>
                                        <p className="card-text">{getAddress(attraction)}</p>
                                        <a
                                            href={`https://www.google.com/maps/place/?q=place_id:${attraction.place_id}`}
                                            className="btn btn-outline-primary maps-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i class="fa-solid fa-location-dot"></i>View on Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SyncSpin;
