import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GoogleLogin } from "react-google-login";
import { postAuth } from "../../apis/cs-tutoring/google";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [errors, setErrors] = useState({});
  AddLibrary("https://accounts.google.com/gsi/client");

  const handleResponse = async (response) => {
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
    console.log(response);
    const regex = /^\w+@neiu.edu$/;
    const email = response?.profileObj?.email;
    const match = regex.test(email);
    console.log(email, match);
    if (!response.error && match) {
      const token = response.tokenId;
      setAuth({ ...auth, token });

      const axiosInstance = axios.create({
        baseURL: "http://localhost:4000/api",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const res = await axiosInstance.get("/auth/google");
      setAuth((prev) => ({ ...prev, user: res.data }));
      console.log(response, res);
    } else {
      setErrors({ error: "Please sign in with NEIU email only!" });
      console.log("sign in with neiu.edu email is required!", email, match);
    }
  };

  useEffect(() => {});

  return (
    <>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      <Row className="mb-5 justify-content-center">
        <Col xs="6" className="mb-5">
          {/* <GoogleLogin
            clientId="194487620046-42s15er9fv10ct1aghe1gu6hi3lm60ed.apps.googleusercontent.com"
            onSuccess={handleResponse}
            onFailure={handleResponse}
            cookiePolicy={"single_host_origin"}
            data-theme={"filled_black"}
            // hostedDomain={"neiu.edu"}
            // scope={"openid"}
            theme={"dark"}
            // prompt={"consent"}
            // isSignedIn={true}
            // responseType={"id_token"}
          /> */}

          {/* <div
            className="d-flex justify-content-center"
            id="g_id_onload"
            data-client_id="194487620046-42s15er9fv10ct1aghe1gu6hi3lm60ed.apps.googleusercontent.com"
          >
            <span
              className="g_id_signin"
              data-theme="filled_blue"
              data-shape="pill"
            />
          </div> */}
          <div
            className="g_id_signin d-flex justify-content-center"
            data-type="standard"
            data-size="large"
            data-theme="filled_blue"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          ></div>
        </Col>
      </Row>
    </>
  );
};

export default Login;

export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}
