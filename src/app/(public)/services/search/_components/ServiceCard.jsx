"use client";
import { LuMapPin } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const ServiceCard = ({
  image,
  category,
  title,
  location,
  rating,
  currentPrice,
  originalPrice,
  isFavorite = false,
}) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
          {category}
        </span>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
          <FiHeart
            size={16}
            className={
              isFavorite ? "text-primary fill-current" : "text-muted-foreground"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <LuMapPin size={14} className="text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-foreground">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-primary font-bold text-lg">
              ${currentPrice.toFixed(2)}
            </span>
            <span className="text-muted-foreground line-through text-sm ml-1">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <button className="text-secondary font-medium text-sm hover:underline">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
