import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import WishlistCard from "../components/WishlistCard.jsx";
import rigoPhoto from "../assets/img/rigo-baby.jpg";
import '../css/WishlistCard.css';
import '../css/Index.css';
import useAuthGuard from "../hooks/useAuthGuard";

export const Home = () => {
	useAuthGuard();

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const [wishlist, setWishlist] = useState([]);
	const [itinerary, setItinerary] = useState([]);

	const scrollWrapperStyle = {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
		overflowY: 'hidden',
		gap: '1rem',
		paddingBottom: '0.5rem',
		scrollBehavior: 'smooth',
		scrollSnapType: 'x mandatory',
		minHeight: '250px',
		width: '100%',
		scrollbarWidth: 'thin',
		scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent'
	};

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

	const handleAddToItinerary = async (item, note = "") => {
		const token = localStorage.getItem("token");

		const payload = {
			location: item.name,
			address: item.address,
			start_date: "2025-05-01",
			end_date: "2025-05-03",
			note: note
		};

		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});

			if (res.ok) {
				console.log("Added to itinerary!");
			}
		} catch (err) {
			console.error("Failed to add to itinerary:", err);
		}
	};

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

	const handleDeleteItineraryItem = async (id) => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}itinerary/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.ok) {
				setItinerary(prev => prev.filter(item => item.id !== id));
			}
		} catch (err) {
			console.error("Failed to delete itinerary item:", err);
		}
	};

	const hotels = wishlist.filter(item =>
		item.name && /hotel|inn|resort|suite|Marriott|Hyatt|Courtyard/i.test(item.name)
	);
	const attractions = wishlist.filter(item => !hotels.includes(item));

	return (
		<div className="container py-5">
			<h1 className="text-center mb-5 fw-bold">Welcome to TripSync 🌍</h1>

			{/* Saved Hotels */}
			<section className="mb-5">
				<h3 className="mb-3">Saved Hotels</h3>
				{hotels.length > 0 ? (
					<div className="scroll-wrapper" style={scrollWrapperStyle}>
						{hotels.map(hotel => (
							<WishlistCard
								key={hotel.place_id}
								item={hotel}
								onRemove={handleRemove}
								onAddToItinerary={handleAddToItinerary}
								apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
							/>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any hotels yet.</p>
				)}
				<Link to="/hotels" className="btn btn-sm btn-outline-primary mt-3">
					View All Hotels
				</Link>
			</section>

			{/* Saved Attractions */}
			<section className="mb-5">
				<h3 className="mb-3">Saved Attractions</h3>
				{attractions.length > 0 ? (
					<div className="scroll-wrapper" style={scrollWrapperStyle}>
						{attractions.map(attraction => (
							<WishlistCard
								key={attraction.place_id}
								item={attraction}
								onRemove={handleRemove}
								onAddToItinerary={handleAddToItinerary}
								apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
							/>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't saved any attractions yet.</p>
				)}
				<Link to="/attractions" className="btn btn-sm btn-outline-primary mt-3">
					View All Attractions
				</Link>
			</section>

			{/* Itinerary Preview */}
			<section className="mb-4">
				<h3 className="mb-3">Itinerary</h3>
				{itinerary.length > 0 ? (
					<div className="scroll-wrapper" style={scrollWrapperStyle}>
						{itinerary.map((item) => (
							<div key={item.id} className="card shadow-sm rounded-4 border-0 itinerary-card">
								<img
									src={item.location_image_url}
									className="itinerary-card-img"
									alt={item.location}
									onError={(e) => (e.target.src = rigoPhoto)}
								/>
								<div className="card-body text-center p-3">
									<h6 className="card-title mb-2">{item.location}</h6>
									{item.note && (
										<p className="text-muted small fst-italic mb-2">
											“{item.note}”
										</p>
									)}
									<p className="card-text text-muted small mb-1">
										From <strong>{item.start_date}</strong> to <br />
										<strong>{item.end_date}</strong>
									</p>
									<p className="text-muted small">
										{(() => {
											const today = new Date();
											const start = new Date(item.start_date);
											const diffTime = start.getTime() - today.getTime();
											const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
											return daysLeft > 0
												? `${daysLeft} day(s) left ✈️`
												: `Trip in progress or passed 🌴`;
										})()}
									</p>
									<button className="removeButton float-end border-0 bg-transparent text-danger fw-bold" onClick={() => handleDeleteItineraryItem(item.id)}>
										<i className="bi bi-x-lg"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-muted">You haven't created an itinerary yet.</p>
				)}
				<Link to="/itinerary" className="btn btn-sm btn-outline-primary mt-3">
					View Your Itinerary
				</Link>
			</section>
		</div>
	);
};
