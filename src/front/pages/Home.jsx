import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import WishlistCard from "../components/WishlistCard.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const [wishlist, setWishlist] = useState([]);
	const [itinerary, setItinerary] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) navigate("/login");
	}, [navigate]);

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const [wishlistRes, itineraryRes] = await Promise.all([
					fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist`, {
						headers: { Authorization: `Bearer ${token}` }
					}),
					fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary`, {
						headers: { Authorization: `Bearer ${token}` }
					})
				]);

				if (wishlistRes.ok) setWishlist(await wishlistRes.json());
				if (itineraryRes.ok) setItinerary(await itineraryRes.json());
			} catch (err) {
				console.error("Error loading data:", err);
			}
		};

		fetchData();
	}, []);

	const handleRemove = async (place_id) => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}wishlist/${place_id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.ok) {
				setWishlist(prev => prev.filter(item => item.place_id !== place_id));
			}
		} catch (err) {
			console.error("Failed to remove from wishlist:", err);
		}
	};

	const hotels = wishlist.filter(item =>
		item.name && /hotel|inn|resort|suite/i.test(item.name)
	);
	const attractions = wishlist.filter(item => !hotels.includes(item));

	return (
		<div className="container py-5">
			<h1 className="text-center mb-4">Welcome to TripSync 🌍</h1>

			<section className="mb-5">
				<h3>Saved Hotels</h3>
				{hotels.length > 0 ? (
					<div className="d-flex flex-wrap gap-4">
						{hotels.slice(0, 3).map(hotel => (
							<WishlistCard
								key={hotel.place_id}
								item={hotel}
								onRemove={handleRemove}
								apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
							/>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any hotels yet.</p>
				)}
				<Link to="/hotels" className="btn btn-sm btn-outline-primary mt-2">
					View All Hotels
				</Link>
			</section>

			<section className="mb-5">
				<h3>Saved Attractions</h3>
				{attractions.length > 0 ? (
					<div className="d-flex flex-wrap gap-4">
						{attractions.slice(0, 3).map(attraction => (
							<WishlistCard
								key={attraction.place_id}
								item={attraction}
								onRemove={handleRemove}
								apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
							/>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any attractions yet.</p>
				)}
				<Link to="/attractions" className="btn btn-sm btn-outline-primary mt-2">
					View All Attractions
				</Link>
			</section>

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
				<Link to="/Itinerary" className="btn btn-sm btn-outline-primary mt-2">
					View Your Itinerary
				</Link>
			</section>
		</div>
	);
};
