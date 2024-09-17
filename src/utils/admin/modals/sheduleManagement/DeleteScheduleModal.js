import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const DeleteScheduleModal = ({
  showDeleteModal,
  setShowDeleteModal,
  setEmailForModal,
  emailForModal,
  deleteScheduleData,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setEmailForModal(null);
    setShowDeleteModal(false);
  };
  const deleteUserReducer = useSelector((state) => state.deleteUserReducer);
  const deleteUser = async () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const formData = new FormData();
      formData.append("project_id", parseInt(deleteScheduleData.project_id));
      formData.append("model_id", parseInt(deleteScheduleData.model_id));
      const api = `${process.env.REACT_APP_NGROK}/client-data/jobs/delete-schedule-job`;
      var res = await axios.post(api, formData, config);
      if (res.status === 200) {
        console.log("Delete Job res: ", res.data);
        handleClose();
        setIsLoading(true);
      }
    } catch (error) {
      console.log("Delete Job Error", error);
    }
  };
  React.useEffect(() => {
    if (deleteUserReducer.success) {
      dispatch(allActions.getAllUsersAction.getAllUsers());
      handleClose();
      delete deleteUserReducer.success;
    }
  }, [deleteUserReducer]);

  console.log("deleteScheduleData: ", deleteScheduleData);

  return (
    <Modal show={showDeleteModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Delete Category</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "auto" }}>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../../assets/images/new_project_create_image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla_modal_body_title text-center">
          <h5>Are you Sure?</h5>
          <p>Hitting yes will delete the category for the project.</p>
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
        <button type="button" className="btn btn-primary" onClick={() => deleteUser()}>
          {deleteUserReducer?.loading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Yes"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteScheduleModal;
