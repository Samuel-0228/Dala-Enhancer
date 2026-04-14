import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/layout/Footer";
import { Uploader } from "@/components/enhancer/Uploader";
import { AnalysisEngine } from "@/components/enhancer/AnalysisEngine";
import { EnhancementSystem } from "@/components/enhancer/EnhancementSystem";
import { Integrations } from "@/components/enhancer/Integrations";
import { PreviewComparison } from "@/components/enhancer/PreviewComparison";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Download, ExternalLink, Sparkles } from "lucide-react";

import { ProjectFile, AnalysisResult, EnhancementPlan, ProjectStatus } from "@/lib/types";
import { analyzeProject } from "@/lib/analysis";
import { generatePlan } from "@/lib/enhancement";
import { applyPlan } from "@/lib/transformer";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  const [view, setView] = useState<"landing" | "dashboard" | "enhancer">("landing");
  const [status, setStatus] = useState<ProjectStatus>("idle");
  const [projectName, setProjectName] = useState<string>("");
  
  // Project State
  const [originalFiles, setOriginalFiles] = useState<ProjectFile[]>([]);
  const [modifiedFiles, setModifiedFiles] = useState<ProjectFile[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [plan, setPlan] = useState<EnhancementPlan | null>(null);
  const [approvals, setApprovals] = useState<string[]>([]);
  const [finalAnalysis, setFinalAnalysis] = useState<AnalysisResult | null>(null);

  const handleStartEnhancing = () => {
    setView("enhancer");
    resetEnhancer();
  };

  const handleUploadComplete = (name: string, files: ProjectFile[]) => {
    setProjectName(name);
    setOriginalFiles(files);
    setStatus("analyzing");
    
    // Execute Real Analysis immediately
    try {
      const result = analyzeProject(files);
      const generatedPlan = generatePlan(result);
      
      setAnalysis(result);
      setPlan(generatedPlan);
      // Auto-approve all items by default
      setApprovals(generatedPlan.steps.map(s => s.id));
      
      setStatus("enhancing");
      toast.success(`Analysis sequence complete. Core Score: ${result.score}%`);
    } catch (error) {
      console.error("Analysis failed", error);
      toast.error("Architectural parsing failed. File structure may be corrupt.");
      setStatus("idle");
    }
  };

  const toggleApproval = (id: string) => {
    setApprovals(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleApplyEnhancements = () => {
    if (!plan) return;
    
    setStatus("enhancing");
    toast.info("Executing architectural transformation...", {
      duration: 2000,
    });

    // Real Transformation
    setTimeout(() => {
      try {
        const transformed = applyPlan(originalFiles, plan, approvals);
        const finalResult = analyzeProject(transformed);
        
        setModifiedFiles(transformed);
        setFinalAnalysis(finalResult);
        setStatus("ready");
        toast.success("Enhancement protocols deployed successfully.");
      } catch (error) {
        console.error("Transformation failed", error);
        toast.error("Code injection sequence failed.");
      }
    }, 1500);
  };

  const handleDownloadZip = async () => {
    if (modifiedFiles.length === 0) return;

    const zip = new JSZip();
    modifiedFiles.forEach(file => {
      zip.file(file.path, file.content);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `dala-enhanced-${projectName || 'project'}.zip`);
    toast.success("Enhanced project archive exported.");
  };

  const resetEnhancer = () => {
    setStatus("idle");
    setProjectName("");
    setOriginalFiles([]);
    setModifiedFiles([]);
    setAnalysis(null);
    setPlan(null);
    setApprovals([]);
    setFinalAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans font-normal text-sm leading-[1.4] antialiased">
      <Navbar setView={setView} currentView={view} />
      <Toaster position="top-right" richColors closeButton theme="dark" />

      <main className="container mx-auto px-4 py-8 pt-24">
        <AnimatePresence mode="wait">
          {view === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <Hero onStart={handleStartEnhancing} />
              <Features />
              <div className="mt-16 pb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-normal tracking-tight mb-2">Starter Templates</h2>
                  <p className="text-zinc-500 max-w-xl mx-auto text-sm font-normal">Choose a base to begin your journey with Dala Enhancer</p>
                </div>
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
              className="max-w-6xl mx-auto"
            >
              <ProjectList onNewProject={handleStartEnhancing} />
            </motion.div>
          )}

          {view === "enhancer" && (
            <motion.div
              key="enhancer"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto pb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setView("landing")}
                    className="hover:bg-zinc-900 rounded-none border border-zinc-900 h-11 w-11"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-normal tracking-tight text-white leading-none">
                      {projectName ? projectName : "Enhancer Terminal"}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-xs tracking-widest text-zinc-500 font-normal">
                        Status: <span className="text-white animate-pulse">{status}</span>
                      </p>
                      <div className="h-1 w-1 bg-zinc-800" />
                      <p className="text-xs tracking-widest text-zinc-500 font-normal">
                        Buffer: <span className="text-white">{originalFiles.length} Units</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                {(status === "ready" || status === "enhancing") && (
                  <Button variant="outline" onClick={resetEnhancer} className="border-zinc-900 text-zinc-500 hover:bg-white hover:text-black rounded-none text-xs font-normal tracking-widest h-11 px-6">
                    <Sparkles className="w-3.5 h-3.5 mr-2" /> Purge Workspace
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-8 space-y-6">
                  {status === "idle" && (
                    <Uploader onComplete={handleUploadComplete} />
                  )}

                  {(status === "analyzing" || status === "enhancing") && (
                    <AnalysisEngine result={analysis} />
                  )}

                  {status === "ready" && (
                    <PreviewComparison 
                      status={status} 
                      originalFiles={originalFiles}
                      modifiedFiles={modifiedFiles}
                      originalScore={analysis?.score || 0}
                      newScore={finalAnalysis?.score || 0}
                    />
                  )}
                </div>

                <div className="xl:col-span-4 space-y-6">
                  {(status === "enhancing" || status === "ready") && (
                    <EnhancementSystem 
                      plan={plan} 
                      approvals={approvals}
                      onToggle={toggleApproval}
                      onApply={handleApplyEnhancements}
                      disabled={status !== "enhancing"}
                    />
                  )}
                  
                  <Integrations disabled={status !== "enhancing"} />

                  {status === "ready" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-white text-black border border-white rounded-none shadow-2xl relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-black/5 -rotate-45 translate-x-8 -translate-y-8"></div>
                      <h3 className="text-xl font-normal mb-2 flex items-center tracking-tight">
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Export Unit
                      </h3>
                      <p className="text-black/60 text-xs font-normal mb-6 leading-relaxed">
                        Architectural refactoring finalized. Production-ready codebase compiled.
                      </p>
                      <div className="space-y-3">
                        <Button 
                          onClick={handleDownloadZip}
                          className="w-full bg-black text-white hover:bg-zinc-900 h-11 rounded-none font-normal text-xs tracking-widest"
                        >
                          <Download className="w-3.5 h-3.5 mr-2" /> Download ZIP
                        </Button>
                        <Button variant="outline" className="w-full border-black/10 hover:bg-black hover:text-white h-11 rounded-none text-black/40 text-xs tracking-widest font-normal">
                          <ExternalLink className="w-3.5 h-3.5 mr-2" /> GitHub Push
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

      {view === "landing" && <Footer />}
      {view !== "landing" && (
        <footer className="mt-12 py-8 border-t border-zinc-950 bg-black">
          <div className="container mx-auto px-4 text-center text-zinc-800 text-xs tracking-widest font-normal">
            <p>DALA ENHANCER PRO \\ ARCHITECTURAL SUPREMACY \\ 2024</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;