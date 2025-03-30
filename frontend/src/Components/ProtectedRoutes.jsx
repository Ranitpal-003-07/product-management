import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
