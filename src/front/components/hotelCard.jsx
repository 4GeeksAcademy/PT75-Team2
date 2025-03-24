import React from "react";
import { LandingCard } from "./landingCard";


const hotels = [{
  title: "New York",
  image: "https://loving-newyork.com/wp-content/uploads/2019/03/easter-in-new-york_.jpg",
  description: "Celebrate easter in style",
  rating: "",
  price:""
},
{
  title: "Italy",
  image: "https://th.bing.com/th/id/OIP.tyu_rRn2H4fBWVbkyLycmQHaE8?rs=1&pid=ImgDetMain",
  description: "Take an Easter pilgramage to Rome",
  rating: "",
  price:""
},
{
  title: "The Netherlands",
  image: "https://th.bing.com/th/id/R.5b16e0ce32dfa5e2289b29af78aaca74?rik=A3NS8T9cbZQJYQ&pid=ImgRaw&r=0",
  description: "Enjoy the tulip bloom during Easter",
  rating: "",
  price : ""
},
{
  title: "Japan",
  image: "https://thumbs.dreamstime.com/z/generative-ai-art-style-interpretation-easter-holiday-scene-sendai-miyagi-japan-easter-holiday-scene-sendai-miyagi-272816564.jpg",
  description: "Experience the cherry blossom season during Easter",
  rating: "",
  price: ""
},
{
  title: "Madrid, Spain",
  image: "https://th.bing.com/th/id/R.f948222e0f19a393ff55bb2441b7ef41?rik=OSn2aPhVlxhWFw&pid=ImgRaw&r=0",
  description: "Celebrate Easter during Semana Santa.",
  rating: "",
  price : ""
},
{
  title: "Easter Island",
  image: "https://th.bing.com/th/id/OIP.wHzoH4lkl9Oo00HmzRbycAHaFj?rs=1&pid=ImgDetMain",
  description: "Explore more than just its name.",
  rating: "",
  price : ""
},
{
  title: "Antalya, Turkey",
  image: "https://th.bing.com/th/id/OIP.4FnDuGMvIROb5rj6N9b0XgHaFP?rs=1&pid=ImgDetMain",
  description: "enjoy Beautiful weather and all of the fetivities",
  rating: "",
  price: ""
}

]

export const HotelCard = () => {
  return (
    <div className="card  mt-5 d-flex" >
      {
        hotels.map((hotel, index) => (
          <LandingCard key={index}
            title={hotel.title}
            image={hotel.image}
            description={hotel.description}
            price={hotel.description}
            ratings={hotel.rating} />
        ))
      }
    </div>
  );
};