import React from 'react';
import Footer from '../components/Footer'
import RideCard from '../components/RideCard';

const Home = () => {
  return (
    <>
    
      <main className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Uber Motorbike</h1>
        <p>Get a ride anytime, anywhere!</p>
        <button className="mt-6 px-6 py-2 bg-blue-900 text-white rounded">Book a Ride</button>
      </main>
    <Footer />
    </>
  );
};

export default Home;
