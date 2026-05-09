"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Calendar, LayoutGrid, Zap, Star, ShieldCheck, Flame } from "lucide-react";
import { Transaction, TransactionButton } from "@coinbase/onchainkit/transaction";
import { Address } from "viem";

type Rarity = "Common" | "Uncommon" | "Rare" | "Legendary";

interface NFT {
  id: number;
  rarity: Rarity;
  timestamp: number;
}

const RARITY_CONFIG: Record<Rarity, { chance: number; color: string; bg: string }> = {
  Common: { chance: 50, color: "text-blue-400", bg: "from-blue-500/20 to-blue-900/20" },
  Uncommon: { chance: 30, color: "text-violet-400", bg: "from-violet-500/20 to-violet-900/20" },
  Rare: { chance: 15, color: "text-pink-400", bg: "from-pink-500/20 to-pink-900/20" },
  Legendary: { chance: 5, color: "text-yellow-400", bg: "from-yellow-500/30 to-orange-500/20" },
};

export default function PressToStartApp() {
  const [view, setView] = useState<"start" | "main" | "gallery" | "stats">("start");
  const [inventory, setInventory] = useState<NFT[]>([]);
  const [streak] = useState(7);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleMockMint = () => {
    const roll = Math.random() * 100;
    let rarity: Rarity = "Common";
    if (roll < 5) rarity = "Legendary";
    else if (roll < 20) rarity = "Rare";
    else if (roll < 50) rarity = "Uncommon";

    const newItem = { id: Date.now(), rarity, timestamp: Date.now() };
    setInventory([newItem, ...inventory]);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-violet-600/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-full h-full bg-blue-600/5 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      <AnimatePresence mode="wait">
        {view === "start" ? (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 z-10"
          >
            <motion.h1 
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl font-black italic tracking-tighter text-center mb-12 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              PRESS TO<br />START
            </motion.h1>
            <button
              onClick={() => setView("main")}
              className="px-12 py-5 bg-white text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              INITIALIZE
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-5 pb-32 z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
                <Flame className="text-orange-500" size={18} />
                <span className="font-bold text-sm tracking-tight">{streak} Day Streak</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-violet-500/30 bg-violet-500/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-violet-400" />
              </div>
            </div>

            {view === "main" && (
              <div className="space-y-6">
                <div className="glass aspect-square rounded-[3rem] flex flex-col items-center justify-center p-8 relative overflow-hidden group">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                  />
                  <div className="w-20 h-20 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-violet-500/20">
                    <Zap className="text-white fill-white" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 tracking-tight">Ready to Reveal?</h2>
                  <p className="text-white/40 text-sm mb-8">Daily refresh available</p>
                  
                  <button 
                    onClick={handleMockMint}
                    className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
                  >
                    MINT DAILY NFT
                  </button>

                  <div className="mt-4">
                    <Transaction
                      chainId={8453}
                      calls={[{ to: "0x0000000000000000000000000000000000000000" as Address, data: "0x" }]}
                    >
                      <TransactionButton 
                        className="!bg-transparent !text-white/20 !text-[10px] !border-none !h-auto !p-0 uppercase font-black tracking-widest hover:!text-white" 
                        text="On-chain Verification" 
                      />
                    </Transaction>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(RARITY_CONFIG).map(([key, cfg]) => (
                    <div key={key} className="glass p-4 rounded-2xl flex flex-col">
                      <span className={`text-[10px] font-black uppercase ${cfg.color}`}>{key}</span>
                      <span className="text-lg font-bold">{cfg.chance}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "gallery" && (
              <div className="grid grid-cols-2 gap-4">
                {inventory.length === 0 ? (
                  <div className="col-span-2 py-20 text-center text-white/20 font-bold uppercase tracking-widest">No Items</div>
                ) : (
                  inventory.map((item) => (
                    <motion.div 
                      layoutId={item.id.toString()}
                      key={item.id} 
                      className={`glass p-4 rounded-3xl bg-gradient-to-br ${RARITY_CONFIG[item.rarity].bg}`}
                    >
                      <div className="aspect-square bg-white/5 rounded-2xl mb-3 flex items-center justify-center">
                        <Star className={RARITY_CONFIG[item.rarity].color} size={28} />
                      </div>
                      <p className="text-xs font-bold">{item.rarity}</p>
                      <p className="text-[10px] text-white/30 font-mono">ID-{item.id.toString().slice(-4)}</p>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {view === "stats" && (
              <div className="glass rounded-[2rem] overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="font-bold flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={18} /> Global Rankings
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-4 text-sm font-black text-white/20">{i}</span>
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/20" />
                        <span className="text-sm font-medium">user_0x...{i}ea</span>
                      </div>
                      <span className="text-xs font-bold text-violet-400">{2500 - (i * 200)} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Nav */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xs h-18 glass rounded-3xl flex items-center justify-around px-2 z-50">
              <NavBtn active={view === "main"} icon={<Zap />} label="Mint" onClick={() => setView("main")} />
              <NavBtn active={view === "gallery"} icon={<LayoutGrid />} label="Gallery" onClick={() => setView("gallery")} />
              <NavBtn active={view === "stats"} icon={<Trophy />} label="Leader" onClick={() => setView("stats")} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBtn({ active, icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? "text-white" : "text-white/30"}`}>
      <div className={`p-2 rounded-xl ${active ? "bg-white/10 shadow-inner" : "hover:text-white/50"}`}>{icon}</div>
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );
}
