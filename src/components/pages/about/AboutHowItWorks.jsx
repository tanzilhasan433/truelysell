import Image from 'next/image';

const AboutHowItWorks = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">How It Works</h1>
          <p className="text-gray-600 mt-4">Straightforward process designed to make your experience seamless and hassle-free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
            <div className="text-pink-500 text-4xl mb-4">
              <i className="fas fa-search"></i>
              <Image 
                src="/assets/img/icons/about-documents.png" 
                alt="documents" 
                width={40} // Adjust the width and height as per your needs
                height={40} 
              />
            </div>
            <h6 className="text-gray-800 mb-2">1. Search and Browse</h6>
            <span className="text-gray-600 text-center">
              Customers can browse or search for specific products or services using categories, filters, or search bars.
            </span>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
            <div className="text-pink-500 text-4xl mb-4">
              <i className="fas fa-cart-plus"></i> {/* Replace with your icon */}
            </div>
            <h6 className="text-xl font-medium text-gray-800 mb-2">2. Add to Cart or Book Now</h6>
            <span className="text-gray-600 text-center">
              Customers can add items to their shopping cart. For services, they may select a service and proceed to book.
            </span>
          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
            <div className="text-pink-500 text-4xl mb-4">
              <i className="fas fa-hand-pointer"></i> {/* Replace with your icon */}
            </div>
            <h6 className="text-xl font-medium text-gray-800 mb-2">3. Amazing Places</h6>
            <span className="text-gray-600 text-center">
              The customer fulfills the order by either providing the service to the buyer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHowItWorks;
