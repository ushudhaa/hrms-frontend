import { toast } from "react-toastify";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("You are not authorized to access this page",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return <Navigate to="/" replace />;
    }
  return children;
}

export default ProtectedRoute
