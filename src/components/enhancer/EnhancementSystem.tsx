import React from "react";
import { motion } from "framer-motion";
import { Enhancement } from "@/App";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus, Sparkles, Layout, UserCheck, Zap } from "lucide-react";

interface EnhancementSystemProps {
  enhancements: Enhancement[];
  onApply: (id: string) => void;
  disabled?: boolean;
}

export const EnhancementSystem: React.FC<EnhancementSystemProps> = ({ enhancements, onApply, disabled }) => {
  const icons: Record<string, any> = {
    ui: Sparkles,
    dashboard: Layout,
    auth: UserCheck,
    perf: Zap,
  };

  return (
    <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl shadow-xl">
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
        Enhancement System
      </h3>

      <div className="space-y-3">
        {enhancements.map((e) => {
          const Icon = icons[e.id] || Sparkles;
          const isApplied = e.status === "applied";

          return (
            <motion.div
              key={e.id}
              whileHover={!disabled && !isApplied ? { x: 4 } : {}}
              className={`p-4 rounded-xl border transition-all ${
                isApplied 
                  ? "bg-indigo-500/10 border-indigo-500/30" 
                  : "bg-slate-800/50 border-white/5"
              } ${disabled ? "opacity-50 grayscale" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-lg ${isApplied ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isApplied ? "text-indigo-300" : "text-white"}`}>{e.name}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{e.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={isApplied ? "ghost" : "default"}
                  disabled={disabled || isApplied}
                  onClick={() => onApply(e.id)}
                  className={`h-8 w-8 p-0 rounded-full ${isApplied ? "text-indigo-400" : "bg-indigo-600 hover:bg-indigo-500"}`}
                >
                  {isApplied ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};