import React from "react";
import styles from "./paginator.module.css";
const Paginator = () => {
  return (
    <div className={styles.paginator}>
      <div className={styles.left}>
        <button className={styles.prevButton}></button>
        <span>
          <button className={styles.active}>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </span>
        <button className={styles.nextButton}></button>
      </div>
      <div className={styles.right}>
        <label>
          Show
          <select
            name="insightManagementData_length"
            aria-controls="insightManagementData"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </label>
      </div>
    </div>
  );
};

export default Paginator;
