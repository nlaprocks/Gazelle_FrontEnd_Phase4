import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

const AddSlideModal = ({ showSlideModal, setShowSlideModal, callingQuestionsOnReducersSuccess }) => {
  const { model_id } = useParams();

  const [addSlide, setAddSlide] = React.useState({
    model_id: model_id,
    question: "",
    type: "",
  });

  const changeHandlerOnQuestion = (e) => {
    setAddSlide({ ...addSlide, question: e.target.value });
  };
  const changeHandlerOnType = (e) => {
    setAddSlide({ ...addSlide, type: e.target.value });
  };
  const createSlide = () => {
    if (!addSlide.type) {
      return alert("Please select slide category");
    } else if (!addSlide.question) {
      return alert("Please enter question");
    }
    dispatch(allActions.addSlideAction.addSlide(addSlide));
    setAddSlide({ question: "", type: "" });
  };
  const addSlideReducer = useSelector((state) => state.addSlideReducer);
  const getAllSlideReducer = useSelector((state) => state.getAllSlideReducer);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowSlideModal(false);
    // delete addSlideReducer.success;
    delete getAllSlideReducer.success;
  };
  React.useEffect(() => {
    if (addSlideReducer.success) {
      // dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      // dispatch(
      //   allActions.getAllQuestionTypesAction.getAllQuestionTypes(model_id)
      // );
      callingQuestionsOnReducersSuccess(addSlideReducer);
      dispatch(allActions.getAllQuestionTypesAction.getAllQuestionTypes(model_id));
      handleClose();
      alert(addSlideReducer.slide.message);
      const { scrollHeight } = document.documentElement;
      const offset = scrollHeight;
      window.scrollTo({
        top: offset,
        behavior: "auto",
      });
      delete addSlideReducer.success;
    }
  }, [addSlideReducer]);
  
  return (
    <Modal show={showSlideModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Slide</h5>
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
          <form action="">
            <div className="nla-add-heading-fiend-group">
              <i className="fa-solid fa-list-ul icon-absolute"></i>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => changeHandlerOnType(e)}
              >
                <option value="" disabled selected hidden>
                  Select Insights Category
                </option>
                <option value="base">Base</option>
                <option value="promo">Promo</option>
                <option value="strat">Strat</option>
              </select>
            </div>
            <div className="mb-3 nla-add-heading-fiend-group textarea">
              <i className="fa-solid fa-chart-line icon-absolute"></i>
              <textarea
                className="form-control"
                id=""
                rows="3"
                placeholder="Create Insights"
                onChange={(e) => changeHandlerOnQuestion(e)}
              ></textarea>
              <span className="nla_counts">
                <span>0</span>/64
              </span>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={() => createSlide()}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSlideModal;
