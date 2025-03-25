import React, { useRef } from "react";

const CardCarousel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll step
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={() => scroll("left")}>
        &#9665;
      </button>
      <div className="scrollable-cards" ref={scrollRef}>
        {children}
      </div>
      <button className="scroll-button right" onClick={() => scroll("right")}>
        &#9655;
      </button>
    </div>
  );
};

export default CardCarousel;
