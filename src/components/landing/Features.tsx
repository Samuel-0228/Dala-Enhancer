import React from "react";
import { motion } from "framer-motion";
import { Code, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('features.optimize.title'),
      icon: Code,
      description: t('features.optimize.desc'),
      bullets: [
        t('features.optimize.b1'),
        t('features.optimize.b2'),
        t('features.optimize.b3'),
        t('features.optimize.b4')
      ]
    },
    {
      title: t('features.deploy.title'),
      icon: Shield,
      description: t('features.deploy.desc'),
      bullets: [
        t('features.deploy.b1'),
        t('features.deploy.b2'),
        t('features.deploy.b3'),
        t('features.deploy.b4')
      ],
      badges: ["SOC2 READY", "GDPR COMPLIANT"]
    },
    {
      title: t('features.scale.title'),
      icon: TrendingUp,
      description: t('features.scale.desc'),
      bullets: [
        t('features.scale.b1'),
        t('features.scale.b2'),
        t('features.scale.b3'),
        t('features.scale.b4')
      ]
    }
  ];

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
                  {t('learn.more')}
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