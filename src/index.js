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

import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";

// import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";

import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { AuthContextProvider } from "../src/context/AuthContext";
import { UserContextProvider } from "context/UserContext";
import { BrowserRouter } from "react-router-dom";
// import Error404Classic from "pages/error/404-classic";
const Error404Classic = lazy(() => import("../src/pages/error/404-classic"));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);

// root.render(
//   <React.Fragment>
//     <Suspense fallback={<div />}>
//       <Router basename={`/`}>
//         <Routes>
//           <Route
//             render={({ location }) =>
//               location.state && location.state.is404 ? (
//                 <Error404Classic />
//               ) : (
//                 // <HashRouter>
//                 <App />
//                 // </HashRouter>
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </Suspense>
//   </React.Fragment>
// );
