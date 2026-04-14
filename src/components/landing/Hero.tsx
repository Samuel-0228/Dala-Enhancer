import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import { Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <div className="relative min-h-[500px] h-[60vh] w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-none">
      <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />

      <div className="relative z-30 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/5 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-xs font-normal tracking-[0.2em] text-white/50">V4.0.1 STABLE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[0.95] mb-8"
        >
          Dala <br className="hidden sm:block" /> Enhancer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-500 text-sm font-normal max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Real-time architectural parsing, security auditing, and automated module injection for production codebases.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={onStart}
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 h-12 px-12 rounded-none font-normal tracking-widest text-xs transition-all active:scale-95 group shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            INITIALIZE <Sparkles className="w-3.5 h-3.5 ml-2 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-zinc-800 text-zinc-500 hover:text-white hover:border-white h-12 px-12 rounded-none font-normal tracking-widest text-xs transition-all"
          >
            TECHNICAL DOCS <Terminal className="w-3.5 h-3.5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};