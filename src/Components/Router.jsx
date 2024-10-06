import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

// Import all your pages/components here
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Auth/Login/Login";
import Partner from "../Pages/Partner/Partner";
import ContactDetails from "../Pages/Partner/ContactDetails/ContactDetails";
import ViewPartnerProfile from "../Pages/Partner/Active/Profile/ViewPartnerProfile";
import ViewDeletedPartner from "../Pages/Partner/DeletePartner/Profile/ViewDeletedPartner";
import Massage from "../Pages/Massege/Massage";
import CreateMassage from "../Pages/Massege/CreateMassage/CreateMassage";
import Chat from "../Pages/Massege/Chat/Chat";
import PushNotification from "../Pages/PushNotification/PushNotification";
import PartnerAd from "../Pages/Advertisment/PartnerAd/PartnerAd";
import ExternalAd from "../Pages/Advertisment/ExternalAd/ExternalAd";
import ViewAdStats from "../Pages/Advertisment/ViewStats/ViewAdStats";
import Voucher from "../Pages/Voucher/Voucher";
import EditVoucher from "../Pages/Voucher/EditVoucher/EditVoucher";
import CreateVoucher from "../Pages/Voucher/CreateVoucher/CreateVoucher";
import Premium from "../Pages/Premium/Premium";
// import EditSubscriptionPartner from "../Pages/Premium/EditSubscriptionPartner/Premium";
import EditSubscriptionPartner from '../Pages/Premium/EditSubscriptionPartner/EditSubscription';
import CreateNewPlan from "../Pages/Premium/CreatePlan/CreateNewPlan";
import Settings from "../Pages/Settings/Settings";
import DashboardUser from "../Pages/DashboardUser/DashboardUser";
import User from "../Pages/UserPanelPages/User/User";
import ViewProfile from "../Pages/UserPanelPages/User/Components/ViewProfile/ViewProfile";
import ViewDetails from "../Pages/UserPanelPages/User/ViewDetails/ViewDetails";
import Feedback from "../Pages/UserPanelPages/Feedback/Feedback";
import Notification from "../Pages/UserPanelPages/Notification/Notification";
import SeeDetails from "../Pages/UserPanelPages/Notification/SeeDetails/SeeDetails";
import Subscription from "../Pages/UserPanelPages/Premium/Subscription";
import EditSubscription from "../Pages/UserPanelPages/Premium/EditSubscription/EditSubscription";
import Promotion from "../Pages/UserPanelPages/Promotion/Promotion";
import EditPromotion from "../Pages/UserPanelPages/Promotion/EditPromotion/EditPromotion";
import Analysis from "../Pages/UserPanelPages/Analysis/Analysis";
import CreatePromotion from "../Pages/UserPanelPages/Promotion/CreatePromotion/CreatePromotion";
import Permissions from "../Pages/UserPanelPages/Permissions/Permissions";
import EditPlan from "../Pages/UserPanelPages/Permissions/EditPlan/EditPlan";

