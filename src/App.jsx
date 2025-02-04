import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const BookRide = lazy(() => import("./pages/BookRide"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rides, setRides] = useState([]);

  // Simulated login function
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to book a ride
  const handleBookRide = (pickup, destination) => {
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination.");
      return;
    }

    const newRide = { pickup, destination, status: "Pending" };
    setRides([...rides, newRide]);
  };

  return (
    <Router>
      <Helmet>
        <title>Ride Booking | Fast & Affordable Rides</title>
        <meta name="description" content="Book a ride easily with our fast and affordable ride-booking service." />
        <meta name="keywords" content="book ride, ride-sharing, transport, travel, group ride" />
        <meta name="author" content="YourCompany" />
        <meta property="og:title" content="Ride Booking | Fast & Affordable" />
        <meta property="og:description" content="Easily book your ride with our convenient platform." />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow container mx-auto p-4">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/book-ride"
                element={<BookRide isLoggedIn={isLoggedIn} onLogin={handleLogin} onBookRide={handleBookRide} rides={rides} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
