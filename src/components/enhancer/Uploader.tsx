import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Github, Link as LinkIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploaderProps {
  onComplete: (name: string) => void;
}

export const Uploader: React.FC<UploaderProps> = ({ onComplete }) => {
  const [method, setMethod] = useState<"zip" | "github">("zip");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repoUrl, setRepoUrl] = useState("");

  const handleSimulatedUpload = (name: string) => {
    setIsUploading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 30;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          onComplete(name);
        }, 500);
      }
      setProgress(currentProgress);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Import Project</h2>
        <p className="text-slate-400">Upload your Dala ZIP file or link your GitHub repository to begin.</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-800 rounded-xl mb-8 w-fit">
        <Button
          variant={method === "zip" ? "default" : "ghost"}
          onClick={() => setMethod("zip")}
          className={`px-6 ${method === "zip" ? "bg-indigo-600" : "text-slate-400"}`}
        >
          <Upload className="w-4 h-4 mr-2" /> ZIP File
        </Button>
        <Button
          variant={method === "github" ? "default" : "ghost"}
          onClick={() => setMethod("github")}
          className={`px-6 ${method === "github" ? "bg-indigo-600" : "text-slate-400"}`}
        >
          <Github className="w-4 h-4 mr-2" /> GitHub Repo
        </Button>
      </div>

      {isUploading ? (
        <div className="py-12 px-8 text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-bold mb-2">Uploading Project...</h3>
          <p className="text-slate-400 mb-8">Reading project structure and files.</p>
          <Progress value={progress} className="h-2 bg-slate-800" />
          <p className="text-xs text-slate-500 mt-2 text-right">{Math.round(progress)}% Complete</p>
        </div>
      ) : (
        <div className="space-y-6">
          {method === "zip" ? (
            <div 
              className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer group"
              onClick={() => handleSimulatedUpload("e-commerce-v1.zip")}
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Click to Upload</h3>
              <p className="text-slate-400 text-sm">Drag and drop your ZIP file here (Max 50MB)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input 
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="pl-12 h-14 bg-slate-800 border-slate-700 focus:ring-indigo-500"
                />
              </div>
              <Button 
                className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-500"
                disabled={!repoUrl.includes("github.com")}
                onClick={() => handleSimulatedUpload(repoUrl.split("/").pop() || "github-project")}
              >
                Import from GitHub
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-slate-800 flex items-center justify-between text-sm">
        <div className="flex items-center text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
          Dala Project Detected
        </div>
        <div className="text-slate-500 italic">Supported: React, Vite, Next.js</div>
      </div>
    </motion.div>
  );
};