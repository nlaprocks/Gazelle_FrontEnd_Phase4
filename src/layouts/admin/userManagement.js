import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import TabWrapper from "../../utils/admin/userManagement/TabWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";
const userManagement = () => {
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar type="User" />
        <TabWrapper />
        <Footer />
      </div>
    </div>
  );
};

export default userManagement;
