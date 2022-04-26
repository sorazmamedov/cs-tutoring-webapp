import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Home from "./components/home";
import Profile from "./components/Profile";
import NotFound from "./components/notFound";
import RequireAuth from "./components/requireAuth";
import Settings from "./components/settings";
import useAuth from "./hooks/useAuth";
import useLogin from "./hooks/useLogin";
import { loadClientLib } from "./libs/google";
import { GlobalViewContext } from "./Context/dataContext";

function App() {
  const { darkTheme } = useContext(GlobalViewContext);
  const { ROLES } = useAuth();

  const { handleResponse } = useLogin();

  useEffect(() => {
    window.onGoogleLibraryLoad = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
        auto_select: "true",
      });
      window.google.accounts.id.prompt();
    };
    loadClientLib();
  });

  return (
    <div className={darkTheme ? "dark" : "light"}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
