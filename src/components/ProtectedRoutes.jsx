import { Outlet, Navigate } from "react-router-dom";
import { contextProvider } from "./ContextApi";
const ProtectedRoutes = () => {
  const { section } = contextProvider();
  if (!Array.isArray(section)) {
    return <Navigate to={"/login"} replace />;
  }

  localStorage.setItem("section", JSON.stringify(section[0]._id));
  return <Outlet />;
};

export default ProtectedRoutes;
