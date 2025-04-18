"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';

import SignUpForm from "@/components/auth/signup-form";

export function SignUpContent() {
  const tHeader = useTranslations('Header');
  const tLogin = useTranslations('auth.login');
  const tRegister = useTranslations('auth.register');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-slate-950 text-slate-200">
        <motion.div
          className="flex justify-center gap-2 md:justify-start"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-2 font-medium">
            <motion.div
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageSquare className="size-4" />
            </motion.div>
            <span className="font-bold text-slate-200">{tHeader('logoText')}</span>
          </Link>
        </motion.div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block overflow-hidden">
        {/* Dark theme gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyan-900"></div>
        
        {/* Light effects to add dimension */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-blue-500/[0.05]"></div>
        
        {/* Decorative image overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
            }}
            className="w-4/5 h-4/5 relative"
          >
            {/* Abstract shapes */}
            <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
            
            {/* Small decorative dots */}
            <div className="absolute top-[15%] right-[40%] w-4 h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30"></div>
            <div className="absolute top-[60%] left-[25%] w-4 h-4 rounded-full bg-cyan-600 shadow-lg shadow-cyan-500/30"></div>
            <div className="absolute bottom-[30%] right-[30%] w-4 h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30"></div>
            
            {/* 3D floating dashboard mockup */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-[90%] max-w-md h-auto aspect-[16/9] rounded-xl bg-slate-900/60 backdrop-blur-sm p-4 shadow-2xl border border-slate-700/60 overflow-hidden transform rotate-3 perspective-1200">
                {/* Content marketplace mockup */}
                <div className="h-8 w-full rounded-lg bg-gradient-to-r from-blue-600/80 to-cyan-600/80 mb-3 flex items-center px-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                  </div>
                  <div className="text-white/80 text-xs ml-auto">{tLogin('decorativeDashboardTitle')}</div>
                </div>
                
                {/* Search and filter bar */}
                <div className="bg-slate-800/50 h-8 rounded-md mb-3 flex items-center px-3">
                  <div className="w-3 h-3 border-2 border-slate-400 rounded-full mr-1"></div>
                  <div className="h-3 w-24 bg-slate-600/50 rounded-full"></div>
                  <div className="ml-auto flex gap-2">
                    <div className="h-4 w-4 rounded-sm bg-slate-600/50"></div>
                    <div className="h-4 w-4 rounded-sm bg-slate-600/50"></div>
                  </div>
                </div>
                
                {/* Content listings */}
                <div className="space-y-2.5">
                  {/* Content item 1 */}
                  <div className="flex gap-3 bg-slate-800/40 p-2 rounded-md">
                    <div className="h-10 w-10 rounded bg-blue-400/20 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-sm bg-blue-400/40"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-28 bg-slate-400 rounded-full mb-1.5"></div>
                      <div className="h-2 w-20 bg-slate-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <div className="h-4 w-12 rounded-full bg-cyan-500/30"></div>
                    </div>
                  </div>
                  
                  {/* Content item 2 */}
                  <div className="flex gap-3 bg-slate-800/30 p-2 rounded-md">
                    <div className="h-10 w-10 rounded bg-cyan-400/20 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-sm bg-cyan-400/40"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-32 bg-slate-400 rounded-full mb-1.5"></div>
                      <div className="h-2 w-16 bg-slate-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <div className="h-4 w-12 rounded-full bg-blue-500/30"></div>
                    </div>
                  </div>
                  
                  {/* Content item 3 */}
                  <div className="flex gap-3 bg-slate-800/40 p-2 rounded-md">
                    <div className="h-10 w-10 rounded bg-blue-400/20 flex items-center justify-center">
                      <div className="h-5 w-5 rounded-sm bg-blue-400/40"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-24 bg-slate-400 rounded-full mb-1.5"></div>
                      <div className="h-2 w-18 bg-slate-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <div className="h-4 w-12 rounded-full bg-cyan-400/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Welcome text */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-slate-200">{tRegister('welcomeTitle')}</h2>
            <p className="text-sm text-slate-400">
              {tRegister('welcomeSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
