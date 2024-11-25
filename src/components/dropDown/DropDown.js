import React from "react";

const DropDown = ({
  setAddHeadingModal,
  setShowTakeawayModal,
  setShowAddChartModal,
  setCurrentSlideId,
  slideId,
  role,
  value,
}) => {
  return (
    <ul
      className="dropdown-menu show"
      onClick={() => {
        setCurrentSlideId(slideId);
      }}
    >
      {!value?.SlideNames?.length > 0 ? (
        <li>
          <a
            className="dropdown-item"
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setAddHeadingModal(true);
            }}
          >
            Add Heading
          </a>
        </li>
      ) : null}
      {/* {!value?.Takeaways?.length > 0 ? (
        <li>
          <a
            className="dropdown-item"
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setShowTakeawayModal(true);
            }}
          >
            Add Takeaway
          </a>
        </li>
      ) : null} */}

      {role === "users" ? (
        <li>
          <a
            className="dropdown-item"
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setShowAddChartModal(true);
            }}
          >
            Add Chart
          </a>
        </li>
      ) : null}
    </ul>
  );
};

export default DropDown;
