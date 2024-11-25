import React, { useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarToggle from "../../components/sidebarToggle/SidebarToggle";
import TobBar from "../../utils/admin/TopBar";
import TabWrapper from "../../utils/admin/insightManagement/TabWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";

const InsightsManagement  = () => {
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
        <TobBar type="Insight" />
        <TabWrapper />
        <Footer />
      </div>
    </div>
  );
};

export default InsightsManagement ;
