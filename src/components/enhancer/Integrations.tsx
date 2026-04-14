import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, BarChart3, Code2, Terminal } from "lucide-react";
import { toast } from "sonner";

interface IntegrationsProps {
  disabled?: boolean;
}

export const Integrations: React.FC<IntegrationsProps> = ({ disabled }) => {
  const items = [
    { id: "chapa", name: "CHAPA", icon: CreditCard },
    { id: "telegram", name: "BOTS", icon: Send },
    { id: "analytics", name: "METRICS", icon: BarChart3 },
    { id: "api", name: "PROXY", icon: Code2 },
  ];

  const handleIntegrate = (name: string) => {
    toast.info(`INITIATING ${name}...`, {
      description: "Injecting boilerplate modules.",
      className: "rounded-none bg-black border-zinc-800 text-white font-mono uppercase text-[10px] font-normal",
    });
  };

  return (
    <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-none shadow-2xl relative overflow-hidden">
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-white/20"></div>
      <h3 className="text-lg font-normal mb-6 flex items-center uppercase tracking-tight">
        <Terminal className="w-4 h-4 mr-2 text-white" />
        Injections
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            disabled={disabled}
            onClick={() => handleIntegrate(item.name)}
            className={`h-20 flex flex-col gap-2 items-center justify-center border-zinc-900 bg-black rounded-none hover:bg-white hover:text-black hover:border-white transition-all duration-300 ${disabled ? "opacity-30" : ""}`}
          >
            <item.icon className={`w-4 h-4`} />
            <span className="text-[8px] font-normal uppercase tracking-[0.1em]">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};