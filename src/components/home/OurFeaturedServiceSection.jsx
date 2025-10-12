import React from "react";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";

const OurFeaturedServiceSection = () => {
  return (
    <div className="py-16 bg-gray-100 text-center">
      <TitleWithSubTitle
        heading="Our Featured"
        headingClr=" Services"
        subTitle=" Each listing is designed to be clear and concise, providing customers"
      />
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default OurFeaturedServiceSection;
