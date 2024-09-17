import React from "react";
import "../../../css/table.css";
import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Spinner from "react-bootstrap/Spinner";
import Moment from "react-moment";
import AddProject from "../modals/projectManagement/AddProject";
import UpdateProject from "../modals/projectManagement/UpdateProject";
import DeleteProject from "../modals/projectManagement/DeleteProject";
const TableWrapper = ({ showAddProject, setShowAddProject }) => {
  const dispatch = useDispatch();
  const [projectId, setProjectId] = React.useState(0);
  const [showDeleteProject, setShowDeleteProject] = React.useState(false);
  const [showUpdateProject, setShowUpdateProject] = React.useState(false);
  const allProjects = useSelector((state) => state.getAllProjectsReducer);
  // console.log(allProjects?.projects?.data);
  const [project, setProject] = React.useState({
    project_id: 0,
    user_id: 0,
    project_name: "",
    type_of_project: "",
    client_name: "",
    product_name: "",
    company_logo: {},
    audit_user_id: null,
  });
  React.useEffect(() => {
    dispatch(allActions.getAllProjectsAction.getAllProjects());
  }, []);
  return (
    <div className="nla_insight-tab-wrapper">
      {allProjects.loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="dataTables_wrapper">
          <div className="dataTables_scroll">
            <div className="dataTables_scrollHead">
              <div className="dataTables_scrollHeadInner">
                <table
                  id="insightManagementData"
                  className="table stripe row-border order-column nla-data-table"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Type of Project</th>
                      <th>Product Name</th>
                      <th>Client Name</th>
                      <th>Created Date</th>
                      <th>User Name</th>
                      <th>Audit User Name</th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProjects?.projects?.data?.map((project, index) => {
                      return (
                        <tr key={index}>
                          <td>{project?.project_name}</td>
                          <td>{project?.type_of_project}</td>
                          <td>{project?.product_name}</td>
                          <td>{project?.client_name}</td>
                          <td>
                            <Moment format="DD/MM/YYYY">
                              {project?.date_created}
                            </Moment>
                          </td>
                          <td>{project?.User?.client_first_name}</td>
                          <td>{project?.audit_user?.client_first_name}</td>

                          <td className="text-center lastCellBody dtfc-fixed-right">
                            <a
                              href="#!"
                              className="text-primary"
                              onClick={() => {
                                setProject({
                                  project_id: project?.project_id,
                                  user_id: project?.user_id,
                                  project_name: project?.project_name,
                                  type_of_project: project?.type_of_project,
                                  client_name: project?.client_name,
                                  product_name: project?.product_name,
                                  company_logo: project?.company_logo,
                                  audit_user_id: project?.audit_user_id,
                                });
                                setShowUpdateProject(true);
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </a>
                            <a
                              href="#!"
                              className="text-danger"
                              onClick={() => {
                                setProjectId(project?.project_id);
                                setShowDeleteProject(true);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Paginator /> */}
        </div>
      )}

      <AddProject
        showAddProject={showAddProject}
        setShowAddProject={setShowAddProject}
      />
      <UpdateProject
        project={project}
        setProject={setProject}
        showUpdateProject={showUpdateProject}
        setShowUpdateProject={setShowUpdateProject}
      />
      <DeleteProject
        showDeleteProject={showDeleteProject}
        setShowDeleteProject={setShowDeleteProject}
        projectId={projectId}
        setProjectId={setProjectId}
      />
    </div>
  );
};

export default TableWrapper;
