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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/renter-login" element={<RenterLogin />} />
      <Route path="/renter-signup" element={<RenterSignup />} />
      <Route path="/signup" element={<SignupChoice />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
    </Route>,
  ),
);

const app = () => {
  return <RouterProvider router={router} />;
};

export default app;
