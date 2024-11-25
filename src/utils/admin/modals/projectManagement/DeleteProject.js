import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";
const DeleteProject = ({
  showDeleteProject,
  setShowDeleteProject,
  projectId,
  setProjectId,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setProjectId(0);
    setShowDeleteProject(false);
  };
  const deleteProjectReducer = useSelector(
    (state) => state.deleteProjectReducer
  );
  const handleDeleteProject = () => {
    dispatch(allActions.deleteProjectAction.deleteProject(projectId));
  };
  React.useEffect(() => {
    if (deleteProjectReducer.success) {
      dispatch(allActions.getAllProjectsAction.getAllProjects());
      handleClose();
      delete deleteProjectReducer.success;
    }
  }, [deleteProjectReducer]);
  return (
    <Modal show={showDeleteProject} onHide={handleClose} centered scrollable>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleDeleteProject()}
        >
          {deleteProjectReducer?.loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
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

export default DeleteProject;
