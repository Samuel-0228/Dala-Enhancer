export const TEMPLATES = {
  chapa: `import axios from 'axios';

/**
 * Dala Enhancer Pro: Chapa Payment Integration
 * 
 * Documentation: https://developer.chapa.co/docs/
 */

export const CHAPA_CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY || 'CHAPUBK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx',
  SECRET_KEY: process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-xxxxxxxxxxxxxxxxxxxxxxxx',
  BASE_URL: "https://api.chapa.co/v1"
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
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}

/**
 * Initialize a transaction with Chapa
 */
export const initializePayment = async (data: ChapaPaymentRequest) => {
  try {
    const response = await axios.post(CHAPA_CONFIG.BASE_URL + "/transaction/initialize", {
      ...data,
      customization: data.customization || {
        title: "Order Payment",
        description: "Secure checkout powered by Dala"
      }
    }, {
      headers: { 
        Authorization: "Bearer " + CHAPA_CONFIG.SECRET_KEY,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error: any) {
    const errorData = error.response?.data || { message: error.message };
    console.error("Chapa Error:", errorData);
    throw new Error(errorData.message || "Payment initialization failed");
  }
};

/**
 * Verify a transaction status
 */
export const verifyPayment = async (tx_ref: string) => {
  try {
    const response = await axios.get(CHAPA_CONFIG.BASE_URL + "/transaction/verify/" + tx_ref, {
      headers: { Authorization: "Bearer " + CHAPA_CONFIG.SECRET_KEY }
    });
    return response.data;
  } catch (error: any) {
    console.error("Verification Error:", error.response?.data || error.message);
    throw error;
  }
};`,
  dashboard: `import React from 'react';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Package, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search,
  Bell
} from "lucide-react";

export const DashboardOverview = () => {
  const stats = [
    { name: 'Revenue', value: '145,231.00 ETB', icon: DollarSign, change: '+20.1%', trend: 'up' },
    { name: 'Active Users', value: '2,840', icon: Users, change: '+18.1%', trend: 'up' },
    { name: 'Total Sales', value: '1,234', icon: Package, change: '-4.3%', trend: 'down' },
    { name: 'Active Now', value: '87', icon: Activity, change: '+22', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="border-b border-zinc-900 px-8 h-16 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter uppercase italic">DALA.CORE</span>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-4 h-4 text-zinc-500" />
          <Bell className="w-4 h-4 text-zinc-500" />
          <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-full"></div>
        </div>
      </nav>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight uppercase italic mb-2">Project Overview</h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-zinc-950 border border-zinc-900 p-6 relative group overflow-hidden">
              <div className="flex items-center justify-between pb-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.name}</p>
                <stat.icon className="h-4 w-4 text-zinc-700" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className={stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
                  {stat.change} FROM LAST CYCLE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
  auth: `import React, { useState } from 'react';

export const AuthSystem = () => {
  const [mode, setMode] = useState('login');
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white font-sans">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-2">DALA</h1>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-12 space-y-10 relative">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter uppercase italic">
              {mode === 'login' ? 'Authentication' : 'Registration'}
            </h2>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Identity</label>
              <input 
                type="email" 
                placeholder="EMAIL@DOMAIN.COM" 
                className="w-full bg-zinc-900 border border-zinc-800 p-5 text-sm font-mono focus:border-white focus:outline-none transition-colors placeholder:text-zinc-700 rounded-none"
              />
            </div>

            <button className="w-full bg-white text-black py-5 text-xs font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all">
              {mode === 'login' ? 'Initialize' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};`
};