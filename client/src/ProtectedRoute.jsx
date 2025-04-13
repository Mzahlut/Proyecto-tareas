import { useAuth } from "./Context/Auth.context"
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {

    const {user, isAuthenticated} = useAuth()

    if(!isAuthenticated) return <Navigate to= '/login' replace/>

  return <Outlet />
}
