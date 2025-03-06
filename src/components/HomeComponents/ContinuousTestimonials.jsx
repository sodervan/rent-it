import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const ContinuousTestimonials = () => {
  const testimonials = [
    {
      text: "The platform completely transformed my accommodation search. Their powered recommendations were spot-on!",
      name: "Emmanuel Anu",
      university: "University of Lagos",
      country: "NG",
      rating: 5,
    },
    {
      text: "Incredible attention to detail. The virtual tours saved me so much time in finding my perfect student home.",
      name: "Osuoha Destiny",
      university: "University of Lagos",
      country: "NG",
      rating: 5,
    },
    {
      text: "The smart matching system found me roommates with similar interests. Couldn't be happier with my living situation!",
      name: "Babatunde Tolu",
      university: "Unilag",
      country: "NG",
      rating: 5,
    },
    {
      text: "24/7 support team was always there when I needed them. Best student housing platform I've used!",
      name: "Ige Ifeoluwa",
      university: "OAU",
      country: "NG",
      rating: 5,
    },
    {
      text: "Went from lack of trusting RentIT. Now they're my go-to when it comes to anything accommodation ",
      name: "Egbowon Emmanuel",
      university: "University of Lagos",
      country: "NG",
      rating: 5,
    },
  ];

  // Double the testimonials array for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full bg-gradient-to-b from-indigo-50/50 to-white py-16 my-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-3 mb-3 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-600 bg-clip-text">
              Trusted by 500k+ Renters and Landlords Nationwide
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-violet-400"
                />
              ))}
            </div>
            <span className="text-gray-600">+2k reviews</span>
          </div>
        </div>

        <div className="relative">
          {/*<div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />*/}
          {/*<div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />*/}

          <div className="flex gap-6 animate-scroll">
            {doubledTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[380px] bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-violet-500 text-violet-500"
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-medium text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {testimonial.university}
                      <span className="inline-block w-[1px] h-3 bg-gray-300" />
                      <img
                        src={`https://flagcdn.com/w20/${testimonial.country.toLowerCase()}.png`}
                        alt={`${testimonial.country} flag`}
                        className="w-4 h-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ContinuousTestimonials;
