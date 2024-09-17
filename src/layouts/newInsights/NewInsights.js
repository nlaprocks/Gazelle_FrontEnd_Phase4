import React, { useState } from "react";
import "./newInsights.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarToggle from "../../components/sidebarToggle/SidebarToggle";
import TopBar from "../../utils/newInsights/topBar/TopBar";
import TapWrapper from "../../utils/newInsights/tabWrapper/TapWrapper";

const NewInsights = () => {
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [sidebarState, setSidebarState] = useState(false);

  const sidebarHandler = () => {
    setSidebarState(!sidebarState);
  };
  return (
    <div>
      <Header />
      {/* <Sidebar sidebarState={sidebarState} />
      <SidebarToggle sidebarState={sidebarState} sidebarHandler={sidebarHandler} /> */}
      <div className={`main-content-wrapper ${sidebarState ? "sidebarCollapse" : ""}`} >
        <TopBar setShowShareModal={setShowShareModal} sidebarState={sidebarState} />
        <TapWrapper
          showShareModal={showShareModal}
          sidebarState={sidebarState}
          setShowShareModal={setShowShareModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default NewInsights;
