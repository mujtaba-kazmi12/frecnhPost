"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Shield, BookOpen, Copyright, AlertTriangle, Scale, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "../marketplace/footer"
import { Header } from "../marketplace/header"
import { useTranslations } from 'next-intl';

export default function TermsAndConditions() {
  const t = useTranslations('TermConditionPage');

  // Replace with your actual application name
  const appName = "French Guest Post"
  const supportEmail = "info@frenchguestpost.com"
  const jurisdiction = "France" // Replace with your actual jurisdiction

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-950 pb-16">
      {/* Header */}
      <div
        className="w-full py-16 px-4 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 1))",
          borderBottom: "1px solid rgba(56, 189, 248, 0.1)",
        }}
      >
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="container relative mx-auto max-w-4xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {t('pageSubtitle', { appName })}
          </p>
        </div>
      </div>


      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Section 1 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3 ">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <BookOpen className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section1Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300">
                {t('section1Content')}
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <FileText className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section2Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300 mb-4">{t('section2Intro')}</p>

              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="min-w-[20px] text-cyan-500">•</div>
                  <span>{t('section2Item1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-[20px] text-cyan-500">•</div>
                  <span>{t('section2Item2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-[20px] text-cyan-500">•</div>
                  <span>{t('section2Item3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <Copyright className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section3Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300">
                {t('section3Content', { appName })}
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <Shield className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section4Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300">
                {t('section4Content')}
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <AlertTriangle className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section5Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300">
                {t('section5Content')}
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <Scale className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section6Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300">
                {t('section6Content', { jurisdiction })}
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="border shadow-md bg-slate-900 border-slate-700">
            <CardHeader className="bg-slate-800/50 pb-3 pt-3" style={{marginTop:-25, borderRadius:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  <Mail className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t('section7Title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-slate-300 mb-4">
                {t('section7Intro')}
              </p>

              <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-500" />
                  <span className="font-medium text-slate-200">{t('section7EmailLabel')}</span>
                  <Link href={`mailto:${supportEmail}`} className="text-cyan-400 hover:underline">
                    {supportEmail}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

