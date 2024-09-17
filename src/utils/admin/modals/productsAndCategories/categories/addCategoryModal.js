import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddCategoryModal = ({
  showAddCategoryModal,
  setShowAddCategoryModal,
}) => {
  const dispatch = useDispatch();
  // const [category, setCategory] = React.useState("");
  const [bulkFile, setBulkFile] = React.useState("");
  const categoryReducer = useSelector((state) => state.addCategoryReducer);
  const handleClose = () => {
    setShowAddCategoryModal(false);
    // setCategory("");
  };
  const addCategory = () => {
    dispatch(allActions.addCategoryAction.addCategory(bulkFile[0]));
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
    <Modal show={showAddCategoryModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Category</h5>
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
              {/* <input
                type="text"
                className="form-control"
                placeholder="Add Category*"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              /> */}
              <label htmlFor="file">Bulk Upload</label>
              <div className="nla-select-box-with-lbl">
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  // accept=".csv"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => setBulkFile(e.target.files)}
                />
                {/* <label htmlFor="file">
                  <i className="fa-solid fa-paperclip"></i>
                </label> */}
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
          onClick={() => addCategory()}
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

export default AddCategoryModal;
