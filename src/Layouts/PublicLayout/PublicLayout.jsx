import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../../Shared/Footer/Footer";

const PublicLayout = () => {
  return (
    <div>
      <div className="bg-base-300 z-10 sticky top-0">
        <div className="max-w-screen-xl mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto min-h-screen">
        <Outlet />
      </div>
      <div className="bg-base-300 ">
        <div className="max-w-screen-xl mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
