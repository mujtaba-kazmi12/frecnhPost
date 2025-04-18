"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, AtSign, Building, MapPin, Phone, Send } from "lucide-react"
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "../ui/use-toast"
import { useTranslations } from 'next-intl';
import { Footer } from "../marketplace/footer"
import { Header } from "../marketplace/header"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const t = useTranslations('ContactPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const token = Cookies.get("token"); // Get token from cookies
      console.log(token)
      if (!token) {
          throw new Error("Authentication token not found.");
      }
      const response = await fetch("https://newbackend.crective.com/v1/auth/contact-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use token from cookies
      },
        body: JSON.stringify(values),
        
      });
      console.log("Request Payload:", JSON.stringify(values));

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || t('toastErrorDefault'));
      }

      toast({
        title: t('toastSuccessTitle'),
        description: t('toastSuccessDescription'),
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: t('toastErrorTitle'),
        description: error.message || t('toastErrorDefault'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen pb-16 bg-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-800/5 [mask-image:linear-gradient(to_bottom,transparent,black)] z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-blue-400/5 blur-3xl rounded-full"></div>
      
      <div className="w-full pt-16 pb-12 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
            <CardHeader className="border-b border-slate-800 bg-slate-900/80">
              <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('formCardTitle')}
              </CardTitle>
              <CardDescription className="text-slate-400">{t('formCardDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t('formLabelName')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('formPlaceholderName')} 
                              {...field} 
                              className="bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">{t('formLabelEmail')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('formPlaceholderEmail')} 
                              {...field} 
                              className="bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">{t('formLabelSubject')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('formPlaceholderSubject')} 
                            {...field} 
                            className="bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">{t('formLabelMessage')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('formPlaceholderMessage')} 
                            className="min-h-32 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full text-white relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>{t('submitButtonSubmitting')}</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('submitButtonIdle')}
                      </>
                    )}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-650"></span>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
              <CardHeader className="border-b border-slate-800 bg-slate-900/80">
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {t('infoCardTitle')}
                </CardTitle>
                <CardDescription className="text-slate-400">{t('infoCardDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-cyan-400" />
                    <div>
                      <h3 className="font-medium text-slate-300">{t('infoLabelAddress')}</h3>
                      <p className="text-slate-400">
                        123 Innovation Drive
                        <br />
                        Tech District
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 mt-0.5 text-cyan-400" />
                    <div>
                      <h3 className="font-medium text-slate-300">{t('infoLabelPhone')}</h3>
                      <p className="text-slate-400">
                        <Link href="tel:+14155550123" className="hover:text-cyan-400 transition-colors">
                          +1 (415) 555-0123
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <AtSign className="h-5 w-5 mr-3 mt-0.5 text-cyan-400" />
                    <div>
                      <h3 className="font-medium text-slate-300">{t('infoLabelEmail')}</h3>
                      <p className="text-slate-400">
                        <Link href="mailto:hello@frenchguestpost.com" className="hover:text-cyan-400 transition-colors">
                          hello@frenchguestpost.com
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Building className="h-5 w-5 mr-3 mt-0.5 text-cyan-400" />
                    <div>
                      <h3 className="font-medium text-slate-300">{t('infoLabelHours')}</h3>
                      <p className="text-slate-400">
                        {t('infoHoursDays')}
                        <br />
                        {t('infoHoursWeekend')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> 

            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl h-64 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-900/70 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
                </div>
                <div className="text-center p-6 relative z-10">
                  <h3 className="text-xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('socialCardTitle')}</h3>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-10 w-10 border-slate-700 bg-slate-800/30 text-blue-400 hover:text-cyan-300 hover:border-blue-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-10 w-10 border-slate-700 bg-slate-800/30 text-blue-400 hover:text-cyan-300 hover:border-blue-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-10 w-10 border-slate-700 bg-slate-800/30 text-blue-400 hover:text-cyan-300 hover:border-blue-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-10 w-10 border-slate-700 bg-slate-800/30 text-blue-400 hover:text-cyan-300 hover:border-blue-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card> 
          </div>
        </div>
        
        <div className="mt-12 rounded-xl overflow-hidden shadow-xl border border-slate-800 h-80 relative bg-slate-900/50 backdrop-blur-sm">
          <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 bg-grid-slate-800/10 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            {/* Decorative gradients */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-full blur-3xl"></div>
            
            <div className="text-center p-8 relative z-10">
              <h3 className="text-2xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('mapCardTitle')}
              </h3>
              <p className="mb-6 text-slate-400 max-w-xl">
                {t('mapCardDescription')}
              </p>
              <Button
                className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-white"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {t('mapButton')}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-650"></span>
              </Button>
            </div>
          </div>
        </div> 
      </div>
    </div>
    <Footer/>
    </>
  );
}

