import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import TableWrapper from "../../utils/admin/projectManagement/TableWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";
const ProjectManagement = () => {
  const [showAddProject, setShowAddProject] = React.useState(false);
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar type="Project" setShowAddProject={setShowAddProject} />
        <TableWrapper
          showAddProject={showAddProject}
          setShowAddProject={setShowAddProject}
        />
        <Footer />
      </div>
    </div>
  );
};

export default ProjectManagement;
