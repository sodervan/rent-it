import { useParams } from "react-router-dom";
import BasicDetails from "./BasicDetails.jsx";
import { useEffect } from "react";
import CostBreakdown from "./CostBreakdown.jsx";
import CostBreakdownPreview from "./CostBreakdownPreview.jsx";
import Description from "./Description.jsx";
import ElectricityAndWater from "./ElectricityAndWater.jsx";

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
          {step == 5 && <ElectricityAndWater />}
        </div>
      </div>
    </>
  );
};

export default AllSteps;
