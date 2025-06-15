
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">Loading products...</p>
      </div>
    </div>
  );
};
