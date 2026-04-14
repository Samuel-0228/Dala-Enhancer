import React from "react";
import { motion } from "framer-motion";
import { Code, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Optimize Code",
    icon: Code,
    description: "Intelligent code restructuring and automated performance hardening.",
    bullets: [
      "Dependency management",
      "Redundant code removal",
      "TypeScript conversion",
      "Architecture audits"
    ]
  },
  {
    title: "Deploy Securely",
    icon: Shield,
    description: "Production-ready deployment configurations and security protocols.",
    bullets: [
      "Env variable management",
      "Security header injection",
      "Docker containerization",
      "CI/CD pipeline generation"
    ],
    badges: ["SOC2 READY", "GDPR COMPLIANT"]
  },
  {
    title: "Scale Effortlessly",
    icon: TrendingUp,
    description: "Advanced scaling strategies and real-time performance monitoring.",
    bullets: [
      "Lighthouse score optimization",
      "Asset compression pipelines",
      "Edge function integration",
      "Database indexing audits"
    ]
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[90rem] mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={cn(
                "group relative p-10 rounded-none border border-zinc-900 bg-black transition-all duration-500",
                "hover:border-zinc-700",
                "flex flex-col h-full"
              )}
            >
              <div className="mb-10 inline-flex items-center justify-center w-14 h-14 border border-zinc-900 group-hover:border-zinc-700 transition-all duration-500">
                <feature.icon className="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-normal text-white mb-6 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-normal">
                {feature.description}
              </p>

              <ul className="space-y-4 mb-10 flex-grow">
                {feature.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-500 text-[11px] tracking-wide font-normal">
                    <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-zinc-500 transition-all duration-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {feature.badges && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {feature.badges.map((badge) => (
                    <span key={badge} className="text-[9px] px-2 py-0.5 border border-zinc-800 text-zinc-600 font-normal tracking-widest">
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-zinc-900">
                <button className="text-[10px] tracking-widest text-zinc-700 hover:text-white transition-colors font-normal flex items-center gap-2">
                  LEARN MORE
                  <div className="w-6 h-[1px] bg-zinc-900 group-hover:bg-white transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};