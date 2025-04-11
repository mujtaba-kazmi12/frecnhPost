"use client"; // Add use client directive for hooks

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MessageSquare } from "lucide-react"
// Import hooks
import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const currentLocale = useLocale(); // Get current locale
  const t = useTranslations('footer'); // Initialize translations for footer namespace

  // Generate locale-prefixed links
  const localePrefixed = (path: string) => {
    // Avoid double slashes if path is just "/"
    return path === "/" ? `/${currentLocale}` : `/${currentLocale}${path}`;
  }

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-800/5 [mask-image:linear-gradient(to_bottom,transparent,black)] z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 relative z-10">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {/* Use locale-prefixed link for logo */}
            <Link href={localePrefixed("/")} className="flex items-center gap-2 mb-4 group">
              <div className="size-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:shadow-blue-500/40">
                <MessageSquare className="size-5 text-white" />
              </div>
              {/* Use translated logo text */}
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('logoText')}
              </span>
            </Link>
            {/* Use translated description */}
            <p className="text-slate-400 max-w-xs">
              {t('description')}
            </p>
            {/* Social links - assuming these don't need locale prefix */}
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                <Facebook className="size-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                <Instagram className="size-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            {/* Use translated titles and links */}
            <h3 className="font-semibold mb-4 text-white">{t('platformTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('platformLink1')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('platformLink2')}
                </Link>
              </li>
              <li>
                <Link href={localePrefixed("/pricing")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('platformLink3')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('platformLink4')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">{t('companyTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localePrefixed("/about-us")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('companyLink2')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('companyLink3')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('companyLink4')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">{t('supportTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localePrefixed("/faq")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('supportLink1')}
                </Link>
              </li>
              <li>
                <Link href={localePrefixed("/contact")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href={localePrefixed("/privacy-policy")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={localePrefixed("/term-condition")} className="text-slate-400 hover:text-cyan-400 transition-all duration-300">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Use translated copyright notice with year placeholder */}
          <p className="text-sm text-slate-500">{t('copyright', { year: currentYear })}</p>
          <div className="flex gap-4">
            {/* Use translated bottom links with locale prefix */}
            <Link href={localePrefixed("/contact")} className="text-sm text-slate-500 hover:text-cyan-400 transition-all duration-300">
              {t('bottomLinkContact')}
            </Link>
            <Link href={localePrefixed("/privacy-policy")} className="text-sm text-slate-500 hover:text-cyan-400 transition-all duration-300">
              {t('bottomLinkPrivacy')}
            </Link>
            <Link href={localePrefixed("/term-condition")} className="text-sm text-slate-500 hover:text-cyan-400 transition-all duration-300">
              {t('bottomLinkTerms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
