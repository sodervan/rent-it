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
import UploadTenancyAgreement from "./UploadTenancyAgreement.jsx";
import ListingLocation from "./ListingMap.jsx";
import ReviewListing from "./ReviewListing.jsx";
import SideBar from "@/components/AddListings/SideBar.jsx";

const AllSteps = () => {
  const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Cost Breakdown" },
    { id: 3, label: "Cost Breakdown Preview" },
    { id: 4, label: "Description" },
    { id: 5, label: "Description Preview" },
    { id: 6, label: "Electricity and Water" },
    { id: 7, label: "Add Features" },
    { id: 8, label: "Add Bills" },
    { id: 9, label: "Upload Listing Images" },
    { id: 10, label: "Upload Listing Videos" },
    { id: 11, label: "Listing Location" },
    { id: 12, label: "Upload Tenancy Agreement" },
    { id: 13, label: "Review Listing" },
  ];
  const step = useParams().step;
  useEffect(() => {}, []);
  return (
    <>
      <div className="mt-24 flex gap-5">
        <SideBar activeStep={parseInt(step)} steps={steps} />
        <div className="md:ml-[26%] w-full max-w-[900px]">
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
          {step == 11 && <ListingLocation />}
          {step == 12 && <UploadTenancyAgreement />}
          {step == 13 && <ReviewListing />}
        </div>
      </div>
    </>
  );
};

export default AllSteps;
