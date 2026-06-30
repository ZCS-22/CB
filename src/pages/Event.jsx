import React from "react";
import { Link } from "react-router-dom";

export default function Event() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Event Page</h1>

      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded"
      >
        Go to Home
      </Link>
    </div>
  );
}
