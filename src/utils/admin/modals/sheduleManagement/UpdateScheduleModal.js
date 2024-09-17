import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import allActions from "../../../../store/index";

const UpdateScheduleModel = ({
  showUpdateScheduleModal,
  setShowUpdateScheduleModal,
  updateSchedule,
  setUpdateSchedule,
  setIsLoading,
}) => {
  const [logo, setLogo] = React.useState("");
  const dispatch = useDispatch();
  const userDetailsReducer = useSelector((state) => state.updateUserReducer);
  const handleClose = () => {
    setUpdateSchedule({
      project_id: "",
      model_id: "",
    });
    setLogo("");
    setShowUpdateScheduleModal(false);
  };

  // Fetch projects
  const allProjects = useSelector((state) => state.getAllProjectsReducer);
  React.useEffect(() => {
    dispatch(allActions.getAllProjectsAction.getAllProjects());
    if (updateSchedule?.project_id) {
      dispatch(
        allActions.getModelVersionByProjectIdAction.getModelVersionByProjectId(
          updateSchedule?.project_id
        )
      );
    }
  }, []);

  // const changeHandler = (e) => {
  //   setUpdateSchedule({ ...updateSchedule, [e.target.name]: e.target.value });
  // };

  const changeHandler = (e) => {
    if (e.target.name === "schedule_type") {
      setUpdateSchedule({
        ...updateSchedule,
        data: {
          ...updateSchedule.data,
          type: e.target.value,
        },
      });
    } else if (e.target.name === "schedule_day") {
      setUpdateSchedule({
        ...updateSchedule,
        data: {
          ...updateSchedule.data,
          day: e.target.value,
        },
      });
    } else if (e.target.name === "schedule_hour") {
      setUpdateSchedule({
        ...updateSchedule,
        data: {
          ...updateSchedule.data,
          hour: e.target.value,
        },
      });
    } else {
      if (e.target.name === "project_id") {
        dispatch(
          allActions.getModelVersionByProjectIdAction.getModelVersionByProjectId(e.target.value)
        );
      }
      setUpdateSchedule({
        ...updateSchedule,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateScheduleHandler = async () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const data = {
      type: updateSchedule.data.type,
      day: updateSchedule.data.day,
      hour: updateSchedule.data.hour,
    };
    try {
      const formData = new FormData();
      formData.append("project_id", parseInt(updateSchedule.project_id));
      formData.append("model_id", parseInt(updateSchedule.model_id));
      formData.append("data", JSON.stringify(data));
      const api = `${process.env.REACT_APP_NGROK}/client-data/jobs/update-schedule-job`;
      var res = await axios.post(api, formData, config);
      if (res.status === 200) {
        console.log("Update Job res: ", res.data);
        handleClose();
        setIsLoading(true);
      }
    } catch (error) {
      console.log("Update Job Error", error);
    }
  };

  React.useEffect(() => {
    if (userDetailsReducer.success) {
      dispatch(allActions.getAllUsersAction.getAllUsers());
      handleClose();
      delete userDetailsReducer.success;
    }
  }, [userDetailsReducer]);

  const modelVerionReducer = useSelector((state) => state.getModelVersionByProjectIdReducer);
  console.log("updateSchedule: ", updateSchedule);

  return (
    <Modal show={showUpdateScheduleModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Update User</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../../assets/images/new_project_create_image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla-add-heading-block">
          <form>
            <div>
              <select
                className="form-select"
                name="project_id"
                value={updateSchedule?.project_id}
                defaultValue={updateSchedule?.project_id}
                onChange={changeHandler}
              >
                <option value="">Select Project</option>
                {allProjects?.projects?.data?.map((project, index) => {
                  return (
                    <option key={index} value={project?.project_id}>
                      {project?.project_name}
                    </option>
                  );
                })}
              </select>
            </div>

            {updateSchedule?.project_id && (
              <div>
                <select
                  className="form-select"
                  name="model_id"
                  value={updateSchedule?.model_id}
                  onChange={changeHandler}
                >
                  <option value="">Select Project Model</option>
                  {modelVerionReducer?.modelVersion?.data?.map((model, index) => {
                    return (
                      <option key={index} value={model?.model_id}>
                        Model version {model?.model_version}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div>
              <select
                className="form-select"
                name="schedule_type"
                onChange={changeHandler}
                value={updateSchedule?.data?.type}
              >
                <option value="weekly" data-badge="">
                  Weekly
                </option>
                {/* <option value="monthly" data-badge="">
                  Monthly
                </option> */}
              </select>
            </div>

            {updateSchedule?.data?.type === "weekly" && (
              <>
                <div>
                  <select
                    className="form-select"
                    name="schedule_day"
                    onChange={changeHandler}
                    value={updateSchedule?.data?.day}
                  >
                    <option value="">Select Schedule Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <select
                className="form-select"
                name="schedule_hour"
                onChange={changeHandler}
                value={updateSchedule?.data?.hour}
              >
                <option value="">Select Schedule Hour</option>
                {Array.from({ length: 24 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          No
        </button>
        <button type="button" className="btn btn-primary" onClick={() => updateScheduleHandler()}>
          {userDetailsReducer?.loading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Update"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateScheduleModel;
