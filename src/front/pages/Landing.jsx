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

            <section className="py-5">
                <h3 className="text-center mb-4">Explore TripSync Features</h3>
                <div className="container">
                    <div className="row g-4">
                        {/* Hotels */}
                        <div className="col-sm-6 col-md-3">
                            <Link
                                to="/hotels"
                                className="card text-center h-100 shadow-sm text-decoration-none text-dark rounded-4 border-0"
                                style={{ transition: 'transform 0.2s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <i className="bi bi-building fs-1 text-primary mb-3"></i>
                                    <h5 className="card-title">Hotels</h5>
                                    <p className="card-text">Find the best places to stay around the world.</p>
                                </div>
                            </Link>
                        </div>

                        {/* Attractions */}
                        <div className="col-sm-6 col-md-3">
                            <Link
                                to="/attractions"
                                className="card text-center h-100 shadow-sm text-decoration-none text-dark rounded-4 border-0"
                                style={{ transition: 'transform 0.2s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <i className="bi bi-geo-alt fs-1 text-danger mb-3"></i>
                                    <h5 className="card-title">Attractions</h5>
                                    <p className="card-text">Discover restaurants and activities in every destination.</p>
                                </div>
                            </Link>
                        </div>

                        {/* SyncSpin */}
                        <div className="col-sm-6 col-md-3">
                            <Link
                                to="/syncspin"
                                className="card text-center h-100 shadow-sm text-decoration-none text-dark rounded-4 border-0"
                                style={{ transition: 'transform 0.2s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <i className="bi bi-shuffle fs-1 text-info mb-3"></i>
                                    <h5 className="card-title">SyncSpin</h5>
                                    <p className="card-text">Feeling lucky? Let us help you pick your next destination.</p>
                                </div>
                            </Link>
                        </div>

                        {/* Itinerary */}
                        <div className="col-sm-6 col-md-3">
                            <Link
                                to="/itinerary"
                                className="card text-center h-100 shadow-sm text-decoration-none text-dark rounded-4 border-0"
                                style={{ transition: 'transform 0.2s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <i className="bi bi-list-check fs-1 text-success mb-3"></i>
                                    <h5 className="card-title">Itinerary</h5>
                                    <p className="card-text">Plan your full trip in one place and access it anytime.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 text-center">
                <h3 className="mb-4">How TripSync Works</h3>
                <div className="row g-4">
                    <div className="col-md-4">
                        <i className="bi bi-search text-primary fs-1"></i>
                        <h5 className="mt-3">Explore Destinations</h5>
                        <p className="text-muted">Search for top hotels, restaurants, and activities around the world.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-heart-fill text-danger fs-1"></i>
                        <h5 className="mt-3">Save Your Favorites</h5>
                        <p className="text-muted">Wishlist the places you love and organize them in one spot.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="bi bi-calendar-check-fill text-success fs-1"></i>
                        <h5 className="mt-3">Sync Your Itinerary</h5>
                        <p className="text-muted">Plan your full trip and access your itinerary anytime, anywhere.</p>
                    </div>
                </div>
            </section>

            <hr />

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


            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h3 className="mb-5">What Our Users Say</h3>

                    <div className="row justify-content-center g-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4">
                                <p className="mb-3 fst-italic">“TripSync helped me organize a last-minute trip to Europe—hotels, activities, everything was in one place!”</p>
                                <h6 className="fw-bold mb-0">Sarah M.</h6>
                                <p className="text-muted small">Solo Traveler from Boston</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4">
                                <p className="mb-3 fst-italic">“I used SyncSpin and it randomly picked Thailand for me. Best vacation decision ever!”</p>
                                <h6 className="fw-bold mb-0">Kevin L.</h6>
                                <p className="text-muted small">Adventure Seeker</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4">
                                <p className="mb-3 fst-italic">“The wishlist and itinerary tools made it super easy to plan our honeymoon. Loved the interface!”</p>
                                <h6 className="fw-bold mb-0">Amanda & James</h6>
                                <p className="text-muted small">Newlyweds from Miami</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



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


            <section className="py-5 bg-primary text-white text-center">
                <div className="container">
                    <h2 className="mb-3">Ready to Plan Your Dream Trip?</h2>
                    <p className="lead mb-4">Join TripSync today and start organizing your perfect vacation in just a few clicks.</p>
                    <Link to="/signup" className="btn btn-light btn-lg fw-bold px-4">
                        Get Started Free
                    </Link>
                </div>
            </section>

        </div>
    );
};
