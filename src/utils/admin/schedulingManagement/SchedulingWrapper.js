import React from "react";
import axios from "axios";
import "../../../css/table.css";
import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Moment from "react-moment";
import DeleteUserModal from "../modals/userManagement/deleteUserModal";
import DeleteScheduleModal from "../modals/sheduleManagement/DeleteScheduleModal";
import AddUserModal from "../modals/userManagement/AddUserModal";
import AddScheduleModal from "../modals/sheduleManagement/AddScheduleModal";
// import UpdateUserModal from "../modals/userManagement/UpdateUserModal";
import UpdateScheduleModel from "../modals/sheduleManagement/UpdateScheduleModal";
import FilterModal from "../modals/userManagement/FilterModal";
import Spinner from "react-bootstrap/Spinner";

const SchedulingWrapper = ({ showAddSchedule, setShowAddSchedule }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = React.useState(false);
  const [showUpdateScheduleModal, setShowUpdateScheduleModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [updateSchedule, setUpdateSchedule] = React.useState({
    project_id: "",
    model_id: "",
    data: {},
  });
  const [deleteScheduleData, setDeleteScheduleData] = React.useState({
    project_id: "",
    model_id: "",
  });
  const [emailForModal, setEmailForModal] = React.useState(null);
  const allUsersReducer = useSelector((state) => state.getAllUsersReducer);
  const userStatusReducer = useSelector((state) => state.changeUserStatusReducer);
  const filterUserReducer = useSelector((state) => state.filterUserReducer.user);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const changeUserStatusToInActive = (email) => {
    dispatch(
      allActions.changeUserStatusAction.changeUserStatus({
        email: email,
        status: "inactive",
      })
    );
  };
  const changeUserStatusToActive = (email) => {
    dispatch(
      allActions.changeUserStatusAction.changeUserStatus({
        email: email,
        status: "active",
      })
    );
  };
  React.useEffect(() => {
    dispatch(allActions.getAllUsersAction.getAllUsers());
  }, []);
  React.useEffect(() => {
    if (userStatusReducer.success) {
      dispatch(allActions.getAllUsersAction.getAllUsers());
      delete userStatusReducer.success;
    }
  }, [userStatusReducer]);

  //   List APi Call
  const [allJobs, setAllJobs] = React.useState([]);
  const allJobsApiHanlder = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const api = `${process.env.REACT_APP_NGROK}/client-data/jobs/all-jobs`;
      var res = await axios.get(api);
      if (res.status === 200) {
        console.log("All Jobs list: ", res.data.data);
        setAllJobs(res.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Jobs Error", error);
      setIsLoading(false);
    }
  }, []);
  React.useEffect(() => {
    allJobsApiHanlder();
    setIsLoading(false);
  }, [allJobsApiHanlder, isLoading]);

  return (
    <div className="nla_insight-tab-wrapper">
      <div className="nla_filter_block">
        <div className="d-flex align-items-center justify-content-between">
          <p className="nla_total_data_count mb-0">
            {allJobs?.length}
            <label>Total Schedules</label>
          </p>
          {/* <div>
            <a
              href="#!"
              className="btn btn-primary"
              onClick={() => {
                setShowAddScheduleModal(true);
              }}
            >
              +Add Schedule
            </a>
          </div> */}
        </div>
      </div>
      {isLoading ? (
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
                      <th>Event ID</th>
                      <th>Schedule Type</th>
                      <th>Schedule Day</th>
                      <th>Schedule Hour</th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allJobs?.length > 0 ? (
                      <>
                        {allJobs?.map((val, index) => {
                          console.log("val: " + val?.project_id);
                          return (
                            <tr key={index}>
                              <td>{val?.event_id}</td>
                              <td>{val?.sch_type}</td>
                              <td>{val?.sch_day}</td>
                              <td>{val?.sch_hour}</td>
                              <td className="text-center lastCellBody dtfc-fixed-right">
                                <a
                                  href="#!"
                                  className="text-primary"
                                  onClick={() => {
                                    setUpdateSchedule({
                                      project_id: val?.project_id,
                                      model_id: val?.model_id,
                                      data: {
                                        type: val.sch_type,
                                        day: val.sch_day,
                                        hour: val.sch_hour,
                                      },
                                    });
                                    setShowUpdateScheduleModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                                {auth.role === "manager" ? null : (
                                  <a
                                    href="#!"
                                    className="text-danger"
                                    onClick={() => {
                                      setDeleteScheduleData({
                                        project_id: val?.project_id,
                                        model_id: val?.model_id,
                                      });
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {allJobs?.map((val, index) => {
                          return (
                            <tr key={index}>
                              <td>{val?.event_id}</td>
                              <td>{val?.sch_type}</td>
                              <td>{val?.sch_day}</td>
                              <td>{val?.sch_hour}</td>
                              <td className="text-center lastCellBody dtfc-fixed-right">
                                <a
                                  href="#!"
                                  className="text-primary"
                                  onClick={() => {
                                    console.log(val);
                                    setUpdateSchedule({
                                      project_id: val?.project_id,
                                      model_id: val?.model_id,
                                      data: {
                                        sch_type: val.sch_type,
                                        sch_day: val.sch_day,
                                        sch_hour: val.sch_hour,
                                      },
                                    });
                                    setShowUpdateScheduleModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                                {auth.role === "manager" ? null : (
                                  <a
                                    href="#!"
                                    className="text-danger"
                                    onClick={() => {
                                      setDeleteScheduleData({
                                        project_id: val?.project_id,
                                        model_id: val?.model_id,
                                      });
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Paginator /> */}
        </div>
      )}

      <DeleteScheduleModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setEmailForModal={setEmailForModal}
        emailForModal={emailForModal}
        deleteScheduleData={deleteScheduleData}
        setIsLoading={setIsLoading}
      />
      <AddScheduleModal
        // showAddSchedule={showAddSchedule}
        // setShowAddSchedule={setShowAddSchedule}
        showAddScheduleModal={showAddSchedule}
        setShowAddScheduleModal={setShowAddSchedule}
        setIsLoading={setIsLoading}
      />
      <UpdateScheduleModel
        showUpdateScheduleModal={showUpdateScheduleModal}
        setShowUpdateScheduleModal={setShowUpdateScheduleModal}
        updateSchedule={updateSchedule}
        setUpdateSchedule={setUpdateSchedule}
        setIsLoading={setIsLoading}
      />
      <FilterModal showFilterModal={showFilterModal} setShowFilterModal={setShowFilterModal} />
    </div>
  );
};

export default SchedulingWrapper;
