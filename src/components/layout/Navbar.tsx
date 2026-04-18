import React from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Menu, X, LayoutDashboard, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/lib/types";

interface NavbarProps {
  setView: (view: "landing" | "dashboard" | "enhancer") => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: t('home'), view: "landing" as const },
    { name: t('projects'), view: "dashboard" as const },
    { name: t('docs'), view: "landing" as const },
  ];

  const languages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'am' as Language, name: 'Amharic (አማርኛ)' },
    { code: 'om' as Language, name: 'Afan Oromo' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-3xl">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView("landing")}
        >
          <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 rounded-none shadow-2xl relative">
            <Terminal className="w-4 h-4" />
            <div className="absolute -top-[1px] -left-[1px] w-1 h-1 bg-white"></div>
          </div>
          <span className="text-xl font-normal tracking-tight text-white italic leading-none">
            {t('dala.enhancer')}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              className={`text-xs tracking-widest font-normal transition-all duration-300 relative group ${
                currentView === link.view ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
              onClick={() => setView(link.view)}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500"></span>
            </button>
          ))}
          <button 
            className="text-zinc-500 hover:text-white transition-all flex items-center"
            onClick={() => setView("dashboard")}
            title={t('dashboard')}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-zinc-500 hover:text-white transition-all flex items-center gap-2 text-xs tracking-widest">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-zinc-900 text-white rounded-none">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code} 
                  onClick={() => setLanguage(lang.code)}
                  className={`text-xs tracking-widest cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 ${
                    language === lang.code ? 'text-white bg-zinc-900' : 'text-zinc-500'
                  }`}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            size="sm"
            className="bg-white text-black hover:bg-zinc-200 rounded-none text-xs font-normal tracking-widest px-6 h-10 shadow-2xl"
            onClick={() => setView("enhancer")}
          >
            {t('get.started')}
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button 
            className="text-white w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-zinc-900 p-8 space-y-8 animate-in slide-in-from-top duration-500">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              className="block w-full text-left text-xs tracking-widest text-zinc-500 hover:text-white font-normal transition-all"
              onClick={() => {
                setView(link.view);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </button>
          ))}
          <button 
            className="block w-full text-left text-xs tracking-widest text-zinc-500 hover:text-white font-normal flex items-center gap-2"
            onClick={() => {
              setView("dashboard");
              setIsMenuOpen(false);
            }}
          >
            <LayoutDashboard className="w-4 h-4" /> {t('dashboard')}
          </button>

          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[10px] tracking-widest transition-all ${
                  language === lang.code ? 'text-white underline underline-offset-4' : 'text-zinc-500'
                }`}
              >
                {lang.name.split(' (')[0]}
              </button>
            ))}
          </div>

          <Button 
            className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-xs font-normal tracking-widest h-12 shadow-2xl"
            onClick={() => {
              setView("enhancer");
              setIsMenuOpen(false);
            }}
          >
            {t('get.started')}
          </Button>
        </div>
      )}
    </nav>
  );
};