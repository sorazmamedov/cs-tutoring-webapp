import React from "react";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ page, pageCount, setPage }) => {
  if (!pageCount) {
    return "";
  }

  const handlePagination = (e) => {
    const targetId = e.target.id;
    if (targetId === "first") {
      setPage(1);
    } else if (targetId === "prev") {
      setPage(page - 1);
    } else if (targetId === "next") {
      setPage(page + 1);
    } else {
      setPage(pageCount);
    }
  };

  return (
    <Container className="d-flex justify-content-end p-0 mt-2">
      <Pagination size="sm" className="m-0 p-0">
        {pageCount > 2 && (
          <Pagination.First
            id="first"
            disabled={page === 1}
            onClick={handlePagination}
          />
        )}
        <Pagination.Item
          id="prev"
          disabled={page === 1}
          onClick={handlePagination}
        >
          Prev
        </Pagination.Item>
        <Pagination.Item
          id="next"
          disabled={page === pageCount}
          onClick={handlePagination}
        >
          Next
        </Pagination.Item>
        {pageCount > 2 && (
          <Pagination.Last
            id="last"
            disabled={page === pageCount}
            onClick={handlePagination}
          />
        )}
      </Pagination>
    </Container>
  );
};

export default CustomPagination;
