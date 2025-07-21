"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

export default function ThemeSwitch() {
 const { setTheme, theme } = useTheme();
 return (
  <div className="flex items-center space-x-2">
   <Sun className="h-4 w-4" />
   <Switch
    id="dark-mode"
    checked={theme === "dark"}
    onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
   />
   <Moon className="h-4 w-4" />
   <label htmlFor="dark-mode" className="sr-only">
    Toggle dark mode
   </label>
  </div>
 );
}
