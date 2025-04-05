import React, { useState } from "react";
import { motion } from "framer-motion";
// import Attractions from "./Attractions";
import "../syncSpin.css";


const cities = [
    "Paris", "Tokyo", "New York", "Sydney", "Barcelona",
    "Dubai", "Cape Town", "Rio de Janeiro", "Rome!", "Bangkok"
];
// const cities = [
//     { name: "Paris", lat: 48.8566, lng: 2.3522 },
//     { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
//     { name: "New York", lat: 40.7128, lng: -74.0060 },
//     { name: "Sydney", lat: -33.8688, lng: 151.2093 },
//     { name: "Barcelona", lat: 41.3784, lng: 2.1927 },
//     { name: "Dubai", lat: 25.276987, lng: 55.296249 },
//     { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
//     { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
//     { name: "Rome", lat: 41.9028, lng: 12.4964 },
//     { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
// ];

const getRandomRotation = () => {
    const spins = 5 + Math.floor(Math.random() * 5); // 5-10 full spins
    const stopAngle = (360 / cities.length) * Math.floor(Math.random() * cities.length);
    return spins * 360 + stopAngle;
};

const SyncSpin = () => {
    const [rotation, setRotation] = useState(0);
    const [selectedCity, setSelectedCity] = useState("");

    const spinWheel = () => {
        const newRotation = getRandomRotation();
        setRotation(newRotation);

        // Calculate selected city
        setTimeout(() => {
            const index = Math.floor((newRotation % 360) / (360 / cities.length));
            const selected = cities[index];
            setSelectedCity(cities[index]);
        }, 3000); // Sync with animation duration
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
                                <button type="button" class="btn btn-light btn-lg spin-button" onClick={spinWheel}>
                                    Spin the Wheel!
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* {selectedCity && <Attractions city={selectedCity} />} */}
        </div>
    );
};

export default SyncSpin;
