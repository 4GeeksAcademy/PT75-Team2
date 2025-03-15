import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "fortawesome/react-fontawesome";
// import { faPlane } from "fortawesome/react-fontawesome";

export const Navbar = () => {
	const profilepic = 'https://th.bing.com/th/id/OIP.6W2ogLXdf48OKWgl_5jSPgHaHa?rs=1&pid=ImgDetMain'

	return (
		<nav className="navbar nav" style={{backgroundColor:"lightblue"}}>
			<div className="container  d-block align-items-center ">
				<Link to="/" className="navbar-brand mb-0 h1" style={{ fontSize: "50px", fontFamily: "serif" }}>
					{/* <FontAwesomeIcon icon={faPlane}/> */}
					Tripsync
				</Link>
				<div className="profileLink align-items-right">
					<Link to="/profile" >
						<img
							src={profilepic}
							alt="User Profile"
							className="profile-picture rounded-circle "
							style={{ height: "70px", width: "70px" }}
						/>
					</Link>

				</div>
				<div className="links d-flex">
					<div className="pageButtons d-flex align-items-center gap-3">
						<Link to="/hotel" className="nav-link">Hotels</Link>
						<Link to="/attractions" className="nav-link">Attractions</Link>
						<Link to="/maps" className="nav-link">Maps</Link>
						<Link to="/itinerary" className="nav-link">Itinerary</Link>
					</div>

				</div>
			</div>
		</nav>
	);
};
