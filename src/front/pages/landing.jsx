import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselSection } from "../components/CarouselSection";

export const LandingPage = () => {
    const [topDestinations, setTopDestinations] = useState([]);
    const [famousCities, setFamousCities] = useState([]);
    const [vacationSpots, setVacationSpots] = useState([]);

    // Helper to clean and limit results
    const cleanResults = (results) =>
        results
            .filter(
                (place) =>
                    place.photo_url &&
                    place.name &&
                    place.name.length < 50 &&
                    !["Europe", "Central Europe", "Southern Europe", "Eastern Europe", "Western Europe"].includes(place.name)
            )
            .slice(0, 9);

    const fetchDestinations = async () => {
        const destinationsToFetch = {
            topDestinations: ["New York", "Tokyo", "Paris", "Dubai", "Bangkok", "London", "Singapore", "Los Angeles", "Sydney"],
            famousCities: ["Rome", "Barcelona", "Istanbul", "Prague", "Berlin", "Amsterdam", "Vienna", "Buenos Aires", "Cairo"],
            vacationSpots: ["Santorini", "Cinque Terre", "Dubrovnik", "Amalfi Coast", "Hallstatt", "Lake Bled", "Interlaken", "Nice", "Ibiza"]
        };

        const fetchSingle = async (query) => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}top-destinations?query=${encodeURIComponent(query)}`
                );
                const data = await res.json();
                return data.results?.[0] || null;
            } catch (err) {
                console.error(`Error fetching: ${query}`, err);
                return null;
            }
        };

        const fetchGroup = async (group) => {
            const results = await Promise.all(group.map(fetchSingle));
            return results.filter(Boolean); // Remove nulls
        };

        const [top, cities, europe] = await Promise.all([
            fetchGroup(destinationsToFetch.topDestinations),
            fetchGroup(destinationsToFetch.famousCities),
            fetchGroup(destinationsToFetch.vacationSpots)
        ]);

        setTopDestinations(top);
        setFamousCities(cities);
        setVacationSpots(europe);
    };


    useEffect(() => {
        fetchDestinations();
    }, []);

    return (
        <div className="container py-4">
            <div
                className="text-white text-center mb-5 py-5"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                }}
            >
                <h1 className="display-4 fw-bold">Plan Your Perfect Trip with TripSync</h1>
                <p className="lead">Discover, save, and organize your dream vacations effortlessly.</p>
            </div>


            {!topDestinations.length && !famousCities.length && !vacationSpots.length && (
                <div className="text-center text-muted my-5">Loading destinations...</div>
            )}

            {topDestinations.length > 0 && (
                <>
                    <CarouselSection id="topDestinations" title="Top Travel Destinations" places={topDestinations} />

                </>
            )}

            {famousCities.length > 0 && (
                <>
                    <CarouselSection id="famousCities" title="Famous Cities to Visit" places={famousCities} />

                </>
            )}

            {vacationSpots.length > 0 && (
                <>
                    <CarouselSection id="vacationSpots" title="Best Vacation Spots in Europe" places={vacationSpots} />

                </>
            )}

            {/* === About Us Section === */}
            <div className="bg-light p-5 rounded text-center">
                <h3>About TripSync</h3>
                <p className="mb-4">
                    TripSync helps you find top hotels, restaurants, and activities, then sync your dream vacation into one smart itinerary.
                </p>
                <Link to="/aboutus" className="btn btn-primary">
                    Learn More
                </Link>
            </div>
        </div>
    );
};
