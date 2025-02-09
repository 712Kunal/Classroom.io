"use client";

import { Switch } from "@/components/ui/switch.jsx";
import { Moon, Sun } from "lucide-react";
import { useId } from "react";
import { useTheme } from "@/components/core/ThemeProvider.jsx"

export default function ModeToggle() {
  const id = useId();
  const { theme, setTheme } = useTheme();

  const toggleSwitch = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={theme === "light" ? "checked" : "unchecked"}>
      <span
        id={`${id}-off`}
        className="flex-1 cursor-pointer text-right text-sm font-medium group-data-[state=checked]:text-muted-foreground/70"
        aria-controls={id}
        onClick={() => setTheme("dark")}>
        <Moon size={16} strokeWidth={2} aria-hidden="true" />
      </span>
      <Switch
        id={id}
        checked={theme === "light"}
        onCheckedChange={toggleSwitch}
        aria-labelledby={`${id}-off ${id}-on`}
        aria-label="Toggle between dark and light mode" />
      <span
        id={`${id}-on`}
        className="flex-1 cursor-pointer text-left text-sm font-medium group-data-[state=unchecked]:text-muted-foreground/70"
        aria-controls={id}
        onClick={() => setTheme("light")}>
        <Sun size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );
}
