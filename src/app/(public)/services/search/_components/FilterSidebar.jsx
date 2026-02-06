"use client";
import { useState } from "react";
import { CiSearch, CiFilter } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { FaRegStar, FaStar } from "react-icons/fa";

const categories = [
  { id: "all", label: "All Categories", checked: false },
  { id: "construction", label: "Construction", checked: true },
  { id: "car-wash", label: "Car Wash", checked: false },
  { id: "electrical", label: "Electrical", checked: false },
  { id: "cleaning", label: "Cleaning", checked: false },
];

const ratings = [
  { stars: 5, count: 55 },
  { stars: 4, count: 48 },
  { stars: 3, count: 13 },
  { stars: 2, count: 5 },
  { stars: 1, count: 0 },
];

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState({ min: 5, max: 210 });
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subCategory: true,
    location: true,
    priceRange: true,
    ratings: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderStars = (count, filled = true) => {
    return Array(count)
      .fill(0)
      .map((_, i) =>
        filled ? (
          <FaStar key={i} size={14} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} size={14} className="text-muted-foreground" />
        ),
      );
  };

  return (
    <aside className="w-64 bg-card p-5 rounded-lg shadow-sm h-fit sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CiFilter size={18} className="text-(--primary)" />
          <span className="font-semibold text-foreground">Filters</span>
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground">
          Reset Filter
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Search By Keyword
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-3 pr-10 py-2 text-sm border border-input border-gray-200 rounded-md focus:outline-none  bg-background"
          />
          <CiSearch
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div
          className="font-semibold text-foreground flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("categories")}
        >
          <span>Categories</span>
          {expandedSections.categories ? (
            <GoChevronUp size={18} />
          ) : (
            <GoChevronDown size={18} />
          )}
        </div>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={cat.checked}
                  className="w-4 h-4 rounded border-input text-(--primary) focus:ring-(--primary) accent-(--primary)"
                />
                {cat.label}
              </label>
            ))}
            <button
              onClick={() => setShowMoreCategories(!showMoreCategories)}
              className="text-sm text-(--primary) hover:underline mt-1"
            >
              View more {showMoreCategories ? "▲" : "▼"}
            </button>
          </div>
        )}
      </div>

      {/* Sub Category */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div
          className="font-semibold text-foreground flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("subCategory")}
        >
          <span>Sub Category</span>
          {expandedSections.subCategory ? (
            <GoChevronUp size={18} />
          ) : (
            <GoChevronDown size={18} />
          )}
        </div>
        {expandedSections.subCategory && (
          <div className="relative">
            <select className="w-full px-3 py-2 text-sm border border-gray-200 border-input rounded-md focus:outline-none  appearance-none cursor-pointer accent-(--primary)">
              <option>Select Sub Category</option>
              <option>Repair</option>
              <option>Installation</option>
              <option>Maintenance</option>
            </select>
            <GoChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        )}
      </div>

      {/* Location */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div
          className="font-semibold text-foreground flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("location")}
        >
          <span>Location</span>
          {expandedSections.location ? (
            <GoChevronUp size={18} />
          ) : (
            <GoChevronDown size={18} />
          )}
        </div>
        {expandedSections.location && (
          <div className="relative">
            <input
              type="text"
              placeholder="Select Location"
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-200 border-input rounded-md focus:outline-none  "
            />
            <LuMapPin
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-gray-600"
            />
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div
          className="font-semibold text-foreground flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("priceRange")}
        >
          <span>Price Range</span>
          {expandedSections.priceRange ? (
            <GoChevronUp size={18} />
          ) : (
            <GoChevronDown size={18} />
          )}
        </div>
        {expandedSections.priceRange && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-(--primary) text-white rounded text-sm font-medium">
                ${priceRange.min}
              </span>
              <span className="px-3 py-1  bg-(--primary) text-white rounded text-sm font-medium">
                ${priceRange.max}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: parseInt(e.target.value),
                }))
              }
              className="w-full accent-(--primary)"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Price: ${priceRange.min} - ${priceRange.max}
            </p>
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="pb-4 mb-4">
        <div
          className="font-semibold text-foreground flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleSection("ratings")}
        >
          <span>Ratings</span>
          {expandedSections.ratings ? (
            <GoChevronUp size={18} />
          ) : (
            <GoChevronDown size={18} />
          )}
        </div>
        {expandedSections.ratings && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label
                key={rating.stars}
                className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-input text-(--primary) focus:ring-(--primary) accent-(--primary)"
                />
                <div className="flex items-center gap-0.5">
                  {renderStars(rating.stars)}
                  {rating.stars < 5 &&
                    Array(5 - rating.stars)
                      .fill(0)
                      .map((_, i) => (
                        <FaRegStar
                          key={i}
                          size={14}
                          className=" text-yellow-500"
                        />
                      ))}
                </div>
                <span>({rating.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <button className="w-full py-2 bg-(--dark) text-white text-sm rounded-md hover:opacity-90 transition-opacity">
        Search
      </button>
    </aside>
  );
};

export default FilterSidebar;
