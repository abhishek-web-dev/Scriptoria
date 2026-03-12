import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="bg-gray-100 shadow fixed top-0 left-0 w-full z-50">

      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-semibold text-black">
          Universal E-Magazine
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-gray-700 font-medium">

          <li className="hover:text-blue-600 transition">
            <Link to="">Home</Link>
          </li>

          <li className="hover:text-blue-600 transition">
            <Link to="magazine">E-Magazine</Link>
          </li>

          <li className="hover:text-blue-600 transition">
            <Link to="about">About</Link>
          </li>

          <li className="hover:text-blue-600 transition">
            <Link to="contact">Contact</Link>
          </li>

          <li className="hover:text-blue-600 transition">
            <Link to="upload">Upload Article</Link>
          </li>

        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">

          <button onClick={() => setMenuOpen(!menuOpen)}>

            {menuOpen ? <FiX size={26}/> : <FiMenu size={26}/>}

          </button>

        </div>

      </div>

      {/* Gradient Bottom Line */}
      <div className="h-2 bg-gradient-to-r from-teal-300 via-gray-300 to-blue-400"></div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <ul className="flex flex-col space-y-4 p-6 text-gray-700 font-medium">

            <li>
              <Link to="" onClick={()=>setMenuOpen(false)}>Home</Link>
            </li>

            <li>
              <Link to="magazine" onClick={()=>setMenuOpen(false)}>E-Magazine</Link>
            </li>

            <li>
              <Link to="about" onClick={()=>setMenuOpen(false)}>About</Link>
            </li>

            <li>
              <Link to="contact" onClick={()=>setMenuOpen(false)}>Contact</Link>
            </li>

            <li>
              <Link to="upload" onClick={()=>setMenuOpen(false)}>Upload Article</Link>
            </li>

          </ul>

        </div>

      )}

    </nav>

  );
}

export default Navbar;