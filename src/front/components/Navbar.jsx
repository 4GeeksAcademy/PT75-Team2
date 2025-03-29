import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "/src/front/navbar.css"; // Adjust the path if needed

export const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const profilepic = "https://th.bing.com/th/id/OIP.6W2ogLXdf48OKWgl_5jSPgHaHa?rs=1&pid=ImgDetMain";

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-custom">
			<div className="container d-flex justify-content-between align-items-center py-2">
				<Link to="/" className="navbar-brand fs-3">
					TripSync
				</Link>

				<div className="d-flex align-items-center gap-4">
					<div className="d-flex gap-3">
						<Link to="/hotels" className="nav-link">Hotels</Link>
						<Link to="/attractions" className="nav-link">Attractions</Link>
						<Link to="/syncspin" className="nav-link">SyncSpin</Link>
						<Link to="/itinerary" className="nav-link">Itinerary</Link>
					</div>

					{token ? (
						<div className="d-flex align-items-center gap-3">
							<Link to="/profile">
								<img
									src={profilepic}
									alt="Profile"
									className="rounded-circle"
									style={{ height: "50px", width: "50px", objectFit: "cover" }}
								/>
							</Link>
							<button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
								Logout
							</button>
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
