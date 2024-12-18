import { useParams } from "react-router-dom";
import BasicDetails from "./BasicDetails.jsx";
import { useEffect } from "react";
import CostBreakdown from "./CostBreakdown.jsx";
import CostBreakdownPreview from "./CostBreakdownPreview.jsx";
import Description from "./Description.jsx";
import ElectricityAndWater from "./ElectricityAndWater.jsx";
import FurnishingState from "./FurnishingState.jsx";
import AddFeatures from "./AddFeatures.jsx";

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
          {step == 6 && <ElectricityAndWater />}
          {step == 7 && <FurnishingState />}
          {step == 8 && <AddFeatures />}
        </div>
      </div>
    </>
  );
};

export default AllSteps;
