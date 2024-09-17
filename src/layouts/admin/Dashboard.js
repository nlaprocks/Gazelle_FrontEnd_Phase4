import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarToggle from "../../components/sidebarToggle/SidebarToggle";
import Banner from "../../utils/admin/banner/Banner";
import GridViewDashboard from "../../utils/admin/gridViewDashboard/GridViewDashboard";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";

const Dashboard = () => {
  const [sidebarState, setSidebarState] = useState(false);

  const sidebarHandler = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div>
      <Header />
      {/* <Sidebar sidebarState={sidebarState} />
      <SidebarToggle sidebarState={sidebarState} sidebarHandler={sidebarHandler} /> */}
      <div className="main-content-wrapper">
        <Banner />
        <GridViewDashboard />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
