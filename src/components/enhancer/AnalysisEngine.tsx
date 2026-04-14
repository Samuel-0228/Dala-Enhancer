import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const AnalysisEngine: React.FC = () => {
  const [scannedFiles, setScannedFiles] = useState(0);
  const totalFiles = 42;

  useEffect(() => {
    const interval = setInterval(() => {
      setScannedFiles(prev => {
        if (prev >= totalFiles) {
          clearInterval(interval);
          return totalFiles;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const improvements = [
    { title: "UI/UX System", status: "missing", desc: "Basic styling detected, missing modern design system." },
    { title: "Authentication", status: "missing", desc: "No login/signup flow found." },
    { title: "Dashboard", status: "missing", desc: "Missing administrative interface." },
    { title: "Responsive Design", status: "partial", desc: "Limited mobile responsiveness." },
    { title: "Performance", status: "missing", desc: "Missing code splitting and lazy loading." },
  ];

  return (
    <div className="p-8 bg-slate-900 border border-white/10 rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <Search className="w-6 h-6 mr-3 text-indigo-400" />
            Analyzing Project Structure
          </h2>
          <p className="text-slate-400">Scanning for missing features and optimization opportunities.</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-indigo-400">{scannedFiles}/{totalFiles}</div>
          <div className="text-xs text-slate-500">Files Analyzed</div>
        </div>
      </div>

      <div className="space-y-4">
        {improvements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-5 bg-slate-800/50 rounded-2xl border border-white/5 flex items-start gap-4"
          >
            <div className="mt-1">
              {item.status === "missing" ? (
                <AlertCircle className="w-5 h-5 text-amber-500" />
              ) : item.status === "partial" ? (
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold">{item.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  item.status === "missing" ? "bg-amber-500/10 text-amber-500" : "bg-indigo-500/10 text-indigo-400"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};