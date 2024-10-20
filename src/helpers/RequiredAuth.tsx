import * as ROUTES from "../constants/routes";

import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useAuth } from "../context/authContext";

export default function RequiredAuth() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div className="loader" />;

  return currentUser ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}
