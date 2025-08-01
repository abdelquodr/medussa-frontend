
// import { Dashboard, Settings } from "@/pages";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/app/dashboard";
import Settings from "../pages/app/settings";
import { routesPath } from "../utils/route-path";
import PageNotFound from "@/pages/404";
import { Login } from "@/pages";

const { LOGIN, DASHBOARD, SETTINGS } = routesPath;

export default function AppRoute() {
  return (
    <>
      <Routes>
          <Route path={LOGIN} element={<Login />} />
          <Route path={DASHBOARD} element={<Dashboard />} />
          <Route path={SETTINGS} element={<Settings />} />
          <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </>
  );
}
