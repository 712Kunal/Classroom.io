import { Input } from "../ui/input2";
import { Label } from "../ui/label2";
import { useState } from "react";
import SelectIntervalType from "../originUi/select-interval-type";
import SelectResourceType from "../originUi/select-resource";
import InputIntervalCount from "../originUi/input-interval-count";
import { Separator } from "react-aria-components";
import { cn } from "@/lib/utils";
import { ShipWheel } from "lucide-react";

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

  return <div className='w-full h-full py-4 px-4 flex gap-2'>
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
    <Separator orientation="vertical" className="hidden lg:block w-[1px] h-full bg-neutral-700"/>
    <div className="hidden lg:grid right">
      
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