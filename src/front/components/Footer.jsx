import React from "react";
import { Link } from "react-router-dom";
import "../../front/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-4 text-white bg-primary">
		<div className="container">
			<div className="row align-items-start">
				<div className="col-lg-6 text-center text-lg-start mb-4">
					<Link to="/" className="navbar-brand fw-bold fs-3 text-white text-decoration-none">
						TripSync
					</Link>
				</div>


				<div className="col-lg-3 ms-lg-auto text-center text-lg-end mb-4">
					<Link to="/aboutus" className="text-white text-decoration-none fw-semibold d-block">
						Connect With Us
					</Link>
				</div>
			</div>

			<hr className="my-4 border-light" />

			{/* Horizontal links bar — responsive! */}
			<div className="d-flex flex-wrap justify-content-center gap-4 mb-3">
				<Link to="/" className="text-white text-decoration-none fw-semibold">Home</Link>
				<Link to="/hotels" className="text-white text-decoration-none fw-semibold">Hotels</Link>
				<Link to="/attractions" className="text-white text-decoration-none fw-semibold">Attractions</Link>
				<Link to="/syncspin" className="text-white text-decoration-none fw-semibold">SyncSpin</Link>
				<Link to="/itinerary" className="text-white text-decoration-none fw-semibold">Itinerary</Link>
			</div>

			<div className="text-center small">
				&copy; 2025 <strong>TripSync.com</strong> — All rights reserved.
			</div>
		</div>
	</footer>
);
