import React from "react";
import "../css/AboutUs.css";
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
            <div className="container about-us-container text-center p-2 mt-2">
                <h1>Meet the Developers</h1>
            </div>

            <div className="container about-us-container p-2">
                <p>
                    Welcome to TripSync! We’re Mario, Gordon, and Ashley—three students at 4Geeks Academy who came together with a shared love for travel and technology to create this website as part of our final class project.
                    At TripSync, our mission is to make exploring the world easier and more exciting. Whether you’re looking for spontaneous travel inspiration or a carefully planned trip, we’ve built tools to help make your journey memorable.
                    This project is a result of countless hours of collaboration, creativity, and problem-solving. We're proud of what we've accomplished and hope it helps inspire your next adventure.
                    <br /><br />
                    Thanks for visiting, and happy travels!
                </p>
            </div>

            <div className="container row profile-wrapper justify-content-center p-2 mb-5">

                {/* Mario Profile */}
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div className="card profile-card m-2">
                        <div className="card-header"></div>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src={MarioProfile} alt="mario-profile" className="rounded-circle img-fluid" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="card-body">
                                <h4 className="mb-2">Mario Orol</h4>
                                <span className="text-muted d-block mb-0">Miami, FL, USA</span>
                                <span className="text-muted d-block mb-4">ormario1996@gmail.com</span>
                                <div className="connectionsContainer m-2">
                                    <div className="row justify-content-center align-items-center">
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
                                    <div className="row justify-content-center align-items-center mt-2">
                                        <div className="col-5">
                                            <img src={MarioLinkedInQR} alt="mario-linkedin-qr" className="img-fluid" />
                                        </div>
                                        <div className="col-5">
                                            <img src={MarioGithubQR} alt="mario-github-qr" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gordon Profile */}
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div className="card profile-card m-2">
                        <div className="card-header"></div>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src={GordonProfile} alt="gordon-profile" className="rounded-circle img-fluid" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="card-body">
                                <h4 className="mb-2">Gordon Smith</h4>
                                <span className="text-muted d-block mb-0">Nassau, Bahamas</span>
                                <span className="text-muted d-block mb-4">gordon.smithjr@hotmail.com</span>
                                <div className="connectionsContainer m-2">
                                    <div className="row justify-content-center align-items-center">
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
                                    <div className="row justify-content-center align-items-center mt-2">
                                        <div className="col-5">
                                            <img src={GordonLinkedInQR} alt="gordon-linkedin-qr" className="img-fluid" />
                                        </div>
                                        <div className="col-5">
                                            <img src={GordonGithubQR} alt="gordon-github-qr" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ashley Profile */}
                <div className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
                    <div className="card profile-card m-2">
                        <div className="card-header"></div>
                        <div className="user text-center">
                            <div className="profile mt-4">
                                <img src={AshleyProfile} alt="ashley-profile" className="rounded-circle img-fluid" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="card-body">
                                <h4 className="mb-2">Ashley Dogan</h4>
                                <span className="text-muted d-block mb-0">Milwaukee, WI, USA</span>
                                <span className="text-muted d-block mb-4">ashleyjdogan@gmail.com</span>
                                <div className="connectionsContainer m-2">
                                    <div className="row justify-content-center align-items-center">
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
                                    <div className="row justify-content-center align-items-center mt-2">
                                        <div className="col-5">
                                            <img src={AshleyLinkedInQR} alt="ashley-linkedin-qr" className="img-fluid" />
                                        </div>
                                        <div className="col-5">
                                            <img src={AshleyGithubQR} alt="ashley-github-qr" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};
