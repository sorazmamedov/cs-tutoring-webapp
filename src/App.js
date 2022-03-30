import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Home from "./components/home";
import Profile from "./components/Profile";
import NotFound from "./components/notFound";
import RequireAuth from "./components/requireAuth";
import Settings from "./components/settings";
import useAuth from "./hooks/useAuth";

function App() {
  const { ROLES } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <div
        id="g_id_onload"
        data-client_id="194487620046-42s15er9fv10ct1aghe1gu6hi3lm60ed.apps.googleusercontent.com"
      />
    </>
  );
}

export default App;
