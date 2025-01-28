import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold tracking-wide">Uber Motorbike</h1>
        <ul className="hidden md:flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-400 transition duration-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book-ride"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-400 transition duration-300"
              }
            >
              Book Ride
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-400 transition duration-300"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="md:hidden">
          {/* Mobile menu toggle */}
          <button
            className="text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Open Menu"
          >
            &#9776;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
