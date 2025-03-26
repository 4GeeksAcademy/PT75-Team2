import React from "react";
import { LandingCard } from "./landingCard";
import './card.css'


const hotels = [{
  title: "World Center Hotel, New York",
  image: "https://th.bing.com/th?id=OLC.FdRFENZk9u%2b0Kg480x360&w=198&h=100&c=3&rs=1&qlt=80&o=6&cdv=1&pid=Local",
  description: "Clean rooms, amazing views",
  rating: " 4 star ",
  price:"$186 per night"
},
{
  title: "Hotel de Londres EIffel, Paris France",
  image: "https://hips.hearstapps.com/hmg-prod/images/paris-hotels-with-eiffel-tower-views-1-1664292745.jpg?crop=1xw:1xh;center,top&resize=980:*",
  description: "Enjoy the great hospitality and a great view of the Eiffel Tower",
  rating: "5 star",
  price:"$307 per night"
},
{
  title: "Andaz Amsterdam Prinsengracht,The Netherlands",
  image: "https://bing.com/th?id=OLC.uHkPr8mGXGciCg480x360&w=474&h=355&p=0",
  description: "A concept by hyatt,. CLean rooms and great service",
  rating: "5 star",
  price : "$569 per night"
},
{
  title: "Park Plaza County Hall, London",
  image: "https://cf.bstatic.com/xdata/images/hotel/square600/511738782.webp?k=d628bd74dbfea7f53739f721456dd9fac7f60824e3cb73f8cd406bdf358b5f3a&o=",
  description: "Family friendly and just a few minutes walk from the London Eye. ",
  rating: "5 stars",
  price: "$392.04 per night"
},
{
  title: "Hotel Figueroa, Los Angeles California",
  image: "https://bing.com/th?id=OLC.zx5Pm2xy5hdcsA480x360&w=474&h=710&p=0",
  description: "Historic hotel in down town LA, near LA Convention Center.",
  rating: "4 star",
  price : "$235 per night"
},
{
  title: "Palace Station Hotel and Casino, Las Vegas",
  image: "https://bing.com/th?id=OLC.aCNzmrEsHd2guA480x360&w=474&h=266&p=0",
  description: "Explore more than just its name.",
  rating: "4 start",
  price : "$86 per night"
},
{
  title: "Altamont West Hotel, Montego Bay JA",
  image: "https://bing.com/th?id=OLC.1OXBtjZI%2b%2bgkNQ480x360&w=474&h=355&p=0",
  description: "Home to the World Famous Body Bliss Spa. Pool WIFI and Breakfast all included.",
  rating: "3 star",
  price: "$165"
}

]

export const HotelCard = () => {
  return (
    <div className="hotelCard  mt-5 d-flex" >
      {
        hotels.map((hotel, index) => (
          <LandingCard key={index}
            title={hotel.title}
            image={hotel.image}
            description={hotel.description}
            price={hotel.price}
            ratings={hotel.rating} />
        ))
      }
    </div>
  );
};