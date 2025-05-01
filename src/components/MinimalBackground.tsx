
import React from 'react';

const MinimalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-[#222222] opacity-90"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#222222] to-[#1a1a1a]"></div>
      
      {/* Animated elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large blurred circle */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]"></div>
        
        {/* Second blurred circle */}
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]"></div>
        
        {/* Third blurred circle */}
        <div className="absolute top-[60%] left-[60%] w-[200px] h-[200px] rounded-full bg-pink-500/10 blur-[80px]"></div>
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTU5IDU5SDFWMWg1OHY1OHoiIGZpbGw9IiMxNDE0MTQiLz48L2c+PC9zdmc+')] opacity-[0.03]"></div>
      </div>
      
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
    </div>
  );
};

export default MinimalBackground;
