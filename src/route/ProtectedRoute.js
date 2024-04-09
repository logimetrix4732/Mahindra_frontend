import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //   const { isLogin } = useContext(AuthContext); // Assuming your AuthContext provides this information
  const isLogin = localStorage.getItem("user");
  console.log(isLogin, "IsLoginProtected");

  if (!isLogin) {
    // User not authenticated, redirect to sign-in page
    return <Navigate to="/authentication/sign-in" replace />;
    // <Route path="/authentication/sign-in" element={<SignIn />} />;
  }

  return children ? children : <Outlet />;
  //   return children || null;
};

export default ProtectedRoute;
