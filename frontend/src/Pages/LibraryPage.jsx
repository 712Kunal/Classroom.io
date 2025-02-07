import { useGlobal } from "../components/context/GlobalContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { deletePathwayOfUser } from "@/Firebase/services/pathway.service";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LibraryPage() {
  const { pathwaysList, isLoading, refetchPathways } = useGlobal();
  const navigate = useNavigate();
  const [localPathways, setLocalPathways] = useState([]);

  // Update local pathways when global pathways change
  useEffect(() => {
    setLocalPathways(pathwaysList);
  }, [pathwaysList]);

  const handleNewPathwayOption = () => {
    navigate("/app/library/new");
  }

  const handlePathwayClick = (pathwayId) => {
    navigate(`/app/library/pathways/${pathwayId}/timeline`);
  }

  const handlePathwayDelete = async (pathwayId) => {
    try {
      // Optimistically remove the pathway from local state
      setLocalPathways((current) =>
        current.filter((pathway) => pathway.data.id !== pathwayId)
      );
  
      // Perform the actual deletion
      await deletePathwayOfUser(pathwayId);
  
      // Refresh pathways but let state update naturally
      refetchPathways();
    } catch (error) {
      console.error(error);
      // Revert local state if deletion fails
      setLocalPathways(pathwaysList);
    }
  };
  

  // Show full-screen loader for initial load
  if (isLoading) {
    return <Loader backdrop="aiChip" />;
  }

  return (
    <div className="p-4 w-full h-full flex flex-col rounded-lg">
      <div className="newButtonContainer p-8 absolute bottom-0 right-0">
        <Button
          type="button"
          className="w-12 h-12 p-0 rounded-full"
          variant="outline"
          size="icon"
          onClick={handleNewPathwayOption}
        >
          <Plus size={48} />
        </Button>
      </div>
      <h1 className="text-4xl">Your Pathways</h1>
      {(localPathways && localPathways.length > 0) ? (
        <motion.div
          className="content flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-8"
          layout // This helps maintain smooth transitions when grid items change
        >
          <AnimatePresence mode="popLayout">
            {localPathways.map((pathway) => (
              <motion.div
                key={pathway.data.id}
                layout // This helps with grid reorganization
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  layout: { duration: 0.3 }
                }}
              >
                <Card className={`flex flex-col justify-between max-w-xs max-h-96 ${pathway.data.isActive ? 'bg-neutral-700' : 'bg-neutral-700'} w-full p-2 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]`}>
                  <CardHeader>
                    <CardTitle>{pathway.data.topic}</CardTitle>
                    <CardDescription>{pathway.data.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-col justify-between gap-2">
                      {pathway.data.startDate && <p className="text-sm text-neutral-500">{pathway.data.startDate.toLocaleDateString()}</p>}
                      {pathway.data.endDate && <p className="text-sm text-neutral-500">{pathway.data.endDate.toLocaleDateString()}</p>}
                      <p className="text-sm text-neutral-300">Status: {pathway.data.isActive ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</p>
                      <p className="text-sm text-neutral-300">Duration: {pathway.data.duration} Days</p>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => handlePathwayClick(pathway.data.id)}>Explore</Button>
                    <Button variant="destructive" onClick={() => handlePathwayDelete(pathway.data.id)}>Delete</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex w-full items-center gap-2 p-2">
          <p className="text-neutral-500">No pathways found.</p>
          <Button variant="outline" onClick={handleNewPathwayOption}>Create a pathway</Button>
        </div>
      )}
    </div>
  );
}

export default LibraryPage;

export const Loader = ({ backdrop }) => {
  const [isBackdropLoaded, setBackedAsLoaded] = useState(false);

  const backdrops = {
    aiChip: "/assets/gif/ai-chip.gif",
    ascending: "/assets/gif/ascending.gif",
  }

  return (
    <div className="loaderWrapper relative flex justify-center items-center h-full w-full overflow-hidden">
      <div className="backdropContainer absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          className={`${isBackdropLoaded ? "block" : "hidden"} absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 min-w-[100%] min-h-[100%] object-cover`}
          src={backdrops[backdrop]}
          alt="loader background gif"
          onLoad={() => setBackedAsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-20"></div>
      </div>
      <div className="relative z-30 flex justify-start h-full w-full p-8 items-center">
        <Card className="rounded-lg overflow-hidden h-fit w-[500px]">
          <CardHeader className="bg-neutral-950 p-4">
            <CardTitle>Your Pathways are loading</CardTitle>
            <CardDescription>
              We are refetching your pathways from our database
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}