import { Input } from "../ui/input2";
import { Label } from "../ui/label2";
import { useState } from "react";
import SelectIntervalType from "../originUi/select-interval-type";
import SelectResourceType from "../originUi/select-resource";
import InputIntervalCount from "../originUi/input-interval-count";
import { cn } from "@/lib/utils";

const intervalCountLimit = {
  day: 10,
  week: 12,
  month: 6
}

const CreatePathway = () => {
  const [formData, setFormData] = useState({
    topic: "",
    intervalType: "week",
    intervalCount: "",
    preferedResourceType: ""
  })

  return <div className='p-2'>
    <h1>Create Pathway</h1>
    <div className="form-container">
      <form>
        <div className="topicFieldBox">
          <LabelInputContainer>
            <Label htmlFor="topicField">Topic: </Label>
            <Input id="topicField" placeholder="Eg: Data Structures and Algorithms" type="text" value={formData.topic} onChange={(ele) => {
              setFormData({ ...formData, topic: ele.target.value })
            }} />
          </LabelInputContainer>
        </div>
        <div className="intervalTypeFieldBox">
          <Label htmlFor="intervalTypeField">Interval Type: </Label>
          <SelectIntervalType value={formData.intervalType} setValue={(value) => {
            setFormData({ ...formData, intervalType: value });
          }} />
        </div>
        <div className="intervalCountFieldBox">
          <Label htmlFor="intervalCountField">Number of Intervals: </Label>
          <InputIntervalCount
            value={formData.intervalCount}
            setValue={(value) => {
              setFormData({ ...formData, intervalCount: value });
            }}
            max={intervalCountLimit[formData.intervalType]}
          />
        </div>
        <div className="resourceTypePreferenceFieldBox">
          <SelectResourceType />
        </div>
        <div className="submitBtn">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  </div>;
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