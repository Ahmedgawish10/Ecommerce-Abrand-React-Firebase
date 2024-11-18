import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const PaginateExample = () => {
    const data = [
        {
            category: "Phones",
            title: "Electronics ",
            description: "Tech Innovator, Laptops Phones,Watches",
            link: "/categories?category=Phones"
        },
        {
            category: "Sports",
            title: "Sports ",
            description: "Active Lifestyle & Outdoor Adventures more",
            link: "/categories?category=Sports"
        },
        {
            category: "Fashion",
            title: "Fashion ",
            description: "Stylish & Trendy Clothing & Accessories",
            link: "/categories?category=Fashion"
        },
        {
            category: "Books",
            title: "Books ",
            description: "Explore New Worlds with Your Favorite Books",
            link: "/categories?category=Books"
        }
    ];
  const itemsPerPage = 1;

  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / 1);

  const handlePageClick = (event:any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="paginate-example">
      <h1>React Paginate Example</h1>
      <ul className="flex gap-4">
        {currentItems.map((item, index) => (
          <li key={index} className=" bg-gray-600 p-[20px]">{item.link}</li>
        ))}
      </ul>

      <ReactPaginate
      className="flex"
        previousLabel={"Previous"}
        nextLabel={"Next111"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active2"}
        previousLinkClassName={"prev"}
        nextLinkClassName={"next"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default PaginateExample;
