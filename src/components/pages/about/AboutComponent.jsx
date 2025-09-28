import React from "react";

import { FaAngleRight } from "react-icons/fa";
import AboutBestSolution from "./AboutBestSolution";
import WhyChooseUs from "./WhyChooseUS";
import AboutHowItWorks from "./AboutHowItWorks";
import BestServices from "./BestServices";
import Testimonials from "./Testimonials";
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
      <BestServices />
      <Testimonials />
    </div>
  );
};

export default AboutComponent;
