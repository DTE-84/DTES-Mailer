import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OutreachPage from "./pages/Outreach";
import SettingsPage from "./pages/Settings";
import { 
  Shield, 
  ChevronLeft, 
  ExternalLink,
  Mail,
  Zap,
  Settings
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary/30">
    {/* Sleek Header / Hub Bridge */}
    <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0A0907]/80 backdrop-blur-md z-40">
      <div className="flex items-center gap-4">
        <a href="https://dte-solutions.icu" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-white transition-colors">Return to Nexus</span>
        </a>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
            <div className="relative z-10 w-8 h-8 rounded-xl bg-black border border-primary/20 flex items-center justify-center overflow-hidden">
              <img 
                src="/DTESMLogo.svg" 
                alt="DTES Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter uppercase text-lg text-white leading-none">DTES Mailer</span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mt-0.5">Tactical Outreach Engine</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60">System Integrity: 100%</span>
        </div>
        <Link to="/settings" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
          <Settings className="w-4 h-4 text-white" />
        </Link>
      </div>
    </header>

    <main className="max-w-[1400px] mx-auto w-full pt-12">
      {children}
    </main>
    <Toaster />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<OutreachPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<OutreachPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
