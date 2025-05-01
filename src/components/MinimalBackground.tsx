
import React from 'react';

const MinimalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Diagonal line top left */}
      <div className="absolute top-[15%] left-[5%] w-[20%] h-[1px] bg-white/10 rotate-45"></div>
      
      {/* Diagonal line bottom right */}
      <div className="absolute bottom-[15%] right-[5%] w-[20%] h-[1px] bg-white/10 rotate-45"></div>
      
      {/* Circle top right */}
      <div className="absolute top-[10%] right-[10%] w-[150px] h-[150px] rounded-full border border-white/5"></div>
      
      {/* Small dot bottom left */}
      <div className="absolute bottom-[20%] left-[10%] w-[4px] h-[4px] rounded-full bg-white/20"></div>
      
      {/* Grid pattern center-left */}
      <div className="absolute top-[40%] left-[5%] w-[200px] h-[200px] opacity-10">
        <div className="grid grid-cols-4 gap-2">
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="w-full h-[1px] bg-white/30"></div>
          ))}
        </div>
      </div>
      
      {/* Horizontal line center-right */}
      <div className="absolute top-[60%] right-[8%] w-[100px] h-[1px] bg-white/15"></div>
      
      {/* Small dot top left */}
      <div className="absolute top-[25%] left-[15%] w-[3px] h-[3px] rounded-full bg-white/15"></div>
      
      {/* Small dot top right */}
      <div className="absolute top-[30%] right-[25%] w-[2px] h-[2px] rounded-full bg-white/20"></div>
    </div>
  );
};

export default MinimalBackground;
