import React from "react";
import "../aboutus.css"


export const AboutUs = () => {

    return (
        <>
            <div className="card-container">
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
                            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div className="row">
                                    <button
                                        onClick={() => window.location.href = "https://www.linkedin.com/in/mario-orol-5057951ba/"}
                                        className="btn btn-primary btn-sm">LinkedIn
                                    </button>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <button
                                        onClick={() => window.location.href = "https://github.com/Mariorlando96"}
                                        className="btn btn-primary btn-sm">GitHub
                                    </button>
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
                            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div className="row">
                                    <button
                                        onClick={() => window.location.href = "https://www.linkedin.com/in/gordon-smith-476705239/"}
                                        className="btn btn-primary btn-sm">LinkedIn
                                    </button>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <button
                                        onClick={() => window.location.href = "https://github.com/1122gs"}
                                        className="btn btn-primary btn-sm">GitHub
                                    </button>
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
                            <span className="text-muted d-block mb-2">ashleydogan@gmail.com</span>
                            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div className="row">
                                    <button
                                        onClick={() => window.location.href = "https://www.linkedin.com/in/ashley-j-dogan/"}
                                        className="btn btn-primary btn-sm">LinkedIn
                                    </button>
                                    <h6 className="qr">QR</h6>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <button
                                        onClick={() => window.location.href = "https://github.com/AshleyDogan"}
                                        className="btn btn-primary btn-sm">GitHub
                                    </button>
                                    <h6 className="qr">QR</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
};