import React from "react";
import "../../../css/table.css";
import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Spinner from "react-bootstrap/Spinner";
import Moment from "react-moment";
import AddCategoryModal from "../modals/productsAndCategories/categories/addCategoryModal";
import UpdateCategoryModal from "../modals/productsAndCategories/categories/updateCategoryModal";
import DeleteCategoryModal from "../modals/productsAndCategories/categories/deleteCategoryModal";
import AddProductModal from "../modals/productsAndCategories/products/addProductModal";
import UpdateProductModal from "../modals/productsAndCategories/products/updateProductModal";
import DeleteProductModal from "../modals/productsAndCategories/products/deleteProductModal";
const ProductsAndCategoriesWrapper = ({
  showAddCategoryModal,
  setShowAddCategoryModal,
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState({
    category_id: 0,
    category_name: "",
  });
  const [products, setProducts] = React.useState([]);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] =
    React.useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] =
    React.useState(false);
  const [showAddProductModal, setShowAddProductModal] = React.useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] =
    React.useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] =
    React.useState(false);
  const allCategoriesWithProducts = useSelector(
    (state) => state.getAllCategoriesWithProductsReducer
  );
  React.useEffect(() => {
    dispatch(
      allActions.getAllCategoriesWithProductsAction.getAllCategoriesWithProducts()
    );
  }, []);
  return (
    <div className="nla_insight-tab-wrapper">
      {allCategoriesWithProducts.loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="dataTables_wrapper">
          <div className="dataTables_scroll">
            <div className="dataTables_scrollHead">
              <div className="dataTables_scrollHeadInner">
                <table
                  id="insightManagementData"
                  className="table stripe row-border order-column nla-data-table"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Products</th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">
                        Products Action
                      </th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">
                        Category Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCategoriesWithProducts?.categories?.data?.map(
                      (val, index) => {
                        return (
                          <tr key={index}>
                            <td>{val?.category_name}</td>
                            <td>
                              <Moment format="DD/MM/YYYY">
                                {val?.createdAt}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="DD/MM/YYYY">
                                {val?.updatedAt}
                              </Moment>
                            </td>
                            <td
                              className="width100"
                              style={{ display: "flex" }}
                            >
                              {val?.Products?.length > 0 ? (
                                <>
                                  {val?.Products?.map(
                                    (product, productIndex, productArr) => {
                                      if (
                                        productIndex ===
                                        productArr.length - 1
                                      ) {
                                        return (
                                          <div key={productIndex}>
                                            {product?.product_name}
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <div key={productIndex}>
                                            {product?.product_name} →{" "}
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="text-center lastCellBody dtfc-fixed-right">
                              <a
                                href="#!"
                                className="text-success"
                                onClick={() => {
                                  setCategory({
                                    category_id: val?.id,
                                    category_name: val?.category_name,
                                  });
                                  setShowAddProductModal(true);
                                }}
                              >
                                <i className="fa-solid fa-plus"></i>
                              </a>
                              <a
                                href="#!"
                                className="text-primary"
                                onClick={() => {
                                  setProducts(val?.Products);
                                  setShowUpdateProductModal(true);
                                }}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </a>
                              <a
                                href="#!"
                                className="text-danger"
                                onClick={() => {
                                  setProducts(val?.Products);
                                  setShowDeleteProductModal(true);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </a>
                            </td>
                            <td className="text-center lastCellBody dtfc-fixed-right">
                              <a
                                href="#!"
                                className="text-primary"
                                onClick={() => {
                                  setCategory({
                                    category_id: val?.id,
                                    category_name: val?.category_name,
                                  });
                                  setShowUpdateCategoryModal(true);
                                }}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </a>
                              <a
                                href="#!"
                                className="text-danger"
                                onClick={() => {
                                  setCategory({
                                    category_id: val?.id,
                                    category_name: val?.category_name,
                                  });
                                  setShowDeleteCategoryModal(true);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </a>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Paginator /> */}
        </div>
      )}
      <AddCategoryModal
        showAddCategoryModal={showAddCategoryModal}
        setShowAddCategoryModal={setShowAddCategoryModal}
      />
      <UpdateCategoryModal
        category={category}
        setCategory={setCategory}
        showUpdateCategoryModal={showUpdateCategoryModal}
        setShowUpdateCategoryModal={setShowUpdateCategoryModal}
      />
      <DeleteCategoryModal
        category={category}
        setCategory={setCategory}
        showDeleteCategoryModal={showDeleteCategoryModal}
        setShowDeleteCategoryModal={setShowDeleteCategoryModal}
      />
      <AddProductModal
        category={category}
        setCategory={setCategory}
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
      />
      <UpdateProductModal
        products={products}
        setProducts={setProducts}
        showUpdateProductModal={showUpdateProductModal}
        setShowUpdateProductModal={setShowUpdateProductModal}
      />
      <DeleteProductModal
        products={products}
        setProducts={setProducts}
        showDeleteProductModal={showDeleteProductModal}
        setShowDeleteProductModal={setShowDeleteProductModal}
      />
    </div>
  );
};

export default ProductsAndCategoriesWrapper;
