"use client";

import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl';
import { motion } from "framer-motion";

export function CTASection() {
  const router = useRouter()
  const currentLocale = useLocale();
  const t = useTranslations('CTASection');

  const localePrefixed = (path: string) => `/${currentLocale}${path}`;

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 pb-24 md:pb-32 lg:pb-40 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 z-0"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-500/10 rounded-full"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      ></motion.div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t('title')}</span>
              </h2>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 text-white"
                  onClick={() => router.push(localePrefixed('/sign-in'))}
                >
                  {t('getStartedButton')} <ArrowRight className="size-4 ml-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-black hover:bg-slate-800/50 hover:text-white transition-all duration-300"
                  onClick={() => router.push(localePrefixed('/contact'))}
                >
                  {t('contactButton')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mx-auto w-full max-w-[500px] lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut"
            }}
          >
            <motion.div 
              className="aspect-video overflow-hidden rounded-2xl bg-slate-900/70 backdrop-blur-sm p-6 border border-slate-800 shadow-xl shadow-blue-900/20"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgb(30 64 175 / 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-5">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20">
                    <div className="size-full rounded-xl bg-slate-900 flex items-center justify-center">
                      <MessageSquare className="size-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{t('boxTitle')}</h3>
                    <p className="text-sm text-slate-400">{t('boxSubtitle')}</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <motion.div 
                    className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-blue-900/50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <ChevronRight className="size-5 text-cyan-400" />
                    <p className="text-slate-300">{t('listItem1')}</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-blue-900/50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <ChevronRight className="size-5 text-cyan-400" />
                    <p className="text-slate-300">{t('listItem2')}</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-blue-900/50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <ChevronRight className="size-5 text-cyan-400" />
                    <p className="text-slate-300">{t('listItem3')}</p>
                  </motion.div>
               
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

