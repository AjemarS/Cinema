import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/dashboard/users");
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      {/* add History component */}
    </div>
  );
};

export default Dashboard;
