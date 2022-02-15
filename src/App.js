import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/common/MainContainer";
import Main from "./components/Main";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import CustomModal from "./components/common/CustomModal";
import ModalDialog from "./components/common/ModalDialog";

function App() {
  const [show, setShow] = useState(false);
  const [body, setBody] = useState(() => ModalDialog);

  const handleClose = () => setShow(false);

  const navURL = {
    Home: "/",
    Semesters: "/semesters",
    Profile: "/profile",
    Logout: "/logout",
    Login: "/login",
  };
  return (
    <div className="App">
      <Router>
        <Header navs={navURL} />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/semesters"
              element={
                <MainContainer>
                  <h3>Semesters Page</h3>
                </MainContainer>
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/logout"
              element={
                <MainContainer>
                  <h3>Logout Page</h3>
                </MainContainer>
              }
            />
            <Route
              path="/login"
              element={
                <MainContainer>
                  <h3>Login Page</h3>
                </MainContainer>
              }
            />
            <Route
              path="*"
              element={
                <MainContainer>
                  <h2>There is no route like this...</h2>
                </MainContainer>
              }
            />
          </Routes>
        </Main>
        <Footer navs={navURL} />
      </Router>
      <CustomModal show={show} handleClose={handleClose} />
    </div>
  );
}

export default App;
