"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  HelpCircle,
  Mail,
  MessageSquare,
  FileText,
  Settings,
  Users,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "../marketplace/header"
import { Footer } from "../marketplace/footer"
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('FAQPage')

  // Replace with your actual application name
  const appName = "French Guest Post"
  const supportEmail = "info@frenchguestpost.com"

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("")

  // FAQ data structure
  const faqCategories = [
    {
      id: "general",
      title: t('category1Title'),
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          id: "what-is",
          question: t('category1Q1', { appName }),
          answer: t('category1A1', { appName }),
        },
        {
          id: "how-works",
          question: t('category1Q2'),
          answer: t('category1A2'),
        },
        {
          id: "cost",
          question: t('category1Q3'),
          answer: t('category1A3'),
        },
      ],
    },
    {
      id: "submissions",
      title: t('category2Title'),
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          id: "content-requirements",
          question: t('category2Q1'),
          answer: t('category2A1'),
        },
        {
          id: "topics",
          question: t('category2Q2'),
          answer: t('category2A2'),
        },
        {
          id: "turnaround",
          question: t('category2Q3'),
          answer: t('category2A3'),
        },
      ],
    },
    {
      id: "technical",
      title: t('category3Title'),
      icon: <Settings className="h-5 w-5" />,
      questions: [
        {
          id: "links-allowed",
          question: t('category3Q1'),
          answer: t('category3A1'),
        },
        {
          id: "formatting",
          question: t('category3Q2'),
          answer: t('category3A2'),
        },
        {
          id: "images",
          question: t('category3Q3'),
          answer: t('category3A3'),
        },
      ],
    },
    {
      id: "account",
      title: t('category4Title'),
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          id: "create-account",
          question: t('category4Q1'),
          answer: t('category4A1'),
        },
        {
          id: "payment-methods",
          question: t('category4Q2'),
          answer: t('category4A2'),
        },
        {
          id: "refund-policy",
          question: t('category4Q3'),
          answer: t('category4A3'),
        },
      ],
    },
    {
      id: "privacy",
      title: t('category5Title'),
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          id: "data-handling",
          question: t('category5Q1'),
          answer: t('category5A1'),
        },
        {
          id: "content-ownership",
          question: t('category5Q2'),
          answer: t('category5A2'),
        },
      ],
    },
  ]

  // State for expanded questions
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])

  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter((id) => id !== questionId))
    } else {
      setExpandedQuestions([...expandedQuestions, questionId])
    }
  }

  // Filter questions based on search query
  const filteredFAQs =
    searchQuery.trim() === ""
      ? faqCategories
      : faqCategories
          .map((category) => ({
            ...category,
            questions: category.questions.filter(
              (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          }))
          .filter((category) => category.questions.length > 0)

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
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2338BDF8' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')} 
              className="pl-10 w-full bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:ring-cyan-500 focus:border-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(
              (category) =>
                category.questions.length > 0 && (
                  <div key={category.id} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full"
                        style={{
                          backgroundColor: "rgba(6, 182, 212, 0.1)",
                          color: "#06b6d4",
                        }}
                      >
                        {category.icon}
                      </div>
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {category.title}
                      </h2>
                    </div>

                    {category.questions.map((faq) => (
                      <Card
                        key={faq.id}
                        className="border shadow-sm overflow-hidden bg-slate-900 border-slate-700"
                      >
                        <button
                          className="w-full text-left px-6 pb-4 pt-9 -mt-7 flex items-center justify-between"
                          onClick={() => toggleQuestion(faq.id)}
                          aria-expanded={expandedQuestions.includes(faq.id)}
                          style={{
                            backgroundColor: expandedQuestions.includes(faq.id)
                              ? "rgba(6, 182, 212, 0.1)"
                              : "transparent",
                          }}
                        >
                          <span className="font-medium text-slate-200">{faq.question}</span>
                          {expandedQuestions.includes(faq.id) ? (
                            <Minus className="h-5 w-5 text-cyan-500" />
                          ) : (
                            <Plus className="h-5 w-5 text-cyan-500" />
                          )}
                        </button>

                        {expandedQuestions.includes(faq.id) && (
                          <CardContent className="pt-0 pb-4 px-6 border-t border-slate-700">
                            <p className="text-slate-300">{faq.answer}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                ),
            )
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 mx-auto text-cyan-500/30 mb-4" />
              <h3 className="text-xl font-medium mb-2 text-slate-200">{t('noResultsTitle')}</h3>
              <p className="text-slate-400 mb-6">
                {t('noResultsDescription')}
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
              >
                {t('noResultsButton')}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

