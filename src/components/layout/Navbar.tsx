import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, Globe } from "lucide-react";

interface NavbarProps {
  setView: (view: "landing" | "dashboard" | "enhancer") => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView("landing")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            DALA ENHANCER
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Button 
            variant="ghost" 
            className={`text-sm ${currentView === "landing" ? "bg-white/5 text-white" : "text-slate-400 hover:text-white"}`}
            onClick={() => setView("landing")}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm ${currentView === "dashboard" ? "bg-white/5 text-white" : "text-slate-400 hover:text-white"}`}
            onClick={() => setView("dashboard")}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            My Projects
          </Button>
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-white text-sm"
          >
            Docs
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="hidden sm:flex border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400"
            onClick={() => setView("enhancer")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Explore
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
            onClick={() => setView("enhancer")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};