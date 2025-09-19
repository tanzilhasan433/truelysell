import React from "react";

import { FaAngleRight } from "react-icons/fa";
import AboutBestSolution from "./AboutBestSolution";
import WhyChooseUs from "./WhyChooseUS";
import AboutHowItWorks from "./AboutHowItWorks";
const AboutComponent = () => {
  return (
    <div>
      <h1 className="text-4xl text-center">About Us</h1>
      <p className="text-center text-pink-400 ">
        Home <FaAngleRight className="inline" /> About
      </p>
      <AboutBestSolution/>
      <WhyChooseUs />
      <AboutHowItWorks />
    </div>
  );
};

export default AboutComponent;
