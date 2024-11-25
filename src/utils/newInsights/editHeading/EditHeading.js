import React from "react";
import { ReactComponent as Edit } from "../../../assets/newIcons/Icon_feather-edit-2.svg";
import { ReactComponent as Delete } from "../../../assets/newIcons/Icon_material-delete-forever.svg";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";

const EditHeading = ({ slideName, callingQuestionsOnReducersSuccess }) => {
  const { model_id } = useParams();
  const dispatch = useDispatch();
  const updateSlideNameReducer = useSelector(
    (state) => state.updateSlideNameReducer
  );
  const [loading, setLoading] = React.useState(false);
  const deleteSlideNameReducer = useSelector(
    (state) => state.deleteSlideNameReducer
  );
  // Declared a state variable called "editing" with an initial value of false
  const [editing, setEditing] = React.useState(false);
  const [heading, setHeading] = React.useState({
    model_id: model_id,
    slide_id: 0,
    slide_title: "",
  });
  const [deleteHeading, setDeleteHeading] = React.useState({
    model_id: model_id,
    slide_id: 0,
  });
  const handleEditClick = (e) => {
    e.preventDefault();
    // Set the "editing" state to true when the edit button is clicked
    setEditing(true);
  };
  const handleValueChange = (event) => {
    // Update the "value" state when the input value changes
    setHeading({
      ...heading,
      slide_title: event.target.value,
    });
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(allActions.deleteSlideNameAction.deleteSlideName(deleteHeading));
  };
  const handleSaveClick = (e) => {
    e.preventDefault();
    // Set the "editing" state to false when the save button is clicked
    dispatch(allActions.updateSlideNameAction.updateSlideName(heading));
    setLoading(true);
  };
  React.useEffect(() => {
    setHeading({
      ...heading,
      slide_id: slideName[0].slide_id,
      slide_title: slideName[0].slide_title,
    });
    setDeleteHeading({
      ...deleteHeading,
      slide_id: slideName[0].slide_id,
    });
  }, [slideName]);
  React.useEffect(() => {
    setEditing(false);
    setLoading(false);
    if (updateSlideNameReducer.success === true) {
      // dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      dispatch(
        allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(
          model_id
        )
      );
      callingQuestionsOnReducersSuccess(updateSlideNameReducer);
      delete updateSlideNameReducer.success;
    }
  }, [updateSlideNameReducer.success]);
  React.useEffect(() => {
    if (deleteSlideNameReducer.success) {
      dispatch(allActions.getAllSlidesAction.getAllSlide(model_id));
      dispatch(
        allActions.getAdminQuestionByModelIdAction.getAdminQuestionByModelId(
          model_id
        )
      );
      callingQuestionsOnReducersSuccess(deleteSlideNameReducer);
      delete deleteSlideNameReducer.success;
    }
  }, [deleteSlideNameReducer]);
  return (
    <div className="nla_heading">
      {/* Render the value as a text field when in edit mode, or as plain text when not in edit mode */}
      {loading && updateSlideNameReducer.loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          {editing ? (
            <input
              type="text"
              value={heading.slide_title}
              onChange={handleValueChange}
              className="form-control"
            />
          ) : (
            <h4>{slideName[0].slide_title}</h4>
          )}
          {/* Render the edit button when not in edit mode, or the save button when in edit mode */}
          {editing ? (
            <a
              href="#!"
              className="nla-edit-name mb-3 ms-3"
              onClick={handleSaveClick}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-check"></i>
            </a>
          ) : (
            <>
              <a href="#!" onClick={handleEditClick}>
                <Edit />
              </a>
              <a href="#!" onClick={handleDeleteClick}>
                <Delete />
              </a>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditHeading;
