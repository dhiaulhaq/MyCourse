import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../components/Card";
import loadingAnimation from "../components/assets/Eclipse@1x-1.0s-200px-200px.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/videos-slicer";

export default function HomePage({ base_url }) {
  // const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { videos, loading, error } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  async function fetchPages() {
    try {
      const { data } = await axios.get(
        `${base_url}/videos?limit=${limit}&page=${currentPage}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setTotalPages(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAsync());
    fetchPages();
  }, [search, currentPage]);

  return (
    <>
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
              onChange={(e) => setSearch(e.target.value)}
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
        {/* Loading and Card Grid */}
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={loadingAnimation} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Card */}
            {videos.map((video) => {
              return <Card base_url={base_url} video={video} key={video.id} />;
            })}
          </div>
        )}
        {/* Pagination */}
        <div className="mt-10 flow-root">
          <a
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1);
            }}
            className={`float-left font-semibold py-2 px-4 border rounded shadow-md text-slate-800 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white cursor-pointer hover:bg-slate-100"
            }`}
          >
            Previous
          </a>

          <a
            onClick={() => {
              if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
            }}
            className={`float-right font-semibold py-2 px-4 border rounded shadow-md text-slate-800 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white cursor-pointer hover:bg-slate-100"
            }`}
          >
            Next
          </a>

          <div className="flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;

              const maxPagesToShow = 5;
              const halfPages = Math.floor(maxPagesToShow / 2);
              let startPage = Math.max(currentPage - halfPages, 1);
              let endPage = Math.min(currentPage + halfPages, totalPages);

              if (currentPage <= halfPages) {
                endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
              } else if (currentPage >= totalPages - halfPages) {
                startPage = Math.max(endPage - maxPagesToShow + 1, 1);
              }

              if (pageNumber >= startPage && pageNumber <= endPage) {
                return (
                  <a
                    className={`${
                      pageNumber === currentPage
                        ? "bg-gray-800 font-semibold py-2 px-4 border rounded shadow-md text-white cursor-default disabled"
                        : "bg-white font-semibold py-2 px-4 border rounded shadow-md text-neutral-800 cursor-pointer hover:bg-slate-100"
                    }`}
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                );
              }
              return null;
            })}
          </div>
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