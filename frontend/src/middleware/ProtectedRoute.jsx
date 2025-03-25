import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ children }) => {
 const token = useSelector(state=>state.auth.token)
 const Loading = useSelector(state=>state.auth.loading)

 if(Loading) return null;

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
