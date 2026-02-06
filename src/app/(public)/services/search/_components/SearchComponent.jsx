import FilterSidebar from "./FilterSidebar";
import ServicesGrid from "./ServicesGrid";

const SearchComponent = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <FilterSidebar />
          <ServicesGrid />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
