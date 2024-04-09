import Dashboard from "layouts/tables";
import Sites from "pages/ManageSites/Sites";
import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route, Routes } from "react-router-dom";

// import { RedirectAs404 } from "../utils/Utils";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  // function hideEndpoints() {
  //   // Get the current URL
  //   const currentURL = window.location.href;

  //   const endpointsToHide = [
  //     "/my-workspace",
  //     "/teamSpace",
  //     "/user-list",
  //     "/groups",
  //     "/smtp",
  //     "/workflow",
  //     "/fileviewer",
  //     "/systemInfo",
  //   ];

  //   endpointsToHide.forEach((endpoint) => {
  //     if (currentURL.includes(endpoint)) {
  //       const newURL = currentURL.replace(endpoint, "");

  //       window.history.pushState({}, "", newURL);
  //     }
  //   });
  // }
  // hideEndpoints();
  function hideEndpointsOnLoad() {
    // Get the current URL
    const currentURL = window.location.href;

    const endpointsToHide = [
      "/my-workspace",
      "/teamSpace",
      "/user-list",
      "/groups",
      "/smtp",
      "/fileviewer",
      // "/sitesBoxes",
    ];

    endpointsToHide.forEach((endpoint) => {
      if (currentURL.includes(endpoint)) {
        const newURL = currentURL.replace(endpoint, "");

        window.history.pushState({}, "", newURL);
      }
    });
  }

  // Run the function only once on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hideEndpointsOnLoad);
  } else {
    hideEndpointsOnLoad();
  }

  return (
    <Suspense fallback={<div />}>
      <Routes>
        {/*Dashboards*/}
        <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Sites />}></Route>

        {/* <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={Homepage}
        ></Route> */}
        <Route element={<RedirectAs404 />}></Route>
      </Routes>
    </Suspense>
  );
};
export default Pages;
