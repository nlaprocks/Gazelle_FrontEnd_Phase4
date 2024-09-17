import React from "react";
import "../../../css/table.css";
import Paginator from "../../../components/paginator/paginator";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Moment from "react-moment";
import DeleteUserModal from "../modals/userManagement/deleteUserModal";
import AddUserModal from "../modals/userManagement/AddUserModal";
import UpdateUserModal from "../modals/userManagement/UpdateUserModal";
import FilterModal from "../modals/userManagement/FilterModal";
import Spinner from "react-bootstrap/Spinner";

const TabWrapper = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [updateUser, setUpdateUser] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    role: "",
    client_logo: {},
    password: "",
    confirm_password: "",
  });
  const [emailForModal, setEmailForModal] = React.useState(null);
  const allUsersReducer = useSelector((state) => state.getAllUsersReducer);
  const userStatusReducer = useSelector(
    (state) => state.changeUserStatusReducer
  );
  const filterUserReducer = useSelector(
    (state) => state.filterUserReducer.user
  );
  const auth = JSON.parse(localStorage.getItem("auth"));
  const changeUserStatusToInActive = (email) => {
    dispatch(
      allActions.changeUserStatusAction.changeUserStatus({
        email: email,
        status: "inactive",
      })
    );
  };
  const changeUserStatusToActive = (email) => {
    dispatch(
      allActions.changeUserStatusAction.changeUserStatus({
        email: email,
        status: "active",
      })
    );
  };
  React.useEffect(() => {
    dispatch(allActions.getAllUsersAction.getAllUsers());
  }, []);
  React.useEffect(() => {
    if (userStatusReducer.success) {
      dispatch(allActions.getAllUsersAction.getAllUsers());
      delete userStatusReducer.success;
    }
  }, [userStatusReducer]);
  return (
    <div className="nla_insight-tab-wrapper">
      <div className="nla_filter_block">
        <div className="d-flex align-items-center justify-content-between">
          <p className="nla_total_data_count mb-0">
            {allUsersReducer?.users?.data?.length}
            <label>Total Users</label>
          </p>
          <div>
            <a
              href="#!"
              className="btn btn-primary"
              onClick={() => {
                setShowAddUserModal(true);
              }}
            >
              +Add User
            </a>
            <a
              href="#!"
              className="nla_filter"
              onClick={() => {
                setShowFilterModal(true);
              }}
            >
              <i className="fa-solid fa-filter"></i>
            </a>
          </div>
        </div>
      </div>
      {allUsersReducer.loading ? (
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
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Roles</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Created Date</th>
                      <th className="text-center lastCell text-center sorting_disabled dtfc-fixed-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterUserReducer?.data?.length > 0 ? (
                      <>
                        {filterUserReducer?.data?.map((val, index) => {
                          return (
                            <tr key={index}>
                              <td>{val?.client_first_name}</td>
                              <td>{val?.client_last_name}</td>
                              <td>{val?.email}</td>
                              <td>{val?.role}</td>
                              <td>{val?.phone_number}</td>
                              <td>{val?.address}</td>
                              <td className="text-center">
                                <Moment format="DD/MM/YYYY">
                                  {val?.createdAt}
                                </Moment>
                              </td>
                              <td className="text-center lastCellBody dtfc-fixed-right">
                                <div className="form-check form-switch d-inline-block">
                                  {val?.status === "inactive" ? (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="userActiveOrInactive"
                                      onChange={() => {
                                        changeUserStatusToActive(val?.email);
                                      }}
                                      checked={false}
                                    />
                                  ) : (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="userActiveOrInactive"
                                      checked
                                      onChange={() => {
                                        changeUserStatusToInActive(val?.email);
                                      }}
                                    />
                                  )}

                                  <label htmlFor="userActiveOrInactive"></label>
                                </div>
                                <a
                                  href="#!"
                                  className="text-primary"
                                  onClick={() => {
                                    setUpdateUser({
                                      email: val?.email,
                                      first_name: val?.client_first_name,
                                      last_name: val?.client_last_name,
                                      address: val?.address,
                                      phone_number: val?.phone_number,
                                      role: val?.role,
                                      client_logo: val?.client_logo,
                                      password: val?.password,
                                      confirm_password: val?.confirm_password,
                                    });
                                    setShowUpdateUserModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                                {auth.role === "manager" ? null : (
                                  <a
                                    href="#!"
                                    className="text-danger"
                                    onClick={() => {
                                      setEmailForModal(val?.email);
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {allUsersReducer?.users?.data?.map((val, index) => {
                          return (
                            <tr key={index}>
                              <td>{val?.client_first_name}</td>
                              <td>{val?.client_last_name}</td>
                              <td>{val?.email}</td>
                              <td>{val?.role}</td>
                              <td>{val?.phone_number}</td>
                              <td>{val?.address}</td>
                              <td className="text-center">
                                <Moment format="DD/MM/YYYY">
                                  {val?.createdAt}
                                </Moment>
                              </td>
                              <td className="text-center lastCellBody dtfc-fixed-right">
                                <div className="form-check form-switch d-inline-block">
                                  {val?.status === "inactive" ? (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="userActiveOrInactive"
                                      onChange={() => {
                                        changeUserStatusToActive(val?.email);
                                      }}
                                      checked={false}
                                    />
                                  ) : (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="userActiveOrInactive"
                                      checked
                                      onChange={() => {
                                        changeUserStatusToInActive(val?.email);
                                      }}
                                    />
                                  )}

                                  <label htmlFor="userActiveOrInactive"></label>
                                </div>
                                <a
                                  href="#!"
                                  className="text-primary"
                                  onClick={() => {
                                    console.log(val);
                                    setUpdateUser({
                                      email: val?.email,
                                      first_name: val?.client_first_name,
                                      last_name: val?.client_last_name,
                                      address: val?.address,
                                      phone_number: val?.phone_number,
                                      role: val?.role,
                                      client_logo: val?.client_logo,
                                      password: val?.password,
                                      confirm_password: val?.confirm_password,
                                    });
                                    setShowUpdateUserModal(true);
                                  }}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </a>
                                {auth.role === "manager" ? null : (
                                  <a
                                    href="#!"
                                    className="text-danger"
                                    onClick={() => {
                                      setEmailForModal(val?.email);
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Paginator /> */}
        </div>
      )}

      <DeleteUserModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        setEmailForModal={setEmailForModal}
        emailForModal={emailForModal}
      />
      <AddUserModal
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
      />
      <UpdateUserModal
        showUpdateUserModal={showUpdateUserModal}
        setShowUpdateUserModal={setShowUpdateUserModal}
        updateUser={updateUser}
        setUpdateUser={setUpdateUser}
      />
      <FilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
      />
    </div>
  );
};

export default TabWrapper;
