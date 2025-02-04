import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookRide from './pages/BookRide';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rides, setRides] = useState([]);

  // Simulated login function (you can replace it with actual authentication later)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to book a ride
  const handleBookRide = (pickup, destination) => {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination.');
      return;
    }

    const newRide = { pickup, destination, status: 'Pending' };
    setRides([...rides, newRide]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/book-ride" 
              element={
                <BookRide 
                  isLoggedIn={isLoggedIn} 
                  onLogin={handleLogin} 
                  onBookRide={handleBookRide} 
                  rides={rides} 
                />
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
