import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRouteAdmin = (props) => {
  const Component = props.component;
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      {auth !== null ? (
        <>
          {auth.role !== "user" ? (
            <Component />
          ) : (
            <Navigate to="/dashboard" />
            // <Component />
          )}
          {/* <Component /> */}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRouteAdmin;
