import React from "react";

const TitleWithSubTitle = ({ heading, subTitle, headingClr }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-2">
        {heading}
        <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] bg-clip-text text-transparent">
          {headingClr}
        </span>
      </h3>
      <p className="text-gray-500 mb-10 lg:px-60 text-center">{subTitle}</p>
    </div>
  );
};

export default TitleWithSubTitle;
