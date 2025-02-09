import { Input } from '../ui/input2';
import { Label } from '../ui/label2';
import { useState, useEffect } from 'react';
import SelectIntervalType from '../originUi/select-interval-type';
import SelectResourceType from '../originUi/select-resource';
import InputDurationInDays from '../originUi/input-duration-in-days';
import { Separator } from 'react-aria-components';
import { cn } from '@/lib/utils';
import { createPathway as createPathwayFunc } from '@/gemini/pathway.utils.js';
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
  Compass
} from 'lucide-react';
import { SiGooglegemini } from 'react-icons/si';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useAuthListener } from '@/hooks/use-auth';
import { getUserProfileByUserId } from '@/Firebase/services/userDetails.servies';
import { Timestamp } from 'firebase/firestore';
import { awardBadge, checkIfBadgeIsPresent } from '@/Firebase/services/badge.service';

const calculateAge = (dob) => {
  if (dob instanceof Timestamp) {
    dob = dob.toDate();
  }
  const dobDate = new Date(dob);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = now - dobDate;

  // Convert the difference to years
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const durationLimit = {
  day: 10,
  week: 100,
  month: 365
};

const minimumLimits = {
  day: 1,
  week: 7,
  month: 30
}

const CreatePathway = () => {
  const [formData, setFormData] = useState({
    topic: '',
    intervalType: 'week',
    duration: 0,
    preferedResourceType: ''
  });

  const [isGenerating, setGenerating] = useState(false);
  const [pathwayReady, setPathwayReady] = useState(false);
  const [createdPathwayId, setCreatedPathwayId] = useState(null);
  const { refetchPathways } = useGlobal();
  const { user } = useAuthListener();

  const awardBelieverBadge = async (userId) => {
    const badgeType = "first_pathway";
    const isBatchAlreadyAwarded = await checkIfBadgeIsPresent(userId, badgeType);
    console.log("Is batch already awarded:", isBatchAlreadyAwarded);
    if (!isBatchAlreadyAwarded) {
      console.log("Badge award called");
      await awardBadge(userId, badgeType);
      console.log("Badge awarded successfully");
    }
  }

  const handleCreatePathway = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setPathwayReady(false);

    const details = await getUserProfileByUserId(user.uid);
    const age = calculateAge(details.personalInfo.dob);

    const userId = user.uid;
    const userDetails = {
      age: age,
      gender: details.personalInfo.gender,
      fieldOfStudy: details.background.study,
      degree: details.background.degree,
      yearsOfExperience: details.background.experience,
      location: details.personalInfo.location,
      occupation: details.background.occupation,
      languagesKnown: details.background.languagesKnown.map((obj) => obj.text).join(', ') || 'none'
    };

    const additionalInfo = {
      skills: details.background.skills.map((obj) => obj.text).join(', ') || 'none',
      hobbies: details.background.hobbies.map((obj) => obj.text).join(', ') || 'none',
      interests: details.background.interest.map((obj) => obj.text).join(', ') || 'none'
    };

    const pathwayRequirements = {
      topic: formData.topic,
      duration: formData.duration,
      intervalsType: formData.intervalType,
      preferredLearningMaterialType: formData.preferedResourceType
    };

    console.log(userDetails);

    try {
      const { pathwayId } = await createPathwayFunc(
        userId,
        userDetails,
        additionalInfo,
        pathwayRequirements
      );
      setCreatedPathwayId(pathwayId);

      await refetchPathways();

      await awardBelieverBadge(userId);

      setPathwayReady(true);
    } catch (error) {
      console.error(error);
      setGenerating(false);
    }
  };

  return isGenerating ? (
    <PathwayLoader
      topic={formData.topic}
      duration={formData.duration}
      intervalType={formData.intervalType}
      isPathwayReady={pathwayReady}
      createdPathwayId={createdPathwayId}
    />
  ) : (
    <div className="w-full h-full py-4 px-4 flex gap-2">
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="text-2xl">
          Generate Pathway on{' '}
          <span className="rounded-md border-2 px-2 transition-all">
            {formData.topic || 'your topic'}
          </span>{' '}
          by filling below form
        </h1>
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
                    setFormData({ ...formData, topic: ele.target.value });
                  }}
                />
              </LabelInputContainer>
            </div>
            <div className="intervalTypeFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="intervalTypeField">Whats your preferred interval type: </Label>
              <SelectIntervalType
                value={formData.intervalType}
                setValue={(value) => {
                  setFormData({ ...formData, intervalType: value });
                }}
              />
            </div>
            <div className="durationFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="durationField">How many days do you plan to learn this in: </Label>
              <InputDurationInDays
                value={formData.duration}
                setValue={(value) => {
                  setFormData({ ...formData, duration: value });
                }}
                max={durationLimit[formData.intervalType]}
                min={minimumLimits[formData.intervalType]}
                defaultV={minimumLimits[formData.intervalType]}
              />
            </div>
            <div className="resourceTypePreferenceFieldBox border-2 rounded-md p-4 flex flex-col gap-4">
              <Label htmlFor="resourceTypePreferenceField">
                Whats your favorite learning material type:{' '}
              </Label>
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
                onClick={handleCreatePathway}>
                Generate a pathway for me <ShipWheel />
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block w-[1px] h-full bg-neutral-700" />
      <div className="hidden lg:grid right w-1/2 h-full rounded-lg overflow-hidden object-cover bg-black">
        <img
          src="/assets/gif/ascending.gif"
          alt="an image to fill the right side space"
          className="object-cover w-full h-full -translate-y-36"
        />
      </div>
    </div>
  );
};

