import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleLogin } from "react-google-login";
import { postAuth } from "../../apis/cs-tutoring/google";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { auth, setAuth } = useAuth();

  const handleResponse = async (response) => {
    const token = response.tokenId;
    // setAuth({ ...auth, token });

    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      },
    });
    const res = await axiosInstance.get("/auth/google");
    console.log(response, res);
  };

  return (
    <Row className="mb-5">
      <Col className="text-center mb-5">
        <GoogleLogin
          clientId="194487620046-42s15er9fv10ct1aghe1gu6hi3lm60ed.apps.googleusercontent.com"
          onSuccess={handleResponse}
          onFailure={handleResponse}
          cookiePolicy={"single_host_origin"}
          hostedDomain={"neiu.edu"}
          scope={"openid"}
          theme={"dark"}
          // isSignedIn={true}
          // responseType={"id_token"}
          // accessType={"offline"}
          // uxMode={"redirect"}
          // redirectUri={"http://localhost:5000/api/auth/google"}
        />
      </Col>
    </Row>
  );
};

export default Login;
