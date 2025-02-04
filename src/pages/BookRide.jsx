import React, { useState, lazy, Suspense } from "react";

const MapSection = lazy(() => import("./MapSection"));

const BookRide = () => {
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("Standard Ride");
  const [pickupLocation, setPickupLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim() || !pickupLocation.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      alert(`🚖 Your ${rideType} to ${destination} has been booked!`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Book Your Ride</h1>
      <p className="text-lg text-gray-700 mb-8">
        Choose your destination, pickup location, and ride type, and we’ll handle the rest!
      </p>

      {/* Ride Booking Form */}
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
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
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
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
        </div>

        {/* Ride Type Selection */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="ride-type" className="text-lg font-medium text-gray-800">Select Ride Type</label>
          <select
            id="ride-type"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
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
          disabled={loading}
          className={`w-full py-3 rounded-full transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
          }`}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {/* Map Section (Lazy Loaded) */}
      <Suspense fallback={<p className="text-center mt-6">Loading map...</p>}>
        <MapSection />
      </Suspense>
    </div>
  );
};

export default BookRide;