export default CreatePathway;

/* pathway form */
// topic (text)
// interval (week or day or month) (select)
// duration (limits on number of days) (number)
// what you prefer most: [ reading material, video tutorials, interactive execises, all ] (select)

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
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
  { id: 0, message: 'Gathering your background data.', icon: <Shapes size={iconSize} /> },
  {
    id: 1,
    message: 'Formulating a prompt based on your needs.',
    icon: <PenLine size={iconSize} />
  },
  {
    id: 2,
    message: 'Prompting Gemini for your pathway.',
    icon: <SquareTerminal size={iconSize} />
  },
  { id: 3, message: 'Gemini is thinking.', icon: <SiGooglegemini size={iconSize} /> },
  { id: 4, message: 'Collecting response from Gemini.', icon: <Mailbox size={iconSize} /> },
  { id: 5, message: 'Formatting the response.', icon: <Baseline size={iconSize} /> },
  { id: 6, message: 'Generating a timeline for you.', icon: <Route size={iconSize} /> },
  { id: 7, message: 'Your personalised pathway is ready.', icon: <CircleCheck size={iconSize} /> }
];

const PathwayLoader = ({
  topic,
  intervalCount,
  intervalType,
  isPathwayReady,
  createdPathwayId
}) => {
  const [currentDoneStages, setDoneStages] = useState([]);
  const [isBackdropLoaded, setBackedAsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalRef;
    const incrementDoneStages = () => {
      setDoneStages((prev) => {
        const newDoneStages = [...prev];
        const next = prev.length + 1;
        if (next > 7) {
          clearInterval(intervalRef);
          return prev;
        }
        newDoneStages.push(next);
        return newDoneStages;
      });
    };

    intervalRef = setInterval(incrementDoneStages, 3000);

    return () => {
      if (intervalRef) {
        clearInterval(intervalRef);
      }
    };
  }, []);

  const handleNewPathwayCreated = async () => {
    navigate(`/app/library/pathways/${createdPathwayId}/timeline`);
  };

  return (
    <div className="loaderWrapper relative flex justify-center items-center h-full w-full overflow-hidden">
      <div className="backdropContainer absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          className={`${
            isBackdropLoaded ? 'block' : 'hidden'
          } absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 min-w-[100%] min-h-[100%] object-cover`}
          src="/assets/gif/ai-chip.gif"
          alt="loader background gif"
          onLoad={() => setBackedAsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-20"></div>
      </div>
      <div className="relative z-30 flex justify-start h-full w-full p-8 items-center">
        <Card className="rounded-lg overflow-hidden h-fit w-[500px]">
          <CardHeader className="bg-neutral-950 p-4">
            <CardTitle>Somethings Cooking</CardTitle>
            <CardDescription>
              Generating a pathway on {topic} with {intervalCount} {intervalType + 's'}
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-neutral-900 p-4 flex flex-col gap-2">
            {loadingStages.map((stage, index) => {
              const isDone = currentDoneStages.includes(stage.id);
              const isFirst = stage === loadingStages[0];
              const isActive =
                stage.id === currentDoneStages[currentDoneStages.length - 1] &&
                stage.id !== loadingStages[loadingStages.length - 1].id;
              return (
                <div key={index}>
                  {!isFirst && (
                    <div
                      className={`mx-auto line w-[1px] h-4 ${
                        isDone ? 'bg-neutral-100' : 'bg-neutral-600'
                      }`}></div>
                  )}
                  <div className="stageRow flex gap-2 justify-start items-center text-sm">
                    <span
                      className={`rounded-full aspect-square border-2 p-1 ${
                        isActive
                          ? 'border-blue-500 text-blue-500'
                          : isDone
                          ? 'text-neutral-50 border-neutral-50'
                          : 'text-neutral-50'
                      } ${isFirst ? 'border-neutral-50' : ''}`}>
                      {isActive ? (
                        <LoaderCircle className="animate-spin" size={iconSize} />
                      ) : (
                        stage.icon
                      )}
                    </span>
                    <span className={isActive ? 'text-blue-500' : ''}>{stage.message}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter className="bg-neutral-900 p-4">
            <Button
              className="w-full flex items-center gap-2"
              disabled={!isPathwayReady}
              onClick={handleNewPathwayCreated}>
              <Compass />
              Explore your pathway
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
