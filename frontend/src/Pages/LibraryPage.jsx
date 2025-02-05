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

function LibraryPage() {
  const { pathwaysList } = useGlobal();
  const { navigate } = useNavigate();

  const handleNewPathwayOption = () => {
    navigate(`/app/library/pathways/new`);
  }

  const handlePathwayClick = (pathwayId) => {
    navigate(`/app/library/pathways/${pathwayId}/timeline`);
  }

  const handlePathwayDelete = (pathwayId) => {
    console.log('handlePathwayDelete', pathwayId);
  }

  return (
    <div className="p-4 w-full h-full flex flex-col justify-center rounded-lg">
      
      <h1 className="text-4xl">Your Pathways</h1>
      <div className="content flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-8">
        {pathwaysList.map((pathway, index) => {
          return (
            <Card key={index} className={`flex flex-col justify-between ${pathway.data.isActive ? 'bg-neutral-700' : 'bg-neutral-700'} w-full p-2 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]`}>
              <CardHeader>
                <CardTitle>{pathway.data.topic}</CardTitle>
                <CardDescription>{pathway.data.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col justify-between gap-2">
                  {pathway.data.startDate && <p className="text-sm text-neutral-500">{pathway.data.startDate}</p>}
                  {pathway.data.endDate && <p className="text-sm text-neutral-500">{pathway.data.endDate}</p>}
                  <p className="text-sm text-neutral-300">Status: {pathway.data.isActive ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}</p>
                  <p className="text-sm text-neutral-300">Duration: {pathway.data.duration} Days</p>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handlePathwayClick}>Explore</Button>
                <Button variant="destructive" onClick={handlePathwayDelete}>Delete</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}

export default LibraryPage;
