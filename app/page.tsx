/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  Zap, 
  FileJson, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Repeat, 
  Maximize2,
  Lock,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Script from "next/script";
import { SeoContent } from "@/components/seo-content";
import Image from "next/image";

// --- Main Landing Page Component ---

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SnapFile",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "description": "Free online file compressor and converter. Optimize images, videos, and PDFs efficiently and privately.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2450"
    },
    "featureList": [
      "Image Compression (JPG, PNG, WebP)",
      "PDF Compression",
      "Video Compression (MP4)",
      "Image Format Conversion",
      "PDF to Image Conversion"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden font-sans selection:bg-blue-500/20">
      
      {/* JSON-LD Script */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative md:pt-40 md:pb-32 overflow-hidden">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/15 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-sm border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-500/10 transition-colors cursor-default">
              <Sparkles className="w-3.5 h-3.5 mr-2 inline text-amber-500" />
              <span>New: PDF to Image Conversion added</span>
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl mb-6 leading-[1.1]"
          >
            Compress & Convert. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient bg-300%">
              Without the Quality Loss.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            The all-in-one toolkit for modern creators. 
            Compress images, optimize PDFs, and convert formats securely in your browser.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40" asChild>
              <Link href="/compress">
                Start Optimizing <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-border bg-background/50 backdrop-blur hover:bg-muted/50" asChild>
              <Link href="/dashboard">
                Explore Tools
              </Link>
            </Button>
          </motion.div>

          {/* 3D Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, y: 100 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.2 }}
            className="mt-24 relative w-full max-w-5xl mx-auto perspective-[2000px]"
          >
            <div className="relative rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              
              {/* Window Header */}
              <div className="h-12 border-b border-white/10 bg-white/50 dark:bg-black/50 flex items-center px-4 justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">SnapFile Dashboard</div>
                <div className="w-16" /> {/* Spacer */}
              </div>

              {/* Window Content */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {/* Tool Card 1 */}
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-500 mb-4">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">Image Compressor</h3>
                      <p className="text-xs text-muted-foreground mb-4">Reduce JPG, PNG, WebP size</p>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-pink-500 w-[75%] h-full" />
                      </div>
                      <div className="text-[10px] text-pink-600 font-bold mt-2">-75% Size</div>
                   </div>

                   {/* Tool Card 2 */}
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-500 mb-4">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">PDF Tools</h3>
                      <p className="text-xs text-muted-foreground mb-4">Compress & Convert PDFs</p>
                      <div className="flex gap-2">
                         <Badge variant="secondary" className="text-[10px]">PDF → IMG</Badge>
                         <Badge variant="secondary" className="text-[10px]">Compress</Badge>
                      </div>
                   </div>

                   {/* Tool Card 3 */}
                   <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500 mb-4">
                        <Repeat className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">Format Converter</h3>
                      <p className="text-xs text-muted-foreground mb-4">Switch between file types</p>
                      <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md">
                        <span>.PNG</span> <ArrowRight className="w-3 h-3 text-slate-400" /> <span>.WEBP</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            {/* Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </section>


      {/* --- TOOLS GRID --- */}
      <section id="tools" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful tools for every format</h2>
            <p className="text-muted-foreground text-lg">
              Whether you need to shrink file sizes for faster loading or convert documents for compatibility, we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ToolCard 
              title="Image Compressor"
              desc="Intelligently reduce the size of your images while maintaining perfect visual quality."
              icon={ImageIcon}
              color="text-pink-500"
              bgColor="bg-pink-50 dark:bg-pink-950/20"
              link="/compress/image"
              badges={["JPG", "PNG", "WebP"]}
            />
            <ToolCard 
              title="PDF Compressor"
              desc="Shrink large PDF documents for easier emailing and uploading without losing readability."
              icon={FileText}
              color="text-red-500"
              bgColor="bg-red-50 dark:bg-red-950/20"
              link="/compress/pdf"
              badges={["Documents", "Reports"]}
            />
             <ToolCard 
              title="Format Converter"
              desc="Convert between modern and legacy formats. Switch JPG to PNG, or maximize speed with WebP."
              icon={Repeat}
              color="text-emerald-500"
              bgColor="bg-emerald-50 dark:bg-emerald-950/20"
              link="/convert/image"
              badges={["Conversion", "Optimization"]}
            />
             <ToolCard 
              title="PDF Converter"
              desc="Extract images from PDF pages or compile multiple images into a single PDF document."
              icon={FileJson}
              color="text-blue-500"
              bgColor="bg-blue-50 dark:bg-blue-950/20"
              link="/convert/pdf"
              badges={["PDF ↔ JPG", "Merge"]}
            />
             <ToolCard 
              title="Video Compressor"
              desc="Reduce video file sizes dramatically for faster streaming and sharing on social media."
              icon={Maximize2}
              color="text-violet-500"
              bgColor="bg-violet-50 dark:bg-violet-950/20"
              link="/compress/video"
              badges={["MP4", "WebM"]}
            />
            <div className="group relative rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-default">
               <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4 group-hover:text-blue-500 transition-colors">
                  <Sparkles className="w-6 h-6" />
               </div>
               <h3 className="font-semibold text-slate-900 dark:text-white mb-2">More Coming Soon</h3>
               <p className="text-sm text-muted-foreground">We are building new tools like audio conversion and basic editing.</p>
            </div>
          </div>
        </div>
      </section>


      {/* --- FEATURES BENTO GRID --- */}
      <section ref={targetRef} className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <motion.div 
                style={{ opacity, y }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for speed & security</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We process your files differently. By leveraging browser technologies, we offer a service that is faster and more private than traditional cloud converters.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                
                {/* Large Feature Card */}
                <motion.div className="md:col-span-2 row-span-2 relative overflow-hidden rounded-3xl border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-8 md:p-12 group hover:shadow-xl transition-all duration-500">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/30">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">Client-Side Engine</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md">
                            SnapFile runs directly in your web browser. This means your files <strong>never leave your device</strong> for basic operations. No uploads means zero waiting time and 100% data privacy.
                        </p>
                    </div>
                    {/* Abstract Decoration */}
                    <div className="absolute right-0 bottom-0 opacity-10 dark:opacity-5 transform translate-x-1/4 translate-y-1/4">
                       <Zap className="w-96 h-96" />
                    </div>
                </motion.div>

                {/* Privacy Card */}
                <div className="rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300">
                    <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Bank-Grade Privacy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Since we don&apos;t upload your files to a server, there is zero risk of data leaks. Your confidential documents stay on your machine.
                    </p>
                </div>

                {/* Bulk Card */}
                <div className="rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300">
                    <FileJson className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Smart Queue</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                       Process dozens of files at once. Our engine intelligently manages browser memory to convert bulk batches without crashing.
                    </p>
                </div>

                 {/* API Card */}
                 <div className="md:col-span-3 rounded-3xl border bg-[#111] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                           <Globe className="w-6 h-6 text-blue-400" />
                           Works Offline
                        </h3>
                        <p className="text-gray-400 max-w-xl text-lg">
                            SnapFile is a Progressive Web App (PWA). Once loaded, you can disconnect from the internet and continue compressing and converting files indefinitely.
                        </p>
                    </div>
                    <div className="relative z-10">
                       <Badge variant="outline" className="text-white border-white/20 bg-white/10 px-4 py-1">PWA Ready</Badge>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SEO CONTENT SECTION (Hidden visually or styled minimally) --- */}
      <SeoContent />

      {/* --- PRICING SECTION --- */}
      <PricingSection />

    </div>
  );
}

// --- HELPER COMPONENTS ---

function ToolCard({ title, desc, icon: Icon, color, bgColor, link, badges }: any) {
  return (
    <Link href={link} className="block h-full">
      <div className="group h-full bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 flex-grow">{desc}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {badges.map((badge: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal text-muted-foreground bg-muted group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}

function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing" className="py-24 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                    <p className="text-muted-foreground text-lg mb-8">Most tools are free forever. Upgrade for heavier workloads.</p>
                    
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm ${!isYearly ? "font-bold text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                        <span className={`text-sm ${isYearly ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                            Yearly <span className="ml-1 text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full uppercase tracking-wide">Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    <PriceCard 
                        tier="Starter"
                        price="$0"
                        desc="Essential tools for everyday use."
                        features={["Unlimited Compresssions", "Client-side Privacy", "5MB Max File Size", "Basic Formats (JPG, PNG)"]}
                        btnText="Start Free"
                        variant="outline"
                        delay={0}
                    />
                    <PriceCard 
                        tier="Pro"
                        price={isYearly ? "$5" : "$9"}
                        period={isYearly ? "/mo" : "/mo"}
                        desc="For creators and professionals."
                        features={["500MB Max File Size", "Bulk Processing (50+)", "Video Compression", "No Ads", "Priority Support"]}
                        btnText="Get Pro"
                        variant="default"
                        popular
                        delay={0.1}
                    />
                     <PriceCard 
                        tier="Team"
                        price={isYearly ? "$19" : "$29"}
                        period={isYearly ? "/mo" : "/mo"}
                        desc="For agencies and small teams."
                        features={["Unlimited File Size", "Team Management", "API Access", "SSO Integration", "Dedicated Server"]}
                        btnText="Contact Sales"
                        variant="outline"
                        delay={0.2}
                    />
                </div>
                
                <p className="text-center text-sm text-muted-foreground mt-12">
                   * Local processing features are always free. Pro features require cloud resources.
                </p>
            </div>
        </section>
    )
}

function PriceCard({ tier, price, period, desc, features, btnText, variant, popular, delay }: any) {
    return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay }}
          viewport={{ once: true }}
          className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${popular ? "border-blue-500 bg-background shadow-2xl shadow-blue-500/10 z-10 scale-105" : "border-border bg-card/50"}`}
        >
            {popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">{tier}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{price}</span>
                    {period && <span className="text-sm text-muted-foreground font-medium">{period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{desc}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <Check className="w-3 h-3" />
                        </div>
                        <span className="text-foreground/90">{f}</span>
                    </li>
                ))}
            </ul>

            <Button variant={variant === 'default' ? 'default' : 'outline'} className={`w-full rounded-xl h-12 font-medium text-base ${variant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`} onClick={() => toast.success("Coming soon!")}>
                {btnText}
            </Button>
        </motion.div>
    )
}