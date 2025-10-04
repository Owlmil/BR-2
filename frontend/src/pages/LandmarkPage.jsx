import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function LandmarkPage({ title, description, image, emoji }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md text-center border-4 border-indigo-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">
          {emoji} {title}
        </h1>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">{description}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
        >
          Back to Map
        </Link>
      </div>
    </div>
  );
}
