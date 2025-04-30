import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/themeProvider";
import { Sun, Moon } from "lucide-react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button variant={"ghost"} onClick={onClick}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeSwitch;
