"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Upload, Link2, FileText, ArrowRight, ArrowLeft, Check, MessageSquare, UserRound, Menu } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"
import type { CheckOutApiResponse } from "@/types/checkout"
import {
  handleClientOrderRequest,
  handleFileUpload,
  fetchPaymentServices,
  checkPaymentStatus,
} from "@/app/[locale]/Services/ClientContentService"
import { handleOrderRequest } from "@/app/[locale]/Services/checkout"
import {
  getUserInfo,
  updateUserInfo,
  fetchCountryCodes,
  fetchCountriesAndCities,
} from "@/app/[locale]/Services/OrderPlace"
import { getCartApi } from "@/app/[locale]/Services/CartService"
import { useCart } from "@/context/CartContext"
import { useAnalytics } from "@/hooks/useAnalytics"
import { Footer } from "@/components/marketplace/footer"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function CheckoutContent() {
  const t = useTranslations("checkout")
  const tNav = useTranslations("navigation")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast: uiToast } = useToast()
  const [contentOption, setContentOption] = useState<string>("client")
  const [wordCount, setWordCount] = useState<string>("650")
  const [fileOption, setFileOption] = useState<string>("file")
  const [checkoutStep, setCheckoutStep] = useState<number>(1)
  const { deleteCart } = useCart()
  const { trackClick, trackClickCart, trackClickCartEvent } = useAnalytics()
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
  })
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [backupEmail, setBackupEmail] = useState("")
  const [keyword, setKeyword] = useState("")
  const [topic, setTopic] = useState("")
  const [postLink, setPostLink] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>("")
  const [fileType, setFileType] = useState("url")
  const [wordLimit, setWordLimit] = useState<string>("650")
  const [currency, setCurrency] = useState("")
  const [network, setNetwork] = useState("")
  const [totalAmount, setTotalAmount] = useState(49.99)
  const [payerAmount, setPayerAmount] = useState<number>(0)
  const [payerCurrency, setPayerCurrency] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [showQrPopup, setShowQrPopup] = useState<boolean>(false)
  const [isInitialLoading, setIsInitialLoading] = useState(false)
  const [isPollingLoading, setIsPollingLoading] = useState(false)
  const [editMode, setEditMode] = useState<boolean>(true)
  const [userInfoLoaded, setUserInfoLoaded] = useState(false)
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [countryCodes, setCountryCodes] = useState<any[]>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const [isLoadingCountryCodes, setIsLoadingCountryCodes] = useState(false)
  const [errorPopup, setErrorPopup] = useState(false)
  const [successPopup, setSuccessPopup] = useState(false)
  const [checkoutCartItems, setCheckoutCartItems] = useState<any[]>([])
  const [userFirstName, setUserFirstName] = useState<string>("")
  const [clientNote, setClientNote] = useState("")
  const [isLoadingPaymentOptions, setIsLoadingPaymentOptions] = useState(false)

  const getWordLimitPrice = () => {
    if (contentOption !== "publisher") return 0
    
    const wordCountNum = parseInt(wordCount)
    if (wordCountNum <= 650) return 0
    if (wordCountNum <= 750) return 5
    if (wordCountNum <= 850) return 10
    return 10
  }

  const getCartItemsFromIds = async (productIds: string[]) => {
    if (!productIds || productIds.length === 0) return []

    const userId = Cookies.get("userId")
    if (!userId) return []

    try {
      const response = await getCartApi(userId, setError)
      if (!response || !response.data) return []

      const carts = Array.isArray(response.data) ? response.data : []
      const userCart = carts.find((cart: any) => String(cart.user?.id) === String(userId))

      if (!userCart || !userCart.products) return []

      return userCart.products.filter((product: any) => productIds.includes(product.id))
    } catch (error) {
      console.error("Error fetching cart items:", error)
      return []
    }
  }

  useEffect(() => {
    const urlTotal = searchParams.get("total")
    const urlCartItems = searchParams.get("cartItems")

    if (urlTotal) {
      setTotalAmount(Number.parseFloat(urlTotal))
    }

    if (urlCartItems) {
      try {
        const productIds = JSON.parse(urlCartItems)
        console.log("Product IDs from URL:", productIds)

        getCartItemsFromIds(productIds).then((items) => {
          setCheckoutCartItems(items)
          console.log("Checkout cart items:", items)
        })
      } catch (error) {
        console.error("Error parsing cart items from URL:", error)
      }
    }
  }, [searchParams])

  const getCookie = (name: string): string => {
    const cookieValue = Cookies.get(name)
    return cookieValue ? cookieValue : "[]"
  }

  const handleError = (messageKey: string, options?: any) => {
    const translatedMessage = t(messageKey, options)
    setError(translatedMessage)
    toast.error("Error", {
      description: translatedMessage,
    })
  }

  // Reconstructed calculateCartTotal function
  const calculateCartTotal = () => {
    const itemsTotal = checkoutCartItems.reduce((sum, item) => sum + Number(item.adjustedPrice || 0), 0)
    return itemsTotal
  }

  // Reconstructed fetchUserInfo function
  const fetchUserInfo = async () => {
    setLoading(true)
    try {
      const response = await getUserInfo((msg) => handleError("toast.errorLoadUserInfo"))
      if (response?.data) {
        const user = response.data
        setFirstName(user.firstName || "")
        setLastName(user.lastName || "")
        setEmail(user.email || "")
        setPersonalInfo({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phoneNo || "",
          country: user.country || "",
          city: user.city || "",
          postalCode: user.postalCode || "",
        })

        // Specifically check for phoneNo field in the API response
        if (user.phoneNo) {
          console.log("Phone number from API:", user.phoneNo);

          // Extract only the local phone number, removing all country code prefixes
          // Handle multiple formats: "+92 929-073-3780", "+1 (555) 123-4567", etc.
          
          // First, identify if there's a country code (starts with + followed by digits)
          if (user.phoneNo.includes('+')) {
            // Find the position of the first non-digit character after the + and digits
            const countryCodeMatch = user.phoneNo.match(/^\+(\d+)/);
            
            if (countryCodeMatch) {
              const countryCodeDigits = countryCodeMatch[1];
              // Store the country code with + prefix
              setCountryCode(`+${countryCodeDigits}`);
              
              // Remove country code and any leading spaces/characters
              let localNumber = user.phoneNo.substring(countryCodeMatch[0].length);
              
              // Clean up: remove any initial spaces, parentheses, or non-essential characters
              localNumber = localNumber.replace(/^\s*[()\s-]*/, '').trim();
              
              // Set the cleaned local number
              setPhoneNo(localNumber);
              console.log("Parsed phone: Country code:", `+${countryCodeDigits}`, "Local number:", localNumber);
            } else {
              // If format not recognized, just set the full number as phoneNo
              setPhoneNo(user.phoneNo);
            }
          } else {
            // No plus sign found, set the full number as phoneNo
            setPhoneNo(user.phoneNo);
          }
        }

        setPostalCode(user.postalCode || "")
        setCountry(user.country || "")
        // Set city after a delay (optional, adjust if needed)
        setTimeout(() => {
          if (user.city) {
            setCity(user.city)
            updateField("city", user.city)
          }
        }, 300)
        setUserInfoLoaded(true)
      } else {
        handleError("toast.errorLoadUserInfo")
      }
    } catch (error) {
      handleError("toast.errorLoadUserInfo")
    } finally {
      setLoading(false)
    }
  }
  // Reconstructed handleUpdateUserInfo function
  const handleUpdateUserInfo = async () => {
    const authToken = Cookies.get("token")
    if (!authToken) {
      handleError("toast.errorAuthTokenMissing")
      return
    }
    if (country && !city) {
      handleError("toast.errorCitySelectRequired")
      return
    }
    if (!postalCode) {
      handleError("toast.errorPostalCodeRequired")
      return
    }
  
    setLoading(true)
    try {
      // Format phone number with proper spacing between country code and local number
      const formattedPhoneNumber = countryCode && phoneNo 
        ? `${countryCode} ${phoneNo}`.trim() 
        : phoneNo
  
      const userData = {
        firstName,
        lastName,
        email,
        country,
        city,
        postalCode,
        phoneNo: formattedPhoneNumber,
      }
  
      const response = await updateUserInfo(
        (msg) => handleError("toast.errorUpdateProfile"),
        authToken,
        userData
      )
  
      if (response?.data?.message) {
        setEditMode(false)
        toast.success(t("toast.successProfileUpdateTitle"), {
          description: t("toast.successProfileUpdateDesc"),
        })
      } else {
        handleError("toast.errorUpdateProfile")
      }
    } catch (error) {
      handleError("toast.errorUpdateProfile")
    } finally {
      setLoading(false)
    }
  }
  

  useEffect(() => {
    const getServices = async () => {
      setIsLoadingPaymentOptions(true)
      const response = await fetchPaymentServices((msg) => handleError("toast.errorFetchServices"))
      if (response && response.data) {
        console.log("Payment services:", response.data)
        // Debug: Log the structure of the first item to understand the format
        if (response.data.length > 0) {
          console.log("First payment service item:", JSON.stringify(response.data[0], null, 2))
        }
        setOptions(response.data.filter((service: any) => service?.code && service?.name))
      }
      setIsLoadingPaymentOptions(false)
    }

    getServices()
  }, [])

  useEffect(() => {
    const getCountriesAndCities = async () => {
      setIsLoadingCountries(true)
      const response = await fetchCountriesAndCities((msg) => handleError("toast.errorFetchCountries"))
      setIsLoadingCountries(false)

      if (response?.data?.data) {
        setCountries(response.data.data)
      }
    }

    getCountriesAndCities()
  }, [])

  useEffect(() => {
    const getCountryCodes = async () => {
      setIsLoadingCountryCodes(true)
      const response = await fetchCountryCodes((msg) => handleError("toast.errorFetchCountryCodes"))
      setIsLoadingCountryCodes(false)

      if (response?.data?.data) {
        setCountryCodes(response.data.data)
      }
    }

    getCountryCodes()
  }, [])

  // Initialize the user selection flag
  useEffect(() => {
    // Clear the flag when the component mounts, unless we're seeing a phone number already
    if (!phoneNo) {
      localStorage.removeItem('userSelectedCountryCode')
    }
  }, [phoneNo])

  useEffect(() => {
    if (country) {
      console.log("Country selected:", country)
      // Convert country code to lowercase for case-insensitive comparison
      const selectedCountry = countries.find((c) => c.country.toLowerCase() === country.toLowerCase())

      if (selectedCountry) {
        console.log("Found country data:", selectedCountry)
        console.log("Cities for selected country:", selectedCountry.cities)

        setCities(selectedCountry.cities || [])

        if (editMode && !city && selectedCountry.cities && selectedCountry.cities.length > 0) {
          setCity(selectedCountry.cities[0])
          updateField("city", selectedCountry.cities[0])
        }
      } else {
        console.log("Country not found in data:", country)
        // Try to find a country that contains this country code
        const countryMatch = countries.find(
          (c) =>
            c.country.toLowerCase().includes(country.toLowerCase()) ||
            country.toLowerCase().includes(c.country.toLowerCase()),
        )

        if (countryMatch) {
          console.log("Found similar country:", countryMatch.country)
          setCountry(countryMatch.country)
          setCities(countryMatch.cities || [])
        } else {
          setCities([])
        }
      }
    } else {
      setCities([])
    }
  }, [country, countries, editMode])

  useEffect(() => {
    if (country && countryCodes.length > 0) {
      // Only set the country code automatically if it's not already set by the user
      // and if user hasn't manually selected a country code
      const userSelectedCode = localStorage.getItem('userSelectedCountryCode') === 'true'
      if (!countryCode && !userSelectedCode) {
        const selectedCountryCode = countryCodes.find((cc) => cc.name === country)
        if (selectedCountryCode) {
          setCountryCode(selectedCountryCode.dial_code)
          console.log("Updated country code to:", selectedCountryCode.dial_code)
        }
      }
    }
  }, [country, countryCodes, countryCode])

  useEffect(() => {
    if (!showQrPopup) return
    const uuid = localStorage.getItem("uuid")
    const orderId = localStorage.getItem("orderId")
    if (!uuid || !orderId) return
    setIsInitialLoading(true)
    const fetchPaymentStatus = async () => {
      try {
        const response = await checkPaymentStatus(uuid, orderId, (msg) => handleError("toast.errorCheckPayment"))
        if (response?.data?.is_paid) {
          toast.success(t("toast.successPaymentTitle"), { description: t("toast.successPaymentDesc") })
          setIsInitialLoading(false)
          setIsPollingLoading(false)
          setShowQrPopup(false)
          clearInterval(interval)
          localStorage.removeItem("cart")
          router.push(`/thankyou?orderNumber=${orderId}`)
        } else {
          setIsPollingLoading(true)
        }
      } catch (err) {
        handleError("toast.errorCheckPayment")
        setIsInitialLoading(false)
        setIsPollingLoading(false)
      }
    }
    const interval = setInterval(fetchPaymentStatus, 3000)
    setTimeout(() => setIsInitialLoading(false), 2000)
    return () => {
      clearInterval(interval)
    }
  }, [showQrPopup, router, t])

  useEffect(() => {
    if (checkoutStep === 2 && !userInfoLoaded) {
      fetchUserInfo()
      setEditMode(true)
    }
  }, [checkoutStep, userInfoLoaded])

  useEffect(() => {
    // Get first name from cookies if available
    const cookieFirstName = Cookies.get("firstName")
    console.log("Cookie first name:", cookieFirstName)
    if (cookieFirstName) {
      setUserFirstName(cookieFirstName)
    }
    console.log("Cookie first name:", setUserFirstName)

  }, [])

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const updateField = (field: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    })

    switch (field) {
      case "firstName":
        setFirstName(value)
        break
      case "lastName":
        setLastName(value)
        break
      case "email":
        setEmail(value)
        break
      case "phone":
        setPhoneNo(value)
        break
      case "country":
        setCountry(value)
        break
      case "city":
        setCity(value)
        break
      case "postalCode":
        setPostalCode(value)
        break
    }
  }

  const validateStep1 = () => {
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const isValidUrl = (url: string) => {
      try {
        new URL(url)
        return true
      } catch (_) {
        return false
      }
    }

    if (contentOption === "client") {
      if (!clientNote.trim()) {
        toast.error("Note is required.")
        return false
      }

      if (fileType === "url") {
        if (!fileUrl.trim()) {
          toast.error("File URL is required.")
          return false
        }

        if (!isValidUrl(fileUrl)) {
          toast.error("Please enter a valid URL (e.g., https://example.com)")
          return false
        }
      }

      if (fileType === "upload" && !file) {
        toast.error("File is required.")
        return false
      }

      if (!backupEmail.trim()) {
        toast.error("Backup email is required.")
        return false
      }

      if (!isValidEmail(backupEmail)) {
        toast.error("Please enter a valid backup email.")
        return false
      }
    } else {
      if (!topic.trim()) {
        toast.error("Topic is required.")
        return false
      }

      if (!postLink.trim()) {
        toast.error("Anchor link is required.")
        return false
      }

      if (!keyword.trim()) {
        toast.error("Keyword is required.")
        return false
      }

      if (!backupEmail.trim()) {
        toast.error("Backup email is required.")
        return false
      }

      if (!isValidEmail(backupEmail)) {
        toast.error("Please enter a valid backup email.")
        return false
      }

      if (!wordCount) {
        toast.error("Word count is required.")
        return false
      }
    }

    return true
  }
  const validateRequiredFields = () => {
    if (!firstName) return handleError("toast.errorFirstNameRequired"), false
    if (!lastName) return handleError("toast.errorLastNameRequired"), false
    if (!email) return handleError("toast.errorEmailRequired"), false
    if (!phoneNo) return handleError("toast.errorPhoneRequired"), false

    // Phone number validation (999-999-9999 format)
    const phoneDigits = phoneNo.replace(/\D/g, "") // Remove non-digit characters
    if (phoneDigits.length !== 10) {
      return handleError("toast.errorPhoneInvalidLength"), false // Show error if not 10 digits
    }

    if (!countryCode) return handleError("toast.errorCountryCodeRequired"), false
    if (!country) return handleError("toast.errorCountryRequired"), false
    if (!city) return handleError("toast.errorCityRequired"), false
    if (!postalCode) return handleError("toast.errorPostalCodeRequired"), false
    if (!currency) return handleError("toast.errorCurrencyRequired"), false
    if (!network) return handleError("toast.errorNetworkRequired"), false

    setError("")
    return true
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError(t("step1.clientForm.fileSizeError"))
      setFile(null)
      handleError("toast.errorFileUploadFailed")
    } else {
      setFileError("")
      setFile(selectedFile)
    }
  }

  const handleClientPurchase = async () => {
    await handleUpdateUserInfo()
    if (!validateRequiredFields()) return
    setLoading(true)
    const authToken = Cookies.get("token")
    if (!authToken) {
      handleError("toast.errorAuthTokenMissing")
      setLoading(false)
      return
    }
    try {
      let uploadedFileUrl = ""
      if (fileType === "upload" && file) {
        const uploadResponse = await handleFileUpload(
          (msg) => handleError("toast.errorFileUploadFailed"),
          authToken.toString(),
          file,
        )
        if (uploadResponse?.data?.fileUrl) {
          uploadedFileUrl = uploadResponse.data.fileUrl
        } else {
          handleError("toast.errorFileUploadFailed")
          setLoading(false)
          return
        }
      } else if (fileType === "url" && fileUrl) {
        uploadedFileUrl = fileUrl
      } else {
        handleError("toast.errorFileOrUrlRequired")
        setLoading(false)
        return
      }
      const formattedPhoneNumber = countryCode && phoneNo ? `${countryCode} ${phoneNo}` : phoneNo
      const cartItems = checkoutCartItems.length > 0 ? checkoutCartItems : JSON.parse(getCookie("cart_id") || "[]")
      if (cartItems.length === 0) {
        handleError("toast.errorNoProducts")
        setLoading(false)
        return
      }
      const requestData = {
        email: email || backupEmail,
        backupEmail: backupEmail,
        notes: clientNote,
        firstName,
        lastName,
        postalCode,
        city,
        country,
        anchorLink: "",
        phoneNo: formattedPhoneNumber,
        file: uploadedFileUrl,
        network: network,
        to_currency: currency,
        products: cartItems.map((product: any) => ({
          productId: product.id || product._id || "",
        })),
      }
      console.log("📦 Final requestData:", JSON.stringify(requestData, null, 2))
      const response = await handleClientOrderRequest(
        (msg) => handleError("toast.errorProcessOrder"),
        authToken.toString(),
        requestData,
      )
      if (response?.data?.message === "Invalid or expired token") {
        toast.error(t("toast.errorLoginFirstTitle"), { description: t("toast.errorLoginFirstDesc") })
        setTimeout(() => router.push(`/sign-in`), 2000)
      } else if (response?.status === 201) {
        setSuccessPopup(true)
        setBackupEmail("")
        setFileUrl("")
        setFileType("url")
        setFile(null)
        setTotalAmount(0)

        setFirstName("")
        setLastName("")
        setCountry("")
        setCity("")
        setPostalCode("")
        setPhoneNo("")
        setEmail("")
        setPostLink("")
        setKeyword("")
        setWordLimit("")
        setNetwork("")
        setCurrency("")
        setCheckoutCartItems([])
        const paymentTransaction = response?.data?.data
        if (paymentTransaction) {
          console.log("✅ Payment Transaction Data:", paymentTransaction)

          if (paymentTransaction.uuid) {
            localStorage.setItem("uuid", paymentTransaction.uuid)
          }

          if (paymentTransaction.orderNumber) {
            localStorage.setItem("orderId", paymentTransaction.orderNumber.toString())
            console.log("✅ Order ID stored:", paymentTransaction.orderNumber)
          } else {
            console.error("⛔ No order number found in paymentTransaction!")
          }

          if (paymentTransaction.address_qr_code) {
            console.log("✅ QR Code Received:", paymentTransaction.address_qr_code)

            if (paymentTransaction.address_qr_code.startsWith("data:image/png;base64,")) {
              setQrCode(paymentTransaction.address_qr_code)
              setPayerAmount(Number.parseFloat(paymentTransaction.payer_amount.toString()) || 0)
              console.log("📢 Updated Total Amount State:", totalAmount)
              setPayerCurrency(paymentTransaction?.payer_currency || "N/A")
              setNetwork(paymentTransaction.network || "")
              setWalletAddress(paymentTransaction.address || "")
              setShowQrPopup(true)
              await deleteCart()
            } else {
              console.error("⛔ Invalid QR Code format")
            }
          } else {
            console.error("⛔ No QR Code found in paymentTransaction!")
            setErrorPopup(true)
          }
        } else {
          console.error("⛔ No paymentTransaction found!")
          setErrorPopup(true)
        }

        toast.success(t("toast.successOrderSubmitTitle"), { description: t("toast.successOrderSubmitDesc") })
        trackClickCartEvent("purchase")

        if (checkoutCartItems.length > 0) {
          const mappedItems = checkoutCartItems.map((item) => ({
            item_currency: item.currency || "EUR",
            item_name: item.siteName || "",
            item_id: item.id,
            price: Number(item.adjustedPrice) || 0,
            quantity: 1,
            item_category: item.category
              ? Array.isArray(item.category)
                ? item.category.join(", ")
                : item.category
              : "",
            language: item.language || "",
            traffic: item.monthlyTraffic !== undefined ? item.monthlyTraffic.toString() : "0",
            domain_authority: item.domainAuthority || 0,
            domain_rating: item.domainRatings || 0,
          }))

          console.log("🔍 GA Purchase Event - Checkout Cart Items:", checkoutCartItems)
          console.log("🔍 GA Purchase Event - Mapped Items:", mappedItems)

          trackClick("Payment", "Payment Form Submission", "click")
          trackClickCart("purchase", "EUR", mappedItems)
        }
      }
    } catch (error) {
      handleError("toast.errorProcessOrder")
    } finally {
      setLoading(false)
    }
  }

  const handleProceedToPurchase = () => {
    if (!validateStep1()) {
      return
    }
    setCheckoutStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackToContent = () => {
    setCheckoutStep(1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePublisherPurchase = async () => {
    await handleUpdateUserInfo()
    if (!validateRequiredFields()) return
    const authToken = Cookies.get("token")
    if (!authToken) {
      handleError("toast.errorAuthTokenMissing")
      return
    }
    setLoading(true)
    try {
      const wordLimitAsNumber = wordLimit ? wordLimit.toString() : "650"
      const formattedPhoneNumber = countryCode && phoneNo ? `${countryCode} ${phoneNo}` : phoneNo
      const cartItems = checkoutCartItems.length > 0 ? checkoutCartItems : JSON.parse(getCookie("cart_id") || "[]")
      if (cartItems.length === 0) {
        handleError("toast.errorNoProducts")
        setLoading(false)
        return
      }
      const requestData = {
        firstName,
        lastName,
        country,
        city,
        postalCode,
        phoneNo: formattedPhoneNumber,
        email: email || backupEmail,
        anchorLink: "",
        anchor: keyword,
        wordLimit: wordLimitAsNumber,
        network: network,
        to_currency: currency,
        products: cartItems.map((product: any) => ({
          productId: product.id || product._id || "",
        })),
      }
      const response = await handleOrderRequest(
        (msg) => handleError("toast.errorProcessOrder"),
        authToken.toString(),
        requestData,
      )
      const responseData: CheckOutApiResponse = response?.data as CheckOutApiResponse
      if (response?.data?.message === "Invalid or expired token") {
        toast.error(t("toast.errorLoginFirstTitle"), { description: t("toast.errorLoginFirstDesc") })
        setTimeout(() => router.push(`/sign-in`), 2000)
        return
      }
      if (response?.status === 201) {
        setBackupEmail("")
        setFileUrl("")
        setFileType("url")
        setFile(null)
        setTotalAmount(0)

        setFirstName("")
        setLastName("")
        setCountry("")
        setCity("")
        setPostalCode("")
        setPhoneNo("")
        setEmail("")
        setPostLink("")
        setKeyword("")
        setWordLimit("")
        setNetwork("")
        setCurrency("")
        setCheckoutCartItems([])
        const paymentTransaction = response?.data?.data
        if (!paymentTransaction) {
          handleError("toast.errorProcessOrder")
          return
        }
        console.log("✅ Payment Transaction Data:", paymentTransaction)
        if (paymentTransaction.uuid) {
          localStorage.setItem("uuid", paymentTransaction.uuid)
        }
        if (paymentTransaction.orderNumber) {
          localStorage.setItem("orderId", paymentTransaction.orderNumber.toString())
          console.log("✅ Order ID stored:", paymentTransaction.orderNumber)
        } else {
          console.error("⛔ No order number found in paymentTransaction!")
        }
        if (paymentTransaction.address_qr_code) {
          console.log("✅ QR Code Received:", paymentTransaction.address_qr_code)
          if (paymentTransaction.address_qr_code.startsWith("data:image/png;base64,")) {
            setQrCode(paymentTransaction.address_qr_code)
            setPayerAmount(Number.parseFloat(paymentTransaction.payer_amount.toString()) || 0)
            setPayerCurrency(paymentTransaction?.payer_currency || "N/A")
            setNetwork(paymentTransaction.network || "")
            setWalletAddress(paymentTransaction.address || "")
            setShowQrPopup(true)
            await deleteCart()
          } else {
            console.error("⛔ Invalid QR Code format")
            handleError("toast.errorQRCodeFormat")
          }
        } else {
          console.error("⛔ No QR Code found in paymentTransaction!")
          handleError("toast.errorQRCodeNotFound")
        }
        toast.success(t("toast.successOrderSubmitTitle"), { description: t("toast.successOrderSubmitDesc") })
        trackClickCartEvent("purchase")
      }
    } catch (err) {
      handleError("toast.errorProcessOrder")
    } finally {
      setLoading(false)
    }
  }

  const handleCompletePurchase = () => {
    if (contentOption === "client") {
      handleClientPurchase()
    } else {
      handlePublisherPurchase()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 text-slate-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">{t("title")}</h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        {checkoutStep === 1 ? (
            <Card className="bg-slate-950/60 border-slate-800 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-0">
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent text-2xl">
                  {t("content.title")}
                </CardTitle>
                <CardDescription className="text-slate-400">{t("content.description")}</CardDescription>
                  </CardHeader>
              
              <CardContent className="py-6 space-y-6">
                <div className="space-y-3">
                  <div className="space-y-1 text-slate-100">
                    <h2 className="text-2xl font-semibold">{t("content.title")}</h2>
                    <p className="text-slate-400">{t("content.description")}</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="rounded-lg overflow-hidden bg-slate-950/60 border border-slate-800 p-6">
                      <RadioGroup defaultValue={contentOption} onValueChange={setContentOption} className="space-y-3">
                        <div className="flex items-start">
                          <RadioGroupItem value="client" id="client" className="border-cyan-400 text-cyan-400 mt-1" />
                          <div className="ml-3 space-y-1">
                            <Label htmlFor="client" className="text-slate-200 block font-medium text-base cursor-pointer">
                              {t("step1.contentOptions.clientLabel")}
                          </Label>
                            <p className="text-slate-400 text-sm">{t("step1.contentOptions.clientDesc")}</p>
                        </div>
                      </div>
                        <div className="flex items-start">
                          <RadioGroupItem value="publisher" id="publisher" className="border-cyan-400 text-cyan-400 mt-1" />
                          <div className="ml-3 space-y-1">
                            <Label htmlFor="publisher" className="text-slate-200 block font-medium text-base cursor-pointer">
                            {t("step1.contentOptions.publisherLabel")}
                          </Label>
                            <p className="text-slate-400 text-sm">{t("step1.contentOptions.publisherDesc")}</p>
                        </div>
                      </div>
                    </RadioGroup>
                    </div>

                    {contentOption === "publisher" && (
                      <div className="rounded-lg overflow-hidden bg-slate-950/60 border border-slate-800 p-6">
                        <div className="mb-4 pb-4 border-b border-slate-800">
                          <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full flex-shrink-0">
                              <FileText className="text-white h-4 w-4" />
                            </span>
                            {t("step1.publisherForm.title")}
                          </h3>
                          <p className="text-slate-400 text-sm mt-1">{t("step1.publisherForm.description")}</p>
                        </div>
                        
                        <div className="space-y-4">
                      <div className="space-y-2">
                            <Label htmlFor="publisher-note" className="text-slate-300">{t("step1.publisherForm.noteLabel")}</Label>
                        <Textarea
                              id="publisher-note"
                              placeholder={t("step1.publisherForm.notePlaceholder")}
                              className="min-h-[120px] bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="anchor-link" className="text-slate-300">{t("step1.publisherForm.anchorLinkLabel")}</Label>
                            <div className="flex items-center space-x-2">
                              <Link2 className="h-4 w-4 text-cyan-400" />
                              <Input
                                id="anchor-link"
                                placeholder={t("step1.publisherForm.anchorLinkPlaceholder")}
                                className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                                value={postLink}
                                onChange={(e) => setPostLink(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="keyword" className="text-slate-300">{t("step1.publisherForm.keywordLabel")}</Label>
                            <Input
                              id="keyword"
                              placeholder={t("step1.publisherForm.keywordPlaceholder")}
                              className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                            <Label htmlFor="publisher-email" className="text-slate-300">{t("step1.backupEmailLabel")}</Label>
                            <Input
                              id="publisher-email"
                              type="email"
                              placeholder={t("step1.backupEmailPlaceholder")}
                              className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                              value={backupEmail}
                              onChange={(e) => setBackupEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300">{t("step1.publisherForm.wordCountLabel")}</Label>
                            <div className="w-40">
                              <Select
                                defaultValue={wordCount}
                                onValueChange={(value) => setWordCount(value)}
                              >
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
                                  <SelectValue placeholder={t("step1.publisherOptions.wordCountPlaceholder")} />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
                                  <SelectItem value="650" className="hover:bg-slate-800 hover:text-cyan-400">650 {t("step1.publisherOptions.wordCountUnit")}</SelectItem>
                                  <SelectItem value="750" className="hover:bg-slate-800 hover:text-cyan-400">750 {t("step1.publisherOptions.wordCountUnit")}</SelectItem>
                                  <SelectItem value="850" className="hover:bg-slate-800 hover:text-cyan-400">850 {t("step1.publisherOptions.wordCountUnit")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {contentOption === "client" && (
                      <div className="rounded-lg overflow-hidden bg-slate-950/60 border border-slate-800 p-6">
                        <div className="mb-4 pb-4 border-b border-slate-800">
                          <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full flex-shrink-0">
                              <Upload className="text-white h-4 w-4" />
                            </span>
                            {t("step1.clientForm.title")}
                          </h3>
                          <p className="text-slate-400 text-sm mt-1">{t("step1.clientForm.description")}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="client-note" className="text-slate-300">{t("step1.clientForm.noteLabel")}</Label>
                            <Textarea
                              id="client-note"
                              placeholder={t("step1.clientForm.notePlaceholder")}
                              className="min-h-[120px] bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                              value={clientNote}
                              onChange={(e) => setClientNote(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-slate-300">{t("step1.clientForm.provideOptionLabel")}</Label>
                        <RadioGroup
                          defaultValue="file"
                          className="space-y-3"
                          onValueChange={(value) => setFileType(value)}
                          value={fileType}
                        >
                          <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="upload" id="file-option" className="border-cyan-400 text-cyan-400" />
                                <Label htmlFor="file-option" className="font-normal text-slate-300">
                              {t("step1.clientForm.optionUpload")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="url" id="url-option" className="border-cyan-400 text-cyan-400" />
                                <Label htmlFor="url-option" className="font-normal text-slate-300">
                              {t("step1.clientForm.optionUrl")}
                            </Label>
                          </div>
                        </RadioGroup>
                            
                        {fileType === "upload" ? (
                              <div className="mt-4 rounded-md border border-slate-700 border-dashed p-6 text-center bg-slate-800/50">
                                <Upload className="mx-auto h-8 w-8 text-cyan-400" />
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                                onClick={() => document.getElementById("file-upload")?.click()}
                              >
                                {t("step1.clientForm.chooseFile")}
                              </Button>
                              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                            </div>
                                <p className="mt-2 text-xs text-slate-400">{t("step1.clientForm.fileHelp")}</p>
                            {file && (
                                  <p className="mt-2 text-sm text-cyan-400">
                                {t("step1.clientForm.fileSelected", { fileName: file.name })}
                              </p>
                            )}
                                {fileError && <p className="mt-2 text-sm text-red-400">{fileError}</p>}
                          </div>
                        ) : (
                          <div className="mt-4 space-y-2">
                                <Label htmlFor="client-url" className="text-slate-300">{t("step1.clientForm.urlLabel")}</Label>
                            <Input
                              id="client-url"
                              type="url"
                              required
                              placeholder={t("step1.clientForm.urlPlaceholder")}
                                  className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                              value={fileUrl}
                              onChange={(e) => setFileUrl(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                          
                      <div className="space-y-2">
                            <Label htmlFor="backup-email" className="text-slate-300">{t("step1.clientForm.backupEmailLabel")}</Label>
                        <Input
                              id="backup-email"
                          type="email"
                              placeholder={t("step1.clientForm.backupEmailPlaceholder")}
                          value={backupEmail}
                          onChange={(e) => setBackupEmail(e.target.value)}
                              className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        />
                      </div>
                      </div>
                        </div>
                )}
              </div>
                    </div>
                  </CardContent>
              
              <CardFooter className="pt-2 pb-6 flex justify-end">
                    <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-700/30"
                      onClick={handleProceedToPurchase}
                    >
                  {t("buttons.proceed")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
          ) : (
            <Card className="bg-slate-950/60 border-slate-800 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-0">
                <CardTitle className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent text-2xl">
                  {t("payment.title")}
                </CardTitle>
                <CardDescription className="text-slate-400">{t("payment.description")}</CardDescription>
                  </CardHeader>

              <CardContent className="py-6 space-y-6">
                <div className="space-y-4">
                  {/* Profile Information Section */}
                  <div className="rounded-lg overflow-hidden bg-slate-950/60 border border-slate-800 p-6">
                    <div className="mb-4 pb-4 border-b border-slate-800">
                      <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full flex-shrink-0">
                          <UserRound className="text-white h-4 w-4" />
                        </span>
                        {t("step2.profile.title")}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{t("step2.profile.description")}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="first-name" className="text-slate-300">{t("step2.profile.firstNameLabel")}</Label>
                        <Input
                          id="first-name"
                            placeholder={t("step2.profile.firstNamePlaceholder")}
                            className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                          value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="last-name" className="text-slate-300">{t("step2.profile.lastNameLabel")}</Label>
                        <Input
                          id="last-name"
                            placeholder={t("step2.profile.lastNamePlaceholder")}
                            className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                          value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-300">{t("step2.profile.emailLabel")}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("step2.profile.emailPlaceholder")}
                            className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                    </div>
                    <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-300">{t("step2.profile.phoneLabel")}</Label>
                          <div className="flex space-x-2">
                            <Select value={countryCode} onValueChange={setCountryCode}>
                              <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300 w-[110px]">
                                <SelectValue placeholder="+1" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 max-h-[300px]">
                                {countryCodes.map((cc: any) => (
                                  <SelectItem 
                                    key={cc.code} 
                                    value={cc.dial_code}
                                    className="hover:bg-slate-800 hover:text-cyan-400"
                                  >
                                    {cc.dial_code} ({cc.code})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          <Input
                            id="phone"
                              placeholder={t("step2.profile.phonePlaceholder")}
                              className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500 flex-1"
                            value={phoneNo}
                              onChange={(e) => setPhoneNo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                          <Label htmlFor="country" className="text-slate-300">{t("step2.profile.countryLabel")}</Label>
                          <Select value={country} onValueChange={setCountry}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
                              <SelectValue placeholder={t("step2.profile.countryPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 max-h-[300px]">
                              {countries.map((c: any) => (
                                <SelectItem 
                                  key={c.country} 
                                  value={c.country}
                                  className="hover:bg-slate-800 hover:text-cyan-400"
                                >
                                  {c.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                    </div>
                    <div className="space-y-2">
                          <Label htmlFor="city" className="text-slate-300">{t("step2.profile.cityLabel")}</Label>
                          <Select value={city} onValueChange={setCity}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
                              <SelectValue placeholder={t("step2.profile.cityPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 max-h-[300px]">
                              {cities.map((c: string) => (
                                <SelectItem 
                                  key={c} 
                                  value={c}
                                  className="hover:bg-slate-800 hover:text-cyan-400"
                                >
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postal-code" className="text-slate-300">{t("step2.profile.postalCodeLabel")}</Label>
                      <Input
                        id="postal-code"
                          placeholder={t("step2.profile.postalCodePlaceholder")}
                          className="bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-500"
                        value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    </div>
                  </div>
                  
                  {/* Payment Options Section */}
                  <div className="rounded-lg overflow-hidden bg-slate-950/60 border border-slate-800 p-6">
                    <div className="mb-4 pb-4 border-b border-slate-800">
                      <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full flex-shrink-0">
                          <MessageSquare className="text-white h-4 w-4" />
                        </span>
                        {t("step2.payment.title")}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{t("step2.payment.description")}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="currency" className="text-slate-300">{t("step2.payment.currencyLabel")}</Label>
                        <Select
                          defaultValue={currency}
                          onValueChange={(value) => setCurrency(value)}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
                            <SelectValue placeholder={isLoadingPaymentOptions ? "Loading..." : t("step2.payment.currencyPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 max-h-[300px]">
                            {isLoadingPaymentOptions ? (
                              <div className="px-2 py-4 text-center text-slate-400">
                                Loading cryptocurrencies...
                              </div>
                            ) : options && options.length > 0 ? (
                              options
                                .map((service: any) => (
                                  <SelectItem 
                                    key={service?.code} 
                                    value={service?.code}
                                    className="hover:bg-slate-800 hover:text-cyan-400"
                                  >
                                    {service?.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="px-2 py-4 text-center text-slate-400">
                                  No currencies available
                                </div>
                              )
                            }
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {currency && (
                        <div className="space-y-2 w-full">
                          <Label htmlFor="network" className="text-slate-300">{t("step2.payment.networkLabel")}</Label>
                          <Select
                            defaultValue={network}
                            onValueChange={(value) => setNetwork(value)}
                          >
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
                              <SelectValue placeholder={t("step2.payment.networkPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-300 max-h-[300px]">
                              {options && currency ? 
                                (() => {
                                  const networks = (options.find((service: any) => service.code === currency)?.networks || [])
                                    .filter((networkOption: any) => networkOption?.network);
                                  
                                  return networks.length > 0 ? 
                                    networks.map((networkOption: any) => (
                                      <SelectItem 
                                        key={networkOption?.network} 
                                        value={networkOption?.network}
                                        className="hover:bg-slate-800 hover:text-cyan-400"
                                      >
                                        {networkOption?.name || networkOption?.network}
                                      </SelectItem>
                                    ))
                                  : 
                                    <div className="px-2 py-4 text-center text-slate-400">
                                      No networks available
                                    </div>
                                })()
                              : 
                                <div className="px-2 py-4 text-center text-slate-400">
                                  Select a currency first
                                </div>
                              }
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                      </div>
                    </div>
                  </CardContent>

              <CardFooter className="pt-2 pb-6 flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 bg-slate-800 text-cyan-400"
                  onClick={handleBackToContent}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("buttons.back")}
                    </Button>
                
                    <Button
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-700/30"
                      onClick={handleCompletePurchase}
                      disabled={loading}
                    >
                      {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("buttons.processing")}
                    </div>
                      ) : (
                        <>
                      {t("buttons.complete")} <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
          )}
              </div>
        
        {/* Order Summary Card */}
        <div>
          <Card className="bg-slate-950/60 border-slate-800 shadow-xl backdrop-blur-sm sticky top-4">
            <CardHeader className="pb-2 border-b border-slate-800/50">
              <CardTitle className="text-xl text-slate-200 flex gap-3 items-center">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-full">
                  <MessageSquare className="text-white h-4 w-4" />
                </span>
                {t("summary.title")}
              </CardTitle>
              <CardDescription className="text-slate-400">{t("summary.description")}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-slate-300 font-medium">{t("summary.itemsLabel")}</p>
                  {checkoutCartItems.length > 0 ? (
                    <ul className="space-y-3">
                      {checkoutCartItems.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                          <div className="flex-1">
                            <p className="text-slate-200 font-medium line-clamp-1">{item.siteName || t("summary.productFallback")}</p>
                            {contentOption === "publisher" && wordCount && (
                              <p className="text-slate-400 text-sm">{t("summary.wordCountLabel", { count: wordCount })}</p>
                            )}
            </div>
                          <div className="text-right">
                            <p className="text-slate-200 font-medium">€{Number(item.adjustedPrice || 0).toFixed(2)}</p>
                            {contentOption === "publisher" && wordCount && parseInt(wordCount) > 650 && (
                              <p className="text-cyan-400 text-sm">+€{getWordLimitPrice()}</p>
                            )}
          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 italic">{t("summary.noItems")}</p>
                  )}
                </div>
                
                <Separator className="bg-slate-800" />
                
                <div className="flex justify-between items-center pt-2">
                  <p className="text-slate-300 font-bold">{t("summary.total")}</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    €{(calculateCartTotal() + (contentOption === "publisher" ? getWordLimitPrice() : 0)).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

        {showQrPopup && qrCode && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-50">
          <div className="bg-slate-950 p-6 rounded-xl w-[90%] max-w-[600px] shadow-lg border border-slate-800 relative animate-fadeIn">
              <button
              className="absolute top-3 right-3 text-slate-400 hover:text-cyan-400 text-[35px] transition-colors"
                onClick={() => setShowQrPopup(false)}
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex flex-col items-center">
                <p className="text-slate-300 font-medium mb-2">{t("qrPopup.scanText")}</p>
                  <img
                    src={qrCode || "/placeholder.svg"}
                    alt="Scan QR Code"
                  className="w-40 h-40 border border-slate-700 bg-white p-2 rounded-lg shadow-md"
                  />
                </div>
              <div className="flex-1 text-left space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">{t("step2.payment.networkLabel")}</p> 
                  <p className="text-slate-200 font-medium">{network || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{t("qrPopup.totalAmountLabel")}</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {payerAmount || "0"} {payerCurrency || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{t("qrPopup.payerCurrencyLabel")}</p>
                  <p className="text-slate-200 font-medium">{payerCurrency || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{t("qrPopup.walletAddressLabel")}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-slate-300 text-sm break-all bg-slate-900 p-2 rounded-l border border-slate-800">{walletAddress || "N/A"}</p>
                    <button
                      className="p-2 text-cyan-400 bg-slate-800 border border-l-0 border-slate-700 rounded-r hover:bg-slate-700 transition-colors"
                      onClick={() => navigator.clipboard.writeText(walletAddress)}
                    >
                      {t("qrPopup.copyButton")}
                    </button>
                  </div>
                </div>
                </div>
              </div>
              {isInitialLoading && (
              <div className="flex flex-col items-center justify-center mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-500"></div>
                <p className="text-slate-300 mt-2">{t("qrPopup.processingText")}</p>
                </div>
              )}
              {isPollingLoading && (
              <div className="flex flex-col items-center justify-center mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
                <p className="text-cyan-400 font-medium">{t("qrPopup.waitingText")}</p>
                <p className="text-slate-400 mt-1 text-sm">{t("qrPopup.waitingNote")}</p>
                </div>
              )}
            <div className="mt-6">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-700/30"
                onClick={() => setShowQrPopup(false)}
              >
                {t("qrPopup.closeButton")}
              </Button>
            </div>
            </div>
          </div>
        )}
    </div>
  )
}

function CheckoutHeader() {
  const t = useTranslations("checkout.header")
  const tNav = useTranslations("navigation")
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const { trackClick } = useAnalytics()

  useEffect(() => {
    const userToken = Cookies.get("token") || null
    const role = Cookies.get("role") || null
    setToken(userToken)
    setUserRole(role)
  }, [])

  // Add gradient animation styles to document head
  useEffect(() => {
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
    }`;
    
    const styleElement = document.createElement("style")
    styleElement.innerHTML = gradientAnimation
    document.head.appendChild(styleElement)
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const isRegularUser = userRole === "user"

  const handleNavigation = (sectionId: string) => {
    trackClick("Home navigation", sectionId, "click")
  }

  const handleLogoClick = () => {
    trackClick("Logo", "Logo", "click")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
          <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
              <div className="size-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MessageSquare className="size-4 text-white" />
            </div>
              <span className="font-bold text-xl text-white">FrenchGuestPost</span>
          </div>
        </div>

          {/* Navigation in the center */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => handleNavigation("home")}
          >
            {tNav("home")}
          </Link>
          <Link
            href="/contact"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => handleNavigation("contact")}
          >
            {tNav("contact")}
          </Link>
          <Link
            href="/about-us"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => handleNavigation("about")}
          >
            {tNav("about")}
          </Link>
          <Link
            href="/pricing"
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => handleNavigation("pricing")}
          >
            {tNav("pricing")}
          </Link>
        </nav>

          {/* Right side elements */}
        <div className="flex items-center gap-4">
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
                    router.push("/user/orders")
                  }}
                    className="hover:bg-slate-800 p-2 rounded-lg"
                >
                  {tNav("dashboard")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    trackClick("logout", "logout", "click")
                    Cookies.remove("token")
                    Cookies.remove("permissions")
                    Cookies.remove("role")
                    setToken(null)
                    setUserRole(null)
                    router.push("/")
                  }}
                    className="text-red-400 hover:bg-slate-800 p-2 rounded-lg"
                >
                  {tNav("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : token && !isRegularUser ? (
            <Button
              variant="outline"
              size="sm"
                className="text-sm border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white"
              onClick={() => {
                trackClick("logout", "logout", "click")
                Cookies.remove("token")
                Cookies.remove("role")
                setToken(null)
                setUserRole(null)
                router.push("/")
              }}
            >
              {tNav("logout")}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                  className="hidden md:block border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white transition-all"
                onClick={() => {
                  router.push("/sign-in")
                }}
              >
                {tNav("login")}
              </Button>
              <Button
                  className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 items-center gap-2"
                onClick={() => {
                  router.push("/sign-up")
                  trackClick("sign-up", "sign-up clicked", "click")
                }}
              >
                  {tNav("register")} <ArrowRight className="size-4" />
              </Button>
            </>
          )}

            {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden p-2 rounded-lg shadow-md border-slate-700/50 bg-slate-800/50 text-slate-300">
                  <Menu className="h-6 w-6" />
                <span className="sr-only">{t("toggleMenu")}</span>
              </Button>
            </SheetTrigger>
              <SheetContent side="right" className="p-6 md:p-8 bg-slate-900 border-l border-slate-800">
              <div className="flex flex-col gap-6 mt-6">
                {[
                    { href: "/", label: tNav("home"), id: "home-mobile" },
                    { href: "/contact", label: tNav("contact"), id: "contact-mobile" },
                    { href: "/about-us", label: tNav("about"), id: "about-mobile" },
                    { href: "/pricing", label: tNav("pricing"), id: "pricing-mobile" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                      className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    onClick={() => handleNavigation(item.id)}
                  >
                    {item.label}
                  </Link>
                ))}
                {token && isRegularUser && (
                  <Link
                    href="/user/dashboard"
                      className="text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {tNav("dashboard")}
                  </Link>
                )}
                {token ? (
                  <Button
                    variant="outline"
                      className="border-slate-700 text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors mt-4"
                    onClick={() => {
                      trackClick("logout", "logout", "click")
                      Cookies.remove("token")
                      Cookies.remove("role")
                      setToken(null)
                      setUserRole(null)
                      router.push("/")
                    }}
                  >
                    {tNav("logout")}
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3 mt-6">
                    <Button
                      variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      onClick={() => {
                        router.push("/sign-in")
                      }}
                    >
                      {tNav("login")}
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:opacity-90 transition-all duration-200"
                      onClick={() => {
                        trackClick("sign-up", "sign-up clicked", "click")
                        router.push("/sign-up")
                      }}
                    >
                      {tNav("register")}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function CheckoutPage() {
  const t = useTranslations("checkout")
  return (
    <>
      <CheckoutHeader />
      <div className="min-h-screen bg-slate-900">
        <Suspense fallback={<div className="container mx-auto py-8 text-slate-300">{t("loadingFallback")}</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
      <Footer />
    </>
  )
}
