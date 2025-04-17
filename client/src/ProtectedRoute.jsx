import { useAuth } from "./Context/Auth.context"
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {

    const {loading, isAuthenticated} = useAuth()
    console.log(loading, isAuthenticated)

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated) return <Navigate to= '/login' replace/>

  return <Outlet />
}
