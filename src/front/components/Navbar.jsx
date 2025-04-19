import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import "../css/Navbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import tripSyncLogo from "../assets/img/TripSync-logo.png";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const { store, dispatch } = useGlobalReducer();
	const user = store.user;

	const handleLogout = () => {
		dispatch({ type: "logout" });
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-custom">
			<div className="container d-flex justify-content-between align-items-center py-2">
				<Link to={"/"} className="navbar-brand fs-3">
					<img
						src={tripSyncLogo}
						alt="tripSyncLogo"
						style={{ height: "90px", width: "auto" }}
					/>
				</Link>


				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-4">
						<li className="nav-item">
							<Link to="/hotels" className="nav-link">Hotels</Link>
						</li>
						<li className="nav-item">
							<Link to="/attractions" className="nav-link">Attractions</Link>
						</li>
						<li className="nav-item">
							<Link to="/syncspin" className="nav-link">SyncSpin</Link>
						</li>
						<li className="nav-item">
							<Link to="/itinerary" className="nav-link">Itinerary</Link>
						</li>
						<li className="nav-item">
							<Link to="/aboutus" className="nav-link">About Us</Link>
						</li>
					</ul>

					<div className="d-flex align-items-center">
						{user ? (
							<AccountDropdown user={user} onLogout={handleLogout} />
						) : (
							<div className="d-flex gap-2">
								<Link to="/signup" className="btn btn-light btn-sm">Signup</Link>
								<Link to="/login" className="btn btn-light btn-sm">Login</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
