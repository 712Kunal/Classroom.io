import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { FcReading, FcStart, FcGraduationCap, FcTodoList } from "react-icons/fc";

export default function SelectResourceType({ defaultValue, value, setValue }) {
  const id = useId();
  return (
    (<RadioGroup className="gap-2" defaultValue={defaultValue} value={value} onValueChange={setValue}>
      {/* Radio card #1 */}
      <div
        className="relative flex items-center gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <RadioGroupItem
          value="all"
          id={`${id}-1`}
          aria-describedby={`${id}-1-description`}
          className="order-1 after:absolute after:inset-0"
        />
        <div className="flex grow items-start gap-3">
          <FcTodoList size={36} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-1`}>
              All{" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                (reading material, video tutorials, interactive exercises)
              </span>
            </Label>
            <p id={`${id}-1-description`} className="text-xs text-muted-foreground">
              You can use this card with a label and a description.
            </p>
          </div>
        </div>
      </div>
      {/* Radio card #2 */}
      <div
        className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <RadioGroupItem
          value="reading material"
          id={`${id}-2`}
          aria-describedby={`${id}-2-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-center gap-3">
          <FcReading size={36} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-2`}>
              Reading Material{" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                (articles, documentation, etc)
              </span>
            </Label>
            <p id={`${id}-2-description`} className="text-xs text-muted-foreground">
              You can use this card with a label and a description.
            </p>
          </div>
        </div>
      </div>
      {/* Radio card #3 */}
      <div
        className="relative flex items-center gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <RadioGroupItem
          value="video-tutorials"
          id={`${id}-3`}
          aria-describedby={`${id}-3-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-start gap-3">
          <FcStart size={36} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-3`}>
              Video Tutorials{" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                (Youtube, Tutorial videos)
              </span>
            </Label>
            <p id={`${id}-3-description`} className="text-xs text-muted-foreground">
              You can use this card with a label and a description.
            </p>
          </div>
        </div>
      </div>
      {/* Radio card #4 */}
      <div
        className="relative flex items-center gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <RadioGroupItem
          value="interactice-exercises"
          id={`${id}-4`}
          aria-describedby={`${id}-4-description`}
          className="order-1 after:absolute after:inset-0" />
        <div className="flex grow items-start gap-3">
          <FcGraduationCap size={36} />
          <div className="grid grow gap-2">
            <Label htmlFor={`${id}-4`}>
              Interactive Exercises{" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                (Online exercises, interactive problems, etc)
              </span>
            </Label>
            <p id={`${id}-4-description`} className="text-xs text-muted-foreground">
              You can use this card with a label and a description.
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>)
  );
}
