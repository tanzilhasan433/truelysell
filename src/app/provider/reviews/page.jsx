"use client";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    title: "Building Construction Services.",
    rating: 5,
    user: "Jeffrey Akridge",
    date: "July 11, 2024 11:38 am",
    review:
      "The construction service delivered excellent craftsmanship, completing my home renovation on time with clear communication throughout. Highly recommend for quality and professionalism!",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Commercial Painting Services.",
    rating: 5,
    user: "Nancy Olson",
    date: "July 18, 2024 04:30 pm",
    review:
      "The commercial painting service provided outstanding results, with precise attention to detail and timely completion. Their professionalism and quality of work are top-notch!",
    image:
      "https://images.unsplash.com/photo-1581092334394-1e7e41f7cfd3?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    title: "Plumbing Services.",
    rating: 5,
    user: "Ramona Kingsley",
    date: "July 28, 2024 02:15 pm",
    review:
      "The plumbing service was efficient and reliable, quickly resolving the issue with excellent workmanship. Highly recommend for their prompt and professional service!",
    image:
      "https://images.unsplash.com/photo-1581574204243-1f157c7620ca?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 4,
    title: "Electrical Installation Services.",
    rating: 5,
    user: "Michael Brown",
    date: "August 05, 2024 09:45 am",
    review:
      "The electrical installation was done perfectly. Everything works flawlessly and safely. Great communication and attention to detail!",
    image:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: 5,
    title: "Roofing Services.",
    rating: 5,
    user: "Sarah Miller",
    date: "August 10, 2024 03:20 pm",
    review:
      "Professional and quick roofing repair service. The team was skilled, and the price was fair. The roof looks brand new now!",
    image:
      "https://images.unsplash.com/photo-1597006611888-94343a63e1d7?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 6,
    title: "Interior Design Services.",
    rating: 5,
    user: "Daniel Clark",
    date: "August 18, 2024 01:00 pm",
    review:
      "Absolutely loved the interior design transformation! The team understood my vision perfectly and turned my space into something elegant and modern.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const ProviderReviewsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Reviews</h4>
      </div>
      {/*  */}
      <div className="max-w-5xl mx-auto  space-y-4">
        {reviews.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm rounded-xl p-4 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex gap-4 items-start">
              {/* Service Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="font-semibold text-gray-800">
                      {item.title}
                    </h6>
                    <div className="flex text-yellow-400">
                      {Array(item.rating)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} />
                        ))}
                    </div>
                  </div>
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button className="bg-gray-100 text-gray-500 hover:text-[var(--primary)]  p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2">
                      <FiEdit size={25} />
                    </button>
                    <button className="bg-gray-100 text-gray-500 p-2 h-7 w-7 hover:text-[var(--primary)]   rounded-full flex items-center  justify-center  gap-2">
                      <FaRegTrashCan size={25} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <img
                    src={item.avatar}
                    alt={item.user}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="font-medium">{item.user}</span>
                  <span className="text-gray-400">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-gray-700 leading-relaxed text-sm">
              {item.review}
            </p>
          </div>
        ))}
      </div>
      {/*  */}
    </div>
  );
};

export default ProviderReviewsPage;
