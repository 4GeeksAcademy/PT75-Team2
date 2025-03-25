import React from "react";
import { LandingCard } from "./landingCard";
import './card.css'

const attractions = [{
  title: "EIffel Tower, Paris France",
  image: "https://cdn.getyourguide.com/img/tour/f35416f5de0d6e5c9ff82a5769098938abe302466bd310b8d2f2d821d8384e93.jpg/132.webp",
  description: "Enjoy a day at the World Famous Eiffel towel with",
  rating: " 4 star ",
  price:"$150 per person"
},
{
  title: "NYC Helicopter Ride, NY",
  image: "https://cdn.getyourguide.com/img/tour/642dc89f35905.jpeg/98.jpg",
  description: "See the beauty of New York with a bird's view. Enjoy the beautiful arcitecture of NYC from way in the sky",
  rating: "5 star",
  price:"$239 per peron"
},
{
  title: "Safari package,South Africa",
  image: "https://th.bing.com/th/id/R.ec3afa9198a37916e3b22092c47f2bef?rik=mHpOMRKzrnwk5A&pid=ImgRaw&r=0",
  description: "If you love wild life and feeling alive in nature then this is the tour for you.",
  rating: "5 star",
  price : "$179 per person"
},
{
  title: "FlyOver, Las Vegas",
  image: "https://cdn.getyourguide.com/img/tour/61153289ea80c.jpeg/132.webp",
  description: "This Amazing simulation gives you the experience and full feel of flying over cities and eeing amazing views. ",
  rating: "5 stars",
  price: "$50 per person"
},
{
  title: "Florida Aquarium, Tampa FL",
  image: "https://www.bing.com/th?id=OLC.JbNUWiy%2fBXw8Zg480x360&w=249&h=140&c=8&rs=1&qlt=90&pid=3.1&rm=2",
  description: "A nice educational and fun thing to do in Tampa.",
  rating: "4 star",
  price : "$235 per night"
},
{
  title: "Midieval Torture Museum, Los Angeles",
  image: "https://www.bing.com/th?id=ORA4.EA8C5D355B0902CECB6BD7C0A5C6E320_F725FC81947923D9&w=232&h=154&c=1&rs=2&pid=MapsTourActivityAds",
  description: "A recreation of the midieval torture chambers. Dark, scary, different.",
  rating: "4 start",
  price : "$27 per person"
},
{
  title: "Estacao das Docas, Brazil",
  image: "https://lh3.googleusercontent.com/p/AF1QipM91m6I6lLLCiKT_bqX6U_6hlRYEuvBi-H7xT8d=s1600-w1600",
  description: "If you like high quality brazilian food then this is the spot for you.",
  rating: "4 star",
  price: ""
}

]

export const Attractions =()=>{

     return(
<div className="attractionCard  d-flex" >
      {
        attractions.map((attraction, index) => (
          <LandingCard key={index}
            title={attraction.title}
            image={attraction.image}
            description={attraction.description}
            price={attraction.price} />
        ))
      }
    </div>
     )
}