import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ResumePathwayModal = ({ children }) => {
  const navigate = useNavigate();
  const { pathwayId } = useParams();
  const { pathwaysList, refetchPathways, activePathwayId } = useGlobal();
  const pathway = pathwaysList.find((pathway) => pathway.data.id === pathwayId);

  const handleResumePathway = async () => {
    try {
      if (activePathwayId === pathway.data.id) {
        return;
      }

      pathway.resumePathway();
      await refetchPathways();
      navigate(`/app/library/pathways/${pathway.data.id}/timeline`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to resume this pathway?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            - You can again pause or stop the pathway at any time.<br/> 
            - Once you resume the pathway, it will be considered active and your stats will be affected accordingly.<br/>
            - If you want to pause the pathway, you can do so from the pathway timeline.<br/>
            - If you want to restart the pathway, you can do so from the pathway timeline aswell but be aware restarting unlike resume it will overrite your task completion history.<br/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="content">
          <Card className={`flex flex-col justify-between w-full max-h-96 p-2 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]`}>
            <CardHeader>
              <CardTitle>{pathway.data.topic}</CardTitle>
              <CardDescription>{pathway.data.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col justify-between gap-2">
                <p className="text-sm text-neutral-300">Status: {pathway.data.isActive ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</p>
                <p className="text-sm text-neutral-300">Duration: {pathway.data.duration} Days</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleResumePathway}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default ResumePathwayModal