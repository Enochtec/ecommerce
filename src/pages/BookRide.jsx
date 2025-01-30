import React, { useState } from 'react';
import MapSection from './MapSection';

const BookRide = () => {
  const [destination, setDestination] = useState('');
  const [rideType, setRideType] = useState('Standard Ride');
  const [pickupLocation, setPickupLocation] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !pickupLocation) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    alert(`Your ride to ${destination} has been booked!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Book Your Ride</h1>
      <p className="text-lg text-gray-700 mb-8">
        Choose your destination, pickup location, and ride type, and we’ll handle the rest!
      </p>

      {/* Ride booking form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="destination" className="text-lg font-medium text-gray-800">Destination</label>
          <input
            id="destination"
            type="text"
            placeholder="Enter your destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
        </div>

        {/* Pickup Location Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="pickup-location" className="text-lg font-medium text-gray-800">Pickup Location</label>
          <input
            id="pickup-location"
            type="text"
            placeholder="Enter your pickup location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
        </div>

        {/* Ride Type Selection */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="ride-type" className="text-lg font-medium text-gray-800">Select Ride Type</label>
          <select
            id="ride-type"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800"
          >
            <option value="Standard Ride">Standard Ride</option>
            <option value="Premium Ride">Premium Ride</option>
            <option value="Group Ride">Group Ride</option>
            <option value="Eco Ride">Eco Ride</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-blue-900 py-3 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Book Now
        </button>
      </form>

      {/* Map Section */}
      <MapSection /> 
    </div>
  );
};

export default BookRide;
