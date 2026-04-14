import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Clock, CheckCircle2, AlertCircle, FileText, ChevronRight } from "lucide-react";

interface ProjectListProps {
  onNewProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onNewProject }) => {
  const [search, setSearch] = useState("");

  const projects = [
    { id: "1", name: "COMMERCE-ALPHA", status: "enhanced", type: "E-commerce", date: "2H AGO", score: 98 },
    { id: "2", name: "DONATE-X", status: "analyzed", type: "Donation", date: "5H AGO", score: 72 },
    { id: "3", name: "SCHEDULER-V1", status: "enhanced", type: "Booking", date: "1D AGO", score: 94 },
    { id: "4", name: "PORTFOLIO-PREMIUM", status: "analyzed", type: "Elite Portfolio", date: "3D AGO", score: 65 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-normal tracking-tight text-white">Project Registry</h1>
          <p className="text-zinc-500 text-sm tracking-widest mt-2 font-normal uppercase">Centralized architectural asset management</p>
        </div>
        <Button 
          onClick={onNewProject}
          className="bg-white text-black hover:bg-zinc-200 rounded-none h-12 px-10 text-xs font-normal tracking-widest shadow-2xl"
        >
          <Plus className="w-3.5 h-3.5 mr-2" /> NEW PROJECT
        </Button>
      </div>

      <div className="flex gap-4 p-5 border border-zinc-900 bg-zinc-950/50">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="SEARCH REGISTRY..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-zinc-900 h-12 pl-12 pr-4 text-xs tracking-widest text-white focus:outline-none focus:border-zinc-700 transition-colors font-normal"
          />
        </div>
        <Button variant="outline" className="border-zinc-900 h-12 px-5 rounded-none text-zinc-500 hover:text-white font-normal">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-black border border-zinc-900 p-6 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-zinc-700 transition-all"
          >
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className="w-14 h-14 border border-zinc-900 flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors">
                <FileText className="w-6 h-6 text-zinc-700 group-hover:text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-normal text-white tracking-wider">{project.name}</h3>
                <div className="flex items-center gap-5">
                  <span className="text-xs text-zinc-600 tracking-widest font-normal uppercase">{project.type}</span>
                  <div className="w-1 h-1 bg-zinc-800" />
                  <span className="text-xs text-zinc-600 tracking-widest flex items-center gap-2 font-normal uppercase">
                    <Clock className="w-3.5 h-3.5" /> {project.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[10px] text-zinc-600 tracking-widest mb-1 font-normal uppercase">Arch Score</div>
                  <div className="text-2xl font-normal text-white">{project.score}%</div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-zinc-900">
                  {project.status === 'enhanced' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs text-white tracking-widest font-normal uppercase">{project.status}</span>
                </div>
              </div>
              
              <button className="p-3 text-zinc-800 hover:text-white transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};