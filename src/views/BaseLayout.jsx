import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function BaseLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
