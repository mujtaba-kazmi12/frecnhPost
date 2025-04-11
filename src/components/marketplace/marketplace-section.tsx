"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Star,
  Users,
  Eye,
  Filter,
  Sparkles,
  BarChart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PostDrawer } from "./post-drawer"
import { TableData, type Product } from "@/app/[locale]/Services/product-service"

// Update cardStyles - add filter related styles
const cardStyles = `
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 1200px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
  
  @media (max-width: 640px) {
    .card-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .card-equal-height {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
  }

  .range-input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .range-input {
    width: 70px;
    text-align: center;
  }

  .pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-weight: 500;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    padding: 0.5rem 1rem;
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-active {
    background-color: rgb(139, 92, 246);
    color: white;
  }

  .table-container {
    overflow-x: auto;
    border-radius: 0.75rem;
    background-color: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(30, 41, 59, 0.6);
  }
  
  .products-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  
  .products-table th {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(30, 58, 138, 0.3);
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }
  
  .products-table td {
    padding: 1rem;
    border-bottom: 1px solid rgba(30, 41, 59, 0.4);
    vertical-align: middle;
  }
  
  .products-table tr:last-child td {
    border-bottom: none;
  }
  
  .products-table tbody tr {
    transition: all 0.2s ease;
  }
  
  .products-table tbody tr:hover {
    background-color: rgba(30, 58, 138, 0.2);
  }
  
  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1;
  }
  
  .view-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    transition: all 0.3s ease;
    background: linear-gradient(to right, rgb(37, 99, 235), rgb(6, 182, 212));
    color: white;
    box-shadow: 0 4px 6px -1px rgba(6, 182, 212, 0.3);
    border: none;
    letter-spacing: 0.015em;
  }
  
  .view-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(6, 182, 212, 0.4), 0 0 6px rgba(6, 182, 212, 0.2);
    background: linear-gradient(to right, rgb(29, 78, 216), rgb(8, 145, 178));
  }
  
  .view-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(6, 182, 212, 0.2);
  }
  
  .rating-stars {
    display: inline-flex;
    align-items: center;
  }

  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(6, 182, 212, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(6, 182, 212, 0.3);
    border-radius: 3px;
  }

  .filter-panel {
    background-color: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(30, 58, 138, 0.3);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 8px 16px rgba(2, 6, 23, 0.2), 0 2px 4px rgba(6, 182, 212, 0.05);
  }

  .filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .filter-tag {
    display: inline-flex;
    align-items: center;
    background-color: rgba(37, 99, 235, 0.15);
    border: 1px solid rgba(37, 99, 235, 0.3);
    color: rgb(186, 230, 253);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    box-shadow: 0 1px 2px rgba(6, 182, 212, 0.1);
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  .pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-weight: 500;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    padding: 0.5rem 1rem;
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-active {
    background: linear-gradient(to right, rgb(37, 99, 235), rgb(6, 182, 212));
    color: white;
  }
`

