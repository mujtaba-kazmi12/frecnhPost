"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import HeroImage from "./hero-image"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { useAnalytics } from "@/hooks/useAnalytics"
import { motion } from "framer-motion"

export function HeroSection() {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations('HeroSection');
  const { trackClick } = useAnalytics()
  
  const localePrefixed = (path: string) => `/${currentLocale}${path}`;
  
  const handleBrowse = () => {
    trackClick("browse", "browse marketplace", "click");
    const element = document.getElementById('marketplace');
    if(element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 1.5
      } 
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-500/10 rounded-full"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 border border-cyan-400/10 rounded-full"
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <Badge className="inline-flex bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-blue-900/30 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30">
                  <Sparkles className="mr-1 h-3 w-3" /> {t('badge')}
                </Badge>
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white"
                variants={itemVariants}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t('title1')}</span> {t('title2')}
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-slate-300 md:text-xl"
                variants={itemVariants}
              >
                {t('description')}
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-3 min-[400px]:flex-row"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0"
                onClick={() => {
                  router.push(localePrefixed("/sign-in"));
                }}
              >
                {t('getStarted')} <ArrowRight className="size-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700/50 text-black hover:bg-slate-800/50 hover:text-white transition-all duration-300"
                onClick={() => {
                  router.push(localePrefixed("/about-us"));
                }}
              >
                {t('learnMore')}
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mx-auto w-full max-w-[500px] lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              ease: "easeOut"
            }}
          >
            <motion.div 
              className="aspect-video overflow-hidden rounded-2xl border border-slate-800 shadow-xl shadow-blue-900/20 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgb(30 64 175 / 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <HeroImage />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

