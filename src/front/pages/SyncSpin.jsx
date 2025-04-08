// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "../syncSpin.css";


// const cities = [
//     "Paris", "Tokyo", "New York", "Sydney", "Barcelona",
//     "Dubai", "Cape Town", "Rio de Janeiro", "Rome", "Bangkok",
//     "Madrid", "London", "Dublin", "Istanbul", "San Francisco", "New Orleans", "Milan",
//     "Berlin", "Cairo", "Dubai", "Mexico City", "Vancouver", "Prague", "Manila", "Seoul",
//     "Johannesburg", "Beunos Aires", "Amsterdam", "Nassau"
// ];


// const getRandomRotation = () => {
//     const spins = 5 + Math.floor(Math.random() * 5);
//     const stopAngle = (360 / cities.length) * Math.floor(Math.random() * cities.length);
//     return spins * 360 + stopAngle;
// };

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// const getPhotoUrl = (place) => {
//     // If the backend already provided a photo_url, use it.
//     if (place.photo_url) {
//         return place.photo_url;
//     }
//     // If there are photos in the response, generate a URL using the photo_reference.
//     if (place.photos && place.photos.length > 0) {
//         const photoRef = place.photos[0].photo_reference;
//         return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
//     }
//     // Fallback placeholder
//     return "/placeholder.jpg";
// };

// const getAddress = (place) => {
//     return place.vicinity || place.formatted_address || "Address not available";
// };

// const SyncSpin = () => {
//     const [rotation, setRotation] = useState(0);
//     const [selectedCity, setSelectedCity] = useState("");
//     const [hotel, setHotel] = useState(null);
//     const [restaurant, setRestaurant] = useState(null);
//     const [attraction, setAttraction] = useState(null);

//     const fetchData = async (city) => {
//         try {
//             const hotelResponse = await fetch(`${BACKEND_URL}hotels?destination=${city}`);
//             const hotelData = await hotelResponse.json();
//             setHotel(hotelData[0] || null);

//             const attractionResponse = await fetch(`${BACKEND_URL}attractions?destination=${city}`);
//             const attractionData = await attractionResponse.json();

//             const restaurantResult = attractionData.results.find(place => place.types && place.types.includes("restaurant"));
//             const attractionResult = attractionData.results.find(place => place.types && place.types.includes("tourist_attraction"));

//             setRestaurant(restaurantResult || null);
//             setAttraction(attractionResult || null);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const spinWheel = () => {
//         const newRotation = getRandomRotation();
//         setRotation(newRotation);

//         setTimeout(() => {
//             const index = Math.floor((newRotation % 360) / (360 / cities.length));
//             const selected = cities[index];
//             setSelectedCity(cities[index]);
//             fetchData(selected);
//         }, 3000);
//     };

//     const saveToItinerary = async (place, type) => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             alert("Please log in to save to your itinerary.");
//             return;
//         }

//         const body = {
//             name: place.name,
//             location: getAddress(place),
//             place_id: place.place_id,
//             type, // e.g., "Hotel", "Restaurant", "Attraction"
//             photo_url: getPhotoUrl(place),
//             start_date: new Date().toISOString().split("T")[0], // Replace with real dates if needed
//             end_date: new Date().toISOString().split("T")[0],
//         };

//         try {
//             await fetch(`${BACKEND_URL}itinerary`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(body),
//             });
//             alert(`${type} added to your itinerary!`);
//         } catch (err) {
//             console.error("Failed to add to itinerary:", err);
//         }
//     };


//     return (
//         <div>
//             <div className="row container-row inline-block">
//                 <div className="col-6">
//                     <div className="row m-4">
//                         <div className="col wheel-col">
//                             <motion.div
//                                 className="wheel-container"
//                                 animate={{ rotate: rotation }}
//                                 transition={{ type: "tween", duration: 3, ease: "easeOut" }}
//                             >
//                                 <div className="wheel-arrow"></div>
//                             </motion.div>
//                         </div>
//                         <div className="col button-col mt-5">
//                             <div className="row">
//                                 <h1 className="display-5 destination-announce">Your next destination:</h1>
//                                 {selectedCity && <h2 className="mt-1 mx-4 font-bold selected-city">{selectedCity}!</h2>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-6">
//                     <div className="jumbotron jumbotron-fluid">
//                         <div className="container jumbotron-container">
//                             <h1 className="display-4">What is SyncSpin?</h1>
//                             <p className="lead">Not sure where to jet-off to next? Leave that to SyncSpin. Spin the wheel and we'll take care of the rest!</p>
//                             <p className="lead">
//                                 <button type="button" className="btn btn-light btn-lg spin-button" onClick={spinWheel}>
//                                     Spin the Wheel!
//                                 </button>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="container sync-card-container ">
//                 <div className="container d-flex justify-content-center align-items-center p-2">
//                     <div className="row mt-4">

