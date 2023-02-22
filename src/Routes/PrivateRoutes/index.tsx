import { User } from "../../GlobaContext"
import { Navigate, Outlet } from "react-router-dom"
type props = {
    user: User | null,
}
export function PrivateRoutes({ user }: props) {
    return (
        user ? <Outlet/> : <Navigate to='profile'/>
      )
}