import React, { useState } from "react";
import { Upload, Link as LinkIcon, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ProjectFile } from "@/lib/types";
import JSZip from "jszip";

interface UploaderProps {
  onComplete: (name: string, files: ProjectFile[]) => void;
}

export const Uploader: React.FC<UploaderProps> = ({ onComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [gitUrl, setGitUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".zip")) {
      toast.error("Protocol Error: Only .zip archives are permitted.");
      return;
    }

    setIsProcessing(true);
    const zip = new JSZip();
    try {
      const content = await zip.loadAsync(file);
      const files: ProjectFile[] = [];
      
      for (const [path, zipFile] of Object.entries(content.files)) {
        if (!zipFile.dir) {
          const contentStr = await zipFile.async("string");
          files.push({ path, content: contentStr });
        }
      }

      onComplete(file.name.replace(".zip", ""), files);
    } catch (error) {
      toast.error("Archive Corrupted: Analysis sequence aborted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 font-normal">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
        className={`relative border-2 border-dashed rounded-none p-20 transition-all duration-500 text-center ${
          isDragging ? "border-white bg-zinc-950" : "border-zinc-900 bg-black"
        }`}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-800"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-800"></div>
        
        <div className="max-w-md mx-auto space-y-10">
          <div className="w-20 h-20 border border-zinc-900 mx-auto flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Upload className={`w-8 h-8 ${isProcessing ? "animate-bounce text-white" : "text-zinc-800 group-hover:text-white transition-colors"}`} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-normal text-white tracking-tight">Ingest Project Archive</h2>
            <p className="text-zinc-600 text-sm leading-relaxed font-normal">
              Upload ZIP or link GitHub repository for structural analysis and module injection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept=".zip"
              />
              <Button className="w-full bg-white text-black hover:bg-zinc-200 h-12 rounded-none font-normal tracking-widest text-xs">
                CHOOSE ZIP
              </Button>
            </div>
            <div className="hidden sm:flex items-center text-zinc-800 px-4 text-xs font-normal tracking-widest italic">OR</div>
            <Button variant="outline" className="border-zinc-900 h-12 px-10 rounded-none text-zinc-500 hover:text-white text-xs tracking-widest font-normal">
              BROWSE FILES
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-none">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 border border-zinc-900 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-zinc-700" />
          </div>
          <div>
            <h3 className="text-sm font-normal text-white tracking-widest">REMOTE SOURCE INJECTION</h3>
            <p className="text-xs text-zinc-700 mt-1 font-normal">Link public repository for cloud analysis</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-grow font-normal">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-800" />
            <Input 
              placeholder="GitHub Repo URL..."
              value={gitUrl}
              onChange={(e) => setGitUrl(e.target.value)}
              className="bg-black border-zinc-900 h-12 pl-12 rounded-none text-sm tracking-wide focus-visible:ring-zinc-800 font-normal"
            />
          </div>
          <Button 
            className="bg-zinc-900 text-white hover:bg-white hover:text-black h-12 px-10 rounded-none text-xs font-normal tracking-widest transition-all"
            onClick={() => toast.info("Remote injection protocol initializing...")}
          >
            CONNECT
          </Button>
        </div>
      </div>
    </div>
  );
};