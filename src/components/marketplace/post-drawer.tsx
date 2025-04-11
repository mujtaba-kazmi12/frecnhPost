"use client"

import { X, Calendar, ExternalLink, Star, Users, Eye, Globe, LogIn } from "lucide-react"
import { useTranslations } from 'next-intl';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/Table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAnalytics } from "@/hooks/useAnalytics"

// Custom animation styles - simplified like cart drawer
const customStyles = `
  .drawer-content-right {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    max-width: 500px !important;
    box-shadow: -10px 0 30px rgba(2, 6, 23, 0.3) !important;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 949 !important; /* Lower than floating cart */
    will-change: transform;
    pointer-events: auto !important;
    background-color: rgba(15, 23, 42, 0.95) !important;
    backdrop-filter: blur(24px) !important;
    border-left: 1px solid rgba(30, 58, 138, 0.3) !important;
  }

  .drawer-content-right[data-state="open"] {
    transform: translateX(0);
  }

  .drawer-content-right[data-state="closed"] {
    transform: translateX(100%);
  }
  
  /* Ensure the drawer backdrop doesn't block higher z-index elements */
  [data-sonner-toast][role=status] {
    z-index: 1060 !important;
  }

  .drawer-header {
    border-bottom: 1px solid rgba(30, 58, 138, 0.2) !important;
    padding-bottom: 1.25rem;
    padding-top: 0.5rem;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%);
    backdrop-filter: blur(20px);
  }

  .drawer-footer {
    border-top: 1px solid rgba(30, 58, 138, 0.2) !important;
    padding-top: 1.25rem;
    background: linear-gradient(0deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%);
    backdrop-filter: blur(20px);
  }

  .stat-card {
    background-color: rgba(30, 58, 138, 0.15);
    border: 1px solid rgba(37, 99, 235, 0.15);
    border-radius: 0.75rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .stat-card:hover {
    background-color: rgba(30, 58, 138, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 6, 23, 0.15);
  }

  .stat-icon {
    background: linear-gradient(to bottom right, rgb(37, 99, 235), rgb(6, 182, 212));
    padding: 0.75rem;
    border-radius: 0.75rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(6, 182, 212, 0.2);
  }

  .site-link {
    color: rgb(6, 182, 212);
    transition: all 0.2s ease;
    position: relative;
    text-decoration: none;
    font-weight: 500;
  }

  .site-link:hover {
    color: rgb(125, 211, 252);
  }
  
  .site-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: rgb(125, 211, 252);
    transition: width 0.3s ease;
  }
  
  .site-link:hover::after {
    width: 100%;
  }
  
  .product-info-section {
    background-color: rgba(15, 23, 42, 0.5);
    border-radius: 0.75rem;
    border: 1px solid rgba(30, 41, 59, 0.4);
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .product-info-section:hover {
    border-color: rgba(30, 58, 138, 0.3);
    box-shadow: 0 4px 20px -5px rgba(6, 182, 212, 0.1);
  }
  
  .info-list {
    list-style-type: none;
    padding-left: 0;
  }
  
  .info-list li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(30, 41, 59, 0.2);
  }
  
  .info-list li:last-child {
    border-bottom: none;
  }
  
  .info-list li::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 0.75rem;
    background: linear-gradient(to right, rgb(37, 99, 235), rgb(6, 182, 212));
    border-radius: 50%;
  }
`

interface PostDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: Product | null
  loading?: boolean;
}

