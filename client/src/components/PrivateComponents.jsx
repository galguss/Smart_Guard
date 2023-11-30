import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";



function PrivateComponents() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  return isLogged === "true" ? <Outlet /> : <Navigate to="/Login" />;
}

export default PrivateComponents;
