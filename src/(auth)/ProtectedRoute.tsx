import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, subscribeToAuthChanges } from "../config/Firebase";

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firbaseUser: any) => {
      setUser(firbaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children (the route component)
};

export default ProtectedRoute;
