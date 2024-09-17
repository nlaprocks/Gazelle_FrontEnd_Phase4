import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as User } from "../../../assets/newIcons/Icon_feather-user.svg";
import { ReactComponent as Ios } from "../../../assets/newIcons/ionic-ios-settings.svg";
import { ReactComponent as Eye } from "../../../assets/newIcons/Icon_feather-eye.svg";
import { ReactComponent as Studio } from "../../../assets/newIcons/icon-design-studio.svg";
const GridViewDashboard = () => {
  return (
    <div className="nla_grid_and_list_view_data_wrapper">
      <div className="nla_grid_view_wrapper">
        <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/user-management">
              <div className="icon">
                <User />
              </div>
              <h2>
                User <br /> Management
              </h2>
            </Link>
          </div>
        </div>

        <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/project-management">
              <div className="icon">
                <Ios />
              </div>
              <h2>
                Project <br /> Management
              </h2>
            </Link>
          </div>
        </div>

        {/* <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/insights-management">
              <div className="icon">
                <Eye />
              </div>
              <h2>
                Insight <br /> Management
              </h2>
            </Link>
          </div>
        </div> */}

        <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/design-studio">
              <div className="icon">
                <Studio />
              </div>
              <h2>
                Design Studio <br /> Management
              </h2>
            </Link>
          </div>
        </div>
        <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/insights-management">
              <div className="icon">
                <Eye />
              </div>
              <h2>
                Insights <br /> Management
              </h2>
            </Link>
          </div>
        </div>
        <div
          className="nla_item_box_col first-nla-itembox"
          data-position="right"
        >
          <div className="nla_item_box">
            <Link to="/admin/products&Categories">
              <div className="icon">
                <i className="fa-solid fa-lemon"></i>
              </div>
              <h2>
                Products & Category <br /> Management
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridViewDashboard;
