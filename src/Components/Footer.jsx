import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 py-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright Text */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 -{" "}
              <span className="text-white font-semibold">Nikhil Domade</span> |{" "}
              <span className="text-blue-400 ml-1">E-Commerce Store</span> | All Rights Reserved.
            </p>
          </div>

          {/* Additional Links */}
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact Us
            </a>
          </div>
        </div>

        {/* Powered by Section */}
        <div className="mt-4 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            Powered by <span className="text-blue-400">React</span> &{" "}
            <span className="text-green-400 ml-1">Node.js</span> | Designed with ❤️ by{" "}
            <span className="text-white">Nikhil Domade</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
