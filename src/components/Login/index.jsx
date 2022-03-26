import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const handleResponse = (response) => console.log(response);

  return (
    <Row className="mb-5">
      <Col className="text-center">
        <GoogleLogin
          clientId="194487620046-42s15er9fv10ct1aghe1gu6hi3lm60ed.apps.googleusercontent.com"
          onSuccess={handleResponse}
          onFailure={handleResponse}
          cookiePolicy={"single_host_origin"}
          hostedDomain="neiu.edu"
          scope="profile"
          theme="dark"
          responseType="code"
          accessType="offline"
          uxMode="redirect"
          redirectUri="http://localhost:3000/profile"
        />
      </Col>
    </Row>
  );
};

export default Login;
