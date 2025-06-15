
import React from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "react-router-dom";

// TODO: Implement actual product posting, editing, images etc

const Admin: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <main className="py-8 px-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 text-lg">Product post functionality coming soon.</p>
    </main>
  );
};

export default Admin;
