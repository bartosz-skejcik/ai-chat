import { startTransition, useMemo, useOptimistic, useState } from "react";

//import { saveModelId } from '@/app/(chat)/actions';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { models, Model } from "@/lib/ai/models";
import { cn } from "@/lib/utils";

import { CheckCircleIcon, ChevronDownIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function ModelSelector({
  selectedModelId,
  className,
}: {
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === optimisticModelId),
    [optimisticModelId],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modelId, setModelId] = useLocalStorage("model-id", selectedModelId);

  const stableModels = models.filter((model) => !model.experimental);
  const experimentalModels = models.filter((model) => model.experimental);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className,
        )}
      >
        <Button variant="outline" className="md:px-2 md:h-[34px]">
          {selectedModel?.label}
          {selectedModel?.experimental && (
            <Badge className="ml-2">Experimental</Badge>
          )}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[300px] max-h-[300px] overflow-y-auto"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Stable</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Models
            models={stableModels}
            optimisticModelId={optimisticModelId}
            setOpen={setOpen}
            setModelId={setModelId}
            setOptimisticModelId={setOptimisticModelId}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Experimental</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Models
            models={experimentalModels}
            optimisticModelId={optimisticModelId}
            setOpen={setOpen}
            setModelId={setModelId}
            setOptimisticModelId={setOptimisticModelId}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type ModelsProps = {
  models: Model[];
  optimisticModelId: string;
  setOpen: (open: boolean) => void;
  setModelId: (modelId: string) => void;
  setOptimisticModelId: (modelId: string) => void;
};

const Models = ({
  models,
  optimisticModelId,
  setOpen,
  setModelId,
  setOptimisticModelId,
}: ModelsProps) => {
  return models.map((model) => (
    <DropdownMenuItem
      key={model.id}
      onSelect={() => {
        setOpen(false);

        startTransition(() => {
          setOptimisticModelId(model.id);
          //saveModelId(model.id);
          setModelId(model.id);
        });
      }}
      className="gap-4 group/item flex flex-row justify-between items-center relative"
      data-active={model.id === optimisticModelId}
    >
      <div className="flex flex-col gap-1 items-start">
        {model.label}
        {model.description && (
          <div className="text-xs text-muted-foreground">
            {model.description}
          </div>
        )}
      </div>
      <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
        <CheckCircleIcon className="w-5 h-5" />
      </div>
    </DropdownMenuItem>
  ));
};
