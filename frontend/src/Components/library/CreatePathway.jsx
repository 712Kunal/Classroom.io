import { Input } from "../ui/input2";
import { Label } from "../ui/label2";
import { useState } from "react";
import SelectIntervalType from "../originUi/select-interval-type";
import SelectResourceType from "../originUi/select-resource";
import InputIntervalCount from "../originUi/input-interval-count";
import { Separator } from "react-aria-components";
import { cn } from "@/lib/utils";
import Spline from '@splinetool/react-spline';
import {
  LoaderCircle,
  ShipWheel,
  Shapes,
  PenLine,
  SquareTerminal,
  Mailbox,
  Baseline,
  Route,
  CircleCheck,
} from "lucide-react";
import { SiGooglegemini } from "react-icons/si";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";

const intervalCountLimit = {
  day: 10,
  week: 12,
  month: 6
}

const CreatePathway = () => {
  const [formData, setFormData] = useState({
    topic: "",
    intervalType: "week",
    intervalCount: 0,
    preferedResourceType: ""
  })

  const [isGenerating, setGenerating] = useState(true);
  const [pathwayReady, setPathwayReady] = useState(false);

  return isGenerating ? (
    <PathwayLoader topic={formData.topic} intervalCount={formData.intervalCount} intervalType={formData.intervalType} isPathwayReady={pathwayReady} />
  ) : (
    <div className='w-full h-full py-4 px-4 flex gap-2'>
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-2xl">Generate Pathway on <span className="rounded-md border-2 px-2 transition-all">{formData.topic || "your topic"}</span> by filling below form</h1>
        <div className="form-container grid py-4">
          <form className="flex flex-col gap-4">
            <div className="topicFieldBox border-2 rounded-md p-4">
              <LabelInputContainer>
                <Label htmlFor="topicField">Whats your topic: </Label>
                <Input
                  id="topicField"
                  placeholder="Eg: Data Structures and Algorithms"
                  type="text"
                  value={formData.topic}
                  onChange={(ele) => {
                    setFormData({ ...formData, topic: ele.target.value })
                  }}
                />
              </LabelInputContainer>
            </div>
            <div className="intervalTypeFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="intervalTypeField">Whats your preferred interval type: </Label>
              <SelectIntervalType value={formData.intervalType} setValue={(value) => {
                setFormData({ ...formData, intervalType: value });
              }} />
            </div>
            <div className="intervalCountFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="intervalCountField">How many intervals of above duration do you want to learn this in: </Label>
              <InputIntervalCount
                value={formData.intervalCount}
                setValue={(value) => {
                  setFormData({ ...formData, intervalCount: value });
                }}
                max={intervalCountLimit[formData.intervalType]}
              />
            </div>
            <div className="resourceTypePreferenceFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="resourceTypePreferenceField">Whats your favorite learning material type: </Label>
              <SelectResourceType
                value={formData.preferedResourceType}
                setValue={(value) => {
                  setFormData({ ...formData, preferedResourceType: value });
                }}
              />
            </div>
            <div className="submitBtn">
              <button
                className="relative group/btn bg-primary w-full flex justify-center items-center gap-2 text-primary-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Generate a pathway for me <ShipWheel />
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block w-[1px] h-full bg-neutral-700" />
      <div className="hidden lg:grid right w-1/2 h-full rounded-lg overflow-hidden">
        {/* <Spline
          scene="https://prod.spline.design/iP9fwSaPUgyeNnzA/scene.splinecode"
        /> */}
      </div>
    </div>
  );
};

export default CreatePathway;

/* pathway form */
// topic (text)
// interval (week or day or month) (select)
// number of intervals / duration (limits on number of intervals based on duration size) (number)
// what you prefer most: [ reading material, video tutorials, interactive execises, all ] (select)

const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const iconSize = 12;
const loadingStages = [
  { id: 0, message: "Gathering your background data.", icon: <Shapes size={iconSize} /> },
  { id: 1, message: "Formulating a prompt based on your needs.", icon: <PenLine size={iconSize} /> },
  { id: 2, message: "Prompting Gemini for your pathway.", icon: <SquareTerminal size={iconSize} /> },
  { id: 3, message: "Gemini is thinking.", icon: <SiGooglegemini size={iconSize} /> },
  { id: 4, message: "Collecting response from Gemini.", icon: <Mailbox size={iconSize} /> },
  { id: 5, message: "Formatting the response.", icon: <Baseline size={iconSize} /> },
  { id: 6, message: "Generating a timeline for you.", icon: <Route size={iconSize} /> },
  { id: 7, message: "Your personalised pathway is ready.", icon: <CircleCheck size={iconSize} /> },
]

const PathwayLoader = ({ topic, intervalCount, intervalType, isPathwayReady }) => {
  const [currentDoneStages, setDoneStages] = useState([0, 1, 2, 3]);


  return (
    <div className="loaderWrapper flex justify-center items-center h-full w-full">
      <div className="bg flex justify-start h-full w-full p-8 items-center">
        <Card className="rounded-lg overflow-hidden h-fit">
          <CardHeader className="bg-neutral-950 p-4">
            <CardTitle>Somethings Cooking</CardTitle>
            <CardDescription>
              Generating a pathway on {topic} with {intervalCount} {intervalType + "s"}
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-neutral-900 p-4 flex flex-col gap-2">
            {loadingStages.map((stage, index) => {
              const isDone = currentDoneStages.includes(stage.id);
              const isFirst = stage === loadingStages[0];
              const isActive = (stage.id === currentDoneStages[currentDoneStages.length - 1]);
              return (
                <div key={index}>
                  {!isFirst && <div className={`mx-auto line w-[1px] h-4 ${isDone ? "bg-neutral-100" : "bg-neutral-600"}`}></div>}
                  <div className="stageRow flex gap-2 justify-start items-center text-sm">
                    <span className={`rounded-full aspect-square border-2 p-1 ${isActive ? "border-blue-500 text-blue-500" : isDone ? "text-neutral-50 border-neutral-50" : "text-neutral-50"}`}>{isActive ? <LoaderCircle className="animate-spin" size={iconSize}/> : stage.icon}</span>
                    <span className={isActive ? "text-blue-500" : ""}>{stage.message}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="bg-neutral-900 p-4">
            <Button className="w-full" disabled={!isPathwayReady}>
              {/* {icon} */}
              Explore your pathway
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};