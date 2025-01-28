import React from 'react';
// import {NavLink} from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Uber Motorbike</h1>
        <ul className="flex space-x-4">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Book Ride</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
