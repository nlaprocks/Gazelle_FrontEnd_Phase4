import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const Component = props.component;
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      {auth !== null ? (
        <>
          {auth.role === "user" ||
          auth.role === "audit" ||
          auth.role === "admin" ||
          auth.role === "manager" ? (
            <Component />
          ) : (
            <Navigate to="/admin/dashboard" />
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
