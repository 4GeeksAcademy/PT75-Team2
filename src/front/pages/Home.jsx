import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const [wishlist, setWishlist] = useState([]);
	const [itinerary, setItinerary] = useState([]);

	// Redirect if user not logged in
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	// Fetch wishlist (hotels + attractions)
	useEffect(() => {
		const fetchWishlist = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				if (res.ok) {
					const data = await res.json();
					setWishlist(data);
				}
			} catch (err) {
				console.error("Failed to load wishlist:", err);
			}
		};

		const fetchItinerary = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary`, {
					headers: { Authorization: `Bearer ${token}` }
				});
				if (res.ok) {
					const data = await res.json();
					setItinerary(data);
				}
			} catch (err) {
				console.error("Failed to load itinerary:", err);
			}
		};

		fetchWishlist();
		fetchItinerary();
	}, []);

	const hotels = wishlist.filter(item => item.address && item.address.toLowerCase().includes("hotel"));
	const attractions = wishlist.filter(item => !hotels.includes(item));

	return (
		<div className="container py-5">
			<h1 className="text-center mb-4">Welcome to TripSync 🌍</h1>

			{/* HOTELS */}
			<section className="mb-5">
				<h3>Saved Hotels</h3>
				{hotels.length > 0 ? (
					<div className="d-flex flex-wrap gap-4">
						{hotels.slice(0, 3).map((hotel) => (
							<div
								className="card shadow-sm"
								key={hotel.place_id}
								style={{ width: "270px", minWidth: "270px", borderRadius: "12px", overflow: "hidden" }}
							>
								<img
									src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
									className="card-img-top"
									style={{ height: "200px", objectFit: "cover" }}
									alt={hotel.name}
									onError={(e) => (e.target.src = "/placeholder.jpg")}
								/>
								<div className="card-body">
									<h6 className="card-title">{hotel.name}</h6>
									<p className="text-muted small">{hotel.address}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any hotels yet.</p>
				)}
				<Link to="/hotels" className="btn btn-sm btn-outline-primary">View All Hotels</Link>
			</section>

			{/* ATTRACTIONS */}
			<section className="mb-5">
				<h3>Saved Attractions</h3>
				{attractions.length > 0 ? (
					<div className="d-flex flex-wrap gap-4">
						{attractions.slice(0, 3).map((place) => (
							<div
								className="card shadow-sm"
								key={place.place_id}
								style={{ width: "270px", minWidth: "270px", borderRadius: "12px", overflow: "hidden" }}
							>
								<img
									src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
									className="card-img-top"
									style={{ height: "200px", objectFit: "cover" }}
									alt={place.name}
									onError={(e) => (e.target.src = "/placeholder.jpg")}
								/>
								<div className="card-body">
									<h6 className="card-title">{place.name}</h6>
									<p className="text-muted small">{place.address}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any attractions yet.</p>
				)}
				<Link to="/attractions" className="btn btn-sm btn-outline-primary">View All Attractions</Link>
			</section>

			{/* ITINERARY */}
			<section>
				<h3>Itinerary</h3>
				{itinerary.length > 0 ? (
					itinerary.slice(0, 2).map((item) => (
						<div key={item.id} className="border p-3 rounded shadow-sm mb-3">
							<h6 className="mb-1">{item.location}</h6>
							<p className="mb-0">
								From: <strong>{item.start_date}</strong> to{" "}
								<strong>{item.end_date}</strong>
							</p>
						</div>
					))
				) : (
					<p className="text-muted">You haven't created an itinerary yet.</p>
				)}
				<Link to="/Itinerary" className="btn btn-sm btn-outline-primary">View Your Itinerary</Link>
			</section>
		</div>
	);
};
