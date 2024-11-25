import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddScheduleModal = ({ showAddScheduleModal, setShowAddScheduleModal, setIsLoading }) => {
  const dispatch = useDispatch();

  const allProjects = useSelector((state) => state.getAllProjectsReducer);

  React.useEffect(() => {
    dispatch(allActions.getAllProjectsAction.getAllProjects());
  }, []);

  const [schedule, setSchedule] = React.useState({
    project_id: "",
    model_id: "",
    data: {},
  });
  const handleClose = () => {
    setShowAddScheduleModal(false);
    setSchedule({
      project_id: "",
      model_id: "",
      data: {},
    });
  };
  const userDetailsReducer = useSelector((state) => state.addUserReducer);

  const changeHandler = (e) => {
    console.log("\n e.target.value: ", e.target.name);
    if (e.target.name === "schedule_type") {
      setSchedule({
        ...schedule,
        data: {
          ...schedule.data,
          type: e.target.value,
        },
      });
    } else if (e.target.name === "schedule_day") {
      setSchedule({
        ...schedule,
        data: {
          ...schedule.data,
          day: e.target.value,
        },
      });
    } else if (e.target.name === "schedule_hour") {
      setSchedule({
        ...schedule,
        data: {
          ...schedule.data,
          hour: e.target.value,
        },
      });
    } else {
      if (e.target.name === "project_id") {
        dispatch(allActions.getModelVersionByProjectIdAction.getModelVersionByProjectId(e.target.value));
      }
      setSchedule({
        ...schedule,
        [e.target.name]: e.target.value,
      });
    }
  };

  //   const changeHandler = (e) => {
  //     setSchedule({ ...schedule, [e.target.name]: e.target.value });
  //   };
  const addScheduleHandler = async () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const data = { type: schedule.data.type, day: schedule.data.day, hour: schedule.data.hour };
    try {
      const formData = new FormData();
      formData.append("project_id", parseInt(schedule.project_id));
      formData.append("model_id", parseInt(schedule.model_id));
      formData.append("data", JSON.stringify(data));
      const api = `${process.env.REACT_APP_NGROK}/client-data/jobs/schedule-job`;
      var res = await axios.post(api, formData, config);
      if (res.status === 200) {
        if (res.data.message === "Job already exists") {
          alert(res.data.message);
        }
        console.log("Add Job res: ", res.data);
        handleClose();
        setIsLoading(true);
      }
    } catch (error) {
      console.log("Add Job Error", error);
      alert("Unable to add Job right now");
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
  console.log("schedule: ", schedule);
  console.log("modelVerionReducer: ", modelVerionReducer);

  return (
    <Modal show={showAddScheduleModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Schedule</h5>
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
              <select className="form-select" name="client" onChange={changeHandler}>
                <option value="">Select Client</option>
                <option value="Monday">Pankaj</option>
                <option value="Tuesday">Testing</option>
                <option value="Tuesday">Hamza</option>
              </select>
            </div>

            <div>
              <select className="form-select" name="client_database" onChange={changeHandler}>
                <option value="">Select Database</option>
                <option value="Monday">Mobility</option>
                <option value="Tuesday">Competitors</option>
              </select>
            </div>

            {/* <div>
              <select className="form-select" name="project_id" onChange={changeHandler}>
                <option value="">Select Project</option>
                {allProjects?.projects?.data?.map((project, index) => {
                  return (
                    <option key={index} value={project?.id}>
                      {project?.project_name}
                    </option>
                  );
                })}
              </select>
            </div> */}

            {/* {schedule?.project_id && modelVerionReducer.loading === false && (
              <div>
                <select className="form-select" name="model_id" onChange={changeHandler}>
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
            )} */}

            {/* {schedule?.model_id && ( */}
            <div>
              <select className="form-select" name="schedule_type" onChange={changeHandler}>
                <option value="">Select Schedule Week</option>
                <option value="weekly" data-badge="">
                  Weekly
                </option>
              </select>
            </div>
            {/* )} */}

            {schedule?.data?.type === "weekly" && (
              <>
                <div>
                  <select
                    className="form-select"
                    name="schedule_day"
                    onChange={changeHandler}
                    defaultValue={schedule?.data?.sch_day}
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
            {schedule?.data?.type === "weekly" && schedule?.data?.day && (
              <>
                <div>
                  <select className="form-select" name="schedule_hour" onChange={changeHandler}>
                    <option value="">Select Schedule Hour</option>
                    {Array.from({ length: 24 }, (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleClose}>
          No
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addScheduleHandler()}
          disabled={
            !schedule.project_id ||
            !schedule.model_id ||
            !schedule.data.type ||
            !schedule.data.day ||
            !schedule.data.hour
          }
        >
          {userDetailsReducer?.loading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Add"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddScheduleModal;
