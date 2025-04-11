"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BarChart4, Shield, Zap } from "lucide-react"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations('FeaturesSection');
  const locale = useLocale();

  // Stat labels for different languages
  const statLabels = {
    en: {
      stat1: "Publishers",
      stat2: "Users",
      stat3: "Connections",
      stat4: "Success Rate"
    },
    fr: {
      stat1: "Éditeurs",
      stat2: "Utilisateurs",
      stat3: "Connexions",
      stat4: "Taux de Réussite"
    }
  };

  // Get the current language labels or fallback to English
  const currentLabels = statLabels[locale] || statLabels.en;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const features = [
    { 
      icon: Search, 
      title: t('feature1Title'), 
      text: t('feature1Text'),
      gradient: "from-blue-500 to-cyan-400",
      iconColor: "text-blue-400",
      delay: 0
    },
    { 
      icon: BarChart4, 
      title: t('feature2Title'), 
      text: t('feature2Text'),
      gradient: "from-blue-600 to-cyan-500",
      iconColor: "text-cyan-400",
      delay: 0.1
    },
    { 
      icon: Shield, 
      title: t('feature3Title'), 
      text: t('feature3Text'),
      gradient: "from-indigo-600 to-blue-500",
      iconColor: "text-indigo-400",
      delay: 0.2
    },
    { 
      icon: Zap, 
      title: t('feature4Title'), 
      text: t('feature4Text'),
      gradient: "from-cyan-500 to-blue-400",
      iconColor: "text-cyan-400",
      delay: 0.3
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] border border-blue-500/5 rounded-full"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center relative z-10">
        {/* Badge & Heading */}
        <motion.div 
          className="space-y-5 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="inline-flex bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-blue-900/30 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30">
            <Sparkles className="mr-1 h-3 w-3" /> {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-5xl text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t('title1')}</span> {t('title2')}
          </h2>
          <p className="max-w-[650px] mx-auto text-slate-300 md:text-xl">
            {t('description')}
          </p>
        </motion.div>
  
        {/* Cards Grid */}
        <motion.div 
          className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              custom={index}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
              <Card className="h-full bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-blue-900/50 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden group relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 rounded-lg blur-lg group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                
                <div className="relative"> {/* Container for content over the glow effect */}
                  <CardHeader className="p-5">
                    <div className={`size-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <div className="size-full rounded-2xl bg-slate-900 flex items-center justify-center">
                        <feature.icon className={`size-6 ${feature.iconColor}`} />
                      </div>
                    </div>
                    <CardTitle className="font-bold text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-slate-300">{feature.text}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional stats/credibility indicators */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { label: currentLabels.stat1, value: "500+" },
            { label: currentLabels.stat2, value: "5,000+" },
            { label: currentLabels.stat3, value: "12k+" },
            { label: currentLabels.stat4, value: "98%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
  