import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const FilterModal = ({ showFilterModal, setShowFilterModal }) => {
  const dispatch = useDispatch();
  var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [filterUser, setFilterUser] = React.useState({});
  const filterUserReducer = useSelector((state) => state.filterUserReducer);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      const { [name]: removed, ...newData } = filterUser;
      setFilterUser(newData);
    } else {
      setFilterUser({
        ...filterUser,
        [name]: value,
      });
    }
  };
  const handleClose = () => {
    setShowFilterModal(false);
    setFilterUser({});
    setStartDate();
    setEndDate();
  };
  const handleFilterUser = () => {
    dispatch(allActions.filterUserAction.filterUser(filterUser));
  };
  React.useEffect(() => {
    if (filterUserReducer.success) {
      handleClose();
    }
  }, [filterUserReducer.success]);
  return (
    <div
      className={
        showFilterModal
          ? "modal fade custom-modal show"
          : "modal fade custom-modal "
      }
      id="filterUserData"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteCategoryLabel">
              Filters
            </h5>
            <button
              type="button"
              className="btn-close close-filter-modal"
              onClick={() => {
                handleClose();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
                value={filterUser?.name}
              />
            </div>
            <div className="custom-select-box">
              <select
                className="select2-add-insights form-select"
                name="status"
                onChange={handleChange}
                value={filterUser?.status || ""}
              >
                <option selected disabled value="">
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setFilterUser({
                    ...filterUser,
                    start_date: date.toLocaleDateString("en-US", options),
                  });
                }}
                className="dateRangePicker"
                placeholderText="Start Date"
              />
            </div>
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setFilterUser({
                    ...filterUser,
                    end_date: date.toLocaleDateString("en-US", options),
                  });
                }}
                className="dateRangePicker"
                placeholderText="End Date"
              />
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-outline-primary close-filter-modal"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFilterUser}
            >
              {filterUserReducer?.loading ? (
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
                "Search"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
