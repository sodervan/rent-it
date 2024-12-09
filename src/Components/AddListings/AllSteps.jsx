import { useParams } from "react-router-dom";
import BasicDetails from "./BasicDetails.jsx";
import { useEffect } from "react";
import CostBreakdown from "./CostBreakdown.jsx";
import CostBreakdownPreview from "./CostBreakdownPreview.jsx";
import Description from "./Description.jsx";
import ElectricityAndWater from "./ElectricityAndWater.jsx";
import AddFeatures from "./AddFeatures.jsx";
import DescriptionPreview from "./DescriptionPreview.jsx";
import AddBills from "./AddBills.jsx";
import UploadListingImages from "./UploadListingImages.jsx";
import UploadListingVideos from "./UploadListingVideos.jsx";

const AllSteps = () => {
  const step = useParams().step;
  useEffect(() => {}, []);
  return (
    <>
      <div className="mt-20">
        <div>
          {step == 1 && <BasicDetails />}
          {step == 2 && <CostBreakdown />}
          {step == 3 && <CostBreakdownPreview />}
          {step == 4 && <Description />}
          {step == 5 && <DescriptionPreview />}
          {step == 6 && <ElectricityAndWater />}
          {step == 7 && <AddFeatures />}
          {step == 8 && <AddBills />}
          {step == 9 && <UploadListingImages />}
          {step == 10 && <UploadListingVideos />}
        </div>
      </div>
    </>
  );
};

export default AllSteps;
