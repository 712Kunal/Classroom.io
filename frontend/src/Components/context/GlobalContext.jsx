import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const GlobalContext = createContext(null);

// Provider component
export const GlobalProvider = ({ children, initialData }) => {
  const [activePathwayId, setActivePathwayId] = useState(initialData?.activePathwayId || "");
  const [isAuth, setIsAuth] = useState(initialData?.auth || false);
  const [user, setUser] = useState(null);
  const [pathwaysList, setPathwaysList] = useState(initialData?.pathwaysList || []);

  useEffect(() => {
    if(initialData && initialData.user) {
      setUser(initialData.user)
    }
  }, [initialData]);

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