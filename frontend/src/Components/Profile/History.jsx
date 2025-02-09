import { useGlobal } from "@/components/context/GlobalContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Taskprogress from "./Taskprogress";

export function Mycoursestaks() {
  const { pathwaysList, isLoading } = useGlobal();
  const navigate = useNavigate();
  const [localPathways, setLocalPathways] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState(null); 

  useEffect(() => {
    setLocalPathways(pathwaysList);
  }, [pathwaysList]);

  const handlePathwayClick = (pathwayId) => {
    navigate(`/app/library/pathways/${pathwayId}/timeline`);
  };

  const handleProgressClick = (pathway) => {
    setSelectedPathway(pathway); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedPathway(null); 
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  const activePathways = localPathways.filter((pathway) => pathway.data.isActive);

  return (
    <div className="rounded-lg shadow-lg shadow-gray-700">
      <div className="p-4 w-full h-full flex flex-col rounded-lg">
        <h1 className="text-center justify-center md:text-xl text-xs sm:text-sm">
          Your Active Pathways
        </h1>

        {activePathways.length > 0 ? (
          <motion.div
            className="content flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 grid-flow-row gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {activePathways.map((pathway) => (
                <motion.div
                  key={pathway.data.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    layout: { duration: 0.3 },
                  }}
                >
                  <Card
                    className={`flex flex-col justify-between max-w-xs max-h-96 bg-neutral-700 w-full p-2 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]`}
                  >
                    <CardHeader>
                      <CardTitle>{pathway.data.topic}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-col justify-between gap-2">
                        {pathway.data.startDate && (
                          <p className="text-sm text-neutral-500">
                            Start Date: {pathway.data.startDate.toLocaleDateString()}
                          </p>
                        )}
                        {pathway.data.endDate && (
                          <p className="text-sm text-neutral-500">
                            End Date: {pathway.data.endDate.toLocaleDateString()}
                          </p>
                        )}
                        <p className="text-sm text-neutral-300">
                          Status: <span className="text-green-500">Active</span>
                        </p>
                        <p className="text-sm text-neutral-300">
                          Duration: {pathway.data.duration} Days
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePathwayClick(pathway.data.id)}
                      >
                        Explore
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleProgressClick(pathway)} 
                      >
                        Progress
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex w-full items-center gap-2 p-2">
            <p className="text-neutral-500 text-xs sm:text-sm ">
              No active pathways found.
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal} 
        >
          <div
            className="bg-gray-900 rounded-lg p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <Taskprogress pathway={selectedPathway} />
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function History() {
  return (
    <div className="flex flex-col justify min-h-screen">
      <Mycoursestaks />
    </div>
  );
}
