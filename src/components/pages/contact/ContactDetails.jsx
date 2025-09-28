import React from "react";

const ContactDetails = () => {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Number Section */}
        <div className="flex items-center bg-pink-100 p-6 rounded-lg shadow-md">
          <div className="mr-4 text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.5 3.5L15 22V17zM8 17H3l1.5 3.5L8 22v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              Phone Number
            </h3>
            <p className="text-pink-600">(+1) 888-888-8888</p>
            <p className="text-pink-600">(+1) 123-456-7890</p>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="flex items-center bg-pink-100 p-6 rounded-lg shadow-md">
          <div className="mr-4 text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79V6c0-2.21-1.79-4-4-4H7C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4v-6.79l-5.3 3.13a1 1 0 01-1.47-.85V11.5a1 1 0 01.42-.8L21 7.29V12.8a1 1 0 01-.42-.69L21 12.8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              Email Address
            </h3>
            <p className="text-pink-600">truelysell@example.com</p>
            <p className="text-pink-600">johnsmith@example.com</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-center bg-pink-100 p-6 rounded-lg shadow-md">
          <div className="mr-4 text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.553 3.447a3 3 0 11-4.106 4.106l-.707-.707-4.24 4.242a8.992 8.992 0 001.104 2.96l1.213 2.12A9.003 9.003 0 0112 22a9.003 9.003 0 015.791-7.026l1.213-2.12a8.992 8.992 0 001.104-2.96l-4.24-4.242-.707.707z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Address</h3>
            <p className="text-pink-600">367 Hillcrest Lane</p>
            <p className="text-pink-600">Irvine, California, United States</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
