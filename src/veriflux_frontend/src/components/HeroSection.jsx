import React from "react";

const HeroSection = () => {
    return (
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Verify certificates with ease
          </h1>
          <p className="text-lg mb-8">
            Ensure the authenticity of your certificates with Veriflux, a
            reliable and secure platform.
          </p>
          <div className="space-x-4">
            <a
              href="#"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="#"
              className="border bordeer-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;