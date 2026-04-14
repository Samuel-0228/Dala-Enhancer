import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const TemplateGallery: React.FC = () => {
  const templates = [
    {
      title: "E-commerce Starter",
      desc: "Modern storefront with product listings, checkout logic, and payment integration.",
      features: ["Product Engine", "Cart Logic", "Payment Flow", "Inventory Sync"]
    },
    {
      title: "Donation Platform",
      desc: "Secure global contribution system with real-time tracking and multi-currency support.",
      features: ["Goal Tracking", "Transaction Verifier", "Impact Dashboard", "Tax Receipts"]
    },
    {
      title: "Booking System",
      desc: "Enterprise resource management with calendar integration and automated notifications.",
      features: ["Date Parser", "Client Terminal", "Notification Engine", "Sync Flow"]
    }
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {templates.map((template, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "group relative bg-black border border-zinc-900 rounded-none p-10 transition-all duration-500",
              "hover:border-zinc-700"
            )}
          >
            <h3 className="text-xl font-normal mb-4 text-white tracking-tight">
              {template.title}
            </h3>
            
            <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-normal">
              {template.desc}
            </p>

            <ul className="space-y-4 mb-12">
              {template.features.map((feat, j) => (
                <li key={j} className="flex items-center text-xs text-zinc-400 font-normal">
                  <Check className="w-3.5 h-3.5 text-zinc-700 mr-4" />
                  {feat}
                </li>
              ))}
            </ul>

            <Button 
              variant="outline" 
              className="w-full border-zinc-900 hover:border-zinc-700 hover:bg-white hover:text-black rounded-none h-12 text-xs font-normal tracking-widest transition-all duration-300"
            >
              PREVIEW <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};