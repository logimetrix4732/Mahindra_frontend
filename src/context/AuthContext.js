import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext();
// import { AxiosPost } from "./Axios";
// var Buffer = require("buffer/").Buffer;
import Icon from "@mui/material/Icon";
import Sitecard from "layouts/dashboard";
import Dashboard from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

//menustyle1
import Admin from "../assets/images/menustyle1/admin.png";
import DashboardMenu from "../assets/images/menustyle1/dashboard.png";
import GoogleMap from "../assets/images/menustyle1/google-maps.png";
import Efficiency from "../assets/images/menustyle1/efficiency.png";
import MLprediction from "../assets/images/menustyle1/prediction.png";
import scb from "../assets/images/menustyle1/scb.png";
import analytics from "../assets/images/menustyle1/analytics.png";
import performance from "../assets/images/menustyle1/performance.png";
import csv from "../assets/images/menustyle1/customCSV.png";
import alert from "../assets/images/menustyle1/alerts.png";

import Sites from "pages/ManageSites/Sites";
import ManagePerformance from "pages/ManagePerformance/ManagePerformance";

export const AuthContextProvider = (props) => {
  //Login User/Admin
  let stringifyData = localStorage.getItem("user");
  console.log(stringifyData, "USERDataAuth");
  let isLogin = null;
  if (stringifyData != "undefined") {
    isLogin = JSON.parse(stringifyData);
  } else {
    console.log("Service unavailable. Please try again later.");
  }
  //Login Guest
  let guestdata = localStorage.getItem("guestlogin");
  let guestlogin = null;
  if (guestdata) {
    guestlogin = JSON.parse(guestdata);
  }
  const [authMenu, setAuthMenu] = useState([]);
  useEffect(() => {
    // if (isLogin?.user_type == "Admin") {
    // setAuthMenu([
    //   {
    //     icon: "package-fill",
    //     text: "Admin",
    //     active: true,
    //     link: "/admin",
    //   },
    //   {
    //     icon: "pie-fill",
    //     text: "Dashboard",
    //     active: true,
    //     link: "/",
    //   },
    //   {
    //     icon: "growth-fill",
    //     text: "Inverter Efficiency",
    //     active: true,
    //     link: "/inverterEfficiency",
    //   },
    //   {
    //     icon: "sign-bnb",
    //     text: "SCB",
    //     active: true,
    //     link: "/scb",
    //   },
    //   {
    //     icon: "table-view-fill",
    //     text: "Analytics",
    //     active: true,
    //     link: "/analyticsPage",
    //   },
    //   {
    //     icon: "db-fill",
    //     text: "Performance",
    //     active: true,
    //     link: "/performancePage",
    //   },
    //   {
    //     icon: "wallet-fill",
    //     text: "CSV",
    //     active: true,
    //     link: "/CSVPage",
    //   },
    //   {
    //     icon: "shield-alert-fill",
    //     text: "Alerts",
    //     active: true,
    //     link: "/CSVPage",
    //   },
    // ]);
    setAuthMenu([
      {
        type: "collapse",
        // name: "Tables",
        name: "Admin",
        key: "sitecard",
        // icon: <Icon fontSize="small">table_view</Icon>,
        // icon: Admin,
        icon: Admin,
        // route: "/sitecard",
        route: `${process.env.PUBLIC_URL}sitecard`,

        // component: <Tables />,
        component: <Sitecard />,
      },
      {
        type: "collapse",
        // name: "Dashboard",
        name: "Dashboard",
        key: "dashboard",
        // icon: <Icon fontSize="small">dashboard</Icon>,
        // icon: "../assets/images/csv.png",
        icon: DashboardMenu,

        // route: "/dashboard",
        route: `${process.env.PUBLIC_URL}dashboard`,

        // component: <Dashboard />,
        // component: <Dashboard />,
        component: <Sites />,
      },

      {
        type: "collapse",
        // name: "Billing",
        name: "Inverter Efficiency",

        key: "billing",
        // icon: <Icon fontSize="small">receipt_long</Icon>,
        // icon: "../assets/images/csv.png",
        icon: GoogleMap,
        // route: "/billing",
        route: `${process.env.PUBLIC_URL}billing`,

        component: <Billing />,
      },
      // {
      //   type: "collapse",
      //   name: "RTL",
      //   key: "rtl",
      //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
      //   route: "/rtl",
      //   component: <RTL />,
      // },
      {
        type: "collapse",
        // name: "Notifications",
        name: "SCB",

        key: "notifications",
        // icon: <Icon fontSize="small">notifications</Icon>,
        // icon: "../assets/images/csv.png",
        icon: scb,

        // route: "/notifications",
        route: `${process.env.PUBLIC_URL}notifications`,

        component: <Notifications />,
      },
      {
        type: "collapse",
        // name: "Profile",
        name: "Analytics",
        route: `${process.env.PUBLIC_URL}/profile`,

        key: "profile",
        // icon: <Icon fontSize="small">person</Icon>,
        // icon: "../assets/images/csv.png",
        icon: analytics,
        // route: "/profile",
        component: <Profile />,
      },
      {
        type: "collapse",
        // name: "Sign In",
        name: "Performance",

        key: "performance",
        // icon: <Icon fontSize="small">login</Icon>,
        // icon: "../assets/images/csv.png",
        icon: performance,

        route: "/performance",
        component: <ManagePerformance />,
      },
      {
        type: "collapse",
        // name: "Sign In",
        name: "Performance",

        key: "sign-in",
        // icon: <Icon fontSize="small">login</Icon>,
        // icon: "../assets/images/csv.png",
        icon: performance,

        route: "/authentication/sign-in",
        component: <SignIn />,
      },
      // {
      //   type: "collapse",
      //   // name: "Sign Up",
      //   name: "CSV",
      //   key: "sign-up",
      //   // icon: <Icon fontSize="small">assignment</Icon>,
      //   // icon: "../assets/images/csv.png",
      //   icon: csv,
      //   route: "/authentication/sign-up",
      //   component: <SignUp />,
      // },
      // {
      //   type: "collapse",
      //   // name: "Sign Up",
      //   name: "ALERTS",
      //   key: "sign-up",
      //   // icon: <Icon fontSize="small">assignment</Icon>,
      //   // icon: "../assets/images/csv.png",
      //   icon: alert,
      //   route: "/authentication/sign-up",
      //   component: <SignUp />,
      // },
    ]);
    // } else if (isLogin?.user_type == "User") {
    // setAuthMenu([]);
    // } else {
    //   setAuthMenu([
    //     {
    //       icon: "package-fill",
    //       text: " TeamSpace",
    //       active: true,
    //       subMenu: [
    //         {
    //           icon: "user",
    //           text: "Guest Workspace",
    //           active: true,
    //           link: "/guestTeamSpace",
    //         },
    //       ],
    //     },
    //   ]);
    // }
  }, []);
  async function loginWithOTP(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "loginWIthOTP",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  async function verifyOTP(data, handleApiRes, handleApiError) {
    await AxiosPost(
      "verifyOTP",
      data,
      (apiRes) => {
        handleApiRes(apiRes);
      },
      (apiError) => {
        handleApiError(apiError);
      }
    );
  }
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const GuestLogOUt = () => {
    localStorage.removeItem("guest");
    localStorage.removeItem("token");
    localStorage.removeItem("guestlogin");
  };
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        guestlogin,
        userAuthContextData: [isLogin || guestlogin],
        menuData: authMenu,
        loginWithOTP: loginWithOTP,
        verifyOTP: verifyOTP,
        logOut: logOut,
        GuestLogOUt: GuestLogOUt,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
