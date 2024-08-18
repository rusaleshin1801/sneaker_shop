import React from "react";

interface StarsRatingProps {
  rating: number;
}

const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const roundedRating = Math.round(rating);

  return (
    <React.Fragment>
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={index < roundedRating ? "#F14F4F" : "#D5D5D5"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.04894 2.92705C9.3483 2.00574 10.6517 2.00574 10.9511 2.92705L12.0206 6.21885C12.1545 6.63087 12.5385 6.90983 12.9717 6.90983H16.4329C17.4016 6.90983 17.8044 8.14945 17.0207 8.71885L14.2205 10.7533C13.87 11.0079 13.7234 11.4593 13.8572 11.8713L14.9268 15.1631C15.2261 16.0844 14.1717 16.8506 13.388 16.2812L10.5878 14.2467C10.2373 13.9921 9.7627 13.9921 9.41221 14.2467L6.61204 16.2812C5.82833 16.8506 4.77385 16.0844 5.0732 15.1631L6.14277 11.8713C6.27665 11.4593 6.12999 11.0079 5.7795 10.7533L2.97933 8.71885C2.19562 8.14945 2.59839 6.90983 3.56712 6.90983H7.02832C7.46154 6.90983 7.8455 6.63087 7.97937 6.21885L9.04894 2.92705Z" />
        </svg>
      ))}
    </React.Fragment>
  );
};

export default StarsRating;
