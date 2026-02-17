import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { RoleSelection } from "./components/RoleSelection";
import { TalentLogin } from "./components/TalentLogin";
import { RecruiterLogin } from "./components/RecruiterLogin";
import { AdminLogin } from "./components/AdminLogin";
import { TalentDashboard } from "./components/TalentDashboard";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { TalentRegistration } from "./components/TalentRegistration";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/select-role",
    Component: RoleSelection,
  },
  {
    path: "/login/talent",
    Component: TalentLogin,
  },
  {
    path: "/login/recruiter",
    Component: RecruiterLogin,
  },
  {
    path: "/login/admin",
    Component: AdminLogin,
  },
  {
    path: "/talent/dashboard",
    Component: TalentDashboard,
  },
  {
    path: "/recruiter/dashboard",
    Component: RecruiterDashboard,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/register/talent",
    Component: TalentRegistration,
  },
]);
