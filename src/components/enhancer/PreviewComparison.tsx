import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, ArrowRight, Zap, Layers } from "lucide-react";
import { ProjectFile, ProjectStatus } from "@/lib/types";

interface PreviewComparisonProps {
  status: ProjectStatus;
  originalFiles: ProjectFile[];
  modifiedFiles: ProjectFile[];
  originalScore: number;
  newScore: number;
}

export const PreviewComparison = ({ status, originalFiles, modifiedFiles, originalScore, newScore }: PreviewComparisonProps) => {
  const isReady = status === "ready";
  const addedFiles = modifiedFiles.filter(mf => !originalFiles.some(of => of.path === mf.path));
  const changedFiles = modifiedFiles.filter(mf => {
    const original = originalFiles.find(of => of.path === mf.path);
    return original && original.content !== mf.content;
  });

  return (
    <div className="space-y-8">
      {isReady && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="p-8 bg-zinc-950 border-zinc-900 rounded-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Layers size={60} />
            </div>
            <h4 className="text-zinc-700 text-[9px] font-normal uppercase tracking-[0.3em] mb-3">Legacy</h4>
            <div className="text-6xl font-normal text-zinc-900 mb-6 italic">{originalScore}%</div>
            <div className="h-[1.5px] bg-zinc-950 overflow-hidden">
              <div className="h-full bg-zinc-800" style={{ width: `${originalScore}%` }} />
            </div>
            <p className="mt-8 text-[9px] text-zinc-700 uppercase tracking-widest font-normal leading-relaxed">
              Substandard modules detected. Inefficient distribution.
            </p>
          </Card>

          <Card className="p-8 bg-white border-white rounded-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-black">
              <Zap size={60} />
            </div>
            <h4 className="text-black/40 text-[9px] font-normal uppercase tracking-[0.3em] mb-3">Enhanced</h4>
            <div className="text-6xl font-normal text-black mb-6 italic">{newScore}%</div>
            <div className="h-[1.5px] bg-black/5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${newScore}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-black" 
              />
            </div>
            <p className="mt-8 text-[9px] text-black uppercase tracking-widest font-normal leading-relaxed">
              Production-grade optimization applied. Chapa verified.
            </p>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-zinc-900 bg-zinc-950 rounded-none shadow-xl">
          <h3 className="text-xl font-normal mb-8 flex items-center uppercase tracking-tight">
            <FileCode className="w-5 h-5 mr-3 text-zinc-700" /> Manifest
          </h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {modifiedFiles.map((file) => {
                const isNew = addedFiles.some(af => af.path === file.path);
                const isChanged = changedFiles.some(cf => cf.path === file.path);
                
                return (
                  <div key={file.path} className="flex items-center justify-between p-4 rounded-none bg-black border border-zinc-900 group hover:border-white transition-all duration-300 font-normal">
                    <div className="flex items-center gap-4 font-normal">
                      <FileCode className={`w-3.5 h-3.5 ${isNew ? 'text-white' : 'text-zinc-800'}`} />
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest truncate max-w-[200px] font-normal">{file.path}</span>
                    </div>
                    <div className="flex gap-2">
                      {isNew && <span className="px-2 py-0.5 bg-white text-black text-[8px] font-normal uppercase tracking-widest">NEW</span>}
                      {isChanged && <span className="px-2 py-0.5 bg-zinc-900 text-white text-[8px] font-normal uppercase tracking-widest border border-zinc-800">MOD</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6 border-zinc-900 bg-zinc-950 rounded-none flex flex-col shadow-xl">
          <h3 className="text-xl font-normal mb-8 flex items-center uppercase tracking-tight">
            <ArrowRight className="w-5 h-5 mr-3 text-white" /> Logs
          </h3>
          <div className="flex-1 bg-black border border-zinc-900 p-6 font-mono text-[10px] uppercase tracking-[0.1em] leading-relaxed text-zinc-700 overflow-hidden relative">
            {changedFiles.length > 0 || addedFiles.length > 0 ? (
              <div className="space-y-6">
                <div className="text-white font-normal mb-3 text-[10px]">// architecture.patch()</div>
                {changedFiles.slice(0, 3).map((f, i) => (
                  <div key={i} className="space-y-2 border-l-2 border-zinc-900 pl-4 font-normal">
                    <div className="text-zinc-500 font-normal">// Patching {f.path.split('/').pop()}</div>
                    <div className="text-white font-normal">+ Proxy Injected</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-10">
                <Layers size={80} className="mb-4" />
                <p className="font-normal text-lg">Awaiting</p>
              </div>
            )}
            <div className="absolute bottom-6 right-6 text-zinc-900 font-normal text-3xl italic opacity-50">DALA_v1</div>
          </div>
        </Card>
      </div>
    </div>
  );
};