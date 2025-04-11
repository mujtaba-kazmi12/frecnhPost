"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { CartIndicator } from "./CartIndicator";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface FloatingCartButtonProps {
  className?: string;
}

export function FloatingCartButton({ className }: FloatingCartButtonProps) {
  const t = useTranslations("cart");
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { trackClick } = useAnalytics();
  const isLoggedIn = !!Cookies.get("token");
  const userRole = Cookies.get("role");
  const isRegularUser = isLoggedIn && userRole === "user";
  const prevCartCount = useRef(cartCount);
  const [shouldBounce, setShouldBounce] = useState(false);

  // Detect cart count changes to trigger bounce
  useEffect(() => {
    if (cartCount > prevCartCount.current && cartCount > 0) {
      setShouldBounce(true);
      const timer = setTimeout(() => setShouldBounce(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  const handleCartClick = () => {
    setIsCartOpen(true);
    trackClick("floating cart", "Clicked floating cart button", "click");
    
    if (isLoggedIn && userRole !== "user") {
      toast.error(t('toast.cartClickRoleErrorTitle'), {
        description: t('toast.cartClickRoleErrorDesc'),
        duration: 5000,
      });
    }
  };

  // Define animations
  const floatingAnimation = {
    y: ["0%", "-15%", "0%"],
    transition: {
      y: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  const bounceAnimation = {
    y: ["0%", "-20%", "0%", "-12%", "0%", "-6%", "0%"],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  };

  // Glow animation
  const glowAnimation = {
    boxShadow: [
      "0 0 10px 2px rgba(56, 189, 248, 0.3)",
      "0 0 18px 4px rgba(56, 189, 248, 0.5)",
      "0 0 10px 2px rgba(56, 189, 248, 0.3)"
    ],
    transition: {
      repeat: Infinity,
      duration: 3
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Ensure floating cart is clickable even with overlays */
        .floating-cart-button {
          pointer-events: auto !important;
          isolation: isolate;
        }
        
        /* Target ShadCN drawer overlay specifically */
        [role="dialog"] {
          pointer-events: none !important;
        }
        
        [role="dialog"] > * {
          pointer-events: auto !important;
        }
        
        /* Make drawer overlays not block the floating cart button */
        [data-type="overlay"] {
          pointer-events: none !important;
        }
      `}</style>
      
      <AnimatePresence>
        {!isCartOpen && (
          <motion.div 
            className={`fixed top-1/2 -translate-y-1/2 right-6 z-[1050] floating-cart-button ${className}`}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ pointerEvents: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              handleCartClick();
            }}
          >
            <motion.div
              className="relative"
              animate={shouldBounce ? bounceAnimation : floatingAnimation}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-xl"
                animate={glowAnimation}
                initial={{ opacity: 0.6 }}
              ></motion.div>
              
              <motion.button
                aria-label={t('ariaLabel')}
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && isRegularUser && (
                  <Badge className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs min-w-5 h-5 flex items-center justify-center rounded-full px-1 border border-blue-600/30 shadow-md">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer controlled by the floating button */}
      <CartIndicator isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
} 