import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InfoDialog = ({ message, reset }) => {
  return (
    <>
      <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
        <p className="fs-5 text-center text-dark">{message}</p>
      </Row>
      <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
        <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4 mx-auto">
          <Button className="col-12 roundBorder primaryBtn" onClick={reset}>
            CLOSE
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InfoDialog;
