import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import DetailPage from "../views/DetailPage";
import SavePage from "../views/SavePage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import PublicPage from "../views/PublicPage";
import BaseAdmin from "../admin/views/BaseAdmin";
import VideosPage from "../admin/views/VideosPage";
import AddVideosPage from "../admin/views/AddVideosPage";
import EditVideosPage from "../admin/views/EditVideosPage";
import CategoriesPage from "../admin/views/CategoriesPage";
import GeneratePage from "../views/GeneratePage";
import GenerateResultPage from "../views/GenerateResultPage";

const base_url = "http://localhost:3000";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage base_url={base_url} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
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
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/home",
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage base_url={base_url} />,
      },
      {
        path: "/save",
        element: <SavePage base_url={base_url} />,
      },
      {
        path: "/generate",
        element: <GeneratePage base_url={base_url} />,
      },
      {
        path: "/generate-result",
        element: <GenerateResultPage base_url={base_url} />,
      },
    ],
  },
  {
    path: "/admin",
    element: <BaseAdmin />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
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
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "videos",
        element: <VideosPage base_url={base_url} />,
      },
      {
        path: "videos/add",
        element: <AddVideosPage base_url={base_url} />,
      },
      {
        path: "videos/edit/:id",
        element: <EditVideosPage base_url={base_url} />,
      },
      {
        path: "categories",
        element: <CategoriesPage base_url={base_url} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
  },
  {
    path: "/register",
    element: <RegisterPage base_url={base_url} />,
  },
]);

export default router;
