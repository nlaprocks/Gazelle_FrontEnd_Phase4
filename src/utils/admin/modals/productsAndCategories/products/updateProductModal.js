import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../../store/index";
import Spinner from "react-bootstrap/Spinner";
const UpdateProductModal = ({
  products,
  setProducts,
  showUpdateProductModal,
  setShowUpdateProductModal,
}) => {
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState({
    product_id: 0,
    category_id: 0,
    product_name: "",
  });
  const productReducer = useSelector((state) => state.updateProductReducer);
  const handleClose = () => {
    setShowUpdateProductModal(false);
    setCurrentProduct("");
    setProducts([]);
    setSelectedProduct({
      product_id: 0,
      category_id: 0,
      product_name: "",
    });
  };
  const updateProduct = () => {
    dispatch(allActions.updateProductAction.updateProduct(selectedProduct));
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
      show={showUpdateProductModal}
      onHide={handleClose}
      centered
      scrollable
    >
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Update Product</h5>
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
                    setCurrentProduct(filteredProduct[0]?.product_name);
                  }}
                  value={currentProduct}
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
              <input
                type="text"
                className="form-control"
                placeholder="Update Node*"
                value={selectedProduct?.product_name}
                onChange={(e) => {
                  setSelectedProduct({
                    ...selectedProduct,
                    product_name: e.target.value,
                  });
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
          onClick={() => updateProduct()}
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
            "Update"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProductModal;
