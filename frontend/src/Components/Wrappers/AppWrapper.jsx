import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

function AppWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppWrapper;
