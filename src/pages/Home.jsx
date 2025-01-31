import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaMotorcycle, FaCarSide, FaUsers, FaLeaf, FaClock, FaDollarSign, FaGlobe, FaApple, FaGooglePlay } from 'react-icons/fa';

const Home = () => {
  return (
    <>
    
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 text-center mt-16"> {/* Add mt-16 */}

        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to RideXpress</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto animate-fade-in-delay">Your trusted motorbike service. Fast, reliable, and affordable rides, wherever you are.</p>
          <button className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-full hover:bg-yellow-400 transition animate-bounce">
  <Link to="/book-ride">Book a Ride</Link>
</button>
        </div>
      </header>
      
      {/* Why Choose Us */}
      <main className="container mx-auto py-16 px-6 mt-16">  {/* Add mt-16 here */}

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">Experience top-tier motorbike services tailored to your needs. Whether you're in a rush or just need a smooth ride, we’ve got you covered.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <FaClock className="text-blue-900 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p>We prioritize your time with quick, punctual rides wherever you are.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <FaDollarSign className="text-green-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Affordable Pricing</h3>
              <p>Get the best rates without compromising on safety and comfort.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
              <FaGlobe className="text-yellow-500 text-4xl mb-3 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p>No matter the time, we're here to get you where you need to go.</p>
            </div>
          </div>
        </section>

      {/* Ride Options */}
<section className="text-center mb-16">
  <h2 className="text-4xl font-bold mb-6 text-yellow-400">Our Ride Options</h2>
  <p className="text-xl mb-12 text-gray-300 max-w-xl mx-auto">Explore our wide range of ride options designed to cater to all your travel needs, whether you're looking for speed, comfort, or a group experience.</p>
  
  <div className="flex flex-wrap justify-center gap-8">
    {/* Standard Ride */}
    <div className="max-w-xs bg-blue-800 text-white rounded-lg shadow-lg p-6 hover:bg-blue-700 transition duration-300">
      <div className="text-4xl mb-4 text-yellow-400">
        <FaMotorcycle />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Standard Ride</h3>
      <p className="text-lg mb-4">Perfect for quick city trips, offering a reliable and affordable solution for your daily needs.</p>
      <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
        Book Now
      </button>
    </div>

    {/* Premium Ride */}
    <div className="max-w-xs bg-blue-800 text-white rounded-lg shadow-lg p-6 hover:bg-blue-700 transition duration-300">
      <div className="text-4xl mb-4 text-yellow-400">
        <FaCarSide />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Premium Ride</h3>
      <p className="text-lg mb-4">Enjoy extra comfort and style, perfect for special occasions or when you want to travel in luxury.</p>
      <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
        Book Now
      </button>
    </div>

    {/* Group Ride */}
    <div className="max-w-xs bg-blue-800 text-white rounded-lg shadow-lg p-6 hover:bg-blue-700 transition duration-300">
      <div className="text-4xl mb-4 text-yellow-400">
        <FaUsers />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Group Ride</h3>
      <p className="text-lg mb-4">Ideal for traveling with friends or colleagues, offering a spacious and comfortable experience for groups.</p>
      <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
        Book Now
      </button>
    </div>

    {/* Eco Ride */}
    <div className="max-w-xs bg-blue-800 text-white rounded-lg shadow-lg p-6 hover:bg-blue-700 transition duration-300">
      <div className="text-4xl mb-4 text-yellow-400">
        <FaLeaf />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Eco Ride</h3>
      <p className="text-lg mb-4">Travel sustainably with our eco-friendly rides, designed to reduce your carbon footprint while still offering a great experience.</p>
      <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
        Book Now
      </button>
    </div>
  </div>
</section>


        {/* Download Our App */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">Get Uber on your mobile and enjoy seamless ride booking at your fingertips.</p>
          <div className="flex justify-center gap-6">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-full flex items-center gap-2 hover:bg-blue-800 transition">
              <FaApple className="text-xl" /> Download on the App Store
            </button>
            <button className="px-8 py-3 bg-green-500 text-white rounded-full flex items-center gap-2 hover:bg-green-400 transition">
              <FaGooglePlay className="text-xl" /> Get it on Google Play
            </button>
          </div>
        </section>
      </main>
      
    </>
  );
};

export default Home;
