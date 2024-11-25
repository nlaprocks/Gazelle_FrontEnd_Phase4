import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";
const AddQuestionModal = ({ showAddQuestionModal, setShowAddQuestionModal }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = React.useState({
    question: "",
    type: "",
    operator: "",
  });
  const questionReducer = useSelector((state) => state.addAdminQuestionReducer);
  const handleClose = () => {
    setShowAddQuestionModal(false);
    setQuestion({
      question: "",
      type: "",
      operator: "",
    });
  };
  const getAllOperatorsReducer = useSelector((state) => state.getAllOperatorsReducer);
  const changeHandler = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const addUser = () => {
    dispatch(allActions.addAdminQuestionAction.addAdminQuestion(question));
  };
  React.useEffect(() => {
    dispatch(allActions.getAllOperatorsAction.getAllOperators());
  }, []);
  React.useEffect(() => {
    if (questionReducer.success) {
      dispatch(allActions.getAdminQuestionAction.getAdminQuestion());
      handleClose();
      delete questionReducer.success;
    }
  }, [questionReducer]);
  return (
    <Modal show={showAddQuestionModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Questions</h5>
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
                placeholder="Add Question*"
                name="question"
                value={question.question}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Add Type*"
                name="type"
                value={question.type}
                onChange={changeHandler}
              />
            </div>
            <div>
              <select
                className="form-select"
                name="role"
                onChange={(e) => {
                  setQuestion({ ...question, operator: e.target.value });
                }}
                value={question.operator}
              >
                <option disabled={true} value="">
                  Select Operator
                </option>
                {getAllOperatorsReducer?.operators?.data?.map((val, index) => {
                  return (
                    <option key={index} value={val.operator}>
                      {val.operator}
                    </option>
                  );
                })}
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
        <button type="button" className="btn btn-primary" onClick={() => addUser()}>
          {questionReducer?.loading ? (
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

export default AddQuestionModal;
