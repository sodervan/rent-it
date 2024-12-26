import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
          About Us
        </h1>

        {/* Subtitle/Description */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-purple-600">Rentit</span>, your
          trusted platform for renting anything you want, anywhere you want. Our
          mission is to provide a seamless and efficient renting experience that
          connects people and businesses effortlessly.
        </p>

        {/* Section 1: Our Values */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Values</h2>
          <p className="text-gray-600">
            At Rentit, we value community, trust, and innovation. We believe in
            empowering individuals and organizations to make the most out of
            their resources by facilitating secure rentals.
          </p>
        </div>

        {/* Section 2: Why Choose Us */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Why Choose Us?
          </h2>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Reliable and secure rental process</li>
            <li>Wide range of rental categories</li>
            <li>Commitment to customer satisfaction</li>
            <li>User-friendly interface for easy renting</li>
          </ul>
        </div>

        {/* Call-to-action */}
        <div className="bg-purple-600 text-white py-4 px-6 rounded-lg shadow hover:bg-purple-700 transition duration-300">
          <h2 className="text-lg font-bold">
            Join Rentit today and experience a whole new way of renting!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
