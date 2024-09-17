import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../store/index";
const TopBar = ({
  type,
  setShowAddQuestionModal,
  setShowAddCategoryModal,
  setShowAddProject,
  setShowAddSchedule,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const filterUserReducer = useSelector((state) => state.filterUserReducer);
  const [filterUser, setFilterUser] = React.useState("");
  const handleClick = () => {
    if (pathname === "/admin/insights-management" || pathname === "/admin/design-studio") {
      setShowAddQuestionModal(true);
    } else if (pathname === "/admin/products&Categories") {
      setShowAddCategoryModal(true);
    } else if (pathname === "/admin/project-management") {
      setShowAddProject(true);
    } else if (pathname === "/admin/scheduling-management") {
      setShowAddSchedule(true);
    } else if (pathname === "/admin/user-management") {
      dispatch(allActions.filterUserAction.filterUser({ name: filterUser }));
    }
  };
  return (
    <div className="design-studio-topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <div className="new-project-name align-items-center">
              <Link to="/admin/dashboard">
                <div className="nla-arrow-left-icon">
                  <span></span>
                </div>
              </Link>
              <div className="nla-name">
                <p className="mb-0">{type} management</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="btn-wrapper">
              <div className="other-design-studio-buttons">
                {pathname === "/admin/user-management" ? (
                  <div className="nla_search-box position-relative">
                    <input
                      type="search"
                      className="form-control mb-0"
                      placeholder={`Search ${type}`}
                      value={filterUser}
                      onChange={(e) => {
                        setFilterUser(e.target.value);
                        if (e.target.value === "") {
                          delete filterUserReducer.user;
                          dispatch(allActions.getAdminQuestionAction.getAdminQuestion());
                        }
                      }}
                    />
                    <img
                      src={require("../../assets/newIcons/search-icon.png")}
                      alt="search"
                      className="position-absolute search-icon"
                    />
                  </div>
                ) : null}
                <div>
                  <a href="#!" className="btn btn-primary" onClick={handleClick}>
                    {pathname !== "/admin/insights-management"
                      ? pathname === "/admin/user-management"
                        ? "Search User"
                        : pathname === "/admin/design-studio"
                        ? `+Add Operator`
                        : `+Add ${type}`
                      : "Add Question"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
