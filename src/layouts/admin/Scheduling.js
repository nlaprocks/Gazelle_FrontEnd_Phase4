import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import SchedulingWrapper from "../../utils/admin/schedulingManagement/SchedulingWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";
const Scheduling = () => {
  const [showAddSchedule, setShowAddSchedule] = React.useState(false);
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar type="Scheduling" setShowAddSchedule={setShowAddSchedule} />
        <SchedulingWrapper
          showAddSchedule={showAddSchedule}
          setShowAddSchedule={setShowAddSchedule}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Scheduling;
