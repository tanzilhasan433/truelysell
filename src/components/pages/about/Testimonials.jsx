import React from 'react';
import Image from "next/image";
const Testimonials = () => {
    return (
        
         <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Testimonials
        </h2>
        <p className="mt-2 text-gray-600">
          Our clients rave about our seamless service, exceptional quality, and
          unmatched customer support.
        </p>

        {/* Testimonials Container */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-6 relative">
            <div className="flex justify-center -mt-16">
              <Image
                src="/person1.jpg" // put image in /public folder
                alt="John Doe"
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
            <p className="mt-6 text-gray-600 text-sm md:text-base italic">
              “I was thoroughly impressed with the quality and efficiency of the
              service I received. The team was professional, and the results
              exceeded my expectations.”
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-500 text-sm">Director</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-6 relative">
            <div className="flex justify-center -mt-16">
              <Image
                src="/person2.jpg" // put image in /public folder
                alt="John Doe"
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
            <p className="mt-6 text-gray-600 text-sm md:text-base italic">
              "The value for money was excellent, and the quality of work was
              outstanding. I felt that I received more than what I paid for,
              with high standards and professional results."
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-500 text-sm">Director</p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows (optional, for slider functionality later) */}
        <div className="flex justify-between mt-10 px-4 md:px-20">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-200">
            ←
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-200">
            →
          </button>
        </div>
      </div>
    </section>
    );
};

export default Testimonials;