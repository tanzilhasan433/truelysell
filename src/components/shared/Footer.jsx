import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="container mx-auto px-6 flex gap-30">
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4 p-4">
          {/* Product Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Case studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Updates
                </a>
              </li>
            </ul>
      <div className="flex justify-start items-center space-x-3 mt-10">
        <a href="#" className="text-white hover:text-pink-500">
          <FaFacebookF />
        </a>
        <a href="#" className="text-white hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href="#" className="text-white hover:text-pink-500">
          <FaWhatsapp />
        </a>
        <a href="#" className="text-white hover:text-pink-500">
          <FaYoutube />
        </a>
        <a href="#" className="text-white hover:text-pink-500">
          <FaLinkedinIn />
        </a>
        
        
      </div>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 ">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Getting started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Server status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Report a bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chat support
                </a>
              </li>
            </ul>
          </div>

          {/* For Provider Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Provider</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Faq's
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Blog
                </a>
              </li>
            </ul>
          </div>

                    {/* Support Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 ">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Getting started
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Server status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Report a bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chat support
                </a>
              </li>
            </ul>
          </div>

        </div>
        {/* SignUp for Subscription Section */}
        <div className="lg:col-span-2 m-4  p-4">
          <h3 className="text-lg font-semibold mb-4">
            Subscription
          </h3>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:bg-gradient-to-l">
              Subscribe
            </button>
            <div className="mt-10 text-center text-sm text-gray-400">
              <p>Download Our App:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="flex items-center">
                  <img src="/app-store.png" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="flex items-center">
                  <img
                    src="/google-play.png"
                    alt="Google Play"
                    className="h-10"
                  />
                </a>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <a href="#" className="text-white hover:text-pink-500">
                    Terms and Conditions
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-white hover:text-pink-500">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="text-center">
        <div className="text-gray-400 ">© 2024 All Rights Reserved</div>
    
    </div>      
    </footer>
  );
}
