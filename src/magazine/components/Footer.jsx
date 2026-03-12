import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (

    <footer className="bg-[#2b2323] text-gray-300 py-16 px-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">

        {/* Contact Info */}
        <div>

          <h3 className="text-white text-xl font-semibold mb-6">
            Contact Info
          </h3>

          <p className="mb-2">
            <span className="font-semibold">Address :</span> Bahadurgarh, Haryana 124507
          </p>

          <p className="mb-2">
            <span className="font-semibold">Phone Number :</span> (+91) 7068507857
          </p>

          <p className="mb-6">
            <span className="font-semibold">Email-id :</span> contact@scientisticera.com
          </p>

          <p className="text-sm text-gray-400">
            Copyright © 2026 Universal E-Magazine
          </p>

        </div>



        {/* Quick Links */}
        <div>

          <h3 className="text-white text-xl font-semibold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/magazine" className="hover:text-white">
                E-Magazine
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>

          </ul>

        </div>



        {/* Social Media */}
        <div>

          <h3 className="text-green-400 text-sm font-semibold mb-6">
            FOLLOW US
          </h3>

          <div className="flex gap-4">

            <a
              href="https://x.com/Scientisticera"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded hover:bg-blue-700 transition"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61565407943656"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded hover:bg-blue-700 transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/scientisticera/"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded hover:bg-blue-700 transition"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://www.instagram.com/scientisticeraofficial/"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded hover:bg-blue-700 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="youtube.com/@ScientisticEra"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded hover:bg-blue-700 transition"
            >
              <FaYoutube size={18} />
            </a>

          </div>

        </div>

      </div>

    </footer>

  );
}

export default Footer;