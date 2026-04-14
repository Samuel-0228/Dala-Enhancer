import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Shield, MousePointer2 } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center rounded-3xl border border-white/5 mt-8 px-4 py-20">
      {/* Background Boxes with radial mask */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes className="opacity-40" />

      <div className="text-center max-w-4xl mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            The Future of Dala Enhancements
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8 text-white">
            Upgrade Your Dala <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500">
              Projects in Seconds.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Transform generated starters into production-ready applications. Better UI, 
            instant integrations, and performance optimizations at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onStart}
              className="h-14 px-8 text-lg font-bold bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 group"
            >
              Start Enhancing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg border-slate-700 hover:bg-slate-800 text-white"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            { icon: Zap, title: "One-Click Boost", desc: "Instantly add payments, auth, and dashboards." },
            { icon: Shield, title: "Production Ready", desc: "Optimized structure with security best practices." },
            { icon: MousePointer2, title: "Modern UI", desc: "Beautifully crafted designs that users will love." }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl backdrop-blur-sm text-left hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-24 px-4 relative z-20 w-full max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c4c7b4b0-c18f-43f1-92e0-8914e043ced2/hero-bg-tech-4143f156-1776172381112.webp" 
            alt="Dashboard Preview"
            className="w-full aspect-[16/8] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};