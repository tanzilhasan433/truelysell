import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const steps = [
  {
    id: 1,
    icon: <FaRegFileAlt className="text-4xl text-white mb-3" />,
    title: "1. Post a Service",
    description:
      "After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.",
  },
  {
    id: 2,
    icon: <FaRegFileAlt className="text-4xl text-white mb-3" />,
    title: "2. Getting Booked & Job done",
    description:
      "After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.",
  },
  {
    id: 3,
    icon: (
      <div className="flex flex-col items-center mb-3">
        <FaRegStar className="text-3xl text-white mb-1" />
        <HiOutlineUserGroup className="text-2xl text-white" />
      </div>
    ),
    title: "3. Get Reviewd & Get Leads",
    description:
      "After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.",
  },
];

const HowWorksSection = () => {
  return (
    <div className="bg-black relative max-w-6xl mx-auto my-10 w-full rounded-md  py-16 px-4">
      <div
        className="absolute -left-6 top-24 w-36 h-16  opacity-80 blur-3xl z-0"
        style={{
          background: "bg-gradient-to-r from-[#d580ff] to-[#8800cc] ",
        }}
      />
      <div
        className="absolute right-54 top-2 w-40 h-8 rounded-full opacity-80 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d580ff, #8800cc)" }}
      />
      <div className="">
        <h3 className="text-3xl font-bold mb-2  text-center">
          <span className="text-white me-2"> How Truelysell</span>
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] bg-clip-text text-transparent">
            Works
          </span>
        </h3>
        <p className="text-gray-200 mb-10 lg:px-60 text-center">
          Each listing is designed to be clear and concise, providing customers
        </p>
      </div>
      {/* cards */}
      <div className=" text-center mt-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="text-white flex flex-col items-center justify-center"
            >
              {step.icon}
              <p className="text-lg font-semibold mb-2 text-white">
                {step.title}
              </p>
              <p className="text-gray-200 text-sm max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWorksSection;
