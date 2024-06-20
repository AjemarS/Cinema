import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";
import Loading from "../components/Loading";

const PrivateAdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const profile = await authService.getProfile();

        if (profile.user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateAdminRoute;
