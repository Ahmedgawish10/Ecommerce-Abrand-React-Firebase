import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={onPageChange}
      containerClassName={"pagination flex"}
      activeClassName={"active2"}
      previousLinkClassName={"prev"}
      nextLinkClassName={"next"}
      disabledClassName={"disabled"}
      forcePage={currentPage} 
    />
  );
};

export default Pagination;
