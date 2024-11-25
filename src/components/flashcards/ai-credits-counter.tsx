"use client";

import { RESOURCE_LIMITS } from "@/lib/validation/resource-limits";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AiCreditsCounterProps {
  usedCredits: number;
}

export function AiCreditsCounter({ usedCredits }: AiCreditsCounterProps) {
  const remainingCredits =
    RESOURCE_LIMITS.AI_CREDITS_PER_SCHOOL_YEAR - usedCredits;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={remainingCredits > 0 ? "secondary" : "outline"}
            className="gap-1"
          >
            <Sparkles className="h-3 w-3" />
            {remainingCredits} AI Credits
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            You have {remainingCredits} out of{" "}
            {RESOURCE_LIMITS.AI_CREDITS_PER_SCHOOL_YEAR} AI deck generations
            remaining for this school year
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
