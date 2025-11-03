import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const Button = ({ href, children }) => {
  return (
    <a href={href} className="  px-2 py-2 rounded-md">
      {children}
    </a>
  );
};
const reviews = [
  {
    name: "Jeffrey Akridge",
    date: "July 11, 2024 11:38 am",
    service: "Building Construction Services.",
    rating: 5,
    review:
      "The construction service delivered excellent craftsmanship, completing my home renovation on time with clear communication throughout. Highly recommend for quality and professionalism!",
  },
  {
    name: "Nancy Olson",
    date: "July 18, 2024 04:30 pm",
    service: "Commercial Painting Services.",
    rating: 5,
    review:
      "The commercial painting service provided outstanding results, with precise attention to detail and timely completion. Their professionalism and quality of work are top-notch!",
  },
  {
    name: "Ramona Kingsley",
    date: "July 28, 2024 02:15 pm",
    service: "Plumbing Services.",
    rating: 5,
    review:
      "The plumbing service was efficient and reliable, quickly resolving the issue with excellent workmanship. Highly recommend for their prompt and professional service!",
  },
];
const CustomerReviewCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-2">
      <div className="space-y-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-10 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                <img src="images/your-image.jpg" alt="Image" className="w-full h-full object-cover rounded-full" />
                </div>
              <div className="flex items-center justify-between">
                <h5 className="text-sm text-gray-500">{review.service} </h5>
                    <div className="ml-auto flex items-center ">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15l-3.472 2.345.84-4.902L3 8.293l4.944-.428L10 3l2.056 4.865L17 8.293l-4.368 3.15.84 4.902L10 15z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              </div>
            </div>
            <div className="flex items-center mb-2">
              
              <p className="text-sm font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">.  {review.date}</p>
              <div className="ml-auto flex items-center">
                <Button href="Edit"><FaRegEdit /></Button>
                <Button href="Delete"><RiDeleteBin6Line /></Button>
              </div>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviewCard;
