import Form from "../components/Form";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditVideosPage({ base_url }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchVideo() {
    try {
      const { data } = await axios.get(`${base_url}/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setVideo(data.result);
      setTitle(data.result.title);
      setDescription(data.result.description);
      setCategoryId(data.result.Category?.id || 0); // Initialize category
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchVideo();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", categoryId);

      if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }

      const { data } = await axios.put(`${base_url}/videos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/videos");
      Toastify({
        text: `Success edit video`,
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
      console.log(error);
      Toastify({
        text: error.response.data.message,
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-800">
      <section>
        <div className="px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Edit Course
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Course title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="categoryId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={0}>-- Select Category --</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description || ""}
                    name="description"
                    id="description"
                    placeholder="Course description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="videoUrl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Video
                  </label>
                  <input
                    onChange={(e) => setVideoUrl(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="videoUrl"
                    type="file"
                  />
                </div>
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Image Thumbnail
                  </label>
                  <input
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="imageUrl"
                    type="file"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-gray-800 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
