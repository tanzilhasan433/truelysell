import React from "react";
import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";

const BrowseHighSection = () => {
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Browse "
        headingClr=" High Rated Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default BrowseHighSection;
