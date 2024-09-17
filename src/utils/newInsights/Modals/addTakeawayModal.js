import React from "react";
import Modal from "react-bootstrap/Modal";
import dotIcons from "../../../assets/newIcons/icon-dots.svg";
import "./modal.css";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";

const AddTakeawayModal = ({
  showTakeawayModal,
  setShowTakeawayModal,
  currentSlideId,
  callingQuestionsOnReducersSuccess,
}) => {
  const dispatch = useDispatch();
  const { model_id } = useParams();

  const addTakeawayReducer = useSelector((state) => state.addTakeawayReducer);
  const [bullets, setBullets] = React.useState([{ bullet: "" }]);
  const [takeaway, setTakeaway] = React.useState({
    model_id: model_id,
    slide_id: 0,
    take_away_title: "Take Aways",
    take_away_description: [],
  });
  const addBullet = () => {
    setBullets([...bullets, { bullet: "" }]);
  };
  function handleInputChange(event, index) {
    const newInputFields = [...bullets];
    newInputFields[index].bullet = event.target.value;
    setBullets(newInputFields);
  }
  const handleClose = () => {
    setShowTakeawayModal(false);
    setBullets([{ bullet: "" }]);
  };
  const addTakeaway = () => {
    setTakeaway({ ...takeaway, take_away_description: bullets });
    dispatch(
      allActions.addTakeawayAction.addTakeaway({
        ...takeaway,
        take_away_description: bullets,
      })
    );
  };
  React.useEffect(() => {
    setTakeaway({ ...takeaway, slide_id: currentSlideId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideId]);

  React.useEffect(() => {
    if (addTakeawayReducer.success) {
      dispatch(
        allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(
          model_id
        )
      );
      // dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      callingQuestionsOnReducersSuccess(addTakeawayReducer);
      delete addTakeawayReducer.success;
      handleClose();
    }
  }, [addTakeawayReducer]);

  return (
    <Modal show={showTakeawayModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Takeaway</h5>
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
              {bullets.map((inputValue, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img src={dotIcons} alt="" className="img-fluid" />
                  <input
                    type="text"
                    name="take_away_description"
                    className="form-control"
                    placeholder="Type your Bullet point"
                    // value={takeaway.take_away_description}
                    value={inputValue.bullet}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                  <span className="nla_counts">
                    <span>0</span>/64
                  </span>
                </div>
              ))}
            </div>
            <div className="nla_add-bullets-btn">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => addBullet()}
              >
                + Add Bullets
              </button>
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
          onClick={() => addTakeaway()}
        >
          {addTakeawayReducer?.loading ? (
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

export default AddTakeawayModal;
