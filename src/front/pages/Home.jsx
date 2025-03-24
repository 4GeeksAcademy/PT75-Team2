import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../home.css";
import newYorkImage from "../assets/img/newyork.jpg";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<>
			<div className="container">
				<div className="hotelsContainer">
					<h1>Hotels</h1>
					<div className="hotelCards">
						<div className="card" id="newYorkCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">New York</h5>
								<a href="#" className="btn btn-primary">Find Hotels</a>
							</div>
						</div>
						<div className="card" id="sanDiegoCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">San Diego</h5>
								<a href="#" className="btn btn-primary">Find Hotels</a>
							</div>
						</div>
						<div className="card" id="parisCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">Paris</h5>
								<a href="#" className="btn btn-primary">Find Hotels</a>
							</div>
						</div>
					</div>

				</div>
				<div className="attractionsContainer">
					<h1>Attractions</h1>
					<div className="attractionsCards">
						<div className="card" id="diningCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">Dining</h5>
								<a href="#" className="btn btn-primary">Explore Dining</a>
							</div>
						</div>
						<div className="card" id="sitesCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">Sites</h5>
								<a href="#" className="btn btn-primary">Explore Sites</a>
							</div>
						</div>
						<div className="card" id="activitiesCard" style={{ width: "18rem" }}>
							<img src={newYorkImage} className="card-img-top" alt="New York" />
							<div className="card-body">
								<h5 className="card-title">Activities</h5>
								<a href="#" className="btn btn-primary">Explore Activities</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}; 