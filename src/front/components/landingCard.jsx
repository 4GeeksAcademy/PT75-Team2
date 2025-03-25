import React from "react";
import './card.css'

export const LandingCard = ({ title, image, description,price, ratings }) => {  
  return (
    <div className="card " >  
      <img src={image} className="card-img-top " alt={title} />
      <p className="card-price">{price}</p> 
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text2">{description}</p>
        <p className="card-rating">{ratings}</p>
      </div>
    </div>
  );
};
