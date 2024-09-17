import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddOperatorModal = ({
  showAddQuestionModal,
  setShowAddQuestionModal,
}) => {
  const dispatch = useDispatch();
  const [operator, setOperator] = React.useState("");
  const operatorReducer = useSelector((state) => state.addOperatorReducer);
  const handleClose = () => {
    setShowAddQuestionModal(false);
    setOperator("");
  };
  const addOperator = () => {
    dispatch(allActions.addOperatorAction.addOperator(operator));
  };
  React.useEffect(() => {
    if (operatorReducer.success) {
      dispatch(
        allActions.getAllOperatorsWithNodesAction.getAllOperatorsWithNodes()
      );
      handleClose();
      delete operatorReducer.success;
    }
  }, [operatorReducer]);
  return (
    <Modal show={showAddQuestionModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Operator</h5>
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
              <input
                type="text"
                className="form-control"
                placeholder="Add Operator*"
                value={operator}
                onChange={(e) => {
                  setOperator(e.target.value);
                }}
              />
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addOperator()}
        >
          {operatorReducer?.loading ? (
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
            "Add"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOperatorModal;
