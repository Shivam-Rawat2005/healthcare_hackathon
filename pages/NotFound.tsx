
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-20 w-20 text-cyber-amber mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4 text-cyber-cyan">404</h1>
        <p className="text-xl text-cyber-text mb-8">
          The resource you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-black">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
