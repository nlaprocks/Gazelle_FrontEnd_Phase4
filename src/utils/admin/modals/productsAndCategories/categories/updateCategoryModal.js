import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const UpdateCategoryModal = ({
  category,
  setCategory,
  showUpdateCategoryModal,
  setShowUpdateCategoryModal,
}) => {
  const dispatch = useDispatch();
  const categoryReducer = useSelector((state) => state.updateCategoryReducer);
  const handleClose = () => {
    setShowUpdateCategoryModal(false);
    setCategory({ category_id: 0, category_name: "" });
  };
  const updateCategory = () => {
    dispatch(allActions.updateCategoryAction.updateCategory(category));
  };
  React.useEffect(() => {
    if (categoryReducer.success) {
      dispatch(
        allActions.getAllCategoriesWithProductsAction.getAllCategoriesWithProducts()
      );
      handleClose();
      delete categoryReducer.success;
    }
  }, [categoryReducer]);
  return (
    <Modal
      show={showUpdateCategoryModal}
      onHide={handleClose}
      centered
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Update Category</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../../../assets/images/new_project_create_image.png")}
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
                placeholder="Update Category*"
                value={category.category_name}
                onChange={(e) => {
                  setCategory({ ...category, category_name: e.target.value });
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
          onClick={() => updateCategory()}
        >
          {categoryReducer?.loading ? (
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

export default UpdateCategoryModal;
