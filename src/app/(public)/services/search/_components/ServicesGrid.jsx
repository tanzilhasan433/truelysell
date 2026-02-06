import ServiceCard from "./ServiceCard";
import { GoChevronDown } from "react-icons/go";
import { LuGrid3X3 } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";

const services = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
    category: "Car Wash",
    title: "Car Repair Service",
    location: "Maryland City, MD, USA",
    rating: 4.9,
    currentPrice: 25.0,
    originalPrice: 35.0,
    isFavorite: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    category: "Construction",
    title: "Toughened Glass Fitting",
    location: "New Jersey, USA",
    rating: 4.7,
    currentPrice: 20.0,
    originalPrice: 25.0,
    isFavorite: false,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=300&fit=crop",
    category: "Computer",
    title: "Computer Hardware Service",
    location: "California, USA",
    rating: 4.5,
    currentPrice: 20.0,
    originalPrice: 35.0,
    isFavorite: false,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
    category: "Interior",
    title: "Interior Designing",
    location: "Maryland, USA",
    rating: 4.8,
    currentPrice: 30.0,
    originalPrice: 35.0,
    isFavorite: true,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop",
    category: "Car Wash",
    title: "Steam Car Wash",
    location: "Montana, USA",
    rating: 4.2,
    currentPrice: 20.0,
    originalPrice: 25.0,
    isFavorite: false,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    category: "Electrical",
    title: "Electric Panel Repairing",
    location: "Texas, USA",
    rating: 4.9,
    currentPrice: 40.0,
    originalPrice: 115.0,
    isFavorite: true,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    category: "Cleaning",
    title: "House Cleaning Services",
    location: "New Jersey, USA",
    rating: 4.6,
    currentPrice: 15.0,
    originalPrice: 20.0,
    isFavorite: true,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop",
    category: "Construction",
    title: "Commercial Painting",
    location: "Alabama, USA",
    rating: 4.5,
    currentPrice: 18.0,
    originalPrice: 25.0,
    isFavorite: false,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    category: "Appliance",
    title: "Air Conditioner Service",
    location: "Washington, DC, USA",
    rating: 4.2,
    currentPrice: 30.0,
    originalPrice: 45.0,
    isFavorite: false,
  },
];

const ServicesGrid = () => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Found <span className="text-primary">11 Services</span>
        </h2>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort</span>
            <div className="relative">
              <select className="pl-3 pr-8 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-card appearance-none cursor-pointer min-w-[150px]">
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
              <GoChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-input rounded-md overflow-hidden">
            <button className="p-2 bg-primary text-primary-foreground">
              <LuGrid3X3 size={18} />
            </button>
            <button className="p-2 bg-card text-muted-foreground hover:text-foreground">
              <CiCircleList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
