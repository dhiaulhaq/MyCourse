import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../components/assets/logo-only-white.png";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../../components/Card";

export default function VideosPage({ base_url }) {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  async function fetchVideos() {
    try {
      const { data } = await axios.get(`${base_url}/public`);

      setVideos(data.result);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:ml-64">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Course List
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              culpa tenetur voluptate laborum delectus doloribus at aperiam.
              Laborum, tempora animi corporis hic incidunt, pariatur quasi
              cupiditate amet sit atque dolorum?
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Video Url
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => {
              async function handleDelete() {
                try {
                  const { data } = await axios.delete(
                    `${base_url}/videos/${video.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                      },
                    }
                  );

                  console.log(data);

                  fetchVideos();
                  Toastify({
                    text: `Success delete video`,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#008000",
                    },
                  }).showToast();
                } catch (error) {
                  Toastify({
                    text: error.response.data.error,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#FF0000",
                    },
                  }).showToast();
                }
              }
              return (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {video.title}
                    </th>
                    <td className="py-4">
                      <Link to={video.videoUrl}>{video.videoUrl}</Link>
                    </td>
                    <td className="px-6 py-4">{video.Category.name}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/videos/edit/${video.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        onClick={handleDelete}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
