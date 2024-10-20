import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useAuth } from "../context/authContext";

interface IsLoggedInProps {
  pathToRedirect: string;
}

export default function IsLoggedIn({ pathToRedirect }: IsLoggedInProps) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div className="loader" />;
  return currentUser ? <Navigate to={pathToRedirect} replace /> : <Outlet />;
}
