import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = () => {
  return (
    <Container className="d-flex justify-content-end p-0">
      <Pagination size="sm" className="m-0 p-0">
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};

export default CustomPagination;
