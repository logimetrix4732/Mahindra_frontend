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

import { useState, useEffect, useMemo, useContext } from "react";
import { AuthContextProvider } from "./context/AuthContext";

// react-router components
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Route, withRouter, Routes, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import logimetrix from "../src/assets/images/logo/logimetrix.png";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator, AuthContext } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Error404Classic from "pages/error/404-classic";
import DynamicSites from "pages/DynamicSites";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { UserContextProvider } from "context/UserContext";
import { MaterialUIControllerProvider } from "context";
import Layout from "layouts/Index";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProtectedRoute from "./route/ProtectedRoute";

// const AuthContext = createContext();

const App = () => {
  const [controller, dispatch, authMenu] = useMaterialUIController();
  // const { menuData } = useContext(AuthContext);
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  console.log(authMenu, "AuthMenuRoutes");

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Add more paths here as your app grows
  const authPaths = ["/authentication/sign-in", "/authentication/sign-up"];
  const isAuthRoute = authPaths.includes(pathname);
  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      // width="3.25rem"
      // height="3.25rem"
      // bgColor="white"
      // shadow="sm"
      // borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      // color="dark"
      // sx={{ cursor: "pointer" }}
      // onClick={handleConfiguratorOpen}
    >
      {/* <Icon fontSize="small" color="inherit">
        settings
      </Icon> */}
      <img style={{ height: "65px", width: "130px" }} src={logimetrix} />
    </MDBox>
  );

  // return (
  //   <>
  //     {/* <ThemeProvider theme={darkMode ? themeDark : theme}> */}
  //     {/* <CssBaseline /> */}
  //     {/* <Routes> */}
  //     {/* Auth Pages */}
  //     <Routes>
  //       <Route
  //         exact
  //         path={`${process.env.PUBLIC_URL}/authentication/sign-up`}
  //         element={<SignUp />}
  //       ></Route>
  //       {/* <Route
  //           exact
  //           path={`${process.env.PUBLIC_URL}/ekyc-update-success`}
  //           component={ThankyouPage}
  //         ></Route> */}

  //       <Route
  //         exact
  //         path={`${process.env.PUBLIC_URL}/authentication/sign-in`}
  //         render={(props) => (
  //           <AuthContextProvider>
  //             <SignIn />
  //           </AuthContextProvider>
  //         )}
  //       ></Route>
  //       {/* <Route
  //           exact
  //           path={`${process.env.PUBLIC_URL}/logout`}
  //           render={(props) => (
  //             <AuthContextProvider>
  //               <Logout />
  //             </AuthContextProvider>
  //           )}
  //         ></Route> */}
  //       {/* <Route
  //           exact
  //           path={`${process.env.PUBLIC_URL}/guestlogin`}
  //           render={(props) => (
  //             <AuthContextProvider>
  //               <GuestLogin />
  //             </AuthContextProvider>
  //           )}
  //         ></Route> */}
  //       {/* <Route
  //           exact
  //           path={`${process.env.PUBLIC_URL}/auth-verify-otp`}
  //           render={(props) => (
  //             <AuthContextProvider>
  //               <VerifyOTP />
  //             </AuthContextProvider>
  //           )}
  //         ></Route> */}

  //       {/* Helper pages */}
  //       {/* <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} component={Terms}></Route> */}
  //       {/* <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} component={Faq}></Route> */}

  //       {/*Error Pages*/}
  //       <Route
  //         exact
  //         path={`${process.env.PUBLIC_URL}/errors/404-classic`}
  //         element={<Error404Classic />}
  //       ></Route>

  //       {/*Main Routes*/}
  //       <Route>
  //         <MaterialUIControllerProvider>
  //           <AuthContextProvider>
  //             <UserContextProvider>
  //               <PrivateRoute exact path="" element={<Layout />}></PrivateRoute>
  //             </UserContextProvider>
  //           </AuthContextProvider>
  //         </MaterialUIControllerProvider>
  //       </Route>
  //       {/* <Route component={RedirectAs404}></Route> */}
  //       {/* </Routes> */}
  //       {/* </ThemeProvider> */}
  //     </Routes>
  //   </>
  // );
  // return direction === "rtl" ? (
  //   <>
  //     <CacheProvider value={rtlCache}>
  //       <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
  //         <CssBaseline />
  //         {layout === "dashboard" && (
  //           <>
  //             <Sidenav
  //               color={sidenavColor}
  //               brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //               brandName="PHOTON1"
  //               routes={routes}
  //               onMouseEnter={handleOnMouseEnter}
  //               onMouseLeave={handleOnMouseLeave}
  //             />
  //             <Configurator />
  //             {configsButton}
  //           </>
  //         )}
  //         {layout === "vr" && <Configurator />}
  //         <Routes>
  //           {getRoutes(authMenu)}
  //           <Route path="*" element={<Navigate to="/dashboard" />} />
  //         </Routes>
  //       </ThemeProvider>
  //     </CacheProvider>
  //   </>
  // ) : (
  //   <>
  //     <ThemeProvider theme={darkMode ? themeDark : theme}>
  //       <CssBaseline />
  //       {layout === "dashboard" && (
  //         <>
  //           <Sidenav
  //             color={sidenavColor}
  //             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //             // brandName="Material Dashboard 2"
  //             brandName="Photon 2"
  //             routes={authMenu}
  //             onMouseEnter={handleOnMouseEnter}
  //             onMouseLeave={handleOnMouseLeave}
  //           />
  //           <Configurator />
  //           {configsButton}
  //         </>
  //       )}
  //       {layout === "vr" && <Configurator />}
  //       {/* <AuthContextProvider> */}
  //       <Routes>
  //         <>
  //           {getRoutes(authMenu)}
  //           <Route path="/dashboard" element={<Navigate to="/dashboard" />} />

  //           <Route path="*" element={<Navigate to="/dashboard" />} />
  //           <Route path="/authentication/sign-in" element={<SignIn />} />

  //           <Route path="/authentication/sign-up" element={<SignUp />} />

  //           <Route path="/dashboard/:email" element={<DynamicSites />} />

  //           {/* <Route path="*" element={<Error404Classic />} /> */}
  //         </>
  //       </Routes>
  //       {/* </AuthContextProvider> */}
  //     </ThemeProvider>
  //   </>
  // );
  return (
    <>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {
          // Conditionally render based on the path
          isAuthRoute ? (
            <Routes>
              {getRoutes(authMenu)}
              <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
              <Route path="/authentication/sign-in" element={<SignIn />} />

              <Route path="/authentication/sign-up" element={<SignUp />} />
            </Routes>
          ) : (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                // brandName="Material Dashboard 2"
                brandName="Photon"
                routes={authMenu}
                // onMouseEnter={handleOnMouseEnter}
                // onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
              <DashboardLayout>
                <DashboardNavbar />
                <Routes>
                  <Route element={<ProtectedRoute />}>
                    {getRoutes(authMenu)}
                    <Route path="/dashboard" element={<Navigate to="/dashboard" />} />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard/:email" element={<DynamicSites />} />
                  </Route>
                </Routes>
              </DashboardLayout>
            </>
          )
        }
        {/* <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            // brandName="Material Dashboard 2"
            brandName="Photon"
            routes={authMenu}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </> */}

        {/* {layout === "vr" && <Configurator />} */}
        {/* <AuthContextProvider> */}
        {/* <Routes>
          <>
            {getRoutes(authMenu)}
            <Route path="/dashboard" element={<Navigate to="/dashboard" />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/authentication/sign-in" element={<SignIn />} />

            <Route path="/authentication/sign-up" element={<SignUp />} />

            <Route path="/dashboard/:email" element={<DynamicSites />} />

            {/* <Route path="*" element={<Error404Classic />} />
          </>
        </Routes> */}
        {/* </AuthContextProvider> */}
      </ThemeProvider>
    </>
  );
};
export default App;
