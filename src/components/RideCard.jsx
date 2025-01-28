import React from 'react';


const RideCard = ({ title, price, time }) => {
  return (
    <div className="p-6 text-center">
      <h2>{title}</h2>
      <p>Price: {price}</p>
      <p>ETA: {time}</p>
      <button className="book-btn">Book Now</button>
    </div>
  );
};

export default RideCard;