//                         {hotel && (
//                             <div className="col-md-4">
//                                 <h2 className="display-6 text-center">Hotel</h2>
//                                 <div className="card m-2 sync-card" style={{ width: "18rem" }}>
//                                     <img
//                                         src={getPhotoUrl(hotel)}
//                                         className="card-img-top sync-card-img-top"
//                                         alt={hotel.name}
//                                     />
//                                     <button
//                                         className="btn btn-success sync-itinerary-button"
//                                         onClick={() => saveToItinerary(hotel, "Hotel")}
//                                     >
//                                         Add to Itinerary
//                                     </button>
//                                     <div className="card-body sync-card-body">
//                                         <h5 className="card-title sync-card-title">{hotel.name}</h5>
//                                         <p className="card-text sync-card-text">{getAddress(hotel)}</p>
//                                     </div>
//                                     <div className="card-footer sync-card-footer">
//                                         <a
//                                             href={`https://www.google.com/maps/place/?q=place_id:${hotel.place_id}`}
//                                             className="btn btn-outline-primary sync-maps-button"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             <i class="fa-solid fa-location-dot"></i>View on Maps
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {restaurant && (
//                             <div className="col-md-4">
//                                 <h2 className="display-6 text-center">Restaurant</h2>
//                                 <div className="card sync-card m-2" style={{ width: "18rem" }}>
//                                     <img
//                                         src={getPhotoUrl(restaurant)}
//                                         className="card-img-top sync-card-img-top"
//                                         alt={restaurant.name}
//                                     />
//                                     <button
//                                         className="btn btn-success sync-itinerary-button"
//                                         onClick={() => saveToItinerary(restaurant, "Restaurant")}
//                                     >
//                                         Add to Itinerary
//                                     </button>                                    <div className="card-body sync-card-body">
//                                         <h5 className="card-title sync-card-title">{restaurant.name}</h5>
//                                         <p className="card-text sync-card-text">{getAddress(restaurant)}</p>
//                                     </div>
//                                     <div className="card-footer sync-card-footer">
//                                         <a
//                                             href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}
//                                             className="btn btn-outline-primary sync-maps-button"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             <i class="fa-solid fa-location-dot"></i>View on Maps
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {attraction && (
//                             <div className="col-md-4">
//                                 <h2 className="display-6 text-center">Attraction</h2>
//                                 <div className="card m-2 sync-card" style={{ width: "18rem" }}>
//                                     <img
//                                         src={getPhotoUrl(attraction)}
//                                         className="card-img-top sync-card-img-top"
//                                         alt={attraction.name}
//                                     />
//                                     <button
//                                         className="btn btn-success sync-itinerary-button"
//                                         onClick={() => saveToItinerary(attraction, "Attraction")}
//                                     >
//                                         Add to Itinerary
//                                     </button>                                    <div className="card-body sync-card-body">
//                                         <h5 className="card-title">{attraction.name}</h5>
//                                         <p className="card-text sync-card-text">{getAddress(attraction)}</p>
//                                     </div>
//                                     <div className="card-footer sync-card-footer">
//                                         <a
//                                             href={`https://www.google.com/maps/place/?q=place_id:${attraction.place_id}`}
//                                             className="btn btn-outline-primary sync-maps-button"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             <i class="fa-solid fa-location-dot"></i>View on Maps
//                                         </a>

//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default SyncSpin;


import React, { useState } from "react";
import { motion } from "framer-motion";
import "../syncSpin.css";

const cities = [
    "Paris", "Tokyo", "New York", "Sydney", "Barcelona", "Dubai", "Cape Town",
    "Rio de Janeiro", "Rome", "Bangkok", "Madrid", "London", "Dublin", "Istanbul",
    "San Francisco", "New Orleans", "Milan", "Berlin", "Cairo", "Dubai", "Mexico City",
    "Vancouver", "Prague", "Manila", "Seoul", "Johannesburg", "Beunos Aires",
    "Amsterdam", "Nassau"
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
        setTimeout(() => {
            const index = Math.floor((newRotation % 360) / (360 / cities.length));
            const selected = cities[index];
            setSelectedCity(selected);
            fetchData(selected);
        }, 3000);
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
            <div className="row justify-content-center align-items-center my-4">
                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 text-center">
                    <motion.div
                        className="wheel-container"
                        animate={{ rotate: rotation }}
                        transition={{ type: "tween", duration: 3, ease: "easeOut" }}
                    >
                        <div className="wheel-arrow"></div>
                    </motion.div>
                    <h1 className="destination-announce mt-4">Your next destination:</h1>
                    {selectedCity && <h2 className="selected-city">{selectedCity}!</h2>}
                </div>
                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="jumbotron-container text-center">
                        <h1 className="display-4">What is SyncSpin?</h1>
                        <p className="lead">
                            Not sure where to jet-off to next? Leave that to SyncSpin. Spin the wheel and we'll take care of the rest!
                        </p>
                        <button type="button" className="btn btn-light btn-lg spin-button" onClick={spinWheel}>
                            Spin the Wheel!
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="container">
                <div className="row justify-content-center">

                    {hotel && (
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(hotel)} className="card-img-top sync-card-img-top" alt={hotel.name} />
                                <button className="btn btn-success sync-itinerary-button" onClick={() => saveToItinerary(hotel, "Hotel")}>
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
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(restaurant)} className="card-img-top sync-card-img-top" alt={restaurant.name} />
                                <button className="btn btn-success sync-itinerary-button" onClick={() => saveToItinerary(restaurant, "Restaurant")}>
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
                        <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center mb-4">
                            <div className="card sync-card" style={{ width: "18rem" }}>
                                <img src={getPhotoUrl(attraction)} className="card-img-top sync-card-img-top" alt={attraction.name} />
                                <button className="btn btn-success sync-itinerary-button" onClick={() => saveToItinerary(attraction, "Attraction")}>
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
