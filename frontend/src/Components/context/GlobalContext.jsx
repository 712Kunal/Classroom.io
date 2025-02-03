import React, { createContext, useState, useContext } from 'react';

// Create the context
const GlobalContext = createContext(null);

// Provider component
export const GlobalProvider = ({ children, initialData }) => {
  const [activePathwayId, setActivePathwayId] = useState(initialData?.activePathwayId || "");
  const [isAuth, setIsAuth] = useState(initialData?.auth || false);

  return (
    <GlobalContext.Provider value={{ 
      activePathwayId, 
      setActivePathwayId,
      isAuth,
      setIsAuth
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for using the context
export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within its provider');
  }

  return context;
};

export default GlobalContext;