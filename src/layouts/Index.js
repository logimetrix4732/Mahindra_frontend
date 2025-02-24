import React, { useEffect, useState, useLayoutEffect } from "react";
import Pages from "../route/Index";
import Sidenav from "examples/Sidenav";

const Layout = () => {
  //Sidebar
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
    // if (miniSidenav && !onMouseEnter) {
    //   setMiniSidenav(dispatch, false);
    //   setOnMouseEnter(true);
    // }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    // if (onMouseEnter) {
    //   setMiniSidenav(dispatch, true);
    //   setOnMouseEnter(false);
    // }
  };

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
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />

        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            // brandName="Material Dashboard 2"
            brandName="Photon 2"
            routes={authMenu}
            // onMouseEnter={handleOnMouseEnter}
            // onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>

        {/* {layout === "vr" && <Configurator />} */}
        {/* <AuthContextProvider> */}
        {/* <Routes>
          <>
            {getRoutes(authMenu)}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/authentication/sign-in" element={<SignIn />} />

            <Route path="/authentication/sign-up" element={<SignUp />} />
            <Route path="/dashboard/:email" element={<DynamicSites />} />
           
            {/* <Route path="*" element={<Error404Classic />} /> */}
        {/* </> */}
        {/* </Routes> */}
        <Pages />
        {/* </AuthContextProvider> */}
      </ThemeProvider>
    </>
  );
};
export default Layout;
