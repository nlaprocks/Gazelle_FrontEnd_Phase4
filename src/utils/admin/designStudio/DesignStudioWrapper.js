import React from "react";
import "../../../css/table.css";
// import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Spinner from "react-bootstrap/Spinner";
import AddOperatorModal from "../modals/designStudio/addOperatorModal";
import UpdateOperatorModal from "../modals/designStudio/updateOperatorModal";
import DeleteOperatorModal from "../modals/designStudio/deleteOperatorModal";
import AddOpNodeModal from "../modals/designStudio/addOpNodeModal";
import UpdateOpNodeModal from "../modals/designStudio/updateOpNodeModal";
import DeleteOpNodeModal from "../modals/designStudio/deleteOpNodeModal";
const DesignStudioWrapper = ({ showAddQuestionModal, setShowAddQuestionModal }) => {
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showAddOpNodeModal, setShowAddOpNodeModal] = React.useState(false);
  const [showUpdateOpNodeModal, setShowUpdateOpNodeModal] = React.useState(false);
  const [showDeleteOpNodeModal, setShowDeleteOpNodeModal] = React.useState(false);
  const [deleteOperator, setDeleteOperator] = React.useState(0);
  const [updateOperator, setUpdateOperator] = React.useState({
    operator_id: 0,
    operator: "",
  });
  const [operatorID, setOperatorID] = React.useState(0);
  const [nodes, setNodes] = React.useState([]);
  const allOperatorsWithNodes = useSelector((state) => state.getAllOperatorsWithNodesReducer);
  // console.log(allOperatorsWithNodes?.operators?.data);
  React.useEffect(() => {
    dispatch(allActions.getAllOperatorsWithNodesAction.getAllOperatorsWithNodes());
  }, []);
  return (
    <div className="nla_insight-tab-wrapper">
      {allOperatorsWithNodes.loading ? (
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
                      <th>Operators</th>
                      <th>Nodes</th>
                      <th className="lastCell text-center sorting_disabled dtfc-fixed-right">
                        Nodes Actions
                      </th>
                      <th className="lastCell text-center sorting_disabled dtfc-fixed-right">
                        Operator Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOperatorsWithNodes?.operators?.data?.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{val?.operator}</td>

                          <td className="width100" style={{ display: "flex" }}>
                            {val?.OperatorNodes?.length > 0 ? (
                              <>
                                {val?.OperatorNodes?.map((node, nodeIndex, NodeArr) => {
                                  if (nodeIndex === NodeArr.length - 1) {
                                    return (
                                      <div className={node.is_active === 0 && "text-muted"} key={nodeIndex}>
                                        {node?.node_name}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className={node.is_active === 0 && "text-muted"} key={nodeIndex}>
                                        {node?.node_name} →{" "}
                                      </div>
                                    );
                                  }
                                })}
                              </>
                            ) : (
                              "-"
                            )}
                          </td>

                          <td className="text-center lastCellBody dtfc-fixed-right">
                            <a
                              href="#!"
                              className="text-success"
                              onClick={() => {
                                setShowAddOpNodeModal(true);
                                setOperatorID(val?.id);
                              }}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </a>
                            {val?.OperatorNodes?.length > 0 ? (
                              <>
                                <a
                                  href="#!"
                                  className="text-primary"
                                  onClick={() => {
                                    setNodes(val?.OperatorNodes);
                                    setShowUpdateOpNodeModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                                <a
                                  href="#!"
                                  className="text-danger"
                                  onClick={() => {
                                    setNodes(val?.OperatorNodes);
                                    setShowDeleteOpNodeModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </a>
                              </>
                            ) : null}
                          </td>
                          <td className="text-center lastCellBody dtfc-fixed-right">
                            <a
                              href="#!"
                              className="text-primary"
                              onClick={() => {
                                setUpdateOperator({
                                  operator_id: val?.id,
                                  operator: val?.operator,
                                });
                                setShowUpdateModal(true);
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </a>
                            <a
                              href="#!"
                              className="text-danger"
                              onClick={() => {
                                setDeleteOperator(val?.id);
                                setShowDeleteModal(true);
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
      <AddOperatorModal showAddQuestionModal={showAddQuestionModal} setShowAddQuestionModal={setShowAddQuestionModal} />
      <UpdateOperatorModal
        updateOperator={updateOperator}
        setUpdateOperator={setUpdateOperator}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
      <DeleteOperatorModal
        deleteOperator={deleteOperator}
        setDeleteOperator={setDeleteOperator}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <AddOpNodeModal
        operatorID={operatorID}
        showAddOpNodeModal={showAddOpNodeModal}
        setShowAddOpNodeModal={setShowAddOpNodeModal}
      />
      <UpdateOpNodeModal
        nodes={nodes}
        setNodes={setNodes}
        showUpdateOpNodeModal={showUpdateOpNodeModal}
        setShowUpdateOpNodeModal={setShowUpdateOpNodeModal}
      />
      <DeleteOpNodeModal
        nodes={nodes}
        setNodes={setNodes}
        showDeleteOpNodeModal={showDeleteOpNodeModal}
        setShowDeleteOpNodeModal={setShowDeleteOpNodeModal}
      />
    </div>
  );
};

export default DesignStudioWrapper;
