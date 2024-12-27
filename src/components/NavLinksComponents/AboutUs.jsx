import React from "react";

const AboutUs = () => {
  return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <div className="bg-purple-600 text-white py-16 px-6 text-center">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Welcome to <span className="font-semibold">Rentit</span>, your trusted platform for renting anything you need, anywhere you want. We are here to revolutionize the renting experience by making it seamless, efficient, and reliable.
          </p>
        </div>

        {/* Values Section */}
        <div className="container mx-auto max-w-7xl py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
              <p className="text-gray-600 leading-relaxed">
                At Rentit, we value community, trust, and innovation. We believe in empowering individuals and organizations to make the most out of their resources by facilitating secure rentals.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                <li>Reliable and secure rental process</li>
                <li>Wide range of rental categories</li>
                <li>Commitment to customer satisfaction</li>
                <li>User-friendly interface for easy renting</li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-600">35+</h3>
              <p className="text-gray-600 mt-2">Rental Categories</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-600">10K+</h3>
              <p className="text-gray-600 mt-2">Satisfied Customers</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <h3 className="text-4xl font-bold text-purple-600">4.9</h3>
              <p className="text-gray-600 mt-2">Google Rating</p>
            </div>
          </div>
        </div>

        {/* Call-to-action Section */}
        <div className="bg-purple-600 text-white py-12 text-center rounded-lg mx-4 md:mx-auto max-w-4xl shadow-md">
          <h2 className="text-3xl font-bold">Join Rentit Today!</h2>
          <p className="mt-4 text-sm max-w-md mx-auto">
            Discover a seamless renting experience and unlock endless possibilities with Rentit.
          </p>
          <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded shadow hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-900 text-gray-400 py-6 mt-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Rentit. All Rights Reserved.</p>
          </div>
        </div>
      </div>
  );
};

export default AboutUs;
