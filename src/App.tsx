import * as ROUTES from "./constants/routes";

import { Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/Home";
import IsLoggedIn from "./helpers/isLoggedIn";
import Login from "./pages/login";
import Page404 from "./pages/404page";
import Profile from "./pages/profile";
import React from "react";
import Register from "./pages/register";
import RequiredAuth from "./helpers/RequiredAuth";
import UserPage from "./pages/page";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path={"/:userId"} element={<UserPage />} />

      <Route element={<IsLoggedIn pathToRedirect={ROUTES.ADMIN} />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ForgotPassword />} />
      </Route>

      <Route element={<RequiredAuth />}>
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
