import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { redirect } from "react-router-dom";

const Dashboard: React.FC = () => {
  useEffect(() => {
    redirect("/admin/dashboard/users");
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      {/* add History component */}
    </div>
  );
};

export default Dashboard;
