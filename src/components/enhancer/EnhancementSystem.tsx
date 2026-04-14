import React from "react";
import { CheckCircle2, Circle, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancementPlan } from "@/lib/types";

interface EnhancementSystemProps {
  plan: EnhancementPlan | null;
  approvals: string[];
  onToggle: (id: string) => void;
  onApply: () => void;
  disabled: boolean;
}

export const EnhancementSystem: React.FC<EnhancementSystemProps> = ({
  plan,
  approvals,
  onToggle,
  onApply,
  disabled
}) => {
  if (!plan) return null;

  return (
    <div className="bg-black border border-zinc-900 p-8 rounded-none space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-normal text-white tracking-tight">Enhancement Plan</h3>
          <p className="text-zinc-500 text-[10px] tracking-widest mt-1 font-normal uppercase">Architectural transformation protocols</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-700 tracking-widest mb-1 font-normal uppercase">Approved</div>
          <div className="text-xl font-normal text-white">{approvals.length} / {plan.steps.length}</div>
        </div>
      </div>

      <div className="space-y-4">
        {plan.steps.map((step) => {
          const isApproved = approvals.includes(step.id);
          return (
            <div 
              key={step.id}
              onClick={() => onToggle(step.id)}
              className={`p-5 border cursor-pointer transition-all duration-300 group ${
                isApproved ? "border-zinc-700 bg-zinc-950" : "border-zinc-900 opacity-60"
              }`}
            >
              <div className="flex items-start gap-5">
                <div className="mt-1">
                  {isApproved ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-800" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-normal text-white tracking-widest">{step.name.toUpperCase()}</h4>
                    <span className="text-[9px] tracking-[0.2em] px-2 py-0.5 border border-zinc-800 text-zinc-600 font-normal">
                      UNIT
                    </span>
                  </div>
                  <p className="text-zinc-500 text-[10px] leading-relaxed tracking-tight font-normal">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onApply}
        disabled={disabled || approvals.length === 0}
        className="w-full bg-white text-black hover:bg-zinc-200 h-14 rounded-none font-normal tracking-widest text-xs shadow-2xl disabled:opacity-30"
      >
        {disabled ? (
          <><Zap className="w-3.5 h-3.5 mr-2 animate-pulse" /> EXECUTING...</>
        ) : (
          <><Sparkles className="w-3.5 h-3.5 mr-2" /> APPLY TRANSFORMATIONS</>
        )}
      </Button>
    </div>
  );
};