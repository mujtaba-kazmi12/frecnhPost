"use client";

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, MessageSquare, ShoppingCart, UserRound, Globe, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { CartIndicator } from "@/components/cart/CartIndicator"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useLocale, useTranslations } from 'next-intl'
import { MobileNav } from "./mobile-nav"
import { useEffect, useState, useTransition } from "react"
import { motion } from "framer-motion"

// Define the gradient animation
const gradientAnimation = `
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`;

// Language names mapped to their locale keys for display
const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
};

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const t = useTranslations('Header')
  const [token, setToken] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const { trackClick } = useAnalytics()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const cookieToken = Cookies.get("token")
    const role = Cookies.get("role")
    if (cookieToken) {
      setToken(cookieToken)
      setUserRole(role || null)
    }
  }, [])
  
  // Add gradient animation styles to document head
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = gradientAnimation
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const isRegularUser = userRole === "user"

  const changeLocale = (nextLocale: string) => {
    startTransition(() => {
      const currentPathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
      const newPath = `/${nextLocale}${currentPathWithoutLocale || '/'}`
      router.replace(newPath)
    })
  }

  const handleNavigation = (sectionId: string, href: string) => {
    trackClick("Home navigation", sectionId, "click")
    router.push(`/${currentLocale}${href}`)
  }

  const handleLogoClick = () => {
    trackClick("Logo", "Logo", "click")
    router.push(`/${currentLocale}/`)
  }

  const localePrefixed = (path: string) => `/${currentLocale}${path}`

  const redirectToDashboard = () => {
    if (userRole === "user") {
      router.push("/user/dashboard")
    } else if (userRole === "publisher") {
      router.push("/publisher/dashboard")
    } else if (userRole === "moderator") {
      router.push("/moderator/dashboard")
    } else if (userRole === "superadmin") {
      router.push("/admin/dashboard")
    }
  }

  const handleLogout = () => {
    trackClick("logout", "logout", "click")
    Cookies.remove("token")
    Cookies.remove("role")
    Cookies.remove("userId")
    Cookies.remove("permissions")
    setToken(null)
    setUserRole(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo on the left */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
              <div className="size-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageSquare className="size-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">{t('logoText')}</span>
            </div>
          </motion.div>

          {/* Navigation in the center */}
          <motion.nav 
            className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Link
              href={localePrefixed("/")}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => handleNavigation("home", "/")}
            >
              {t('home')}
            </Link>
            <Link
              href={localePrefixed("/contact")}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => handleNavigation("contact", "/contact")}
            >
              {t('contact')}
            </Link>
            <Link
              href={localePrefixed("/about-us")}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => handleNavigation("about-us", "/about-us")}
            >
              {t('aboutUs')}
            </Link>
            <Link
              href={localePrefixed("/pricing")}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              onClick={() => handleNavigation("pricing", "/pricing")}
            >
              {t('pricing')}
            </Link>
          </motion.nav>

          {/* Right side elements */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {/* Language Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative">
                  <button
                    type="button"
                    className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-200 hover:bg-pos-100 p-0.5 shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105"
                    style={{backgroundSize: '200% 200%', animation: 'gradientShift 4s ease infinite'}}
                    aria-label={t('switchLanguage')}
                    disabled={isPending}
                  >
                    <span className="absolute inset-0.5 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors"></span>
                    <Globe className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors z-10 h-4 w-4" />
                  </button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 text-slate-200 shadow-xl border border-slate-800 rounded-lg p-2 w-48">
                <DropdownMenuLabel className="text-cyan-400">{t('switchLanguage')}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem
                  onClick={() => changeLocale('en')}
                  className={`hover:bg-slate-800 p-2 rounded-lg ${currentLocale === 'en' ? 'bg-slate-800 text-cyan-400 font-semibold' : ''} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isPending || currentLocale === 'en'}
                >
                  {languageNames['en']}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLocale('fr')}
                  className={`hover:bg-slate-800 p-2 rounded-lg ${currentLocale === 'fr' ? 'bg-slate-800 text-cyan-400 font-semibold' : ''} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isPending || currentLocale === 'fr'}
                >
                  {languageNames['fr']}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Indicator with Counter */}
            <motion.div 
              onClick={() => trackClick("cart navigation", "Clicked cart Link in header", "click")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative flex items-center justify-center"
            >
              <CartIndicator className="text-cyan-400" />
            </motion.div>

            {token && isRegularUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative">
                    <button
                      type="button"
                      className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-200 hover:bg-pos-100 p-0.5 shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105"
                      style={{backgroundSize: '200% 200%', animation: 'gradientShift 4s ease infinite'}}
                      aria-label="User profile"
                    >
                      <span className="absolute inset-0.5 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors"></span>
                      <UserRound className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors z-10 h-4 w-4" />
                    </button>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="bg-slate-900 text-slate-200 shadow-xl border border-slate-800 rounded-lg p-2 w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(localePrefixed("/user/orders"))
                    }}
                    className="hover:bg-slate-800 p-2 rounded-lg"
                  >
                    {t('dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-slate-800 p-2 rounded-lg"
                  >
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : token && !isRegularUser ? (
              <Button
                variant="outline"
                size="sm"
                className="text-sm border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={handleLogout}
              >
                {t('logout')}
              </Button>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="outline"
                    className="hidden md:block border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white transition-all"
                    onClick={() => {
                      router.push(localePrefixed("/sign-in"))
                    }}
                  >
                    {t('signIn')}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 items-center gap-2"
                    onClick={() => {
                      router.push(localePrefixed("/sign-up"))
                      trackClick("sign-up", "sign-up clicked", "click")
                    }}
                  >
                    {t('getStarted')} <ArrowRight className="size-4" />
                  </Button>
                </motion.div>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden p-2 rounded-lg shadow-md border-slate-700/50 bg-slate-800/50 text-slate-300">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-6 md:p-8 bg-slate-900 border-l border-slate-800">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
