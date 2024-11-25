import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import allActions from "../../../../store/index";
const UpdateQuestionModal = ({
  question,
  setQuestion,
  showUpdateModal,
  setShowUpdateModal,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowUpdateModal(false);
    setQuestion({
      question_id: 0,
      question: "",
      type: "",
      operator: "",
    });
  };
  const getAllOperatorsReducer = useSelector(
    (state) => state.getAllOperatorsReducer
  );
  const changeHandler = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const updateQuestionReducer = useSelector(
    (state) => state.updateAdminQuestionReducer
  );
  const updateUser = () => {
    dispatch(
      allActions.updateAdminQuestionAction.updateAdminQuestion(question)
    );
  };
  React.useEffect(() => {
    if (updateQuestionReducer.success) {
      dispatch(allActions.getAdminQuestionAction.getAdminQuestion());
      handleClose();
      delete updateQuestionReducer.success;
    }
  }, [updateQuestionReducer]);
  return (
    <Modal show={showUpdateModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add User</h5>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => updateUser()}
        >
          {updateQuestionReducer?.loading ? (
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

export default UpdateQuestionModal;
