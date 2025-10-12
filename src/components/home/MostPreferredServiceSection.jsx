import TitleWithSubTitle from "../shared/TitleWithSubTitle";
import ViewAllButton from "../shared/ViewAllButton";

const MostPreferredServiceSection = () => {
  return (
    <div className="py-16  text-center">
      <TitleWithSubTitle
        heading="Most "
        headingClr=" Preferred Services"
        subTitle="Each listing is designed to be clear and concise, providing customers"
      />
      <ViewAllButton pageLink="/" />
    </div>
  );
};

export default MostPreferredServiceSection;
