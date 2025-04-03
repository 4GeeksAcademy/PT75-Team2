import React from "react";
import "../aboutus.css";
import MarioProfile from "../assets/img/mario-profile.jpg";
import GordonProfile from "../assets/img/gordon-profile.jpg";
import AshleyProfile from "../assets/img/ashley-profile.jpg";
import MarioLinkedInQR from "../assets/img/mario-linkedin-qr.png";
import MarioGithubQR from "../assets/img/mario-github-qr.png";
import GordonLinkedInQR from "../assets/img/gordon-linkedin-qr.png";
import GordonGithubQR from "../assets/img/gordon-github-qr.png";
import AshleyLinkedInQR from "../assets/img/ashley-linkedin-qr.png";
import AshleyGithubQR from "../assets/img/ashley-github-qr.png";


export const AboutUs = () => {

    return (
        <>
            <div className="container about-us-container d-flex justify-content-center p-2 mt-2">
                <h1>About us</h1>
            </div>
            <div className="container about-us-container d-flex justify-content-center p-2">
                <p>
                    Welcome to TripSync! We’re Mario, Gordon, and Ashley—three students at 4Geeks Academy who came together with a shared love for travel and technology to create this website as part of our final class project.
                    At TripSync, our mission is to make exploring the world easier and more exciting. Whether you’re looking for spontaneous travel inspiration or a carefully planned trip, we’ve built tools to help make your journey memorable. From a random trip generator to curated destination guides, we aim to take the stress out of planning so you can focus on enjoying your travels.
                    This project is a result of countless hours of collaboration, creativity, and problem-solving. We're proud of what we've accomplished and hope it helps inspire your next adventure.
                    <br></br>
                    <br></br>
                    Thanks for visiting, and happy travels!
                </p>
            </div>
            <div className="container d-flex justify-content-center align-items-center p-2 mb-5">


        {/* Mario Profile */}
                <div className="card profile-card m-2">
                    <div className="card-header"></div>
                    <div className="user text-center">
                        <div className="profile mt-4">
                            <img src={MarioProfile} alt="mario-profile" className="rounded-circle" width="150" />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="card-body">
                            <h4 className="mb-2">Mario Orol</h4>
                            <span className="text-muted d-block mb-0">Miami, FL, USA</span>
                            <span className="text-muted d-block mb-4">ormario1996@gmail.com</span>
                            <div className="connectionsContainer m-2">
                                <div className="row justify-content-center align-items-center display-flex">
                                    <div className="col-5">
                                        <a href="https://www.linkedin.com/in/mario-orol-5057951ba/" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-linkedin fa-2xl"></i>
                                        </a>
                                    </div>
                                    <div className="col-5">
                                        <a href="https://github.com/Mariorlando96" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-github fa-2xl"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="row justify-content-center align-items-center display-flex mt-2">
                                    <div className="col-5">
                                        <img className="marioGitHub" src={MarioLinkedInQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                    <div className="col-5">
                                        <img className="marioGitHub" src={MarioGithubQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        {/* Gordon Profile */}
                <div className="card profile-card m-2">
                    <div className="card-header"></div>
                    <div className="user text-center">
                        <div className="profile mt-4">
                            <img src={GordonProfile} className="rounded-circle" width="150" />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="card-body">
                            <h4 className="mb-2">Gordon Smith
                            </h4>
                            <span className="text-muted d-block mb-0">Nassau, Bahamas</span>
                            <span className="text-muted d-block mb-4">gordon.smithjr@hotmail.com</span>
                            <div className="connectionsContainer m-2">
                                <div className="row justify-content-center align-items-center display-flex">
                                    <div className="col-5">
                                        <a href="https://www.linkedin.com/in/gordon-smith-476705239/" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-linkedin fa-2xl"></i>
                                        </a>
                                    </div>
                                    <div className="col-5">
                                        <a href="https://github.com/1122gs" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-github fa-2xl"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="row justify-content-center align-items-center display-flex mt-2">
                                    <div className="col-5">
                                        <img className="gordonGitHub" src={GordonLinkedInQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                    <div className="col-5">
                                        <img className="gordonGitHub" src={GordonGithubQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        {/* Ashley Profile*/}
                <div className="card profile-card m-2" style={{ width: "18rem" }}>
                    <div className="card-header"></div>
                    <div className="user text-center">
                        <div className="profile mt-4">
                            <img src={AshleyProfile} alt="ashley-profile" className="rounded-circle" width="150" />
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="card-body">
                            <h4 className="mb-2">Ashley Dogan</h4>
                            <span className="text-muted d-block mb-0">Milwaukee, WI, USA</span>
                            <span className="text-muted d-block mb-4">ashleyjdogan@gmail.com</span>
                            <div className="connectionsContainer m-2">
                                <div className="row justify-content-center align-items-center display-flex">
                                    <div className="col-5">
                                        <a href="https://www.linkedin.com/in/ashley-j-dogan/" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-linkedin fa-2xl"></i>
                                        </a>
                                    </div>
                                    <div className="col-5">
                                        <a href="https://github.com/AshleyDogan" target="_blank" rel="noopener noreferrer">
                                            <i className="fa-brands fa-github fa-2xl"></i>
                                        </a>
                                    </div>
                                </div>

                                <div className="row justify-content-center align-items-center display-flex mt-2">
                                    <div className="col-5">
                                        <img className="ashleyGitHub" src={AshleyLinkedInQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                    <div className="col-5">
                                        <img className="ashleyGitHub" src={AshleyGithubQR} alt="ashley-github-qr" style={{ width: "80px" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>

    );
};