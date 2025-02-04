import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Uber logo and help center */}
          <div>
            <h1 className="text-xl font-bold">RideXpress</h1>
            <p className="mt-2 text-sm">Visit Help Center</p>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Our offerings</li>
              <li>Newsroom</li>
              <li>Investors</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>Ride</li>
              <li>Drive</li>
              <li>Deliver</li>
              <li>Eat</li>
              <li>RideXpress for Business</li>
              <li>RideXpress Freight</li>
              <li>Gift cards</li>
            </ul>
          </div>

          {/* Global citizenship */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Global citizenship</h2>
            <ul className="space-y-2">
              <li>Safety</li>
              <li>Diversity and Inclusion</li>
              <li>Sustainability</li>
            </ul>
          </div>

          {/* Travel */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Travel</h2>
            <ul className="space-y-2">
              <li>Reserve</li>
              <li>Airports</li>
              <li>Cities</li>
            </ul>
          </div>
        </div>

        {/* Social media and app links */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex space-x-4 mb-6 md:mb-0">
            <i className="fab fa-facebook-f text-xl"></i>
            <i className="fab fa-twitter text-xl"></i>
            <i className="fab fa-youtube text-xl"></i>
            <i className="fab fa-linkedin-in text-xl"></i>
            <i className="fab fa-instagram text-xl"></i>
          </div>

          <div className="flex space-x-4">
            <button className="bg-white text-black px-4 py-2 text-sm rounded">Get it on Google Play</button>
            <button className="bg-white text-black px-4 py-2 text-sm rounded">Download on the App Store</button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center text-gray-400 text-sm">
          <p>© 2025 RideXpress Technologies Inc.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <p>Privacy</p>
            <p>Accessibility</p>
            <p>Terms</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
