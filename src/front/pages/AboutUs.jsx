import React from "react";
import { Link } from "react-router-dom";
import "../aboutus.css"


export const AboutUs = () => {

    return (
        <>
            <div className="container about-us-container d-flex justify-content-center p-2 mt-2">
                <h1>About us</h1>
            </div>
            <div className="container about-us-container d-flex justify-content-center p-2">
                <p>
                    Welcome to TripSync! We’re Mario, Ashley, and Gordon—three students at 4Geeks Acedemy who came together with a shared love for travel and technology to create this website as part of our final class project.
                    At TripSync, our mission is to make exploring the world easier and more exciting. Whether you’re looking for spontaneous travel inspiration or a carefully planned trip, we’ve built tools to help make your journey memorable. From a random trip location generator to curated destination guides, we aim to take the stress out of planning so you can focus on enjoying your travels.
                    This project is a result of countless hours of collaboration, creativity, and problem-solving. We're proud of what we've accomplished and hope it helps inspire your next adventure.
                    <br></br>
                    <br></br>
                    Thanks for visiting, and happy travels!
                </p>
            </div>
            <div className="card-container mb-5">
                <div className="container d-flex justify-content-center align-items-center p-2">

                    <div className="card m-2" style={{ width: "18rem" }}>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src="https://placehold.co/400" className="rounded-circle" width="150" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h4 className="mb-2">Mario Orol</h4>
                            <span className="text-muted d-block mb-0">Miami, FL</span>
                            <span className="text-muted d-block mb-2">ormario1996@gmail.com</span>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <div className="row">
                                    <Link onClick={() => window.location.href = "https://www.linkedin.com/in/mario-orol-5057951ba/"}>
                                        <i className="fa-brands fa-linkedin fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <Link onClick={() => window.location.href = "https://github.com/Mariorlando96"}>
                                        <i className="fa-brands fa-github fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card m-2" style={{ width: "18rem" }}>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src="https://placehold.co/400" className="rounded-circle" width="150" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h4 className="mb-2">Gordon Smith
                            </h4>
                            <span className="text-muted d-block mb-0">Nassau, Bahamas</span>
                            <span className="text-muted d-block mb-2">gordon.smithjr@hotmail.com</span>
                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <div className="row">
                                    <Link onClick={() => window.location.href = "https://www.linkedin.com/in/gordon-smith-476705239/"}>
                                        <i className="fa-brands fa-linkedin fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <div className="row justify-content-center">
                                    <Link onClick={() => window.location.href = "https://github.com/1122gs"}>
                                        <i className="fa-brands fa-github fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card m-2" style={{ width: "18rem" }}>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src="https://placehold.co/400" className="rounded-circle" width="150" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h4 className="mb-2">Ashley Dogan</h4>
                            <span className="text-muted d-block mb-0">Milwaukee, WI, USA</span>
                            <span className="text-muted d-block mb-2">ashleyjdogan@gmail.com</span>


                            <div className="d-flex align-items-center justify-content-center mt-4">
                                <div className="row">
                                    <Link onClick={() => window.location.href = "https://www.linkedin.com/in/ashley-j-dogan/"}>
                                        <i className="fa-brands fa-linkedin fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <Link onClick={() => window.location.href = "https://github.com/AshleyDogan"}>
                                        <i className="fa-brands fa-github fa-2xl"></i>
                                    </Link>
                                    <h6 className="qr">QR</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div >
        </>

    );
};