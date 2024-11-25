import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import DesignStudioWrapper from "../../utils/admin/designStudio/DesignStudioWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
const DesignStudio = () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = React.useState(false);
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar
          type="Design"
          setShowAddQuestionModal={setShowAddQuestionModal}
        />
        <DesignStudioWrapper
          showAddQuestionModal={showAddQuestionModal}
          setShowAddQuestionModal={setShowAddQuestionModal}
        />
        <Footer />
      </div>
    </div>
  );
};

export default DesignStudio;
