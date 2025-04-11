"use client"
import {
  ArrowLeft,
  Mail,
  Shield,
  User,
  BarChart,
  FileText,
  Share2,
  Cookie,
  UserCheck,
  RefreshCw,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "../marketplace/footer"
import { Header } from "../marketplace/header"
import { useTranslations, useLocale } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicyPage');
  const currentLocale = useLocale();

  const appName = "French Guest Post"
  const supportEmail = "support@frenchguestpost.com"

  const localePrefixed = (path: string) => `/${currentLocale}${path}`;

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
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="container relative mx-auto max-w-4xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>


      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="mb-10 border shadow-lg overflow-hidden bg-slate-900 border-slate-700 relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
          <CardHeader className="rounded-t-lg bg-slate-800/50 relative z-10" style={{ marginTop:-25 }}>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent pt-10">
              {t('introTitle')}
            </CardTitle>
            <CardDescription className="text-slate-400 pb-4">{t('introSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 relative z-10">
            <p className="text-base leading-7 text-slate-300">
              {t('introParagraph', { appName })}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Section 1 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <User className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section1Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-slate-300">{t('section1Intro')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold text-slate-200">{t('section1Item1Title')}</span> {t('section1Item1Text')}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">
                    <span className="font-semibold text-slate-200">{t('section1Item2Title')}</span> {t('section1Item2Text')}
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <BarChart className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section2Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-slate-300">{t('section2Intro')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section2Item1')}</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section2Item2')}</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section2Item3')}</div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <Shield className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section3Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-base leading-7 text-slate-300">
                {t('section3Paragraph')}
              </p>
              <div
                className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  <span className="font-medium text-slate-200">{t('section3BoxTitle')}</span>
                </div>
                <p className="text-sm text-slate-400">
                  {t('section3BoxText')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <Share2 className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section4Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-slate-300">
                {t('section4Intro')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section4Item1')}</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section4Item2')}</div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <Cookie className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section5Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-base leading-7 text-slate-300">
                {t('section5Paragraph')}
              </p>
              <Button className="mt-6 bg-slate-800 hover:bg-slate-700 text-cyan-500 border border-slate-700">
                {t('section5Button')}
              </Button>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <UserCheck className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section6Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-slate-300">{t('section6Intro')}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section6Item1')}</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                  </div>
                  <div className="text-slate-300">{t('section6Item2')}</div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <RefreshCw className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section7Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-base leading-7 text-slate-300">
                {t('section7Paragraph')}
              </p>
              <div
                className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-cyan-500" />
                  <span className="font-medium text-slate-200">{t('section7BoxTitle')}</span>
                </div>
                <p className="text-sm text-slate-400">
                  {t('section7BoxText')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="border shadow-lg overflow-hidden bg-slate-900 border-slate-700">
            <CardHeader className="rounded-t-lg bg-slate-800/50" style={{ marginTop:-25, paddingTop:15, paddingBottom:10 }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                >
                  <HelpCircle className="h-5 w-5 text-cyan-500" />
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('section8Title')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6 text-slate-300">
                {t('section8Intro')}
              </p>
              <div
                className="p-4 rounded-lg flex items-center gap-3 bg-slate-800/60 border border-slate-700"
              >
                <Mail className="h-5 w-5 text-cyan-500" />
                <div>
                  <span className="font-medium text-slate-200">{t('section8EmailLabel')}</span>
                  <Link href={`mailto:${supportEmail}`} className="ml-2 hover:underline text-cyan-400">
                    {supportEmail}
                  </Link>
                </div>
              </div>
              <Link href={localePrefixed("/contact")} passHref>
              <Button
                className="w-full mt-6 cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
              >
                <Mail className="mr-2 h-4 w-4" />
                  {t('section8Button')}
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

