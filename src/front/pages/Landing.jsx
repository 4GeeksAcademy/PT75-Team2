import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarouselSection } from "../components/CarouselSection";

export const LandingPage = () => {
    const [topDestinations, setTopDestinations] = useState([]);
    const [famousCities, setFamousCities] = useState([]);
    const [vacationSpots, setVacationSpots] = useState([]);

    const fetchDestinations = async () => {
        const destinationsToFetch = {
            topDestinations: ["New York", "Tokyo", "Paris", "Dubai", "Bangkok", "London", "Singapore", "Los Angeles", "Sydney"],
            famousCities: ["Rome", "Barcelona", "Istanbul", "Prague", "Berlin", "Amsterdam", "Vienna", "Buenos Aires", "Cairo"],
            vacationSpots: ["Santorini", "Cinque Terre", "Dubrovnik", "Amalfi Coast", "Hallstatt", "Lake Bled", "Interlaken", "Nice", "Ibiza"]
        };

        const fetchSingle = async (query) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}top-destinations?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                return data.results?.[0] || null;
            } catch (err) {
                console.error(`Error fetching: ${query}`, err);
                return null;
            }
        };

        const fetchGroup = async (group) => {
            const results = await Promise.all(group.map(fetchSingle));
            return results.filter(Boolean);
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
            {/* Hero */}
            <div
                className="text-white text-center mb-5 py-5 rounded"
                style={{
                    background: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') center/cover no-repeat`,
                }}
            >
                <h1 className="display-4 fw-bold">Plan Your Perfect Trip with TripSync</h1>
                <p className="fs-3">Discover, save, and organize your dream vacations effortlessly.</p>
            </div>

            {/* Features */}
            <section className="py-5">
                <h3 className="text-center mb-4">Explore TripSync Features</h3>
                <div className="row justify-content-center">
                    {[
                        { to: "/hotels", icon: "bi-building", color: "text-primary", title: "Hotels", desc: "Find the best places to stay around the world." },
                        { to: "/attractions", icon: "bi-geo-alt", color: "text-danger", title: "Attractions", desc: "Discover restaurants and activities in every destination." },
                        { to: "/syncspin", icon: "bi-shuffle", color: "text-info", title: "SyncSpin", desc: "Feeling lucky? Let us help you pick your next destination." },
                        { to: "/itinerary", icon: "bi-list-check", color: "text-success", title: "Itinerary", desc: "Plan your full trip in one place and access it anytime." },
                    ].map((item, i) => (
                        <div className="col-12 col-sm-6 col-lg-3 d-flex mb-4" key={i}>
                            <Link
                                to={item.to}
                                className="card text-center h-100 shadow-sm text-decoration-none text-dark rounded-4 border-0 w-100"
                                style={{ transition: "transform 0.2s ease" }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <div className="card-body d-flex flex-column justify-content-center align-items-center pt-0">
                                    <i className={`bi ${item.icon} fs-1 ${item.color} mb-3`}></i>
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.desc}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-5 text-center">
                <h3 className="mb-4">How TripSync Works</h3>
                <div className="row g-4">
                    {[
                        { icon: "bi-search", color: "text-primary", title: "Explore Destinations", desc: "Search for top hotels, restaurants, and activities around the world." },
                        { icon: "bi-heart-fill", color: "text-danger", title: "Save Your Favorites", desc: "Wishlist the places you love and organize them in one spot." },
                        { icon: "bi-calendar-check-fill", color: "text-success", title: "Sync Your Itinerary", desc: "Plan your full trip and access your itinerary anytime, anywhere." },
                    ].map((item, i) => (
                        <div className="col-md-4 text-center" key={i}>
                            <i className={`bi ${item.icon} fs-1 ${item.color}`}></i>
                            <h5 className="mt-3">{item.title}</h5>
                            <p className="text-muted">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Carousels */}
            {!topDestinations.length && !famousCities.length && !vacationSpots.length && (
                <div className="text-center text-muted my-5">Loading destinations...</div>
            )}

            {topDestinations.length > 0 && (
                <div className="mb-5">
                    <CarouselSection id="topDestinations" title="Top Travel Destinations" places={topDestinations} />
                </div>
            )}

            {famousCities.length > 0 && (
                <div className="mb-5">
                    <CarouselSection id="famousCities" title="Famous Cities to Visit" places={famousCities} />
                </div>
            )}

            {/* Testimonials */}
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h3 className="mb-5">What Our Users Say</h3>
                    <div className="row justify-content-center g-4">
                        {[
                            { text: "TripSync helped me organize a last-minute trip to Europe—hotels, activities, everything was in one place!", name: "Sarah M.", desc: "Solo Traveler from Boston" },
                            { text: "I used SyncSpin and it randomly picked Thailand for me. Best vacation decision ever!", name: "Kevin L.", desc: "Adventure Seeker" },
                            { text: "The wishlist and itinerary tools made it super easy to plan our honeymoon. Loved the interface!", name: "Amanda & James", desc: "Newlyweds from Miami" },
                        ].map((review, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="card border-0 shadow-sm h-100 p-4 text-start text-md-center">
                                    <p className="mb-3 fst-italic">“{review.text}”</p>
                                    <h6 className="fw-bold mb-0">{review.name}</h6>
                                    <p className="text-muted small">{review.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <div className="bg-light p-5 rounded text-center">
                <h3>About TripSync</h3>
                <p className="mb-4">
                    TripSync helps you find top hotels, restaurants, and activities, then sync your dream vacation into one smart itinerary.
                </p>
                <Link to="/aboutus" className="btn btn-primary">Learn More</Link>
            </div>

            {/* CTA */}
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