const MarketSection = () => {
  const t = useTranslations("marketplace")
  useEffect(() => {
    // Component mount logic
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [viewsRange, setViewsRange] = useState([0, 15000])
  const [daRange, setDaRange] = useState([0, 100])
  const [drRange, setDrRange] = useState([0, 100])
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [minMaxPrice, setMinMaxPrice] = useState<[number, number]>([0, 1000])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Product | null>(null)
  const [sortBy, setSortBy] = useState("newest")
  const [minRating, setMinRating] = useState("3.0")
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 9
  const [showMore, setShowMore] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({})
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [0, 1000],
    viewsRange: [0, 15000],
    daRange: [0, 100],
    drRange: [0, 100],
    categories: {} as Record<string, boolean>,
    minRating: "3.0",
  })
  // Add this state to store all products for frontend filtering
  const [allProducts, setAllProducts] = useState<Product[]>([])

  const handlePriceMinChange = (value: number) => {
    const newValue = Math.max(0, value)
    setPriceRange([newValue, Math.max(priceRange[1], newValue + 1)])
  }

  const handlePriceMaxChange = (value: number) => {
    const newValue = Math.max(priceRange[0] + 1, value)
    setPriceRange([priceRange[0], newValue])
  }

  const handleDaMinChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value))
    setDaRange([newValue, Math.max(daRange[1], newValue + 1)])
  }

  const handleDaMaxChange = (value: number) => {
    const newValue = Math.max(daRange[0] + 1, Math.min(100, value))
    setDaRange([daRange[0], newValue])
  }

  const handleDrMinChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value))
    setDrRange([newValue, Math.max(drRange[1], newValue + 1)])
  }

  const handleDrMaxChange = (value: number) => {
    const newValue = Math.max(drRange[0] + 1, Math.min(100, value))
    setDrRange([drRange[0], newValue])
  }

  // Helper function to search across all fields
  const searchAllFields = (item: Product, searchLower: string) => {
    // Check all string fields
    if (
      // Basic fields
      (item.siteName && item.siteName.toLowerCase().includes(searchLower)) ||
      (item.title && item.title.toLowerCase().includes(searchLower)) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      (item.productHandeledBy && item.productHandeledBy.toLowerCase().includes(searchLower)) ||
      (item.url && item.url.toLowerCase().includes(searchLower)) ||
      (item.email && item.email.toLowerCase().includes(searchLower)) ||
      (item.language && item.language.toLowerCase().includes(searchLower)) ||
      (item.country && item.country.toLowerCase().includes(searchLower)) ||
      // Category handling
      (Array.isArray(item.category) && item.category.some((cat) => cat.toLowerCase().includes(searchLower))) ||
      (typeof item.category === "string" && item.category.toLowerCase().includes(searchLower)) ||
      // Tags handling
      (Array.isArray(item.tags) && item.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
      (typeof item.tags === "string" && item.tags.toLowerCase().includes(searchLower)) ||
      // Check any other potential text fields
      (item.notes && item.notes.toLowerCase().includes(searchLower)) ||
      (item.comments && item.comments.toLowerCase().includes(searchLower))
    ) {
      return true
    }

    // Check numeric fields as strings
    if (
      (item.domainAuthority !== undefined && item.domainAuthority.toString().includes(searchLower)) ||
      (item.domainRatings !== undefined && item.domainRatings.toString().includes(searchLower)) ||
      (item.monthlyTraffic !== undefined && item.monthlyTraffic.toString().includes(searchLower)) ||
      (item.adjustedPrice !== undefined && item.adjustedPrice.toString().includes(searchLower))
    ) {
      return true
    }

    // Check any nested objects that might contain searchable text
    if (item.metadata && typeof item.metadata === "object") {
      for (const key in item.metadata) {
        const value = (item.metadata as any)[key]
        if (typeof value === "string" && value.toLowerCase().includes(searchLower)) {
          return true
        }
      }
    }

    return false
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiFilters: any = {}
        if (filtersApplied) {
          apiFilters.minPrice = String(appliedFilters.priceRange[0])
          apiFilters.maxPrice = String(appliedFilters.priceRange[1])
          apiFilters.minDA = String(appliedFilters.daRange[0])
          apiFilters.maxDA = String(appliedFilters.daRange[1])
          apiFilters.minDR = String(appliedFilters.drRange[0])
          apiFilters.maxDR = String(appliedFilters.drRange[1])
          const appliedCats = Object.keys(appliedFilters.categories).filter((cat) => appliedFilters.categories[cat])
          if (appliedCats.length > 0) {
            apiFilters.categories = appliedCats
          }
        }
        // Remove search from API call - we'll filter on the frontend
        const response = await TableData(setError, currentPage, itemsPerPage, apiFilters)
        if (response && response.items && response.items.length > 0) {
          // Store all products for frontend filtering
          setAllProducts(response.items)

          // Apply frontend search filter if needed
          let filteredItems = response.items
          if (searchTerm && searchTerm.trim() !== "") {
            const searchLower = searchTerm.trim().toLowerCase()
            filteredItems = response.items.filter((item) => searchAllFields(item, searchLower))
          }

          setProducts(filteredItems)

          if (response.total && response.limit) {
            const calculatedTotalPages = Math.ceil(response.total / response.limit)
            setTotalItems(filteredItems.length) // Update to show filtered count
            setTotalPages(calculatedTotalPages > 1 ? calculatedTotalPages : 1)
          } else {
            setTotalItems(filteredItems.length)
            setTotalPages(1)
          }
          const prices = response.items
            .map((item) =>
              typeof item.adjustedPrice === "string" ? Number.parseFloat(item.adjustedPrice) : item.adjustedPrice || 0,
            )
            .filter((price) => !isNaN(price))
          if (prices.length > 0) {
            const minPrice = Math.floor(Math.min(...prices))
            const maxPrice = Math.ceil(Math.max(...prices))
            if (!filtersApplied) {
              setMinMaxPrice([minPrice, maxPrice])
              setPriceRange([minPrice, maxPrice])
            }
          }
          const daValues = response.items.map((item) => item.domainAuthority || item.da || 0).filter((da) => !isNaN(da))
          if (daValues.length > 0) {
            const minDA = Math.floor(Math.min(...daValues))
            const maxDA = Math.ceil(Math.max(...daValues))
            if (!filtersApplied) {
              setDaRange([minDA, maxDA])
            }
          }
          const drValues = response.items.map((item) => item.domainRatings || item.dr || 0).filter((dr) => !isNaN(dr))
          if (drValues.length > 0) {
            const minDR = Math.floor(Math.min(...drValues))
            const maxDR = Math.ceil(Math.max(...drValues))
            if (!filtersApplied) {
              setDrRange([minDR, maxDR])
            }
          }
          const categories = new Set<string>()
          response.items.forEach((item) => {
            if (Array.isArray(item.category)) {
              item.category.forEach((cat) => categories.add(cat))
            } else if (typeof item.category === "string") {
              categories.add(item.category)
            }
          })
          const categoryList = Array.from(categories)
          setAvailableCategories(categoryList)
          if (Object.keys(selectedCategories).length === 0) {
            setSelectedCategories(
              categoryList.reduce(
                (acc, category) => {
                  acc[category] = false
                  return acc
                },
                {} as Record<string, boolean>,
              ),
            )
          }
        } else {
          setError(t("error.noProducts"))
          setProducts([])
          setTotalPages(1)
          setTotalItems(0)
        }
      } catch (err) {
        setError(t("error.fetchFailed"))
        setProducts([])
        setTotalPages(1)
        setTotalItems(0)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [filtersApplied, appliedFilters, currentPage, t])

  // Add a separate effect for search filtering
  useEffect(() => {
    if (allProducts.length > 0) {
      if (searchTerm && searchTerm.trim() !== "") {
        const searchLower = searchTerm.trim().toLowerCase()
        const filteredItems = allProducts.filter((item) => searchAllFields(item, searchLower))
        setProducts(filteredItems)
        setTotalItems(filteredItems.length)
      } else {
        // If no search term, restore original products
        setProducts(allProducts)
        setTotalItems(allProducts.length)
      }
    }
  }, [searchTerm, allProducts])

  const applyFilters = () => {
    setAppliedFilters({
      priceRange,
      viewsRange,
      daRange,
      drRange,
      categories: { ...selectedCategories },
      minRating,
    })
    setFiltersApplied(true)
    setCurrentPage(1)
  }

  const transformedProducts = products.map((product) => {
    return {
      ...product,
      title: product.siteName || "",
      category: Array.isArray(product.category) ? product.category.join(", ") : product.category || "",
      author: product.productHandeledBy || "",
      domainRatings: product.domainRatings || 0,
      domainAuthority: product.domainAuthority || 0,
      rating: product.domainRatings ? product.domainRatings / 20 : 4.0,
      views: product.monthlyTraffic || 1000,
      price:
        typeof product.adjustedPrice === "string"
          ? Number.parseFloat(product.adjustedPrice)
          : product.adjustedPrice || 0,
      dateAdded: new Date(product.createdAt || Date.now()),
    }
  })

  const sortedProducts = [...transformedProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    } else if (sortBy === "priceLowToHigh") {
      const priceA = typeof a.price === "number" ? a.price : Number.parseFloat(String(a.price || 0))
      const priceB = typeof b.price === "number" ? b.price : Number.parseFloat(String(b.price || 0))
      return priceA - priceB
    } else if (sortBy === "priceHighToLow") {
      const priceA = typeof a.price === "number" ? a.price : Number.parseFloat(String(a.price || 0))
      const priceB = typeof b.price === "number" ? b.price : Number.parseFloat(String(b.price || 0))
      return priceB - priceA
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else {
      return (b.views || 0) - (a.views || 0)
    }
  })

  const newPosts = [...transformedProducts]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3)

  const handleViewDetail = (post: Product) => {
    setSelectedPost(post)
    setIsDrawerOpen(true)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  useEffect(() => {
    document.querySelectorAll(".card-selected").forEach((card) => {
      card.classList.remove("card-selected")
    })

    if (isDrawerOpen && selectedPost) {
      const selectedCard = document.getElementById(`post-card-${selectedPost.id}`)
      if (selectedCard) {
        selectedCard.classList.add("card-selected")
      }
    }
  }, [isDrawerOpen, selectedPost])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 z-0"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="market-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#market-grid)" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
      <style>{cardStyles}</style>
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
            <Badge className="inline-flex bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-slate-700">
            <Sparkles className="mr-1 h-3 w-3" /> {t("hero.badge")}
          </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{t("hero.title1")}</span> {t("hero.title2")}
          </h2>
            <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl/relaxed">{t("hero.description")}</p>
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
          <div className="flex flex-col gap-6">
            {/* Search & Filter Controls */}
            <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder={t("sort.placeholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="newest">{t("sort.newest")}</SelectItem>
                    <SelectItem value="priceLowToHigh">{t("sort.price_low_high")}</SelectItem>
                    <SelectItem value="priceHighToLow">{t("sort.price_high_low")}</SelectItem>
                    <SelectItem value="rating">{t("sort.rating")}</SelectItem>
                    <SelectItem value="views">{t("sort.views")}</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex flex-1 w-full gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder={t("filters.search")}
                      className="pr-10 w-full bg-slate-800 border-slate-700 text-white"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>
                  
                  <Button 
                    variant="outline"
                    className="border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700 hover:text-cyan-400"
                    onClick={() => setFiltersApplied(!filtersApplied)}
                  >
                    <Filter className="mr-2 h-4 w-4" /> {t("filters.title")}
                  </Button>
                </div>
              </div>

              {/* Collapsible Filter Panel */}
              {filtersApplied && (
                <div className="filter-panel mt-4">
                  <div className="filter-grid mb-6">
                    <div className="space-y-3">
                      <Label htmlFor="price-range" className="text-sm font-medium text-white">
                  {t("filters.price")}
                </Label>
                <div className="flex justify-between mb-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceMinChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={0}
                    aria-label={t("filters.min")}
                  />
                        <span className="text-sm text-slate-400 self-center">{t("filters.toSeparator")}</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceMaxChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={priceRange[0] + 1}
                    aria-label={t("filters.max")}
                  />
                </div>
                <Slider
                  id="price-range"
                  min={minMaxPrice[0]}
                  max={minMaxPrice[1]}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                        className="py-2"
                />
              </div>

                    <div className="space-y-3">
                      <Label htmlFor="da-range" className="text-sm font-medium text-white">
                  {t("filters.domain_authority")}
                </Label>
                <div className="flex justify-between mb-2">
                  <Input
                    type="number"
                    value={daRange[0]}
                    onChange={(e) => handleDaMinChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={0}
                    max={100}
                    aria-label={t("filters.min")}
                  />
                        <span className="text-sm text-slate-400 self-center">{t("filters.toSeparator")}</span>
                  <Input
                    type="number"
                    value={daRange[1]}
                    onChange={(e) => handleDaMaxChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={daRange[0] + 1}
                    max={100}
                    aria-label={t("filters.max")}
                  />
                </div>
                <Slider
                  id="da-range"
                  min={0}
                  max={100}
                  step={1}
                  value={daRange}
                  onValueChange={setDaRange}
                        className="py-2"
                />
              </div>

                    <div className="space-y-3">
                      <Label htmlFor="dr-range" className="text-sm font-medium text-white">
                  {t("filters.domain_rating")}
                </Label>
                <div className="flex justify-between mb-2">
                  <Input
                    type="number"
                    value={drRange[0]}
                    onChange={(e) => handleDrMinChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={0}
                    max={100}
                    aria-label={t("filters.min")}
                  />
                        <span className="text-sm text-slate-400 self-center">{t("filters.toSeparator")}</span>
                  <Input
                    type="number"
                    value={drRange[1]}
                    onChange={(e) => handleDrMaxChange(Number.parseInt(e.target.value) || 0)}
                          className="w-[70px] text-center bg-slate-800 border-slate-700 text-white"
                    min={drRange[0] + 1}
                    max={100}
                    aria-label={t("filters.max")}
                  />
                </div>
                <Slider
                  id="dr-range"
                  min={0}
                  max={100}
                  step={1}
                  value={drRange}
                  onValueChange={setDrRange}
                        className="py-2"
                />
                    </div>
              </div>

                  <div className="space-y-3 mb-4">
                    <Label className="text-sm font-medium text-white">{t("filters.categories")}</Label>
                    <div className="category-grid max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                  {availableCategories.length > 0 ? (
                        availableCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories[category] || false}
                            onCheckedChange={() => toggleCategory(category)}
                              className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                            <label htmlFor={`category-${category}`} className="text-sm text-slate-300">
                            {category}
                          </label>
                        </div>
                        ))
                      ) : (
                        <div className="text-sm text-slate-400">{t("filters.noCategories")}</div>
                  )}
                </div>
              </div>

                  <div className="flex flex-wrap gap-2">
              <Button
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/30 border-0 text-white"
                onClick={applyFilters}
              >
                {t("filters.apply_filters")}
              </Button>
              <Button
                variant="outline"
                      className="border-slate-700 text-black hover:bg-slate-800"
                onClick={() => {
                  setPriceRange(minMaxPrice)
                  setViewsRange([0, 15000])
                    setDaRange([0, 100])
                    setDrRange([0, 100])
                  setSelectedCategories(
                    availableCategories.reduce(
                      (acc, key) => {
                        acc[key] = false
                        return acc
                      },
                      {} as Record<string, boolean>,
                    ),
                  )
                  setFiltersApplied(false)
                  setSearchTerm("")
                  setCurrentPage(1)
                }}
              >
                {t("filters.reset_filters")}
              </Button>
            </div>
          </div>
              )}

              {/* Active Filters */}
              {Object.keys(appliedFilters.categories).some(key => appliedFilters.categories[key]) || 
                appliedFilters.priceRange[0] !== 0 || 
                appliedFilters.priceRange[1] !== 1000 || 
                appliedFilters.daRange[0] !== 0 || 
                appliedFilters.daRange[1] !== 100 || 
                appliedFilters.drRange[0] !== 0 || 
                appliedFilters.drRange[1] !== 100 ? (
                <div className="mt-4">
                  <div className="text-sm text-slate-400 mb-2">{t("filters.activeFilters") || "Active Filters"}</div>
                  <div className="flex flex-wrap">
                    {appliedFilters.priceRange[0] !== 0 || appliedFilters.priceRange[1] !== 1000 ? (
                      <div className="filter-tag">
                        {t("filters.price")}: €{appliedFilters.priceRange[0]} - €{appliedFilters.priceRange[1]}
                </div>
                    ) : null}
                    
                    {appliedFilters.daRange[0] !== 0 || appliedFilters.daRange[1] !== 100 ? (
                      <div className="filter-tag">
                        {t("filters.domain_authority")}: {appliedFilters.daRange[0]} - {appliedFilters.daRange[1]}
              </div>
                    ) : null}
                    
                    {appliedFilters.drRange[0] !== 0 || appliedFilters.drRange[1] !== 100 ? (
                      <div className="filter-tag">
                        {t("filters.domain_rating")}: {appliedFilters.drRange[0]} - {appliedFilters.drRange[1]}
            </div>
                    ) : null}
                    
                    {Object.keys(appliedFilters.categories)
                      .filter(key => appliedFilters.categories[key])
                      .map(category => (
                        <div key={category} className="filter-tag">
                          {category}
                        </div>
                      ))
                    }
                  </div>
                </div>
              ) : null}

            {(searchTerm || filtersApplied) && (
                <div className="text-sm text-slate-400 mt-4">
                {t("results.count", { count: sortedProducts.length })}
                {searchTerm && <span> {t("results.forTerm", { term: searchTerm })}</span>}
                {filtersApplied && <span> {t("results.withFilters")}</span>}
              </div>
            )}
            </div>

            {loading && (
              <div className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                  <div className="text-lg font-medium text-white">{t("loading")}</div>
                </div>
              </div>
            )}

            {error && !loading && sortedProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-lg font-medium text-red-500">{error}</div>
                <Button
                  variant="outline"
                  className="mt-4 border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => {
                    setError(null)
                    const fetchData = async () => {
                      setLoading(true)
                      try {
                        const response = await TableData(setError, 1, 10)
                        if (response) {
                          setProducts(response.items)
                          setAllProducts(response.items)
                          if (response.total) {
                            setTotalItems(response.total)
                            setTotalPages(Math.ceil(response.total / itemsPerPage))
                          }
                        }
                      } catch (err) {
                        setError(t("error.fetchFailed"))
                      } finally {
                        setLoading(false)
                      }
                    }
                    fetchData()
                  }}
                >
                  {t("error.tryAgain")}
                </Button>
              </div>
            )}

            <TabsContent value="trending">
              {!loading && !error && sortedProducts.length > 0 ? (
                <div className="table-container custom-scrollbar py-5 backdrop-blur-md shadow-xl shadow-blue-900/10">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th className="text-cyan-300/80">Site</th>
                        <th className="text-cyan-300/80">Category</th>
                        <th className="text-cyan-300/80">Rating</th>
                        <th className="hidden md:table-cell text-cyan-300/80">Traffic</th>
                        <th className="hidden md:table-cell text-cyan-300/80">DA</th>
                        <th className="hidden md:table-cell text-cyan-300/80">DR</th>
                        <th className="text-cyan-300/80">Price</th>
                        <th className="text-cyan-300/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                  {sortedProducts.map((post, index) => (
                        <tr key={post.id} className="transition-all duration-200">
                          <td>
                            <div className="font-medium text-white truncate-text">
                              {post.siteName || post.title}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 truncate-text">
                              {post.productHandeledBy || post.author || "Anonymous"}
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-slate-800 text-cyan-400 border border-cyan-800/50">
    {(() => {
      const category = post.category as string | string[];
      if (Array.isArray(category)) {
                                  return category.slice(0, 1).join("");
      }
      if (typeof category === "string") {
                                  return category.split(",").slice(0, 1).join("");
      }
      return "";
    })()}
                            </span>
                          </td>
                          <td>
                            <div className="rating-stars">
                          {[...Array(Math.round(post.rating || 4))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                          ))}
                              <span className="ml-1 text-white font-medium">{post.rating?.toFixed(1) || "4.0"}</span>
                        </div>
                          </td>
                          <td className="hidden md:table-cell">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-2 text-slate-400" />
                              <span className="text-white">
                            {post.monthlyTraffic?.toLocaleString() || post.views?.toLocaleString() || "0"}
                          </span>
                        </div>
                          </td>
                          <td className="hidden md:table-cell">
                            <div className="flex items-center">
                              <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                              <span className="text-white font-medium">
                            {post.domainAuthority || t("product.notAvailable")}
                          </span>
                        </div>
                          </td>
                          <td className="hidden md:table-cell">
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-cyan-500" />
                              <span className="text-white font-medium">
                            {post.domainRatings || t("product.notAvailable")}
                          </span>
                        </div>
                          </td>
                          <td>
                            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                              €{typeof post.price === "number"
                            ? post.price.toFixed(2)
                            : Number.parseFloat(String(post.price || 0)).toFixed(2)}
                        </div>
                          </td>
                          <td>
                            <button
                              className="view-button"
                          onClick={() => handleViewDetail(post)}
                        >
                          {t("product.view_details")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !loading && !error ? (
                <div className="py-12 text-center bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-xl shadow-lg">
                  <div className="text-lg font-medium text-white">{t("noResults.title")}</div>
                  <p className="text-slate-400 mt-2">{t("noResults.description")}</p>
                  {(searchTerm || filtersApplied) && (
                    <Button
                      variant="outline"
                      className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                      onClick={() => {
                        setSearchTerm("")
                        setPriceRange(minMaxPrice)
                        setViewsRange([0, 15000])
                        setDaRange([daRange[0], daRange[1]])
                        setDrRange([drRange[0], drRange[1]])
                        setSelectedCategories(
                          availableCategories.reduce(
                            (acc, key) => {
                              acc[key] = false
                              return acc
                            },
                            {} as Record<string, boolean>,
                          ),
                        )
                        setFiltersApplied(false)
                        setCurrentPage(1)
                      }}
                    >
                      {t("noResults.clearFilters")}
                    </Button>
                  )}
                </div>
              ) : null}
            </TabsContent>

            {!loading && !error && sortedProducts.length > 0 && (
              <div className="flex justify-center items-center mt-6 mb-4">
                <nav className="inline-flex bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-xl p-2 shadow-lg">
                  <Button
                    key="prev"
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0 mr-1 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {(() => {
                      const buttons = [];
                      const maxVisibleButtons = 5;
                      
                      let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
                      const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
                      
                      if (endPage - startPage + 1 < maxVisibleButtons) {
                        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
                      }
                      
                      for (let i = startPage; i <= endPage; i++) {
                        buttons.push(
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(i)}
                            className={`h-9 w-9 p-0 ${
                              currentPage === i
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                          >
                            {i}
                          </Button>
                        );
                      }
                      
                      return buttons;
                    })()}
                  </div>
                  
                  <Button
                    key="next"
                    variant="ghost"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0 ml-1 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </nav>
              </div>
            )}

            {!loading && !error && sortedProducts.length > 0 && (
              <div className="text-center text-sm text-slate-400">
                {t("pagination.pageInfo", { currentPage: currentPage, totalPages: totalPages, totalItems: totalItems })}
              </div>
            )}
        </div>
      </Tabs>
      <PostDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} post={selectedPost} loading={loading} />
      </div>
    </section>
  )
}

export default MarketSection

