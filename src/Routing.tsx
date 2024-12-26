import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RenterDashPage from "./Pages/renter_dashboard/RenterDashPage";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import RenterLogin from "@/components/Forms/RenterLogin";
import RenterSignup from "@/components/Forms/RenterSignup";
import SignupChoice from "./components/Forms/SignupChoice";
import AgentSignup from "./components/Forms/AgentSignup";
import AboutUs from "./components/NavLinksComponents/AboutUs";
import Blog from "./components/NavLinksComponents/Blog";
import ListingDetailsPage from "@/Pages/ListingDetailsPage";
import AgentsLogin from "@/components/Forms/AgentsLogin";
// import AgentDashboard from "@/components/AgentDashboard";
// import SearchResultsPage from "./Pages/SearchResultsPage";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/renter/dashboard/"
          element={<Navigate to="/renter/dashboard/home" replace />}
        />
        <Route element={<RenterDashPage />} path="/renter/dashboard/*" />
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/renter/login" element={<RenterLogin />} />
          <Route path="/renter/signup" element={<RenterSignup />} />
          <Route path="/signup" element={<SignupChoice />} />
          <Route path="/agent/signup" element={<AgentSignup />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/listing-details-page/:id/:index"
            element={<ListingDetailsPage />}
          />
          <Route
              path="/agent/login"
              element={<AgentsLogin />}
          />
          {/*<Route*/}
          {/*    path="/agent/dashboard"*/}
          {/*    element={<DashBoard />}*/}
          {/*/>*/}
          {/* <Route
						path="/search-results"
						element={<SearchResultsPage />}
					/> */}
          {/*


					<Route
						path="/renter/signup/verifyemail"
						element={<VerifyEmail />}
					/>
					<Route
						path="/agent/signup/verifyemail"
						element={<VerifyEmail />}
					/>
					<Route
						path="/agent/profile"
						element={<AgentProfilePage />}
					/>
					<Route
						path="/renter/profile"
						element={<RenterProfilePage />}
					/>
					<Route
						path="/agent/addlisting/:step"
						element={<AllSteps />}
					/>
					<Route
						path="/agent/agentregistration/:step"
						element={<AgentRegistration />}
					/>

					<Route
						path="/agent/agentdashboard"
						element={<AgentDashboard />}
					/>
					<Route
						path="/user/verificationemail"
						element={<RenterVerificationEmail />}
					/>
 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
