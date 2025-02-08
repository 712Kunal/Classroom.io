import React from 'react';
import '@/App.css';

const Loader1 = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="loader w-9 h-9 relative animate-[l7-1_1.5s_infinite_0.5s],animate-[l7-2_1.5s_infinite_0.5s]"></div>
    </div>
  );
};

export default Loader1;
