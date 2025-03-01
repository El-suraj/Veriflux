import * as React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
    {
        name: "John Doe",
        role: "CEO, JDtech",
        qoute: " This platfrom has revolutionalized how we verify certificates. highly recommended",
    },
    {
        name: "Jane Smith",
        role: "CTO, JDtech",
        qoute: "Veriflux is a game changer. It has made certificate verification seamless and secure",
    },
    {
        name: "micheal johnson",
        role: "COO, JDtech",
        qoute: "We have been using Veriflux for over a year now and it has been a great experience",
    },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-gray-400 mb-4" />
              <p className="text-gray-700 mb-4">{testimonial.qoute}</p>
              <FaQuoteRight className="text-gray-400 mb-4" />
              <div className="text-right">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default Testimonials;