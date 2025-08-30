// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // We already handle loading globally in App.jsx, so no loader here
  if (loading) return null;  

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
