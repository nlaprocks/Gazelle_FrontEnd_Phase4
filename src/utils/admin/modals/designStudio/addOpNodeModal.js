import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddOpNodeModal = ({
  operatorID,
  showAddOpNodeModal,
  setShowAddOpNodeModal,
}) => {
  const dispatch = useDispatch();
  const [operatorNode, setOperatorNode] = React.useState("");
  const operatorNodeReducer = useSelector(
    (state) => state.addOperatorNodeReducer
  );
  const handleClose = () => {
    setShowAddOpNodeModal(false);
    setOperatorNode("");
  };
  const addOperatorNode = () => {
    dispatch(
      allActions.addOperatorNodeAction.addOperatorNode({
        operator_id: operatorID,
        node_name: operatorNode,
      })
    );
  };
  React.useEffect(() => {
    if (operatorNodeReducer.success) {
      dispatch(
        allActions.getAllOperatorsWithNodesAction.getAllOperatorsWithNodes()
      );
      handleClose();
      delete operatorNodeReducer.success;
    }
  }, [operatorNodeReducer]);
  return (
    <Modal show={showAddOpNodeModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Operator Node</h5>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Add operator node*"
                value={operatorNode}
                onChange={(e) => {
                  setOperatorNode(e.target.value);
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
          onClick={() => addOperatorNode()}
        >
          {operatorNodeReducer?.loading ? (
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

export default AddOpNodeModal;
