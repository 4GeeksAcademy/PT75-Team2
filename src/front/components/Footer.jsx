import React from "react";
import { Link } from "react-router-dom";
import "../../front/footer.css"

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="container">
			<div className="row">
				<div className="logo-div col-lg-6 col-md-12 mb-4 mb-md-0">
					<h3 className="text"><strong>TripSync</strong></h3>
				</div>
				<div className="col-lg-3 col-md-6 mb-md-0"></div>
				<div className="col-lg-3 col-md-6 mb-md-0">
					<h5 className="text-uppercase mb-0">
						<Link to="/aboutus" className="about-us" id="footerButton">Connect With Us</Link>
					</h5>
				</div>
			</div>
			<hr></hr>
			<div className="links-container inline-row">
				<Link to="/" className="p-5" id="footerButton">Home</Link>
				<Link to="/hotels" className="p-5" id="footerButton">Hotels</Link>
				<Link to="/attractions" className="p-5" id="footerButton">Attractions</Link>
				<Link to="/syncspin" className="p-5" id="footerButton">SyncSpin</Link>
				<Link to="/itinerary" className="p-5" id="footerButton">Itinerary</Link>
			</div>
			<div className="copyright p-1">
				© 2025 Copyright: <strong>TripSync.com</strong>
			</div>
		</div>
	</footer >
);
