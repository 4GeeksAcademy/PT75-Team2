import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import "/src/front/navbar.css"; // Adjust the path if needed
import useGlobalReducer from "../hooks/useGlobalReducer";

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
				{ token?
				(<Link to="/home" className="navbar-brand fs-3">
					TripSync
				</Link>)
				: (<Link to="/" className="navbar-brand fs-3">
					TripSync
				</Link>) 
                }

				<div className="d-flex align-items-center gap-4">
					<div className="d-flex gap-3">
						<Link to="/hotels" className="nav-link">Hotels</Link>
						<Link to="/attractions" className="nav-link">Attractions</Link>
						<Link to="/syncspin" className="nav-link">SyncSpin</Link>
						<Link to="/itinerary" className="nav-link">Itinerary</Link>
						<Link to="/aboutus" className="nav-link">About us</Link>
					</div>

					{user ? (
						<div className="d-flex align-items-center gap-3">
							<AccountDropdown user={user} onLogout={handleLogout} />
						</div>
					) : (
						<div className="d-flex gap-2">
							<Link to="/signup" className="btn btn-light btn-sm">Signup</Link>
							<Link to="/login" className="btn btn-light btn-sm">Login</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
