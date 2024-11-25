import React from "react";
import "../../../css/table.css";
import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Moment from "react-moment";
import Spinner from "react-bootstrap/Spinner";
import AddQuestionModal from "../modals/questions/addQuestionModal";
import DeleteQuestionModal from "../modals/questions/deleteQuestionModal";
import UpdateQuestionModal from "../modals/questions/updateQuestionModal";
const QuestionsWrapper = ({
  showAddQuestionModal,
  setShowAddQuestionModal,
}) => {
  const dispatch = useDispatch();
  const allQuestionsReducer = useSelector(
    (state) => state.getAdminQuestionReducer
  );
  const [question, setQuestion] = React.useState({
    question_id: 0,
    question: "",
    type: "",
    operator: "",
  });
  const [idForModal, setIdForModal] = React.useState(0);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  // console.log(allQuestionsReducer);
  React.useEffect(() => {
    dispatch(allActions.getAdminQuestionAction.getAdminQuestion());
  }, []);
  return (
    <div className="nla_insight-tab-wrapper">
      {allQuestionsReducer.loading ? (
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
                      <th>Question</th>
                      <th>Type</th>
                      <th>Operator</th>
                      <th className="text-center">Created Date</th>
                      <th className="text-center">Modify Date</th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allQuestionsReducer?.question?.data?.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td>{val?.question}</td>
                          <td>{val?.type}</td>
                          <td>{val?.operator}</td>
                          <td className="text-center">
                            <Moment format="DD/MM/YYYY">
                              {val?.createdAt}
                            </Moment>
                          </td>
                          <td className="text-center">
                            <Moment format="DD/MM/YYYY">
                              {val?.updatedAt}
                            </Moment>
                          </td>
                          <td className="text-center lastCellBody dtfc-fixed-right">
                            <a
                              href="#!"
                              className="text-primary"
                              onClick={() => {
                                setQuestion({
                                  question_id: val?.id,
                                  question: val?.question,
                                  type: val?.type,
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
                                setShowDeleteModal(true);
                                setIdForModal(val?.id);
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
      <AddQuestionModal
        showAddQuestionModal={showAddQuestionModal}
        setShowAddQuestionModal={setShowAddQuestionModal}
      />
      <DeleteQuestionModal
        idForModal={idForModal}
        setIdForModal={setIdForModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <UpdateQuestionModal
        question={question}
        setQuestion={setQuestion}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </div>
  );
};

export default QuestionsWrapper;
