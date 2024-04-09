/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo, useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import Sitecard from "layouts/dashboard";
import Dashboard from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { Image } from "@mui/icons-material";
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

//menustyle2
import Admin2 from "../assets/images/menustyle2/admin.png";
import DashboardMenu2 from "../assets/images/menustyle2/dashboard.png";
import GoogleMap2 from "../assets/images/menustyle2/map.png";
import Efficiency2 from "../assets/images/menustyle2/inverterefficiency.png";
import MLprediction2 from "../assets/images/menustyle2/mlprediction.png";
import scb2 from "../assets/images/menustyle2/scb.png";
import analytics2 from "../assets/images/menustyle2/analytics.png";
import performance2 from "../assets/images/menustyle2/performance.png";
import csv2 from "../assets/images/menustyle2/csv.png";
import alert2 from "../assets/images/menustyle1/alerts.png";
import ManagePerformance from "pages/ManagePerformance/ManagePerformance";
import Sites from "pages/ManageSites/Sites";
import ManageAdmin from "pages/ManageAdmin/ManageAdmin";
import InverterEfficiency from "pages/InverterEfficiency/InverterEfficiency";
import Csv from "pages/CSV/Csv";
import Alerts from "pages/Alerts/Alerts";
import Analytics from "pages/Analytics/Analytics";

// Material Dashboard 2 React main context
const MaterialUI = createContext();
// const AuthContext = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: true,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [authMenu, setAuthMenu] = useState([
    {
      type: "collapse",
      // name: "Tables",
      name: "Admin",
      key: "admin",
      // icon: <Icon fontSize="small">table_view</Icon>,
      // icon: Admin,
      icon: Admin,
      // route: "/sitecard",
      route: `${process.env.PUBLIC_URL}admin`,

      // component: <Tables />,
      component: <ManageAdmin />,
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
      route: `${process.env.PUBLIC_URL}/dashboard`,

      // component: <Dashboard />,
      // component: <Dashboard />,
      component: <Sites />,
    },

    {
      type: "collapse",
      // name: "Billing",
      name: "Inverter Efficiency",

      key: "inverterefficiency",
      // icon: <Icon fontSize="small">receipt_long</Icon>,
      // icon: "../assets/images/csv.png",
      icon: Efficiency,
      // route: "/billing",
      route: `${process.env.PUBLIC_URL}inverterefficiency`,

      component: <InverterEfficiency />,
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
      route: `${process.env.PUBLIC_URL}/analytics`,

      key: "analytics",
      // icon: <Icon fontSize="small">person</Icon>,
      // icon: "../assets/images/csv.png",
      icon: analytics,
      // route: "/profile",
      component: <Analytics />,
      // component: <Profile />,
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
      name: "CSV",

      key: "csv",
      // icon: <Icon fontSize="small">login</Icon>,
      // icon: "../assets/images/csv.png",
      icon: csv,

      route: "/csv",
      component: <Csv />,
    },
    {
      type: "collapse",
      // name: "Sign In",
      name: "Alerts",

      key: "alerts",
      // icon: <Icon fontSize="small">login</Icon>,
      // icon: "../assets/images/csv.png",
      icon: alert,

      route: "/alerts",
      component: <Alerts />,
    },
    // {
    //   type: "collapse",
    //   // name: "Sign In",
    //   name: "Performance",

    //   key: "sign-in",
    //   // icon: <Icon fontSize="small">login</Icon>,
    //   // icon: "../assets/images/csv.png",
    //   icon: performance,

    //   route: "/authentication/sign-in",
    //   component: <SignIn />,
    // },
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

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch, authMenu], [controller, dispatch, authMenu]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  //Login User/Admin
  let stringifyData = localStorage.getItem("user");
  // console.log(stringifyData, "USERDataAuth");
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

  // useEffect(() => {
  //   setAuthMenu([
  //     {
  //       type: "collapse",
  //       // name: "Tables",
  //       name: "Admin",

  //       key: "sitecard",
  //       icon: <Icon fontSize="small">table_view</Icon>,
  //       route: "/sitecard",
  //       // component: <Tables />,
  //       component: <Sitecard />,
  //     },
  //     {
  //       type: "collapse",
  //       // name: "Dashboard",
  //       name: "Dashboard",

  //       key: "dashboard",
  //       icon: <Icon fontSize="small">dashboard</Icon>,
  //       route: "/dashboard",
  //       // component: <Dashboard />,
  //       component: <Dashboard />,
  //     },

  //     {
  //       type: "collapse",
  //       // name: "Billing",
  //       name: "Inverter Efficiency",

  //       key: "billing",
  //       icon: <Icon fontSize="small">receipt_long</Icon>,
  //       route: "/billing",
  //       component: <Billing />,
  //     },
  //     // {
  //     //   type: "collapse",
  //     //   name: "RTL",
  //     //   key: "rtl",
  //     //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //     //   route: "/rtl",
  //     //   component: <RTL />,
  //     // },
  //     {
  //       type: "collapse",
  //       // name: "Notifications",
  //       name: "SCB",

  //       key: "notifications",
  //       icon: <Icon fontSize="small">notifications</Icon>,
  //       route: "/notifications",
  //       component: <Notifications />,
  //     },
  //     {
  //       type: "collapse",
  //       // name: "Profile",
  //       name: "Analytics",

  //       key: "profile",
  //       icon: <Icon fontSize="small">person</Icon>,
  //       route: "/profile",
  //       component: <Profile />,
  //     },
  //     {
  //       type: "collapse",
  //       // name: "Sign In",
  //       name: "Performance",

  //       key: "sign-in",
  //       icon: <Icon fontSize="small">login</Icon>,
  //       route: "/authentication/sign-in",
  //       component: <SignIn />,
  //     },
  //     {
  //       type: "collapse",
  //       // name: "Sign Up",
  //       name: "CSV",

  //       key: "sign-up",
  //       icon: <Icon fontSize="small">assignment</Icon>,
  //       route: "/authentication/sign-up",
  //       component: <SignUp />,
  //     },
  //     {
  //       type: "collapse",
  //       // name: "Sign Up",
  //       name: "ALERTS",

  //       key: "sign-up",
  //       icon: <Icon fontSize="small">assignment</Icon>,
  //       route: "/authentication/sign-up",
  //       component: <SignUp />,
  //     },
  //   ]);
  // }, []);

  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
