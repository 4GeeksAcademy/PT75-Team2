import React from "react";
import { LandingCard } from "../components/landingCard";
import { HotelCard } from "../components/hotelCard";
import { CityCard } from "../components/cityCard";



export const LandingPage = () => {
    return (
        <div className="landingPage">
            <div className="dateAndTravelers pt-5 py-5 pe-5 ">
                <div className="inputForm">
                    <label htmlFor="startDate" >Start Date</label>
                    <input type="date" id="startDate" />
                </div>

                <div className="inputForm">
                    <label htmlFor="endDate">End Date</label>
                    <input type="date" id="endDate" />
                </div>

                <div className="inputForm">
                    <label htmlFor="numberOfTravelers">Travelers</label>
                    <input type="number" id="numberOfTravelers" />
                </div>
            </div>
            <h1>Exciting Places To Visit This Easter</h1>
            <h5>Find Your Dream Destination</h5>
            <CityCard/>
            <HotelCard/>

            
           
        </div>
    )
}