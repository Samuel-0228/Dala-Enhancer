import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone, Monitor, Fullscreen, Sparkles } from "lucide-react";

interface PreviewComparisonProps {
  status: "enhancing" | "ready";
}

export const PreviewComparison: React.FC<PreviewComparisonProps> = ({ status }) => {
  const [mode, setMode] = useState<"side" | "enhanced">("side");

  const originalImg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/c4c7b4b0-c18f-43f1-92e0-8914e043ced2/original-preview-simple-71eb6ff1-1776172381058.webp";
  const enhancedImg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/c4c7b4b0-c18f-43f1-92e0-8914e043ced2/enhanced-preview-modern-334dbc67-1776172381595.webp";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs value={mode} onValueChange={(v: any) => setMode(v)}>
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="side" className="data-[state=active]:bg-indigo-600">Side-by-Side</TabsTrigger>
            <TabsTrigger value="enhanced" className="data-[state=active]:bg-indigo-600">Enhanced Only</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-white">
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-white bg-slate-700 shadow-sm">
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={`grid ${mode === "side" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        {mode === "side" && (
          <div className="relative group">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-slate-400">
              Original Project
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-slate-900">
              <img src={originalImg} alt="Original" className="w-full h-full object-cover opacity-60 grayscale-[50%]" />
            </div>
          </div>
        )}
        
        <div className="relative group">
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-indigo-500/80 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-400/50 text-white flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Enhanced Project
          </div>
          <div className="absolute top-4 right-4 z-10 flex gap-2">
             <Button size="icon" className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-white/10">
                <Fullscreen className="w-4 h-4" />
             </Button>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-slate-900 shadow-2xl shadow-indigo-500/20">
            <img src={enhancedImg} alt="Enhanced" className="w-full h-full object-cover" />
            
            {status === "enhancing" && (
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
                <div className="text-center p-6 bg-slate-900/90 rounded-2xl border border-indigo-500/30 shadow-xl">
                   <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                   <p className="text-sm font-bold text-white">Applying Changes...</p>
                   <p className="text-[10px] text-slate-400 mt-1">Rebuilding project structure</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Eye className="w-4 h-4 text-indigo-400" />
        </div>
        <p className="text-xs text-slate-400">
          <span className="text-indigo-300 font-bold">Real-time preview:</span> The preview updates automatically as you apply enhancements and integrations.
        </p>
      </div>
    </div>
  );
};