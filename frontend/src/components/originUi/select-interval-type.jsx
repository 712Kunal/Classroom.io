import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";

export default function SelectIntervalType({ value, setValue }) {
  const id = useId();

  const items = [
    { value: "day", label: "Days", max: "10 Days" },
    { value: "week", label: "Weeks", max: "12 weeks" },
    { value: "month", label: "Months", max: "6 months" },
  ];

  return (
    (<fieldset className="space-y-4">
      <RadioGroup
        className="gap-0 -space-y-px rounded-lg shadow-sm shadow-black/5"
        defaultValue="week"
        onValueChange={setValue}
        value={value}
        required
      >
        {items.map((item) => (
          <div
            key={`${id}-${item.value}`}
            className="relative flex flex-col gap-4 border border-input p-4 first:rounded-t-lg last:rounded-b-lg has-[[data-state=checked]]:z-10 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  id={`${id}-${item.value}`}
                  value={item.value}
                  className="after:absolute after:inset-0"
                  aria-describedby={`${`${id}-${item.value}`}-interval-type`} />
                <Label className="inline-flex items-start" htmlFor={`${id}-${item.value}`}>
                  {item.label}
                  {item.value === "week" && <Badge className="-mt-1 ms-2">Recommended</Badge>}
                </Label>
              </div>
              <div
                id={`${`${id}-${item.value}`}-max-value`}
                className="text-xs leading-[inherit] text-muted-foreground">
                {item.max}
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </fieldset>)
  );
}
