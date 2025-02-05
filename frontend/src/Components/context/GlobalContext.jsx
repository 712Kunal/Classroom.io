import { useAuthListener } from '@/hooks/use-auth';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const GlobalContext = createContext(null);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [activePathwayId, setActivePathwayId] = useState("");
  const { user, loading } = useAuthListener();
  const [pathwaysList, setPathwaysList] = useState([]);

  return (
    <GlobalContext.Provider value={{ 
      activePathwayId,
      setActivePathwayId,
      user,
      loading,
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