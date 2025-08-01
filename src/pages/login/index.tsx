import { routesPath } from "@/utils/route-path"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const { DASHBOARD } = routesPath

export default function Login() {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(DASHBOARD)
    }, [])
    return (
        <div>Login</div>
    )
}
