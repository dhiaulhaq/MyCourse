import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo-only-white.png";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../components/Card";

export default function PublicPage({ base_url }) {
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
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-neutral-100 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-sky-600 dark:bg-gray-800">
          <Link to={"/"} className="flex items-center ps-10 mb-5">
            <img src={logo} className="h-6 me-1 sm:h-7" alt="Mycourse Logo" />
            <span className="self-center text-xl text-neutral-100 font-semibold whitespace-nowrap dark:text-white">
              MyCourse
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                className="flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-neutral-100 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/save"}
                className="flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-neutral-100 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Saved Course
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-neutral-100 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Generate Course
                </span>
              </a>
            </li>
            <li>
              <Link
                to={"/login"}
                className="flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-neutral-100 transition duration-75 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </Link>
            </li>
            {/* <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            </ul> */}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div>
          <div className="sliderAx h-auto">
            <div id="slider-1" className="container mx-auto">
              <div
                className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}
              >
                <div className="md:w-1/2">
                  <p className="font-bold text-sm uppercase">Services</p>
                  <p className="text-3xl font-bold">Generate Course</p>
                  <p className="text-2xl mb-10 leading-none">
                    Make your own Personalized Course
                  </p>
                  <a
                    href="#"
                    className="border bg-sky-600 dark:bg-gray-800 py-4 px-8 text-neutral-50 font-bold uppercase rounded hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-gray-800"
                  >
                    Try Now
                  </a>
                </div>
              </div>{" "}
              {/* container */}
              <br />
            </div>
            <div id="slider-2" className="container mx-auto">
              <div
                className="bg-cover bg-top h-auto text-white py-24 px-10 object-fill rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}
              >
                <p className="font-bold text-sm uppercase">Services</p>
                <p className="text-3xl font-bold">Exclusive Course</p>
                <p className="text-2xl mb-10 leading-none">
                  Learn from our Exclusive Tutorial
                </p>
                <a
                  href="#"
                  className="border bg-sky-600 dark:bg-gray-800 py-4 px-8 text-neutral-50 font-bold uppercase rounded hover:bg-neutral-50 hover:text-sky-600 dark:hover:text-gray-800"
                >
                  Explore
                </a>
              </div>{" "}
              {/* container */}
              <br />
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-center mb-4">
          Something
        </div> */}
        <div className="grid grid-cols-2 mb-4">
          <h1 className="text-2xl font-bold pt-2">Most Recent Courses</h1>
          <div className="pt-2 relative ml-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search recent course..."
            />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Card */}
          {videos.map((video) => {
            return <Card base_url={base_url} video={video} key={video.id} />;
          })}
        </div>
        {/* <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-sky-600 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-neutral-100">
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center rounded bg-sky-600 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-neutral-100">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}
