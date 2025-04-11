'use client';

import { useCallback } from 'react';
import { ANALYTICS_CONFIG } from '@/lib/analytics-config';
import { useCart } from '@/context/CartContext';

// Define types for cart items
interface CartItem {
  item_currency: string;
  item_name: string;
  item_id: string;
  price: number;
  quantity: number;
  item_category?: string;
  language?: string;
  traffic?: string;
  domain_authority?: number;
  domain_rating?: number;
}

export function useAnalytics() {
  const { GA4_MEASUREMENT_ID } = ANALYTICS_CONFIG;
  const { cartItems } = useCart();

  const trackPageView = useCallback(
    (url: string, title?: string) => {
      if (
        typeof window !== 'undefined' &&
        window.gtag &&
        GA4_MEASUREMENT_ID
      ) {
        window.gtag('config', GA4_MEASUREMENT_ID, {
          page_path: url,
          page_title: title,
        });
      }

      // Push page view to dataLayer for GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: url,
          page_title: title,
        });
      }
    },
    [GA4_MEASUREMENT_ID]
  );

  // Add trackClick function for navigation events
  const trackClick = useCallback(
    (category: string, label: string, action: string = 'click') => {
      if (
        typeof window !== 'undefined' &&
        window.gtag &&
        GA4_MEASUREMENT_ID
      ) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
        });
      }

      // Push click event to dataLayer for GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: action,
          event_category: category,
          event_label: label,
        });
      }

      // Log for debugging purposes
      console.log(`Analytics: ${action} - ${category} - ${label}`);
    },
    [GA4_MEASUREMENT_ID]
  );

  // Add trackClickCart function for cart events
  const trackClickCart = useCallback(
    (eventName: string, currency: string, items: CartItem[]) => {
      if (
        typeof window !== 'undefined' &&
        window.gtag &&
        GA4_MEASUREMENT_ID
      ) {
        window.gtag('event', eventName, {
          currency: currency,
          items: items,
          value: items.reduce((total, item) => total + (item.price * item.quantity), 0),
        });
      }

      // Push cart event to dataLayer for GTM
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ecommerce: {
            currency: currency,
            items: items,
            value: items.reduce((total, item) => total + (item.price * item.quantity), 0),
          }
        });
      }

      // Log for debugging purposes
      console.log(`Analytics Cart Event: ${eventName}`, items);
    },
    [GA4_MEASUREMENT_ID]
  );

  // Function for tracking checkout events with full implementation
  const trackClickCartEvent = useCallback((eventName: string = 'begin_checkout', currency: string = 'EUR') => {
    if (!cartItems || cartItems.length === 0) {
      console.log("No cart items available for tracking");
      return;
    }
    
    console.log("🔍 GA trackClickCartEvent - Cart Items from Context:", cartItems);
    
    // Map cart items to the format expected by GA4
    const mappedItems = cartItems.map((item: any) => ({
      item_currency: item.currency || currency,
      item_name: item.siteName || item.title || "",
      item_id: item.id,
      price: typeof item.adjustedPrice === 'string' ? parseFloat(item.adjustedPrice) : (item.adjustedPrice || 0),
      quantity: 1,
      item_category: Array.isArray(item.category) ? item.category.join(', ') : (item.category || ""),
      language: item.language || "",
      traffic: item.monthlyTraffic !== undefined ? item.monthlyTraffic.toString() : "0",
      domain_authority: item.domainAuthority || 0,
      domain_rating: item.domainRatings || item.ratings || 0,
    }));
    
    console.log(`🔍 GA ${eventName} Event - Mapped Items from Context:`, mappedItems);
    
    // Track the event using trackClickCart
    trackClickCart(eventName, currency, mappedItems);
    
    console.log(`Cart event tracked: ${eventName}`);
    return mappedItems; // Return mapped items for potential further use
  }, [cartItems, trackClickCart]);

  return { trackPageView, trackClick, trackClickCart, trackClickCartEvent };
} 