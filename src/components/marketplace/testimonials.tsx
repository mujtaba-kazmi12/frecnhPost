"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sparkles, Star, Quote } from "lucide-react"
import { useTranslations } from 'next-intl'
import { motion } from "framer-motion"

// Define the Testimonial type
interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export function TestimonialsSection() {
  // Initialize translations
  const t = useTranslations('TestimonialsSection');

  // Use translation keys for mock testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: t('testimonial1Role'),
      company: t('testimonial1Company'),
      avatar: "/placeholder.svg?height=80&width=80",
      content: t('testimonial1Content'),
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: t('testimonial2Role'),
      company: t('testimonial2Company'),
      avatar: "/placeholder.svg?height=80&width=80",
      content: t('testimonial2Content'),
      rating: 4.5,
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: t('testimonial3Role'),
      company: t('testimonial3Company'),
      avatar: "/placeholder.svg?height=80&width=80",
      content: t('testimonial3Content'),
      rating: 5,
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: t('testimonial4Role'),
      company: t('testimonial4Company'),
      avatar: "/placeholder.svg?height=80&width=80",
      content: t('testimonial4Content'),
      rating: 4.8,
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 lg:py-36 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] border border-blue-500/5 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] border border-cyan-500/5 rounded-full"></div>
        
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="testimonials-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-3">
            <Badge className="inline-flex bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-blue-900/30 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30">
              <Sparkles className="mr-1 h-3 w-3" /> {t('badge')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t('title1')}</span> {t('title2')}
            </h2>
            <p className="mx-auto max-w-[650px] text-slate-300 md:text-xl/relaxed">
              {t('description')}
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Carousel className="w-full">
            <CarouselContent className="h-full">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-3 h-full flex">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full w-full"
                  >
                    <Card className="h-full min-h-[320px] bg-slate-900/70 backdrop-blur-sm border border-slate-800 hover:border-blue-900/50 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden group relative flex flex-col">
                      {/* Subtle glow effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 rounded-lg blur-lg group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                      
                      <div className="relative flex flex-col h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-4">
                            <Avatar className="border-2 border-slate-800 group-hover:border-blue-500/30 transition-colors">
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base text-white">{testimonial.name}</CardTitle>
                              <p className="text-sm text-slate-400">
                                {testimonial.role}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                          <div className="absolute top-3 right-3 opacity-10 text-blue-500 transform scale-125 group-hover:text-cyan-400 group-hover:opacity-20 transition-all">
                            <Quote size={32} />
                          </div>
                          <div>
                            <div className="flex mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(testimonial.rating) ? "fill-cyan-500 text-cyan-500" : i < testimonial.rating ? "fill-cyan-500/50 text-cyan-500/50" : "text-slate-700"}`}
                                />
                              ))}
                            </div>
                            <p className="text-slate-300 relative z-10 line-clamp-6">{testimonial.content}</p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative mr-4 border-slate-800 bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors" />
              <CarouselNext className="relative border-slate-800 bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors" />
            </div>
          </Carousel>
        </motion.div>
        
        {/* Trust badges/companies section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-sm uppercase tracking-wider text-slate-500 mb-6">{t('trustedBy') || "Trusted by companies worldwide"}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map((company, i) => (
              <div key={i} className="text-slate-400 text-lg font-semibold">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

