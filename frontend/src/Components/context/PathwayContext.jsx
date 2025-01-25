import React, { createContext, useState, useContext } from 'react';
import { Pathway } from '../models/Pathway.model';

// Create the context
const PathwayContext = createContext(null);

// Provider component
export const PathwayProvider = ({ children, initialPathway }) => {
  const pathwayDefault = initialPathway ? new Pathway(initialPathway) : null;
  const [pathway, setPathway] = useState(pathwayDefault);

  return (
    <PathwayContext.Provider value={{ pathway, setPathway }}>
      {children}
    </PathwayContext.Provider>
  );
};

// Custom hook for using the context
export const usePathway = () => {
  const context = useContext(PathwayContext);

  if (!context) {
    throw new Error('usePathway must be used within a PathwayProvider');
  }

  return context;
};

export default PathwayContext;