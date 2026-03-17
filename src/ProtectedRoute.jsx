import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
