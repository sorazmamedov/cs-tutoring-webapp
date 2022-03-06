import { useState } from "react";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = () => {
  const [active, setActive] = useState(1);
  const [disabled, setDisabled] = useState(0);
  const numbers = [0, 1, 2, 3, 4, 5, -1];
  const pages = numbers.map((number) => {
    if (number === 0 || number === -1) {
      return number === 0 ? (
        <Pagination.Prev key={number} disabled={number === disabled} />
      ) : (
        <Pagination.Next key={number} disabled={number === disabled} />
      );
    } else {
      return (
        <Pagination.Item
          key={number}
          active={number === active}
          disabled={number === disabled}
        >
          {number}
        </Pagination.Item>
      );
    }
  });
  const handlePagination = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const page = e.target.innerText;
    if ((page === "›" || page === "›\nNext")) {
      if (active < numbers[numbers.length - 2]) {
        setActive((prev) => prev + 1);
        console.log("active: " + active);
        active + 1 >= numbers[numbers.length - 2] ? setDisabled(-1) : setDisabled(-5)
      }
    } else if ((page === "‹" || page === "‹\nPrevious")) {
      if (active > 1) {
        setActive((prev) => prev - 1);
        active -1 > 1 ? setDisabled(-5) : setDisabled(0)
      }
    } else if (parseInt(page) >= 1 && parseInt(page) <= numbers[numbers.length - 2]) {
      setActive(parseInt(page));
      const selected = parseInt(page);
      if (selected === 1) {
        setDisabled(0)
      }
      else if (selected === numbers[numbers.length - 2]) {
        setDisabled(-1)
      } else { setDisabled(-5)}
    }
  };
  return (
    <Container className="d-flex justify-content-end p-0">
      <Pagination size="sm" className="m-0 p-0" onClick={handlePagination}>
        {pages}
      </Pagination>
    </Container>
  );
};

export default CustomPagination;
