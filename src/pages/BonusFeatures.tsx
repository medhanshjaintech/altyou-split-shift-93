
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BonusFeatures = () => {
  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Bonus Features</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              Our bonus features section is currently under development. 
              Check back soon for exclusive tools and capabilities!
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/dashboard">
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusFeatures;
