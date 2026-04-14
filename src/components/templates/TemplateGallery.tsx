import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Calendar, User, Layout, ArrowRight } from "lucide-react";

export const TemplateGallery: React.FC = () => {
  const templates = [
    {
      title: "E-commerce Starter",
      desc: "Product pages, cart UI, and secure checkout flow.",
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-500",
      features: ["Product Grid", "Cart System", "Stripe Ready"]
    },
    {
      title: "Donation Platform",
      desc: "Progress bars, donor lists, and contribution forms.",
      icon: Heart,
      color: "from-emerald-500 to-teal-500",
      features: ["Goal Tracking", "Recent Donors", "Impact Reports"]
    },
    {
      title: "Booking System",
      desc: "Clean calendar UI and request management forms.",
      icon: Calendar,
      color: "from-blue-500 to-indigo-500",
      features: ["Date Picker", "Admin Panel", "Email Sync"]
    },
    {
      title: "Portfolio Site",
      desc: "Elegant personal site layouts for creatives.",
      icon: User,
      color: "from-amber-500 to-orange-500",
      features: ["Project Gallery", "Contact Form", "Blog Setup"]
    },
    {
      title: "Landing Page Gen",
      desc: "High-converting hero sections and CTA components.",
      icon: Layout,
      color: "from-purple-500 to-indigo-600",
      features: ["A/B Testing UI", "Lead Capture", "Feature Cards"]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-4">Extra Templates & Add-ons</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Need a head start? Use our prebuilt templates and add-ons to build specialized 
          applications on top of your Dala projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="group bg-slate-900 border border-white/5 rounded-3xl p-8 hover:border-indigo-500/30 transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${template.color} opacity-[0.03] rounded-bl-full group-hover:opacity-10 transition-opacity`} />
            
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
              <template.icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-4">{template.title}</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              {template.desc}
            </p>

            <ul className="space-y-3 mb-8">
              {template.features.map((feat, j) => (
                <li key={j} className="flex items-center text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                  {feat}
                </li>
              ))}
            </ul>

            <Button variant="link" className="p-0 text-indigo-400 hover:text-indigo-300 font-bold group-hover:gap-2 transition-all">
              Preview Template <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};