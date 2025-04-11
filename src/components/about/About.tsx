"use client"
import { ArrowLeft, Users, Target, Award, Lightbulb, Globe, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "../marketplace/header"
import { Footer } from "../marketplace/footer"
import ourMission from "../../../public/our-mission.webp"
import Image from "next/image"
// Import translation hook
import { useTranslations } from 'next-intl';

export default function About() {
  // Initialize translations
  const t = useTranslations('AboutPage');

  // Keep appName and foundingYear as variables
  const appName = "French Guest Post"
  const foundingYear = "2025"

  // Use translations for milestones
  const milestones = [
    {
      year: "2018",
      title: t('milestone1Title'),
      description: t('milestone1Description', { appName }),
    },
    {
      year: "2019",
      title: t('milestone2Title'),
      description: t('milestone2Description'),
    },
    {
      year: "2020",
      title: t('milestone3Title'),
      description: t('milestone3Description'),
    },
    {
      year: "2021",
      title: t('milestone4Title'),
      description: t('milestone4Description'),
    },
    {
      year: "2022",
      title: t('milestone5Title'),
      description: t('milestone5Description'),
    },
    {
      year: "2023",
      title: t('milestone6Title'),
      description: t('milestone6Description', { appName }),
    },
  ]

  // Use translations for core values
  const coreValues = [
    {
      title: t('value1Title'),
      description: t('value1Description'),
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: t('value2Title'),
      description: t('value2Description'),
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: t('value3Title'),
      description: t('value3Description'),
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: t('value4Title'),
      description: t('value4Description'),
      icon: <Target className="h-6 w-6" />,
    },
  ]

  return (
    <>
    <Header/>
   
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-800/5 [mask-image:linear-gradient(to_bottom,transparent,black)] z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>
      
      {/* Header */}
      <div className="w-full pt-16 pb-12 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Use translated title and subtitle with variables */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {t('pageTitle', { appName })}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('pageSubtitle', { year: foundingYear })}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Company Overview */}
          <section>
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  {/* Use translated mission title and paragraphs */}
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {t('missionTitle')}
                  </h2>
                  <p className="text-slate-300 mb-4">
                    {t('missionParagraph1', { appName })}
                  </p>
                  <p className="text-slate-300">
                    {t('missionParagraph2')}
                  </p>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-slate-800/10"></div>
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="relative z-10 p-4">
                    <Image
                      src={ourMission}
                      alt="Our Mission"
                      className="w-full h-auto object-cover rounded-lg shadow-lg border border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Core Values */}
          <section>
            {/* Use translated values title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('valuesTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Values are already using translated data from the array */}
              {coreValues.map((value, index) => (
                <Card key={index} className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl hover:shadow-blue-900/10 transition-all duration-300 hover:border-slate-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 text-cyan-400 shadow-lg shadow-blue-900/5">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                          {value.title}
                        </h3>
                        <p className="text-slate-300">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Company Timeline */}
          <section>
            {/* Use translated journey title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t('journeyTitle')}
            </h2>
            <div className="relative border-l-2 border-blue-500/30 ml-4 pl-8 py-4">
              {/* Milestones are already using translated data from the array */}
              {milestones.map((milestone, index) => (
                <div key={index} className="mb-10 relative">
                  <div className="absolute -left-[10px] w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-900/30">
                    <div className="absolute inset-0.5 rounded-full bg-slate-900 opacity-25"></div>
                  </div>
                  <div className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-2 bg-slate-800/80 border border-blue-500/20 text-cyan-300">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-300">{milestone.description}</p>
                  
                  {/* Add connecting line animation */}
                  {index < milestones.length - 1 && (
                    <div className="absolute left-[-9px] top-[30px] bottom-[-30px] w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

