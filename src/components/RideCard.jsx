import React from 'react';

const RideCard = ({ title, price, time }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-3">{title}</h2>
        <p className="text-lg text-gray-700 mb-2">Price: <span className="font-semibold text-green-600">{price}</span></p>
        <p className="text-lg text-gray-700 mb-6">ETA: <span className="font-semibold text-yellow-500">{time}</span></p>
        <button className="w-full py-2 bg-blue-900 text-white rounded-full text-lg font-semibold hover:bg-blue-800 transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RideCard;
