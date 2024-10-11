import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function Card({ video }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/detail/${video.id}`);
  }

  return (
    <>
      <Link onClick={handleClick}>
        <div className="max-w-xs bg-sky-600 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Thumbnail */}
          <div className="relative bg-gray-100">
            <img
              className="w-full object-cover h-full max-h-40"
              src={video.imageUrl} // Replace with actual image
              alt="thumbnail"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm mb-1 truncate ...">
              {video.title}
            </h3>
            <div className="text-white dark:text-gray-400 text-xs mb-2">
              {video.Category.name}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
