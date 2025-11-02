import React from "react";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";

const GenuineReviewSection = () => {
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Genuine reviews from  "
        headingClr=" Customers"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default GenuineReviewSection;
