import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Uploader } from "@/components/enhancer/Uploader";
import { AnalysisEngine } from "@/components/enhancer/AnalysisEngine";
import { EnhancementSystem } from "@/components/enhancer/EnhancementSystem";
import { Integrations } from "@/components/enhancer/Integrations";
import { PreviewComparison } from "@/components/enhancer/PreviewComparison";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Download, ExternalLink, Sparkles } from "lucide-react";

export type ProjectStatus = "idle" | "uploading" | "analyzing" | "enhancing" | "ready";

export interface Enhancement {
  id: string;
  name: string;
  description: string;
  status: "pending" | "applied";
}

function App() {
  const [view, setView] = useState<"landing" | "dashboard" | "enhancer">("landing");
  const [status, setStatus] = useState<ProjectStatus>("idle");
  const [projectName, setProjectName] = useState<string>("");
  const [enhancements, setEnhancements] = useState<Enhancement[]>([
    { id: "ui", name: "Modern UI Upgrade", description: "Clean layout, spacing, and better typography.", status: "pending" },
    { id: "dashboard", name: "Admin Dashboard", description: "Generates a simple admin dashboard template.", status: "pending" },
    { id: "auth", name: "Authentication System", description: "Login/signup pages with flow.", status: "pending" },
    { id: "perf", name: "Performance Optimization", description: "Lazy loading and structure improvements.", status: "pending" },
  ]);

  const handleStartEnhancing = () => {
    setView("enhancer");
    setStatus("idle");
  };

  const handleUploadComplete = (name: string) => {
    setProjectName(name);
    setStatus("analyzing");
    toast.success("Project uploaded successfully!");
    
    // Simulate analysis
    setTimeout(() => {
      setStatus("enhancing");
      toast.info("Analysis complete. Found 4 possible improvements.");
    }, 2500);
  };

  const applyEnhancement = (id: string) => {
    setEnhancements(prev => 
      prev.map(e => e.id === id ? { ...e, status: "applied" } : e)
    );
    toast.success(`${enhancements.find(e => e.id === id)?.name} applied!`);
  };

  const handleFinish = () => {
    setStatus("ready");
    toast.success("Project enhancement complete!");
  };

  const resetEnhancer = () => {
    setStatus("idle");
    setProjectName("");
    setEnhancements(prev => prev.map(e => ({ ...e, status: "pending" })));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30 font-sans">
      <Navbar setView={setView} currentView={view} />
      <Toaster position="top-right" richColors closeButton />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={handleStartEnhancing} />
              <div className="mt-24">
                <TemplateGallery />
              </div>
            </motion.div>
          )}

          {view === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectList onNewProject={handleStartEnhancing} />
            </motion.div>
          )}

          {view === "enhancer" && (
            <motion.div
              key="enhancer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setView("landing")}
                    className="hover:bg-slate-800"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    {projectName ? `Enhancing: ${projectName}` : "Dala Enhancer"}
                  </h1>
                </div>
                {status === "ready" && (
                  <Button variant="outline" onClick={resetEnhancer} className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10">
                    <Sparkles className="w-4 h-4 mr-2" /> New Project
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                  {status === "idle" && (
                    <Uploader onComplete={handleUploadComplete} />
                  )}

                  {status === "analyzing" && (
                    <AnalysisEngine />
                  )}

                  {(status === "enhancing" || status === "ready") && (
                    <PreviewComparison status={status} />
                  )}
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <EnhancementSystem 
                    enhancements={enhancements} 
                    onApply={applyEnhancement}
                    disabled={status !== "enhancing"}
                  />
                  
                  <Integrations disabled={status !== "enhancing"} />

                  {status === "enhancing" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Button 
                        onClick={handleFinish}
                        className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Finish Enhancement
                      </Button>
                    </motion.div>
                  )}

                  {status === "ready" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-xl shadow-emerald-500/10"
                    >
                      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Project Ready!
                      </h3>
                      <p className="text-slate-400 text-sm mb-6">
                        All enhancements have been applied successfully. Your production-ready project is ready for export.
                      </p>
                      <div className="space-y-3">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 h-12">
                          <Download className="w-4 h-4 mr-2" /> Download ZIP
                        </Button>
                        <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 h-12">
                          <ExternalLink className="w-4 h-4 mr-2" /> Open in GitHub
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-24 py-12 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Dala Enhancer. Built for the modern web.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;