export function PostDrawer({ isOpen, onOpenChange, post }: PostDrawerProps) {
  const t = useTranslations('marketplace');
  const tNav = useTranslations('navigation');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, error: cartError } = useCart();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { trackClickCart } = useAnalytics();

  // Only add styles once - like cart drawer
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleAddToCart = async () => {
    if (!post) return;

    // Check if user is logged in by looking for token
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");

    if (!token) {
      // Close the drawer first, then show the auth modal
      onOpenChange(false);
      setTimeout(() => {
        setShowAuthModal(true);
      }, 300); // Match transition duration of drawer closing
      return;
    }

    // Check if the user has the "user" role
    if (userRole !== "user") {
      toast.error(t('toast.roleErrorTitle'), {
        description: t('toast.roleErrorDesc'),
        duration: 3000,
      });
      return;
    }

    setIsAdding(true);
    try {
      const result = await addToCart(post);
      console.log("Add to cart response:", result);
      if (result.message.includes("not authenticated") || result.message.includes("authenticated")) {
        // Close the drawer first, then show the auth modal
        onOpenChange(false);
        setTimeout(() => {
          setShowAuthModal(true);
        }, 300); // Match transition duration of drawer closing
        return;
      }
      // Show toast based on success status
      if (result.success) {
        // For single item add, we still use the direct method with the specific item
        // because trackClickCartEvent gets all items from the cart context
        const mappedItem = {
          item_currency: post.currency || "EUR",
          item_name: post.siteName || post.title || "",
          item_id: post.id,
          price: typeof post.price === 'string' ? parseFloat(post.price) : (post.price || 0),
          quantity: 1,
          item_category: Array.isArray(post.category) ? post.category.join(", ") : (post.category || ""),
          language: post.language || "",
          traffic: post.monthlyTraffic !== undefined ? post.monthlyTraffic.toString() : "0",
          domain_authority: post.domainAuthority || 0,
          domain_rating: post.domainRatings || 0,
        };

        console.log("🔍 GA Add to Cart Event - Mapped Item:", mappedItem);
        console.log("🔍 GA Add to Cart Event - Raw Post Data:", post);

        trackClickCart("add_to_cart", post.currency || "EUR", [mappedItem]);

        toast.success(result.message || t('toast.addSuccessTitle'), {
          description: t('toast.addSuccessDesc', { postTitle: post.siteName || post.title || t('drawer.untitledPost') }),
          duration: 3000,
        });
      } else {
        toast.error(result.message || t('toast.addErrorTitle'), {
          description: t('toast.addErrorDesc'),
          duration: 3000,
        });
      }
    }
    catch (error) {
      toast.error(t('toast.unexpectedErrorTitle'), {
        description: t('toast.unexpectedErrorDesc'),
        duration: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleLoginRedirect = () => {
    setShowAuthModal(false);
    router.push("/sign-in");
  };

  if (!post) return null

  // Format values for display
  const postTitle = post.siteName || post.title || t('drawer.untitledPost')
  const postCategory = Array.isArray(post.category)
    ? post.category.join(', ')
    : post.category || t('drawer.uncategorized')
  const postAuthor = post.productHandeledBy || post.author || t('drawer.unknownAuthor')
  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : post.dateAdded
      ? new Date(post.dateAdded.toString()).toLocaleDateString()
      : t('drawer.unknownDate')
  const country = post.country || t('drawer.international')
  const numPrice = typeof post.price === 'string'
    ? parseFloat(post.price)
    : post.price
  const currency = post.currency || 'USD'

  return (
    <>
      <style jsx global>{`
        /* Ensure drawer overlays don't block elements with higher z-index */
        [data-type="overlay"] {
          pointer-events: none !important;
          z-index: 948 !important; /* Lower than drawer content */
        }
        .drawer-content-right {
          pointer-events: auto !important;
        }
      `}</style>
      
      <Drawer 
        open={isOpen} 
        onOpenChange={onOpenChange} 
        direction="right"
        shouldScaleBackground={false}
      >
        <DrawerContent className="drawer-content-right">
          <div className="h-full flex flex-col">
            <DrawerHeader className="drawer-header">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {postTitle}
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
              
              <div className="mt-3 flex flex-col gap-3">
                <span className="max-w-xs">
                  <Badge
                    variant="outline"
                    className="border-slate-700 text-cyan-400 bg-slate-800/50 break-words whitespace-normal line-clamp-3 max-w-full px-3 py-1.5 text-xs"
                  >
                    {postCategory}
                  </Badge>
                </span>

                <div className="flex flex-wrap items-center text-sm text-slate-400 gap-2">
                  <div className="flex items-center bg-slate-800/50 px-2.5 py-1.5 rounded-lg">
                    <Users className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                    <span>{postAuthor}</span>
                  </div>
                  
                  <div className="flex items-center bg-slate-800/50 px-2.5 py-1.5 rounded-lg">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                    <span>{postDate}</span>
                  </div>
                  
                  <div className="flex items-center bg-slate-800/50 px-2.5 py-1.5 rounded-lg">
                    <Globe className="h-3.5 w-3.5 mr-1.5 text-blue-400" />
                    <span>{country}</span>
                  </div>
                </div>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-auto p-4">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: currency,
                      }).format(numPrice)}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= (post.rating) ? 'text-cyan-400 fill-cyan-400' : 'text-slate-700'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-slate-400">
                        ({post.views || 0} {t('product.viewsSuffix')})
                      </span>
                    </div>
                  </div>

                  {post.domainAuthority && (
                    <div className="flex flex-col items-center justify-center bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{post.domainAuthority}</span>
                      <span className="text-xs text-slate-400">{t('product.da')}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-6 text-slate-300">
                  <div className="product-info-section">
                    <p className="text-slate-300 mb-4">
                      {t('drawer.premiumDescription', { category: postCategory })}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="stat-card">
                        <div className="stat-icon">
                          <Star className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-400">{t('drawer.domainRating')}</p>
                          <p className="text-lg font-bold text-white">{post.domainRatings || t('product.notAvailable')}</p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-400">{t('drawer.monthlyTraffic')}</p>
                          <p className="text-lg font-bold text-white">
                            {post.monthlyTraffic ? new Intl.NumberFormat().format(post.monthlyTraffic) : t('product.notAvailable')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product-info-section">
                    <h4 className="font-medium mb-4 text-cyan-300">{t('drawer.whatsIncluded')}</h4>
                    
                    {post.sampleLink && (
                      <p className="text-sm text-slate-300 mb-3 flex items-center">
                        <span className="text-white min-w-32">{t('drawer.sampleLink')}: </span>
                        <a
                          href={post.sampleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="site-link ml-2"
                        >
                          {t('drawer.viewSample')}
                        </a>
                      </p>
                    )}

                    {post.websiteUrl && (
                      <p className="text-sm text-slate-300 mb-3 flex items-center">
                        <span className="text-white min-w-32">{t('drawer.websiteUrl')}: </span>
                        <a
                          href={post.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="site-link ml-2"
                        >
                          {t('drawer.visitWebsite')}
                        </a>
                      </p>
                    )}
                    
                    {post.adjustedPrice !== undefined && (
                      <p className="text-sm text-slate-300 mb-3 flex items-center">
                        <span className="text-white min-w-32">{t('drawer.adjustedPrice')}: </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 ml-2 font-medium">€{post.adjustedPrice}</span>
                      </p>
                    )}
                  </div>

                  <div className="product-info-section">
                    <h4 className="font-medium mb-4 text-cyan-300">{t('drawer.whatsIncluded')}</h4>
                    <ul className="info-list">
                      {post.domainAuthority && (
                        <li>{t('drawer.publicationOnDomain', { da: post.domainAuthority })}</li>
                      )}
                      {post.linkType && (
                        <li>
                          {t('drawer.backlink', { 
                            type: post.linkType === "doFollow" 
                              ? t('drawer.doFollow') 
                              : t('drawer.noFollow')
                          })}
                        </li>
                      )}               
                      {post.maxLinkAllowed && <li>{t('drawer.maxLinks', { count: post.maxLinkAllowed })}</li>}
                      {post.Wordlimit && <li>{t('drawer.wordLimit', { limit: post.Wordlimit })}</li>}
                      {post.turnAroundTime && <li>{t('drawer.turnaroundTime', { time: post.turnAroundTime })}</li>}
                      {post.liveTime && <li>{t('drawer.liveTime', { time: post.liveTime })}</li>}
                    </ul>
                  </div>

                  <div className="product-info-section">
                    <h4 className="font-medium mb-4 text-cyan-300">{t('drawer.requirements')}</h4>
                    <ul className="info-list">
                      <li>
                        {t('drawer.originalContent', { wordLimit: post.Wordlimit ? `(${post.Wordlimit} ${t('drawer.words')})` : t('drawer.defaultWordLimit') })}
                      </li>
                      <li>{t('drawer.topicRelevance', { category: postCategory })}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DrawerFooter className="drawer-footer">
              <div className="grid gap-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 text-white py-3 rounded-xl"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('drawer.addingToCart')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">{t('product.add_to_cart')}</span>
                      <span className="text-base font-bold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: currency,
                        }).format(numPrice)}
                      </span>
                    </div>
                  )}
                </Button>

                {post.websiteUrl && (
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white py-3 rounded-xl group bg-slate-800"
                    onClick={() => window.open(post.websiteUrl, "_blank")}
                  >
                    <div className="flex items-center justify-center">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:text-cyan-400 transition-colors" />
                      <span>{t('drawer.visitSite')}</span>
                    </div>
                  </Button>
                )}
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Authentication Modal - Use translations */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="bg-slate-900 border border-slate-800 text-white shadow-xl shadow-blue-900/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {t('drawer.loginRequired')}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {t('drawer.loginDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <LogIn className="h-12 w-12 text-cyan-400" />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={() => setShowAuthModal(false)}
            >
              {t('drawer.cancel')}
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 text-white"
              onClick={handleLoginRedirect}
            >
              {t('drawer.goToLogin')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

