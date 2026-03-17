import React, { useState } from "react";
import { 
  Shield, 
  Key, 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  Server,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [useSystemRelay, setUseSystemRelay] = useState(true);

  const saveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Outreach protocols updated. Uplink established.",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter text-white">System Configuration</h1>
        <p className="text-muted-foreground font-semibold text-sm">
          Manage your broadcast infrastructure and subscription tier.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Infrastructure */}
        <div className="space-y-8">
          <div className="bg-[#0A0907] border border-white/[0.03] rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Dispatch Infrastructure</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-primary/5 border border-primary/20 rounded-2xl shadow-[0_0_20px_rgba(45,237,156,0.1)]">
                <div className="space-y-1">
                  <div className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-3 h-3 text-primary" />
                    DTE Managed Relay
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">System-wide IP pools optimized for service lane delivery.</div>
                </div>
                <Badge className="bg-primary text-background text-[9px] font-black uppercase tracking-widest px-3 py-1">Active</Badge>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="text-[10px] text-muted-foreground text-center italic">
                  "Custom API integrations are restricted to Enterprise Nexus accounts."
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0907] border border-white/[0.03] rounded-[2.5rem] p-8 space-y-6">
             <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Security Protocols</h3>
            </div>
            
            <div className="space-y-4">
              {['MFA Authentication', 'IP Whitelisting', 'Audit Logs'].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs font-bold text-white/80">{item}</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest">Active</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Subscription */}
        <div className="space-y-8">
          <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={120} className="text-primary" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <Badge className="bg-primary text-background text-[10px] font-black uppercase tracking-widest mb-2">Current Plan</Badge>
                <h2 className="text-3xl font-black text-white tracking-tighter">Pro Broadcast</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">$29</span>
                  <span className="text-sm font-bold text-muted-foreground">/ month</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {[
                  "Unlimited Broadcasts",
                  "Nova AI Optimization",
                  "Protocol Library Access",
                  "Priority Delivery Pools"
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-white">{feat}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-primary text-background py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(45,237,156,0.3)]">
                Manage Subscription
              </button>
            </div>
          </div>

          <div className="bg-[#0A0907] border border-white/[0.03] rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Payment Method</h3>
            </div>
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
              <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-red-500/50 -mr-2" />
                <div className="w-4 h-4 rounded-full bg-yellow-500/50" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-black text-white">•••• •••• •••• 4242</div>
                <div className="text-[10px] text-muted-foreground">Expires 12/28</div>
              </div>
              <Badge variant="outline" className="border-white/10 text-white/40 text-[9px] font-black uppercase tracking-widest">Default</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
