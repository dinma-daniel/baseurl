import * as ROUTES from "../constants/routes";

import { Link } from "react-router-dom";
import React from "react";

export default function Page404() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-white animate-bounce">404</h1>
      <p className="mt-4 text-2xl text-gray-600 dark:text-gray-300">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to={ROUTES.Home}
        className="mt-6 rounded-md bg-primary-accent px-6 py-3 text-lg font-semibold text-white hover:bg-secondary-accent"
      >
        Go Back Home
      </Link>
      <div className="mt-10 flex items-center justify-center">
        <img
          src="https://via.placeholder.com/400"
          alt="Lost in Space"
          className="w-80 h-80 object-cover rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
