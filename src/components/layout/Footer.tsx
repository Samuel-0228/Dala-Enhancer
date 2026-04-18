import React from "react";
import { Terminal, Shield, Cpu, Activity, Twitter, Github, Disc as Discord } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { name: t('footer.system'), href: "#" },
    { name: t('footer.modules'), href: "#" },
    { name: t('footer.pricing'), href: "#" },
    { name: t('footer.registry'), href: "#" },
    { name: t('footer.access'), href: "#" },
  ];

  return (
    <footer className="py-16 border-t border-zinc-950 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-zinc-900 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-normal tracking-tight text-white uppercase italic">
                {t('dala.enhancer')}
              </span>
            </div>
            <p className="text-zinc-600 text-sm uppercase tracking-widest leading-relaxed max-w-sm font-normal">
              {t('footer.desc')}
            </p>
            <div className="flex gap-5">
              {[Shield, Cpu, Activity].map((Icon, i) => (
                <div key={i} className="p-2.5 border border-zinc-900 group hover:border-zinc-700 transition-all cursor-pointer">
                   <Icon className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-normal mb-8">{t('footer.platform')}</h4>
            <div className="flex flex-col gap-5">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs text-zinc-700 hover:text-white transition-all uppercase tracking-widest font-normal group flex items-center gap-2"
                >
                  <div className="w-0 h-px bg-zinc-800 group-hover:w-3 transition-all duration-300"></div>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-normal mb-8">{t('footer.security')}</h4>
            <div className="flex flex-col gap-5">
              {[t('footer.protocol'), t('footer.encryption'), t('footer.audits'), t('footer.compliance')].map((item) => (
                <a key={item} href="#" className="text-xs text-zinc-800 hover:text-white transition-all uppercase tracking-widest font-normal">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-[10px] text-zinc-800 uppercase tracking-[0.3em] font-normal text-center md:text-left">
            {t('footer.rights')}
          </div>
          <div className="flex items-center gap-8">
            {[
              { name: 'TWITTER', icon: Twitter },
              { name: 'GITHUB', icon: Github },
              { name: 'DISCORD', icon: Discord }
            ].map(social => (
              <a key={social.name} href="#" className="text-[10px] text-zinc-800 hover:text-white uppercase tracking-[0.3em] font-normal transition-colors flex items-center gap-2">
                <social.icon className="w-3 h-3" />
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};