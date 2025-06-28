import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const WarrantyPolicy = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="link" 
      className="text-purple-100 hover:text-white p-0 h-auto text-sm underline"
      onClick={() => navigate("/warranty")}
    >
      <Shield className="w-4 h-4 mr-1" />
      Warranty Policy
    </Button>
  );
};