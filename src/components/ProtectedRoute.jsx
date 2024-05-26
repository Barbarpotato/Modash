import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth"

function ProtectedRoute({ children }) {
    const [authed, _dispatch] = useAuthContext()
    const location = useLocation()
    return authed.auth === true ?
        children
        :
        <Navigate to={'/login'} replace state={{ path: location.pathname }} />
}

export default ProtectedRoute