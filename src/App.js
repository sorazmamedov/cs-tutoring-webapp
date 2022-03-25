import React from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import MainContainer from "./components/common/mainContainer";
import Main from "./components/main";
import Home from "./components/home";
import Profile from "./components/Profile";
import Footer from "./components/footer";
import DataProvider from "./components/Context/dataContext";

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
                path="/settings"
                element={
                  <MainContainer>
                    <h3>Admin related settings</h3>
                  </MainContainer>
                }
              />
              <Route
                path="/login"
                element={
                  <MainContainer>
                    <Button className="btn roundBorder primaryBtn">
                      Sing In With Google
                    </Button>
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
