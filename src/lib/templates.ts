export const TEMPLATES = {
  chapa: `
import axios from 'axios';

/**
 * Dala Enhancer Pro: Chapa Payment Integration
 * 
 * Documentation: https://developer.chapa.co/docs/
 */

export const CHAPA_CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || 'CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx',
  SECRET_KEY: process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx',
  URL: "https://api.chapa.co/v1/transaction/initialize"
};

export interface ChapaPaymentRequest {
  amount: number;
  currency: "ETB" | "USD";
  email: string;
  first_name: string;
  last_name: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
}

export const initializePayment = async (data: ChapaPaymentRequest) => {
  try {
    const response = await axios.post(CHAPA_CONFIG.URL, {
      ...data,
      customization: {
        title: "Order Payment",
        description: "Payment for your order"
      }
    }, {
      headers: { 
        Authorization: "Bearer " + CHAPA_CONFIG.SECRET_KEY,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Chapa payment initialization failed", error.response?.data || error.message);
    throw error;
  }
};

export const verifyPayment = async (tx_ref: string) => {
  try {
    const response = await axios.get(\`https://api.chapa.co/v1/transaction/verify/\${tx_ref}\`, {
      headers: { Authorization: "Bearer " + CHAPA_CONFIG.SECRET_KEY }
    });
    return response.data;
  } catch (error: any) {
    console.error("Chapa payment verification failed", error.response?.data || error.message);
    throw error;
  }
};`,
  dashboard: `
import React from 'react';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Package, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

/**
 * Dala Enhancer Pro: Premium Admin Dashboard
 */

export const DashboardOverview = () => {
  const stats = [
    { name: 'Revenue', value: '45,231.89 ETB', icon: DollarSign, change: '+20.1%', trend: 'up' },
    { name: 'Active Users', value: '2,350', icon: Users, change: '+18.1%', trend: 'up' },
    { name: 'Total Sales', value: '12,234', icon: Package, change: '-4.3%', trend: 'down' },
    { name: 'Active Now', value: '573', icon: Activity, change: '+201', trend: 'up' },
  ];

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase italic">Dashboard</h1>
          <p className="text-zinc-500 text-sm">Welcome back to your project overview.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest">
             Export Report
           </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-zinc-950 border border-zinc-900 p-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
              <stat.icon size={48} />
            </div>
            <div className="flex flex-row items-center justify-between pb-2">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{stat.name}</p>
              <stat.icon className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={\`flex items-center text-xs mt-1 \${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}\`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 p-6">
          <h3 className="text-lg font-bold uppercase mb-4 italic flex items-center gap-2">
            <TrendingUp size={18} /> Activity Log
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New transaction processed</p>
                    <p className="text-xs text-zinc-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="text-xs font-mono">#TX-902{i}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 p-6">
          <h3 className="text-lg font-bold uppercase mb-4 italic">Quick Actions</h3>
          <div className="space-y-3">
            {['Users', 'Settings', 'Payments', 'Logs'].map(action => (
              <button key={action} className="w-full text-left px-4 py-3 bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Manage {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};`,
  auth: `
import React, { useState } from 'react';

/**
 * Dala Enhancer Pro: Minimalist Auth UI
 */

export const AuthSystem = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white selection:bg-white selection:text-black font-sans">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-2">DALA</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.3em]">Secure Access Gateway</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-10 space-y-8 relative">
          <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-white/40"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-white/40"></div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter uppercase italic">
              {mode === 'login' ? 'Authentication' : 'Registration'}
            </h2>
            <div className="h-1 w-12 bg-white"></div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Identity</label>
              <input 
                type="email" 
                placeholder="EMAIL@DOMAIN.COM" 
                className="w-full bg-zinc-900 border border-zinc-800 p-4 text-sm font-mono focus:border-white focus:outline-none transition-colors placeholder:text-zinc-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Passphrase</label>
              <input 
                type="password" 
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" 
                className="w-full bg-zinc-900 border border-zinc-800 p-4 text-sm font-mono focus:border-white focus:outline-none transition-colors placeholder:text-zinc-700"
              />
            </div>

            <button className="w-full bg-white text-black p-5 text-sm font-black uppercase tracking-widest hover:bg-zinc-200 transition-all">
              {mode === 'login' ? 'Proceed' : 'Create Access'}
            </button>
          </div>

          <div className="pt-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-zinc-500">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="hover:text-white transition-colors"
            >
              {mode === 'login' ? 'Request Access?' : 'Back to Login'}
            </button>
            <button className="hover:text-white transition-colors">Forgot Key?</button>
          </div>
        </div>
        
        <div className="text-center text-[8px] uppercase tracking-[0.4em] text-zinc-700">
          Encrypted Session \u2022 Secured by Dala Pro
        </div>
      </div>
    </div>
  );
};`
};