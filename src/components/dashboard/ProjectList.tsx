import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreVertical, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectListProps {
  onNewProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onNewProject }) => {
  const projects = [
    { id: 1, name: "E-commerce Starter", date: "2 days ago", status: "enhanced", type: "Store" },
    { id: 2, name: "My Personal Portfolio", date: "1 week ago", status: "enhanced", type: "Portfolio" },
    { id: 3, name: "Donation App V2", date: "Jan 12, 2024", status: "processed", type: "Non-profit" },
    { id: 4, name: "SaaS Dashboard", date: "Dec 20, 2023", status: "enhanced", type: "SaaS" },
  ];

  const thumbnails = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/c4c7b4b0-c18f-43f1-92e0-8914e043ced2/project-thumbnails-a9960d71-1776172386565.webp";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">My Projects</h1>
          <p className="text-slate-400">Manage and re-enhance your Dala projects.</p>
        </div>
        <Button 
          onClick={onNewProject}
          className="bg-indigo-600 hover:bg-indigo-500 h-12 px-6"
        >
          <Plus className="w-5 h-5 mr-2" /> New Enhancement
        </Button>
      </div>

      <div className="flex items-center gap-4 py-4 border-y border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-400">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-slate-900 border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="aspect-video relative overflow-hidden">
               <img src={thumbnails} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
               <Badge className={`absolute top-4 right-4 ${
                 project.status === "enhanced" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
               }`}>
                 {project.status === "enhanced" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                 {project.status}
               </Badge>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-1">{project.name}</h3>
                  <p className="text-slate-500 text-xs">{project.type} • {project.date}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-sm h-9">
                  Open Project
                </Button>
                <Button variant="outline" className="flex-1 border-slate-700 hover:bg-indigo-500/10 hover:text-indigo-400 text-sm h-9">
                  Re-enhance
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};