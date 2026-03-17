import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./context/GlobalContext";

const PublicRoute = ({ children }) => {
  const { user } = useGlobalContext();

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default PublicRoute;
