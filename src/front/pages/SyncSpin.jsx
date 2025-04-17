import React, { useState } from "react";
import { motion } from "framer-motion";
import "../css/SyncSpin.css";
import rigoPhoto from "../assets/img/rigo-baby.jpg";

const cities = [
    "Paris", "Tokyo", "New York", "Sydney", "Barcelona",
    "Rio de Janeiro", "Rome", "Madrid", "London", "Cairo",
    "Dublin", "Istanbul", "San Francisco", "Berlin", "Mexico City",
    "Vancouver", "Seoul", "Johannesburg", "Beunos Aires", "Amsterdam",
];

const getRandomRotation = () => {
    const spins = 5 + Math.floor(Math.random() * 5);
    const stopAngle = (360 / cities.length) * Math.floor(Math.random() * cities.length);
    return spins * 360 + stopAngle;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const getPhotoUrl = (place) => {
    if (place.photo_url) return place.photo_url;
    if (place.photos?.length > 0) {
        const photoRef = place.photos[0].photo_reference;
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
    }
    // Fallback placeholder
    return rigoPhoto;
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
            const hotelRes = await fetch(`${BACKEND_URL}hotels?destination=${city}`);
            const hotelData = await hotelRes.json();
            setHotel(hotelData[0] || null);

            const attrRes = await fetch(`${BACKEND_URL}attractions?destination=${city}`);
            const attrData = await attrRes.json();

            const restaurantResult = attrData.results.find(p => p.types?.includes("restaurant"));
            const attractionResult = attrData.results.find(p => p.types?.includes("tourist_attraction"));

            setRestaurant(restaurantResult || null);
            setAttraction(attractionResult || null);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };


    const spinWheel = () => {
        const newRotation = getRandomRotation();
        setRotation(newRotation);

        let index = 0;
        const cycleInterval = 100;
        const duration = 3000;
        const steps = duration / cycleInterval;

        let currentStep = 0;
        const intervalId = setInterval(() => {
            setSelectedCity(cities[index % cities.length]);
            index++;
            currentStep++;

            if (currentStep >= steps) {
                clearInterval(intervalId);

                const finalIndex = Math.floor((newRotation % 360) / (360 / cities.length));
                const selected = cities[finalIndex];
                setSelectedCity(selected);
                fetchData(selected);
            }
        }, cycleInterval);
    };

    const saveToItinerary = async (place, type) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to save to your itinerary.");
            return;
        }

        const body = {
            name: place.name,
            location: getAddress(place),
            place_id: place.place_id,
            type,
            photo_url: getPhotoUrl(place),
            start_date: new Date().toISOString().split("T")[0],
            end_date: new Date().toISOString().split("T")[0],
        };

        try {
            await fetch(`${BACKEND_URL}itinerary`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            alert(`${type} added to your itinerary!`);
        } catch (err) {
            console.error("Failed to add to itinerary:", err);
        }
    };

    return (
        <div className="container-fluid">
            {/* Wheel and Header Section */}
            <div className="row justify-content-center align-items-center my-5">
                <div className="col-sm-12 col-md-8 col-lg-6 col-xxl-3 text-center wheel-wrapper">
                    <div className="wheel-canvas-wrapper position-relative">
                        <motion.canvas
                            className="wheel-canvas"
                            width="300"
                            height="300"
                            animate={{ rotate: rotation }}
                            transition={{ type: "tween", duration: 3, ease: "easeOut" }}
                            ref={(canvas) => {
                                if (!canvas) return;

                                const ctx = canvas.getContext("2d");
                                const radius = canvas.width / 2;
                                const angleStep = (2 * Math.PI) / cities.length;

                                // Draw the wheel
                                const drawWheel = () => {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

                                    // Draw wheel slices (cities)
                                    cities.forEach((city, i) => {
                                        const startAngle = i * angleStep;
                                        const endAngle = startAngle + angleStep;
                                        ctx.beginPath();
                                        ctx.moveTo(radius, radius);
                                        ctx.arc(radius, radius, radius, startAngle, endAngle);
                                        ctx.fillStyle = `hsl(${(i * 360) / cities.length}, 70%, 60%)`;
                                        ctx.fill();

                                        // Draw city names in the center of each slice
                                        ctx.save();
                                        ctx.translate(radius, radius); // Move context to the center of the wheel
                                        ctx.rotate(startAngle + angleStep / 2); // Rotate context to the middle of the slice
                                        ctx.fillStyle = "#fff";
                                        ctx.font = "12px sans-serif";
                                        ctx.textAlign = "right";
                                        ctx.fillText(city, radius - 10, 5);
                                        ctx.restore();
                                    });

                                    // Draw pointer (Arrow)
                                    const pointerAngle = (rotation % 360) * (Math.PI / 180); // Convert rotation to radians
                                    ctx.save();
                                    ctx.translate(radius, 0); // Move pointer to the top center
                                    ctx.rotate(pointerAngle); // Rotate pointer based on the rotation state
                                    ctx.beginPath();
                                    ctx.moveTo(0, -radius); // Top center of the wheel
                                    ctx.lineTo(-10, -radius + 20); // Left side of the pointer
                                    ctx.lineTo(10, -radius + 20); // Right side of the pointer
                                    ctx.closePath();
                                    ctx.fillStyle = "black";
                                    ctx.fill();
                                    ctx.restore();
                                };

                                drawWheel();
                            }}
                        />


                    </div>
                    <h1 className="destination-announce mt-4 display-2">Your next destination:</h1>
                    {selectedCity && <h2 className="selected-city display-1"><strong>{selectedCity}!</strong></h2>}
                </div>

                <div className="col-sm-12 col-md-8 col-lg-6 col-xxl-3 jumbo-wrapper">
                    <div className="jumbotron-container text-center">
                        <h1 className="display-4 jumbo-header">What is SyncSpin?</h1>
                        <p className="lead jumbo-body">
                            Not sure where to jet-off to next? Leave that to SyncSpin. Spin the wheel - we'll take care of the rest!
                        </p>
                        <button type="button" className="btn btn-outline-dark spin-button" onClick={spinWheel}>
                            <div className="display-6">Spin the Wheel!</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="container">

                <div className="row justify-content-center">

                    {hotel && (
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex flex-column align-items-center mb-4">
                            <h1 className="display-4 text-center mb-3">Hotel</h1>
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(hotel)} className="card-img-top sync-card-img-top" alt={hotel.name} />
                                <button className="btn btn-primary sync-itinerary-button" onClick={() => saveToItinerary(hotel, "Hotel")}>
                                    Add to Itinerary
                                </button>
                                <div className="card-body sync-card-body">
                                    <h5 className="card-title">{hotel.name}</h5>
                                    <p className="card-text sync-card-text">{getAddress(hotel)}</p>
                                </div>
                                <div className="card-footer sync-card-footer">
                                    <a
                                        href={`https://www.google.com/maps/place/?q=place_id:${hotel.place_id}`}
                                        className="btn btn-outline-primary sync-maps-button"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-solid fa-location-dot"></i>View on Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {restaurant && (
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex flex-column align-items-center mb-4">
                            <h1 className="display-4 text-center mb-3">Restaurant</h1>
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(restaurant)} className="card-img-top sync-card-img-top" alt={restaurant.name} />
                                <button className="btn btn-primary sync-itinerary-button" onClick={() => saveToItinerary(restaurant, "Restaurant")}>
                                    Add to Itinerary
                                </button>
                                <div className="card-body sync-card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text sync-card-text">{getAddress(restaurant)}</p>
                                </div>
                                <div className="card-footer sync-card-footer">
                                    <a
                                        href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}
                                        className="btn btn-outline-primary sync-maps-button"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-solid fa-location-dot"></i>View on Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {attraction && (
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex flex-column align-items-center mb-4">
                            <h1 className="display-4 text-center mb-3">Attraction</h1>
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(attraction)} className="card-img-top sync-card-img-top" alt={attraction.name} />
                                <button className="btn btn-primary sync-itinerary-button" onClick={() => saveToItinerary(attraction, "Attraction")}>
                                    Add to Itinerary
                                </button>
                                <div className="card-body sync-card-body">
                                    <h5 className="card-title">{attraction.name}</h5>
                                    <p className="card-text sync-card-text">{getAddress(attraction)}</p>
                                </div>
                                <div className="card-footer sync-card-footer">
                                    <a
                                        href={`https://www.google.com/maps/place/?q=place_id:${attraction.place_id}`}
                                        className="btn btn-outline-primary sync-maps-button"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa-solid fa-location-dot"></i>View on Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SyncSpin;
