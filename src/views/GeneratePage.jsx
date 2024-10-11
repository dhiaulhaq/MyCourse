import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GeneratePage({ base_url }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState(0);
  const [level, setLevel] = useState(0);
  const [generate, setGenerate] = useState("");

  //   async function handleSubmit(e, topics, level) {
  //     e.preventDefault();
  //     try {
  //       const body = {
  //         topics,
  //         level,
  //       };

  //       const { data } = await axios.post(`${base_url}/videos/generate`, body, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.access_token}`,
  //         },
  //       });

  //       console.log(data.text);
  //       setGenerate(data.text);

  //       navigate(`/generate/${generate}`);
  //       Toastify({
  //         text: `Success adding Generate`,
  //         duration: 3000,
  //         destination: "https://github.com/apvarun/toastify-js",
  //         newWindow: true,
  //         close: true,
  //         gravity: "bottom",
  //         position: "right",
  //         stopOnFocus: true,
  //         style: {
  //           background: "#008000",
  //         },
  //       }).showToast();
  //     } catch (error) {
  //       console.log(error);

  //       //   Toastify({
  //       //     text: error.response.data.message,
  //       //     duration: 3000,
  //       //     destination: "https://github.com/apvarun/toastify-js",
  //       //     newWindow: true,
  //       //     close: true,
  //       //     gravity: "bottom",
  //       //     position: "right",
  //       //     stopOnFocus: true,
  //       //     style: {
  //       //       background: "#FF0000",
  //       //     },
  //       //   }).showToast();
  //     }
  //   }

  async function handleSubmit(e, topics, level) {
    e.preventDefault();
    try {
      const body = {
        topics,
        level,
      };

      // Send the request to generate the data
      const { data } = await axios.post(`${base_url}/videos/generate`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Assuming data.text contains the generate parameter you need for navigation
      console.log(data.text);

      // Navigate using the data.text value
      navigate("/generate-result", { state: { generate: data.text } });

      // Show success notification
      Toastify({
        text: `Success Generate`,
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

      // Optionally handle and display error messages
      Toastify({
        text: error.response?.data?.message || "Error occurred",
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
      <div className="p-4 sm:ml-64 dark:bg-gray-800">
        <section>
          <div className="px-6 py-8 mx-auto md:h-screen lg:py-0">
            <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Generate Course
            </p>
            <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => handleSubmit(e, topics, level)}
                >
                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Topics
                    </label>
                    <select
                      onChange={(e) => setTopics(e.target.value)}
                      value={topics}
                      id="topics"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>-- Select Topics --</option>
                      <option value={"Programming"}>Programming</option>
                      <option value={"Math"}>Math</option>
                      <option value={"Algebra"}>Algebra</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Level
                    </label>
                    <select
                      onChange={(e) => setLevel(e.target.value)}
                      value={level}
                      id="level"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>-- Select Level --</option>
                      <option value={"Beginner"}>Beginner</option>
                      <option value={"Medium"}>Medium</option>
                      <option value={"Expert"}>Expert</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-gray-800 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-300 dark:focus:ring-gray-800"
                  >
                    Submit
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
