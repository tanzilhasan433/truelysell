import { FaUser } from "react-icons/fa";

export default function ProviderBanner() {
  return (
    <div className="bg-black relative">
      <div
        className="absolute -left-40 bottom-0 w-60 h-14 rounded-full opacity-80 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d580ff, #8800cc)" }}
      />
      <div
        className="absolute right-60 top-2 w-40 h-8 rounded-full opacity-80 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d580ff, #8800cc)" }}
      />
      <div className=" max-w-6xl mx-auto my-10 w-full   py-10 px-4 flex justify-between items-center ">
        <div>
          <p className="text-sm text-white mb-1">Become a Provider</p>
          <h2 className="text-2xl font-semibold  ">
            <span className="text-white "> Post your service</span>
            <span className=" ms-2 bg-gradient-to-r from-[var(--primary)]  to-[var(--primary-blue)] bg-clip-text text-transparent">
              in a minute
            </span>
          </h2>
        </div>

        <button
          className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm
                 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                 hover:opacity-90 transition-all duration-200  hover:text-[var(--primary)]"
        >
          <FaUser size={12} /> Join Us
        </button>
      </div>
    </div>
  );
}
