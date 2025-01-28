import React from 'react';
import Footer from '../components/Footer';
import RideCard from '../components/RideCard';

const Home = () => {
  return (
    <>
      <header className="bg-blue-900 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-semibold mb-4">Welcome to Uber Motorbike</h1>
          <p className="text-lg mb-6">Your trusted motorbike service. Fast, reliable, and affordable rides, wherever you are.</p>
          <button className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-full hover:bg-yellow-400 transition">Book a Ride</button>
        </div>
      </header>

      <main className="container mx-auto py-16">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg mb-8">Experience the best motorbike services tailored to your needs. Whether you're in a rush or just need a ride, we're here to help.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Fast & Reliable</h3>
              <p>We prioritize your time with fast, punctual rides wherever you are.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Affordable Pricing</h3>
              <p>Get the best rates without compromising on quality and safety.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p>No matter the time, we're here to get you where you need to go.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Rides</h2>
          <p className="text-lg mb-8">Explore our ride options for a variety of needs.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <RideCard title="Standard Ride" description="Perfect for short trips around the city." />
            <RideCard title="Premium Ride" description="For those who need extra comfort and style." />
            <RideCard title="Group Ride" description="Ideal for traveling with friends or colleagues." />
          </div>
        </section>
        
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Download Our App</h2>
          <p className="text-lg mb-8">Get Uber Motorbike on your mobile and enjoy seamless ride booking at your fingertips.</p>
          <div className="flex justify-center gap-6">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition">Download on the App Store</button>
            <button className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 transition">Get it on Google Play</button>
          </div>
        </section>
      </main>

    </>
  );
};

export default Home;
