import { useAuthListener } from '@/hooks/use-auth';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfileByUserId } from '@/Firebase/services/userDetails.servies';
import { getAllPathwaysOfUser, getSinglePathway, updatePathway } from '@/Firebase/services/pathway.service';
import { Pathway } from '../models/Pathway.model';

// Create the context
const GlobalContext = createContext(null);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { user, loading } = useAuthListener();

  const [pathwaysList, setPathwaysList] = useState([]);
  const [isPathwaysSetToRefresh, setPathwaysToRefresh] = useState(true);

  const [activePathwayId, setActivePathwayId] = useState(null);

  const [userDetails, setUserDetails] = useState({});
  const [isUserDetailsSetToRefresh, setUserDetailsToRefresh] = useState(true);

  // fetch user details of user / keep userDetails in sync
  useEffect(() => {
    if (user && isUserDetailsSetToRefresh) {
      try {
        const userId = user.uid;
        const getUserDetails = async () => {
          const userDetails = await getUserProfileByUserId(userId);
          if (userDetails) {
            setUserDetails(userDetails);
          }
        };
        getUserDetails();
        setUserDetailsToRefresh(false);
      } catch (error) {
        console.error('Error getting user details:', error);
      }
    }
  }, [user, loading, isUserDetailsSetToRefresh]);

  // fetch pathways of user / keep pathways in sync
  useEffect(() => {
    if (user && isPathwaysSetToRefresh) {
      try {
        const refreshPathways = async (userId) => {
          const pathways = await getAllPathwaysOfUser(userId);
          setPathwaysList(pathways.map((pathway) => new Pathway(pathway, userId)));
        };
        const userId = user.uid;
        refreshPathways(userId);
        setPathwaysToRefresh(false);
      } catch (error) {
        console.error('Error getting pathways:', error);
      }
    }
  }, [user, loading, isPathwaysSetToRefresh]);

  // keep activePathwayId in sync
  useEffect(() => {
    if (activePathwayId) {
      const changeActivePathway = async (activePathwayId) => {
        try {
          const pathway = await getSinglePathway(activePathwayId);
          if(pathway) {
            const updatedPathway = await updatePathway(activePathwayId, { isActive: true });
            setPathwaysToRefresh(true);
          }
        } catch (error) {
          console.error('Error changing active pathway:', error);
        }
      }

      const oldActivePathwayIndex = pathwaysList.findIndex((pathway) => pathway.isActive);
      const newActivePathwayIndex = pathwaysList.findIndex((pathway) => pathway.data.id === activePathwayId);
      
      if (oldActivePathwayIndex !== newActivePathwayIndex) {
        changeActivePathway(activePathwayId);
        setActivePathwayId(pathwaysList[newActivePathwayIndex].data.id);
      }
    } else {
      const oldActivePathwayIndex = pathwaysList.findIndex((pathway) => pathway.isActive);
      if(oldActivePathwayIndex !== -1) {
        setActivePathwayId(oldActivePathwayIndex);
      } else {
        setActivePathwayId(null);
      }
    }
  }, [activePathwayId]);

  return (
    <GlobalContext.Provider value={{
      pathwaysList,
      setPathwaysList,
      isPathwaysSetToRefresh,
      setPathwaysToRefresh,
      activePathwayId,
      setActivePathwayId,
      userDetails,
      setUserDetailsToRefresh,
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