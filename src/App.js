import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/common/MainContainer";
import Main from "./components/Main";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import DataProvider from "./components/Context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
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
          <Footer />
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
