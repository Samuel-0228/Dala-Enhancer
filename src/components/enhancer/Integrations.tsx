import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, BarChart3, Code2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface IntegrationsProps {
  disabled?: boolean;
}

export const Integrations: React.FC<IntegrationsProps> = ({ disabled }) => {
  const items = [
    { id: "chapa", name: "Chapa Payment", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "telegram", name: "Telegram Bot", icon: Send, color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: "analytics", name: "Simple Analytics", icon: BarChart3, color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: "api", name: "API Structure", icon: Code2, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  const handleIntegrate = (name: string) => {
    toast.success(`Integrating ${name}...`, {
      description: "Setting up boilerplate and environment variables.",
    });
  };

  return (
    <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl shadow-xl">
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
        Quick Boost Panel
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            disabled={disabled}
            onClick={() => handleIntegrate(item.name)}
            className={`h-auto py-4 flex flex-col gap-2 items-center justify-center border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-all ${disabled ? "opacity-50 grayscale" : ""}`}
          >
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="text-[11px] font-bold text-slate-300">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};