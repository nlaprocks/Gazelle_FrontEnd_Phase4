import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import QuestionsWrapper from "../../utils/admin/questions/QuestionsWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";

const Questions = () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = React.useState(false);
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar
          type="Insights"
          setShowAddQuestionModal={setShowAddQuestionModal}
        />
        <QuestionsWrapper
          showAddQuestionModal={showAddQuestionModal}
          setShowAddQuestionModal={setShowAddQuestionModal}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Questions;
