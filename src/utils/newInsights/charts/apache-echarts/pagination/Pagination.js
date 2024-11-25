import React from "react";
import { Pagination as AntdPagination } from "antd";
import "./pagination.css";
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  //   const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    onPageChange(page);
  };
  return (
    <div className="chart-pagination">
      <AntdPagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={handlePageChange} />
    </div>
  );
};

export default Pagination;
