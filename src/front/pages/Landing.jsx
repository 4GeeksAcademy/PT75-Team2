import React from "react";
import { LandingCard } from "../components/landingCard";
import { HotelCard } from "../components/hotelCard";
import { CityCard } from "../components/cityCard";
import { Attractions } from "../components/attractionCard";
import '../components/card.css'
import CardCarousel from "../components/Carousel";




export const LandingPage = () => {
    return (
        <div className="landingPage">
            <h1>Exciting Places To Visit This Easter</h1>
            <h5>Find Your Dream Destination</h5>
            <CityCard/>
            <h1>Hotels</h1>
            <HotelCard/>
            <h1>Attractions</h1>
            <Attractions/>         
            
        </div>
    )
}