const Router = () => {
  const token = getTokenFromCookie();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  function getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      if (name === "token") {
        return value;
      }
    }

    return null; // Return null if the token cookie is not found
  }

  useEffect(() => {
    // Check if token exists
    if (!token) {
      navigate("/login");
    } else if (
      (token && location.pathname === "/") ||
      location.pathname === "/"
    ) {
      // Redirect user to the desired route
      navigate("/Dashboard");
    }
  }, [location.pathname, token, navigate]);

  const routes = [
    {
      path: "/",
      element: (
        <PrivateRoute>{user ? <DashboardUser /> : <Dashboard />}</PrivateRoute>
      ),
    },
    {
      path: "/Partners",
      element: (
        <PrivateRoute>
          <Partner />
        </PrivateRoute>
      ),
    },
    {
      path: "/Partners/:id",
      element: (
        <PrivateRoute>
          <ContactDetails />
        </PrivateRoute>
      ),
    },
    {
      path: "/Partners/profile/:id",
      element: (
        <PrivateRoute>
          <ViewPartnerProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "/Partners/deletedprofile/:id",
      element: (
        <PrivateRoute>
          <ViewDeletedPartner />
        </PrivateRoute>
      ),
    },
    {
      path: "/Dashboard",
      element: (
        <PrivateRoute>
          {" "}
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/Messages",
      element: (
        <PrivateRoute>
          <Massage />
        </PrivateRoute>
      ),
    },
    {
      path: "/CreateMessages",
      element: (
        <PrivateRoute>
          <CreateMassage />
        </PrivateRoute>
      ),
    },
    {
      path: "/Messages/Chat/:id",
      element: (
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      ),
    },
    {
      path: "/Notification",
      element: (
        <PrivateRoute>
          <PushNotification />
        </PrivateRoute>
      ),
    },
    {
      path: "/Partner",
      element: (
        <PrivateRoute>
          <PartnerAd />
        </PrivateRoute>
      ),
    },
    {
      path: "/Partner/viewstat/:id",
      element: (
        <PrivateRoute>
          <ViewAdStats />
        </PrivateRoute>
      ),
    },
    {
      path: "/External",
      element: (
        <PrivateRoute>
          <ExternalAd />
        </PrivateRoute>
      ),
    },
    {
      path: "/Voucher",
      element: (
        <PrivateRoute>
          <Voucher />
        </PrivateRoute>
      ),
    },
    {
      path: "/Voucher/:id",
      element: (
        <PrivateRoute>
          <EditVoucher />
        </PrivateRoute>
      ),
    },
    {
      path: "/CreateVoucher",
      element: (
        <PrivateRoute>
          <CreateVoucher />
        </PrivateRoute>
      ),
    },
    {
      path: "/Subscription",
      element: (
        <PrivateRoute>
          <Premium />
        </PrivateRoute>
      ),
    },
    { path: "/Subscription/:id", element: <PrivateRoute><EditSubscriptionPartner /></PrivateRoute> },
    {
      path: "/CreatePlan",
      element: (
        <PrivateRoute>
          <CreateNewPlan />
        </PrivateRoute>
      ),
    },
    {
      path: "/Settings",
      element: (
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      ),
    },
    // ===========================================Users Routes======================================================
    {
      path: "/Users",
      element: (
        <PrivateRoute>
          <User />
        </PrivateRoute>
      ),
    },
    {
      path: "/Users/:id",
      element: (
        <PrivateRoute>
          <ViewProfile />
        </PrivateRoute>
      ),
    },
    {
      path: "/Users/view/:id",
      element: (
        <PrivateRoute>
          <ViewDetails />
        </PrivateRoute>
      ),
    },
    {
      path: "/Feedback",
      element: (
        <PrivateRoute>
          <Feedback />
        </PrivateRoute>
      ),
    },
    {
      path: "/NotificationUser",
      element: (
        <PrivateRoute>
          <Notification />
        </PrivateRoute>
      ),
    },
    {
      path: "/NotificationUser/:id",
      element: (
        <PrivateRoute>
          <SeeDetails />
        </PrivateRoute>
      ),
    },
    {
      path: "/SubscriptionUser",
      element: (
        <PrivateRoute>
          <Subscription />
        </PrivateRoute>
      ),
    },
    {
      path: "/SubscriptionUser/:id",
      element: (
        <PrivateRoute>
          <EditSubscription />
        </PrivateRoute>
      ),
    },
    {
      path: "/Promotions",
      element: (
        <PrivateRoute>
          <Promotion />
        </PrivateRoute>
      ),
    },
    {
      path: "/Promotions/:id",
      element: (
        <PrivateRoute>
          <EditPromotion />
        </PrivateRoute>
      ),
    },
    {
      path: "/CreatePromotion",
      element: (
        <PrivateRoute>
          <CreatePromotion />
        </PrivateRoute>
      ),
    },
    {
      path: "/Analysis",
      element: (
        <PrivateRoute>
          <Analysis />
        </PrivateRoute>
      ),
    },
    {
      path: "/Roles",
      element: (
        <PrivateRoute>
          <Permissions />
        </PrivateRoute>
      ),
    },
    {
      path: "/Roles/:id",
      element: (
        <PrivateRoute>
          <EditPlan />
        </PrivateRoute>
      ),
    },
    { path: "/login", element: <Login /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
