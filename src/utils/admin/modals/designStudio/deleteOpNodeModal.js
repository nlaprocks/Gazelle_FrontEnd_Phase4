import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";
const DeleteOpNodeModal = ({
  nodes,
  setNodes,
  showDeleteOpNodeModal,
  setShowDeleteOpNodeModal,
}) => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = React.useState({
    operator_node_id: 0,
    node_name: "",
    operator_id: 0,
  });
  const operatorNodeReducer = useSelector(
    (state) => state.deleteOperatorNodeReducer
  );
  const handleClose = () => {
    setShowDeleteOpNodeModal(false);
    setSelectedNode({
      operator_node_id: 0,
      node_name: "",
      operator_id: 0,
    });
  };
  const updateOperatorNode = () => {
    dispatch(
      allActions.deleteOperatorNodeAction.deleteOperatorNode(selectedNode)
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
    <Modal
      show={showDeleteOpNodeModal}
      onHide={handleClose}
      centered
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Delete Operator Node</h5>
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
              <div className="custom-select-box">
                <select
                  className="select2-add-insights form-select"
                  name="status"
                  onChange={(e) => {
                    const filteredNode = nodes.filter(
                      (val) => val?.node_name === e.target.value
                    );
                    setSelectedNode({
                      operator_node_id: filteredNode[0].id,
                      operator_id: filteredNode[0].operator_id,
                      node_name: filteredNode[0].node_name,
                    });
                    // setCurrentNode(filteredNode[0]?.node_name);
                  }}
                  value={selectedNode?.node_name}
                >
                  <option disabled value="">
                    Select Node
                  </option>
                  {nodes?.map((val, index) => {
                    return (
                      <option key={index} value={val?.node_name}>
                        {val?.node_name}
                      </option>
                    );
                  })}
                </select>
              </div>
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
          onClick={() => updateOperatorNode()}
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
            "Delete"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteOpNodeModal;
