import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthGlobalContext } from "../context/AuthContext";

const Logout = () => {
  const { LogOut } = useAuthGlobalContext();

  useEffect(() => {
    LogOut();
  }, [LogOut]);
  return (
    <div>
      <Navigate to="/login" />
    </div>
  );
};

export default Logout;
