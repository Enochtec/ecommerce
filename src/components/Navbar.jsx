import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMotorcycle } from 'react-icons/fa';

const Navbar = () => {
  // State to handle mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-900 text-white shadow-md fixed w-full top-0 left-0 z-50 h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaMotorcycle className="text-yellow-500" /> RideXpress
        </h1>
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:space-x-8 space-y-4 md:space-y-0 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-900 md:bg-transparent p-6 md:p-0`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-400 font-semibold'
                  : 'hover:text-yellow-400 transition duration-300'
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
                  ? 'text-yellow-400 font-semibold'
                  : 'hover:text-yellow-400 transition duration-300'
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
                  ? 'text-yellow-400 font-semibold'
                  : 'hover:text-yellow-400 transition duration-300'
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
            onClick={toggleMenu} // Toggle menu visibility
          >
            &#9776;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
