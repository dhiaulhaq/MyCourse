import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

export default function BaseAdmin() {
  return (
    <>
      <SidebarAdmin />
      <Outlet />
    </>
  );
}
