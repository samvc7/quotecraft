import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";

export const DescriptionCollapsible = () => {
  return (
    <Collapsible className="lg:max-w-[1000px] flex flex-col justify-center gap-4 p-6">
      <CollapsibleTrigger>
        <h2 className="text-lg text-center text-muted-foreground text-slate-500 dark:text-slate-400">
          A simple and uplifting app designed to inspire and motivate you.{" "}
        </h2>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">
        <Separator className="w-200px lg:w-[500px] mb-4 h-0.5 self-center" />
        <p className="text-center italic text-slate-500 dark:text-slate-400">
          In a world filled with challenges and moments of doubt, this app
          delivers small yet powerful doses of motivation to brighten your day
          and keep you going. Each quote serves as a reminder that positivity
          and encouragement are just a click away.
        </p>
        <p className="text-center italic text-slate-500 dark:text-slate-400">
          Whether you need a boost to start your day or a little encouragement
          to keep pushing forward, this app is here to help. Enable auto-fetch
          to let the inspiration flow continuously or manually fetch quotes
          whenever you need a moment of positivity.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};
