import React, { createContext, useState, useContext } from 'react';

// Create the context
const GlobalContext = createContext(null);

// Provider component
export const GlobalProvider = ({ children, initialData }) => {
  const [activePathwayId, setActivePathwayId] = useState(initialData?.activePathwayId || "");
  const [isAuth, setIsAuth] = useState(initialData?.auth || false);
  const [user, setUser] = useState(initialData?.user || null);
  const [pathwaysList, setPathwaysList] = useState(initialData?.pathwaysList || []);

  return (
    <GlobalContext.Provider value={{ 
      activePathwayId,
      setActivePathwayId,
      isAuth,
      setIsAuth,
      user,
      setUser,
      pathwaysList,
      setPathwaysList,
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