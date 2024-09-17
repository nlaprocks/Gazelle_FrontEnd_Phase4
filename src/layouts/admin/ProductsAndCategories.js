import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import TobBar from "../../utils/admin/TopBar";
import ProductsAndCategoriesWrapper from "../../utils/admin/productsAndCategories/ProductsAndCategoriesWrapper";
import Footer from "../../components/footer/Footer";
import "../../css/admin.css";
import "../../css/adminCustom.css";
const ProductsAndCategories = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = React.useState(false);
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <div className="main-content-wrapper">
        <TobBar
          type="Category"
          setShowAddCategoryModal={setShowAddCategoryModal}
        />
        <ProductsAndCategoriesWrapper
          showAddCategoryModal={showAddCategoryModal}
          setShowAddCategoryModal={setShowAddCategoryModal}
        />
        <Footer />
      </div>
    </div>
  );
};

export default ProductsAndCategories;
