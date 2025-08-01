
import { lazy } from "react"

const Dashboard = lazy(() => import("@/pages/app/dashboard"))
const Users = lazy(() => import("@/pages/app/users"))
const Settings = lazy(() => import("@/pages/app/settings"))
const Login = lazy(() => import("@/pages/login"))


export {
    Dashboard,
    Users,
    Settings,
    Login
}
