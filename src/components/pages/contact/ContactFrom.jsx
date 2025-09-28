import React from 'react';
import Image from "next/image";
const ContactFrom = () => {
    return (
         <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="w-full">
          <Image
            src="/cleaner.jpg" // place your image in public/cleaner.jpg
            alt="Cleaning Service"
            width={600}
            height={500}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="text"
              placeholder="Your Phone Number"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <select
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option>Select Services</option>
              <option>Home Cleaning</option>
              <option>Office Cleaning</option>
              <option>Plumbing</option>
              <option>Electrical</option>
            </select>

            <textarea
              placeholder="Type Message"
              rows={4}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>

            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md shadow hover:bg-gray-800 transition inline-flex items-center gap-2"
            >
              Send Message <span className="text-lg">↗</span>
            </button>
          </form>
        </div>
      </div>
    </section>
    );
};

export default ContactFrom;