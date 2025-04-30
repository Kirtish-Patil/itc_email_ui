import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Fallback() {
  return (
    <div className="md:hidden bg-muted flex h-screen justify-center items-center">
      <img
        src="/guidelines.svg"
        width={150}
        height={170}
        alt="Mail"
        className="dark:block"
      />

      <Alert className="fixed bg-foreground text-background bottom-16  w-[500px]">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Display only available at larger screen.
        </AlertDescription>
      </Alert>
    </div>
  );
}
