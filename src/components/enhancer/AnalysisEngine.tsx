import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Layout, Search, Code, Cpu } from "lucide-react";
import { AnalysisResult } from "@/lib/types";

interface AnalysisEngineProps {
  result: AnalysisResult | null;
}

export const AnalysisEngine: React.FC<AnalysisEngineProps> = ({ result }) => {
  const categories = [
    { name: "Framework", score: result?.score || 0, icon: Layout, details: result?.framework || "Analyzing..." },
    { name: "Backend", score: result?.hasBackend ? 100 : 0, icon: Shield, details: result?.hasBackend ? "Detected" : "Not Found" },
    { name: "Structure", score: result?.structureValid ? 100 : 0, icon: Search, details: result?.structureValid ? "Valid" : "Issues Found" },
    { name: "Components", score: 100, icon: Code, details: `${result?.stats.components || 0} units` },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <Card key={i} className="bg-black border-zinc-900 rounded-none p-6 relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <cat.icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                <span className="text-xl font-normal text-white">{cat.score}%</span>
              </div>
              <h3 className="text-xs font-normal tracking-widest text-zinc-500 mb-1">{cat.name.toUpperCase()}</h3>
              <div className="text-[10px] text-zinc-700 tracking-tight leading-tight mb-5">{cat.details}</div>
              <Progress value={cat.score} className="h-1 bg-zinc-950" />
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-black border border-zinc-900 p-10 rounded-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
          <Cpu className="w-64 h-64" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="relative flex-shrink-0">
            <div className="w-56 h-56 border border-zinc-900 flex items-center justify-center rounded-none group">
              <div className="text-center">
                <div className="text-xs text-zinc-600 tracking-widest mb-2 uppercase">Core Score</div>
                <div className="text-6xl font-normal text-white tracking-tighter">{result?.score || 0}</div>
              </div>
              <div className="absolute inset-0 border-t border-white/10 animate-[spin_10s_linear_infinite] rounded-full scale-110"></div>
            </div>
          </div>

          <div className="flex-grow space-y-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-5">
                <h4 className="text-xs font-normal text-white tracking-[0.2em] flex items-center gap-2 uppercase">
                  <Search className="w-4 h-4" /> Detected Issues
                </h4>
                <div className="space-y-3">
                  {result?.issues.map((issue, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-zinc-950 bg-zinc-950/30 text-[10px] tracking-widest text-zinc-500">
                      <span>{issue.type.toUpperCase()}</span>
                      <span className={issue.severity === 'high' ? 'text-red-500' : 'text-amber-500'}>{issue.severity.toUpperCase()}</span>
                    </div>
                  ))}
                  {(!result || result.issues.length === 0) && (
                    <div className="p-4 border border-zinc-950 text-[10px] tracking-widest text-zinc-800 uppercase">No critical issues detected</div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="text-xs font-normal text-white tracking-[0.2em] flex items-center gap-2 uppercase">
                  <Code className="w-4 h-4" /> Suggestions
                </h4>
                <div className="space-y-3">
                  {result?.suggestions.map((sug, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-zinc-950 bg-zinc-950/30 text-[10px] tracking-widest text-zinc-500">
                      <span className="truncate max-w-[150px]">{sug}</span>
                      <span className="text-white">STABLE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};