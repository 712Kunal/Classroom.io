import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuthListener } from '@/hooks/use-auth.jsx';
import { getUserProfileByUserId } from '@/Firebase/services/userDetails.servies';
import { getAllPathwaysOfUser } from '@/Firebase/services/pathway.service';
import { Pathway } from '../models/Pathway.model';

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuthListener();
  
  const [userDetails, setUserDetails] = useState(null);
  const [pathwaysList, setPathwaysList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  const fetchUserDetails = useCallback(async () => {
    if (!user?.uid) return;
    
    try {
      setIsLoading(true);
      const data = await getUserProfileByUserId(user.uid);
      setUserDetails(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  // Fetch pathways
  const fetchPathways = useCallback(async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      const data = await getAllPathwaysOfUser(user.uid);
      setPathwaysList(data.map((pathway) => new Pathway(pathway, null)));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  // Perform fetch when user changes
  useEffect(() => {
    if (!user?.uid) return;

    fetchUserDetails();
    fetchPathways();
  }, [user?.uid, fetchUserDetails, fetchPathways]);

  const refetchUserDetails = () => fetchUserDetails();
  const refetchPathways = () => fetchPathways();

  const [activePathwayId, setActivePathwayId] = useState(null);
  useEffect(() => {
    const currentActivePathwayIndex = pathwaysList.findIndex((pathway) => pathway.data.isActive);
    if (currentActivePathwayIndex === -1) {
      setActivePathwayId(null);
    } else {
      setActivePathwayId(pathwaysList[currentActivePathwayIndex].data.id);
    }
  }, [pathwaysList]);

  const contextValue = {
    userDetails,
    pathwaysList,
    isLoading: authLoading || isLoading,
    error,
    refetchUserDetails,
    refetchPathways,
    activePathwayId,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within its provider');
  }
  return context;
};

export default GlobalContext;