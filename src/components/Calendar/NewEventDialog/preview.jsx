import React from "react";
import Row from "react-bootstrap/Row";
import { format } from "date-fns";

const Preview = ({ preview, repeat, range }) => {
  return (
    <>
      <Row className="mb-2">
        <p className="text-center fw-bolder">Preview:</p>
      </Row>
      {preview.length > 0 && (
        <Row>
          <p className="text-dark mb-0">Slots:</p>
          {preview.map((item, index) => (
            <p key={index} className="ms-5 text-dark">
              {`${++index}) ${item}`}
            </p>
          ))}
          {repeat && (
            <>
              <p className="text-dark mb-0">Repeat between:</p>
              <p className="ms-5 text-dark">
                {`${format(range.start, "M/d/yyyy")} -
                ${format(range.end, "M/d/yyyy")}`}
              </p>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default Preview;
