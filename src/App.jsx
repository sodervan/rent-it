import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import RenterLogin from "./Components/Forms/RenterLogin";
import RenterSignup from "./Components/Forms/RenterSignup";
import SignupChoice from "./Components/Forms/SignupChoice";
import SearchResultsPage from "./Pages/SearchResultsPage.jsx";
import ListingDetailsPage from "./Pages/ListingDetailsPage.jsx";
import AgentSignup from "./Components/Forms/AgentSignup.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import AgentsLogin from "./Components/Forms/AgentsLogin.jsx";
import RenterVerificationEmail from "./Components/RenterVerificationEmail.jsx";
import AgentProfilePage from "./Pages/AgentProfilePage.jsx";
import AgentRegistration from "./Components/Forms/AgentRegistration.jsx";
import DashBoard from "./Components/DashBoard.jsx";
import AgentDashboard from "./Components/AgentDashboard.jsx";
import RenterProfilePage from "./Pages/RenterProfilePage.jsx";
import AllSteps from "./Components/AddListings/AllSteps.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/renter/login" element={<RenterLogin />} />
      <Route path="/renter/signup" element={<RenterSignup />} />
      <Route path="/signup" element={<SignupChoice />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/agent/signup" element={<AgentSignup />} />
      <Route path="/agent/login" element={<AgentsLogin />} />
      <Route path="/renter/signup/verifyemail" element={<VerifyEmail />} />
      <Route path="/agent/signup/verifyemail" element={<VerifyEmail />} />
      <Route path="/agent/profile" element={<AgentProfilePage />} />
      <Route path="/renter/profile" element={<RenterProfilePage />} />
      <Route path="/agent/addlisting/:step" element={<AllSteps />} />
      <Route
        path="/agent/agentregistration/:step"
        element={<AgentRegistration />}
      />
      <Route path="/agent/dashboard" element={<DashBoard />} />
      <Route path="/agent/agentdashboard" element={<AgentDashboard />} />
      <Route
        path="/user/verificationemail"
        element={<RenterVerificationEmail />}
      />
      <Route
        path="/listing-details-page/:id/:index"
        element={<ListingDetailsPage />}
      />
    </Route>,
  ),
);

const app = () => {
  return <RouterProvider router={router} />;
};

export default app;
