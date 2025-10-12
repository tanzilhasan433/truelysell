"use client";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const providers = [
  {
    id: 1,
    name: "Hendry Thompson",
    rating: 4.4,
    reviews: 123,
    services: 46,
    price: 60,
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "William Patterson",
    rating: 4.8,
    reviews: 200,
    services: 40,
    price: 70,
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Lorenzo Verduzco",
    rating: 4.6,
    reviews: 270,
    services: 52,
    price: 55,
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Rafael Smith",
    rating: 4.8,
    reviews: 300,
    services: 40,
    price: 65,
    img: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Robert Boyd",
    rating: 4.8,
    reviews: 300,
    services: 40,
    price: 70,
    img: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Joe Fletcher",
    rating: 4.9,
    reviews: 370,
    services: 65,
    price: 50,
    img: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Benjamin Wade",
    rating: 4.2,
    reviews: 220,
    services: 30,
    price: 40,
    img: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "William Hughes",
    rating: 4.3,
    reviews: 280,
    services: 35,
    price: 45,
    img: "https://i.pravatar.cc/150?img=8",
  },
];

const PopularProviderSection = () => {
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Popular"
        headingClr=" Providers"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="border border-gray-200 p-4 flex gap-2  items-center text-center shadow-sm hover:shadow-md transition"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                <Image
                  src={provider.img}
                  alt={provider.name}
                  width={50}
                  height={50}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className=" font-semibold">{provider.name}</p>
                <div className="flex items-center gap-1 text-sm mt-1 text-gray-600">
                  <FaStar className="text-yellow-500" />
                  <span>{provider.rating}</span>
                  <span>({provider.reviews} Reviews)</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {provider.services} Services, From{" "}
                  <span className="font-semibold text-gray-800">
                    ${provider.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default PopularProviderSection;
