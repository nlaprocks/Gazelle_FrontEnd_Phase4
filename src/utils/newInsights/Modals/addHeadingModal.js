import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import HeadingIcon from "../../../assets/newIcons/icon-awesome-heading.svg";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";

const AddHeadingModal = ({
  showAddHeadingModal,
  setAddHeadingModal,
  currentSlideId,
  callingQuestionsOnReducersSuccess,
}) => {
  const dispatch = useDispatch();
  const { id, model_id } = useParams();

  const addSlideReducer = useSelector((state) => state.addSlideNameReducer);
  const handleClose = () => {
    setAddHeadingModal(false);
    setHeading({ ...heading, slide_title: "" });
  };
  const [heading, setHeading] = React.useState({
    model_id: model_id,
    slide_id: currentSlideId,
    slide_title: "",
  });
  const changeHandler = (e) => {
    setHeading({ ...heading, [e.target.name]: e.target.value });
  };
  const addSlide = () => {
    dispatch(allActions.addSlideNameAction.addSlideName(heading));
  };
  React.useEffect(() => {
    setHeading({ ...heading, slide_id: currentSlideId });
  }, [currentSlideId]);
  React.useEffect(() => {
    if (addSlideReducer.success) {
      dispatch(
        allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(
          model_id
        )
      );
      // dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      callingQuestionsOnReducersSuccess(addSlideReducer);
      // delete addSlideReducer.success;
      handleClose(handleClose);
    }
  }, [addSlideReducer]);
  return (
    <Modal show={showAddHeadingModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Heading</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../assets/images/create-new-model-intro-image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla-add-heading-block">
          <form>
            <div className="nla-add-heading-fiend-group">
              <img src={HeadingIcon} alt="" />
              <input
                type="text"
                name="slide_title"
                className="form-control"
                placeholder="Type Heading"
                value={heading.slide_title}
                onChange={changeHandler}
              />
              <span className="nla_counts">
                <span>0</span>/64
              </span>
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
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addSlide()}
        >
          {addSlideReducer?.loading ? (
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

export default AddHeadingModal;
