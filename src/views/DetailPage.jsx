import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import loadingAnimation from "../components/assets/Eclipse@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";

export default function DetailPage({ base_url }) {
  const navigate = useNavigate();
  const [video, setVideo] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function fetchVideo() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setVideo(data.result);
      setCategory(data.result.Category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const { data } = await axios.post(
        `${base_url}/save/${video.id}/${category.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      navigate("/save");
      Toastify({
        text: `Success saving video`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 3000,
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

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <div className="px-4 sm:ml-64">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <b className="text-4xl">Loading....</b>
            {/* <img src={loadingAnimation} /> */}
          </div>
        ) : (
          <>
            {/* <iframe
              className="w-full h-64 my-5 rounded-lg md:h-96"
              src="https://www.youtube.com/embed/L6Jwa7al8os"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe> */}
            <video
              className="w-full h-auto my-5 max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
              controls="true"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{video.title}</h1>

                <span className="text-white dark:text-gray-500">
                  {category.name}
                </span>
              </div>

              <div className="mr-3 mt-3">
                <button
                  onClick={handleSave}
                  type="submit"
                  className="w-full text-gray-900 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:focus:ring-gray-300"
                >
                  Save
                </button>
              </div>
            </div>

            <p className="mt-5 mb-10">{video.description}</p>
          </>
        )}
      </div>
    </>
  );
}
