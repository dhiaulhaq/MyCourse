import { useEffect, useState } from "react";
import axios from "axios";

export default function Form({
  base_url,
  video,
  handleSubmit,
  nameProp,
  btnNameProp,
}) {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  const formData = new FormData();
  formData.append("videoUrl", videoUrl);
  formData.append("imageUrl", imageUrl);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setdescription(video.description);
      setimageUrl(video.imageUrl);
      setVideoUrl(video.videoUrl);
      setCategoryId(video.categoryId);
    }
  }, [video]);

  return (
    <>
      <div className="p-4 sm:ml-64 dark:bg-gray-800">
        <section>
          <div className="px-6 py-8 mx-auto md:h-screen lg:py-0">
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {nameProp}
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) =>
                    handleSubmit(
                      e,
                      title,
                      description,
                      imageUrl,
                      videoUrl,
                      categoryId
                    )
                  }
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Course title"
                      required=""
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
                      <option>-- Select Category --</option>
                      {categories?.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
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
                      onChange={(e) => setdescription(e.target.value)}
                      name="description"
                      id="description"
                      placeholder="Course description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="videoUrl"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Upload Video
                    </label>
                    <input
                      onChange={(e) => setVideoUrl(e.target.value[0])}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help"
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
                      onChange={(e) => setimageUrl(e.target.value[0])}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help"
                      id="imageUrl"
                      type="file"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-gray-800 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-800"
                  >
                    {btnNameProp}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
