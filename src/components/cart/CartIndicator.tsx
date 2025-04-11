"use client"

import { useState, useEffect } from "react"
// import { useCart } from "@/app/GlobalStore/CartProviderContext"
import { useCart } from "@/context/CartContext"
import { ShoppingCart, X, LogIn, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"
import { useRouter, useParams } from "next/navigation"
import { getCartApi, deleteCartApi } from "@/app/[locale]/Services/CartService"
// import { ErrorPopup } from "@/app/components/ErrorPopup"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics"
import { useTranslations } from 'next-intl';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Custom animation styles similar to post-drawer
const customStyles = `
  .cart-drawer-right {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    max-width: 500px !important;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5) !important;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000 !important;
    will-change: transform;
    background-color: rgba(15, 23, 42, 0.98) !important;
    backdrop-filter: blur(16px) !important;
    border-left: 1px solid rgba(6, 182, 212, 0.2) !important;
  }

  .cart-drawer-right[data-state="open"] {
    transform: translateX(0);
  }

  .cart-drawer-right[data-state="closed"] {
    transform: translateX(100%);
  }

  /* Enhanced animations */
  .cart-item-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .cart-item-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  
  /* Gradient animation for cart button */
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
`

interface CartIndicatorProps {
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartIndicator({ className, isOpen: externalIsOpen, onOpenChange }: CartIndicatorProps) {
  const t = useTranslations('cart');
  const tNav = useTranslations('navigation');
  const { 
    cartCount, 
    loading: contextLoading, 
    refreshCart, 
    cartItems: contextCartItems,
    isCartOpen: contextIsOpen,
    setIsCartOpen: contextSetIsOpen
  } = useCart();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();
  const { locale } = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isLoggedIn = !!Cookies.get("token");
  const userRole = Cookies.get("role");
  const isRegularUser = isLoggedIn && userRole === "user";
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [localCartCount, setLocalCartCount] = useState<number>(0);
  const getCookie = (name: string) => Cookies.get(name) || null;
  const { trackClick, trackClickCart, trackClickCartEvent } = useAnalytics();
  
  // Determine if drawer is controlled externally, by context, or internally
  const isExternallyControlled = externalIsOpen !== undefined && onOpenChange !== undefined;
  const isContextControlled = !isExternallyControlled;
  
  // Use the appropriate open state and setter based on control mode
  const isOpen = isExternallyControlled ? externalIsOpen : contextIsOpen;
  const setIsOpen = (open: boolean) => {
    if (isExternallyControlled) {
      onOpenChange(open);
    } else {
      contextSetIsOpen(open);
    }
  };
  
  // Update local cart items when context cart items change
  useEffect(() => {
    if (contextCartItems && contextCartItems.length > 0) {
      console.log("Updating local cart items from context:", contextCartItems.length);
      setCartItems(contextCartItems);
      setLocalCartCount(contextCartItems.length);
      
      // Calculate total amount from context cart items
      const newTotal = contextCartItems.reduce(
        (sum: number, item: any) => sum + Number(item.adjustedPrice || item.price || 0), 
        0
      );
      setTotalAmount(newTotal);
    } else if (contextCartItems) {
      // If contextCartItems is empty but defined, update local state
      setCartItems([]);
      setLocalCartCount(0);
      setTotalAmount(0);
    }
  }, [contextCartItems]);
  
  // Style setup
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = customStyles
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Fetch cart data on initial mount, not just when drawer opens
  useEffect(() => {
    if (isRegularUser) {
      console.log("Initial cart data fetch");
      fetchCartData(); 
    }
  }, [isRegularUser]);

  // When drawer opens, refresh cart data
  useEffect(() => {
    if (isOpen && isRegularUser) {
      console.log("Refreshing cart data on drawer open...");
      fetchCartData();
    }
  }, [isOpen, isRegularUser]);

  const fetchCartData = async () => {
    if (!isRegularUser) return;
    
    setLocalLoading(true);
    try {
      // Directly fetch from API instead of using refreshCart to avoid potential issues
      const userId = getCookie("userId");
      if (!userId) {
        setLocalLoading(false);
        return;
      }
      
      console.log("Fetching cart data directly for userId:", userId);
      const responseData = await getCartApi(userId, setErrorMessage);
      
      if (!responseData || !responseData.data) {
        setLocalLoading(false);
        return;
      }
      
      // Process the response
      const carts = Array.isArray(responseData.data) ? responseData.data : [];
      const userCart = carts.find((cart: any) => String(cart.user?.id) === String(userId));
      
      if (userCart && userCart.products) {
        const cartProducts = userCart.products.map((item: any) => ({
          ...item,
          productId: item.id,
        }));
        
        console.log("Cart Products directly fetched:", cartProducts.length);
        setCartItems(cartProducts);
        setLocalCartCount(cartProducts.length);
        
        const newTotal = cartProducts.reduce(
          (sum: number, item: any) => sum + Number(item.adjustedPrice || item.price || 0), 
          0
        );
        setTotalAmount(newTotal);
      } else {
        setCartItems([]);
        setLocalCartCount(0);
        setTotalAmount(0);
      }
      
      // Also refresh the context for consistency
      await refreshCart();
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    if (!isRegularUser) {
      toast.error(t('toast.removeItemRoleError'));
      return;
    }
    
    setLocalLoading(true);
    try {
      const data = await deleteCartApi(productId, setErrorMessage); // Already returns JSON
  
      if (!data) {
        setLocalLoading(false);
        return;
      }
  
      // ✅ Handle session expiration error
      if (data.message === "Invalid or expired token") {
        setErrorMessage("Please login first");
        toast.error(t('toast.sessionExpiredTitle'), { description: t('toast.sessionExpiredDesc') });
  
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
        setLocalLoading(false);
        return;
      }
  
      // ✅ Fetch cart data again after item deletion
      await fetchCartData();
      
      // Also immediately update the local cart count by removing the item from local state
      setCartItems(prev => {
        const updatedItems = prev.filter(item => item.id !== productId);
        setLocalCartCount(updatedItems.length);
        return updatedItems;
      });
      
      // Show confirmation toast
      toast.success(t('toast.removeSuccessTitle'), { description: t('toast.removeSuccessDesc') });
      
    } catch (error) {
      console.error("Error removing item:", error);
      setErrorMessage(t('toast.removeErrorDesc'));
      toast.error(t('toast.removeErrorTitle'), { description: t('toast.removeErrorDesc') });
      setLocalLoading(false);
    }
  };
  
  const handleLogin = () => {
    setIsOpen(false);
    // Delay navigation until the drawer closing animation (300ms) completes
    setTimeout(() => {
      router.push("/sign-in");
    }, 300); 
  }
 
  const handleCheckout = () => {
    if (!isRegularUser) {
      toast.error(t('toast.removeItemRoleError'));
      return;
    }
    
    setIsOpen(false)

    // Calculate total amount from cart items
    const total = cartItems.reduce((sum, item) => sum + Number(item.adjustedPrice || item.price || 0), 0)

    // Create query parameters with total amount and cart items
    const queryParams = new URLSearchParams()
    queryParams.append("total", total.toString())

    // Add cart item IDs as a JSON string
    const productIds = cartItems.map((item) => item.id)
    queryParams.append("cartItems", JSON.stringify(productIds))

    // Track checkout event - use both methods for completeness
    trackClickCartEvent('checkout');
    
    // Also track with specific cart items from this component
    // This is useful when we need to track specific items that might not be in the context
    const mappedItems = cartItems.map((item) => ({
      item_currency: item.currency || "EUR",
      item_name: item.siteName || "",
      item_id: item.id,
      price: Number(item.adjustedPrice || item.price || 0),
      quantity: 1,
      item_category: item.category ? (Array.isArray(item.category) ? item.category.join(", ") : item.category) : "",
      language: item.language || "",
      traffic: item.monthlyTraffic !== undefined ? item.monthlyTraffic.toString() : "0",
      domain_authority: item.domainAuthority || 0,
      domain_rating: item.domainRatings || item.ratings || 0,
    }));
    
    console.log("🔍 GA Checkout Event - Cart Items:", cartItems);
    console.log("🔍 GA Checkout Event - Mapped Items:", mappedItems);
    
    trackClickCart("checkout", "EUR", mappedItems);
    
    router.push(`/checkout?${queryParams.toString()}`)
  }

  const handleCartClick = () => {
    setIsOpen(true);
    trackClick("cart navigation", "Clicked cart Link", "click");
    
    if (isLoggedIn && userRole !== "user") {
      toast.error(t('toast.cartClickRoleErrorTitle'), {
        description: t('toast.cartClickRoleErrorDesc'),
        duration: 5000,
      });
    }
  }

  // Cart loading state - use local loading state instead of context loading
  const isCartLoading = localLoading;
  
  // Use local cart count for display if available, otherwise fall back to context cart count
  const displayCartCount = localCartCount > 0 ? localCartCount : cartCount;

  return (
    <>
      {/* Only show the button when not controlled externally */}
      {!isExternallyControlled && (
        <div className={`relative ${className}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCartClick}
                  type='button'
                  className='group relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-200 hover:bg-pos-100 p-0.5 shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105'
                  style={{backgroundSize: '200% 200%', animation: 'gradientShift 4s ease infinite'}}
                  aria-label='Cart'
                >
                  <span className='absolute inset-0.5 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors'></span>
                  <div className='relative flex justify-center items-center'>
                    <ShoppingCart
                      className='relative text-cyan-400 group-hover:text-cyan-300 transition-colors z-10'
                      size={16}
                    />
                    {displayCartCount > 0 && (
                      <div className='absolute -top-2.5 -right-5 flex items-center justify-center min-w-5 h-5 px-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-600/20 border border-blue-400/20'>
                        {displayCartCount}
                      </div>
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <div className='flex flex-col text-center'>
                  <div className='flex items-center gap-1.5 px-1'>
                    <ShoppingCart size={14} className="text-cyan-400" />
                    <span className="text-white font-medium">
                      {displayCartCount > 0 ? `${displayCartCount} ${displayCartCount === 1 ? 'item' : 'items'}` : 'Empty'}
                    </span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
  
      {/* Cart Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerContent className="cart-drawer-right h-full flex flex-col bg-slate-900 border-l border-cyan-900/40">
          <div className="flex justify-between items-center p-4 border-b border-cyan-900/30 bg-gradient-to-r from-slate-900 to-slate-900/95">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent flex items-center gap-2">
              <ShoppingCart className="text-cyan-400" size={20} />
              {t('title')}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 transition-colors border border-transparent hover:border-cyan-900/50"
            >
              <X className="text-slate-400 hover:text-cyan-300" size={22} />
            </button>
          </div>
  
          <div className="flex-1 overflow-y-auto">
            {isCartLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin h-8 w-8 text-cyan-400" />
              </div>
            ) : isLoggedIn ? (
              userRole !== "user" ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="rounded-full bg-slate-800/80 border border-cyan-900/30 p-4 mb-4 text-cyan-400 shadow-lg shadow-cyan-900/10">
                    <ShoppingCart className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t('unavailable.title')}</h3>
                  <p className="text-slate-400 mt-2">
                    {t('unavailable.description')}
                  </p>
                </div>
              ) : cartItems.length > 0 ? (
                <div className="p-4 space-y-3">
                  {/* Log items for debugging */}
                  {(() => { console.log("Rendering cartItems in drawer:", cartItems); return null; })()}
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id || index} 
                      className="relative mb-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-900/60 transition-all hover:shadow-md hover:shadow-cyan-900/10 group"
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-cyan-50 transition-colors">{item.siteName}</h3>
                        <span className="font-bold text-cyan-300 bg-slate-800 px-2 py-0.5 rounded-md border border-cyan-900/30">&euro;{item.adjustedPrice || item.price}</span>
                      </div>
  
                      <div className="text-sm text-slate-400 mb-2">
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-cyan-300 hover:underline transition-colors"
                        >
                          {item.websiteUrl}
                        </a>
                      </div>
  
                      <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-3">
                        {item.country && (
                          <span className="bg-slate-700/80 px-2 py-1 rounded-full text-cyan-300 border border-cyan-900/20">{t('item.countryLabel', { country: item.country })}</span>
                        )}
                        {item.linkType && (
                          <span className="bg-slate-700/80 px-2 py-1 rounded-full text-cyan-300 border border-cyan-900/20">{t('item.typeLabel', { type: item.linkType })}</span>
                        )}
                        {item.monthlyTraffic && (
                          <span className="bg-slate-700/80 px-2 py-1 rounded-full text-cyan-300 border border-cyan-900/20">{t('item.trafficLabel', { traffic: item.monthlyTraffic })}</span>
                        )}
                      </div>
  
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-slate-600 hover:bg-slate-700 hover:text-red-300 transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t('item.removeButton')}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="rounded-full bg-slate-800/80 border border-cyan-900/30 p-4 mb-4 text-cyan-400 shadow-lg shadow-cyan-900/10">
                    <ShoppingCart className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t('empty.title')}</h3>
                  <p className="text-slate-400 mt-2">
                    {t('empty.description')}
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="rounded-full bg-slate-800/80 border border-cyan-900/30 p-4 mb-4 text-cyan-400 shadow-lg shadow-cyan-900/10">
                  <LogIn className="h-7 w-7" />
                </div>
                <div className="space-y-2 mt-4">
                  <h3 className="text-lg font-semibold text-white">{t('loginRequired.title')}</h3>
                  <p className="text-slate-400">
                    {t('loginRequired.description')}
                  </p>
                </div>
                <Button
                  className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  onClick={handleLogin}
                >
                  {tNav('login')}
                </Button>
              </div>
            )}
          </div>
  
          <DrawerFooter className="border-t border-cyan-900/30 bg-gradient-to-b from-transparent to-slate-900/80">
            {isRegularUser && cartItems.length > 0 && (
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-white">{t('footer.totalLabel')}</span>
                  <span className="text-cyan-300 bg-slate-800 px-3 py-1 rounded-md border border-cyan-900/30">&euro;{totalAmount}</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20"
                  onClick={handleCheckout}
                >
                  {t('footer.checkoutButton')}
                </Button>
              </div>
            )}
            <Button 
              variant="outline" 
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-100 hover:border-cyan-900/50 transition-colors bg-slate-800" 
              onClick={() => setIsOpen(false)}
            >
              {t('footer.closeButton')}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

