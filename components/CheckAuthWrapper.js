import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { navigateToAuth } from "../navigationRef";

const CheckAuthWrapper = ({ children }) => {
  const {
    state: { user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    // Check if user is authenticated
    // If not, redirect to login screen
    if (!user && !token) {
      navigateToAuth();
    }
  }, [user, token]);

  if (!user && !token) {
    // console.log("User is not authenticated");
    return null;
  }

  // console.log("User is authenticated");

  return <>{children}</>;
};

export default CheckAuthWrapper;
