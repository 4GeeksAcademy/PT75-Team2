import React from "react";
import { LandingCard } from "./landingCard";

const locations = [{
    title: "New York",
    image: "https://loving-newyork.com/wp-content/uploads/2019/03/easter-in-new-york_.jpg",
    description: "Celebrate easter in style"
},
{
    title: "Italy",
    image: "https://th.bing.com/th/id/OIP.tyu_rRn2H4fBWVbkyLycmQHaE8?rs=1&pid=ImgDetMain",
    description: "Take an Easter pilgramage to Rome"
},
{
    title: "The Netherlands",
    image: "https://th.bing.com/th/id/R.5b16e0ce32dfa5e2289b29af78aaca74?rik=A3NS8T9cbZQJYQ&pid=ImgRaw&r=0",
    description: "Enjoy the tulip bloom during Easter"
},
{
    title: "Japan",
    image: "https://thumbs.dreamstime.com/z/generative-ai-art-style-interpretation-easter-holiday-scene-sendai-miyagi-japan-easter-holiday-scene-sendai-miyagi-272816564.jpg",
    description: "Experience the cherry blossom season during Easter"
},
{
    title: "Madrid, Spain",
    image: "https://th.bing.com/th/id/R.f948222e0f19a393ff55bb2441b7ef41?rik=OSn2aPhVlxhWFw&pid=ImgRaw&r=0",
    description: "Celebrate Easter during Semana Santa."
},
{
    title: "Easter Island",
    image: "https://th.bing.com/th/id/OIP.wHzoH4lkl9Oo00HmzRbycAHaFj?rs=1&pid=ImgDetMain",
    description: "Explore more than just its name."
},
{
    title: "Antalya, Turkey",
    image: "https://th.bing.com/th/id/OIP.4FnDuGMvIROb5rj6N9b0XgHaFP?rs=1&pid=ImgDetMain",
    description: "enjoy Beautiful weather and all of the fetivities"
}
    
]

export const CityCard = () => {
    return(
 <div className = "landingCard d-flex" >
        {
            locations.map((place, index) => (
                <LandingCard key={index}
                    title={place.title}
                    image={place.image}
                    description={place.description} />
            ))
        }
            </div>
            )}
