import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../../store/index";
import Spinner from "react-bootstrap/Spinner";
const DeleteProductModal = ({
  products,
  setProducts,
  showDeleteProductModal,
  setShowDeleteProductModal,
}) => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = React.useState({
    product_id: 0,
    category_id: 0,
    product_name: "",
  });
  const productReducer = useSelector((state) => state.deleteProductReducer);
  const handleClose = () => {
    setShowDeleteProductModal(false);
    setProducts([]);
    setSelectedProduct({
      product_id: 0,
      category_id: 0,
      product_name: "",
    });
  };
  const deleteProduct = () => {
    dispatch(allActions.deleteProductAction.deleteProduct(selectedProduct));
  };
  React.useEffect(() => {
    if (productReducer.success) {
      dispatch(
        allActions.getAllCategoriesWithProductsAction.getAllCategoriesWithProducts()
      );
      handleClose();
      delete productReducer.success;
    }
  }, [productReducer]);
  return (
    <Modal
      show={showDeleteProductModal}
      onHide={handleClose}
      centered
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Delete Product</h5>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <div className="custom-select-box">
                <select
                  className="select2-add-insights form-select"
                  name="status"
                  onChange={(e) => {
                    const filteredProduct = products.filter(
                      (val) => val?.product_name === e.target.value
                    );
                    setSelectedProduct({
                      product_id: filteredProduct[0]?.id,
                      category_id: filteredProduct[0]?.category_id,
                      product_name: filteredProduct[0]?.product_name,
                    });
                  }}
                  value={selectedProduct.product_name}
                >
                  <option disabled value="">
                    Select Node
                  </option>
                  {products?.map((val, index) => {
                    return (
                      <option key={index} value={val?.product_name}>
                        {val?.product_name}
                      </option>
                    );
                  })}
                </select>
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
          onClick={() => deleteProduct()}
        >
          {productReducer?.loading ? (
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
            "Delete"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
