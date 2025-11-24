/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Zap, FileJson, FileType, Image as ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { toast } from "sonner";
import Script from "next/script";

// --- Components ---

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SnapFile",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  },
  "featureList": "Image compression, PDF reduction, Video optimization, Privacy-first processing"
};

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
          {/* JSON-LD for SEO */}
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              V2.0 is now live
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-4xl mb-6"
          >
            Compress files. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
              Not quality.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            The modern compression stack for designers and developers. 
            Reduce images, PDFs, and videos by up to 80% directly in your browser.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl shadow-blue-500/10" asChild>
              <Link href="/compress">
                Start Compressing <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-border bg-background/50 backdrop-blur hover:bg-muted">
              View Examples
            </Button> */}
          </motion.div>

          {/* 3D Mockup Visualization */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="mt-20 relative w-full max-w-5xl mx-auto perspective-[2000px]"
          >
            {/* The "Card" */}
            <div className="relative rounded-2xl border border-border bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden">
              {/* Browser Window Header */}
              <div className="h-10 border-b border-border bg-muted/30 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                <div className="ml-4 h-5 w-64 rounded-full bg-muted/50" />
              </div>
              {/* Mock Content */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-b from-background to-muted/20">
                 {/* Fake Upload Zone */}
                 <div className="md:col-span-2 h-64 border-2 border-dashed border-blue-500/30 bg-blue-500/5 rounded-xl flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm font-medium">Drag & Drop to Compress</p>
                 </div>
                 {/* Fake Stats */}
                 <div className="space-y-4">
                    <div className="p-4 rounded-xl border bg-card shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                              <FileType className="w-4 h-4 text-red-600" />
                           </div>
                           <div className="text-sm font-medium">Proposal.pdf</div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                           <span>24MB</span>
                           <span className="text-green-600 font-bold">2.1MB</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
                           <div className="bg-green-500 h-full w-[90%]" />
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border bg-card shadow-sm opacity-60">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                           </div>
                           <div className="text-sm font-medium">Hero_Image.jpg</div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                           <div className="bg-blue-500 h-full w-[60%]" />
                        </div>
                    </div>
                 </div>
              </div>
            </div>
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] opacity-20 blur-2xl -z-10" />
          </motion.div>

        </div>
      </section>

      {/* --- TRUSTED BY --- */}
      {/* <section className="py-10 border-y border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                <span className="text-xl font-bold">ACME Corp</span>
                <span className="text-xl font-bold">GlobalBank</span>
                <span className="text-xl font-bold">SaaS.io</span>
                <span className="text-xl font-bold">DesignCo</span>
                <span className="text-xl font-bold">NextLevel</span>
            </div>
        </div>
      </section> */}

      {/* --- BENTO GRID FEATURES --- */}
      <section ref={targetRef} className="py-24 md:py-10 bg-background">
        <div className="container mx-auto px-4">
            <motion.div 
                style={{ opacity, y }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need. <br/>Nothing you don&apos;t.</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We stripped away the clutter to focus on what matters: speed, security, and compression efficiency.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                
                {/* Large Card */}
                <motion.div style={{ scale }} className="md:col-span-2 row-span-2 relative overflow-hidden rounded-3xl border bg-muted/30 p-8 md:p-12 group hover:border-blue-500/50 transition-colors">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Lossless Image Engine</h3>
                        <p className="text-muted-foreground max-w-md">
                            Our intelligent algorithm scans every pixel to determine the optimal balance between quality and file size. 
                            Reduce JPGs and PNGs by up to 90% with zero visible loss.
                        </p>
                    </div>
                    {/* Abstract Visual */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-tl-[100px] translate-y-10 translate-x-10 group-hover:translate-x-5 transition-transform" />
                </motion.div>

                {/* Small Card 1 */}
                <div className="rounded-3xl border bg-muted/30 p-8 hover:bg-muted/50 transition-colors">
                    <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">100% Private</h3>
                    <p className="text-sm text-muted-foreground">Files are processed locally in your browser (Free) or securely in AWS (Pro). We never sell your data.</p>
                </div>

                {/* Small Card 2 */}
                <div className="rounded-3xl border bg-muted/30 p-8 hover:bg-muted/50 transition-colors">
                    <FileJson className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Bulk Processing</h3>
                    <p className="text-sm text-muted-foreground">Drag in 50 files at once. We handle the queueing and parallel processing automatically.</p>
                </div>

                 {/* Medium Card Bottom */}
                 <div className="md:col-span-3 rounded-3xl border bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Developer API Access</h3>
                        <p className="text-gray-400 max-w-lg">
                            Need to compress files programmatically? Integrate our REST API into your Node.js or Python backend in minutes.
                        </p>
                    </div>
                    <Button variant="secondary" className="whitespace-nowrap">Read the Docs</Button>
                </div>
            </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <PricingSection />

    </div>
  );
}

// --- PRICING COMPONENT ---

function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing" className="py-24 border-t border-border bg-muted/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm ${!isYearly ? "font-bold text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                        <span className={`text-sm ${isYearly ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                            Yearly <span className="ml-1 text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">-20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <PriceCard 
                        tier="Starter"
                        price="$0"
                        desc="Perfect for individuals."
                        features={["5MB File Limit", "Browser-based compression", "1 File at a time", "Standard Quality"]}
                        btnText="Start Free"
                        variant="outline"
                    />
                    <PriceCard 
                        tier="Pro"
                        price={isYearly ? "$3" : "$5"}
                        period={isYearly ? "/mo billed yearly" : "/mo"}
                        desc="For heavy power users."
                        features={["500MB File Limit", "Cloud Processing", "Bulk Upload (20 files)", "Video Compression", "No Ads"]}
                        btnText="Get Pro"
                        variant="default"
                        popular
                    />
                     <PriceCard 
                        tier="Team"
                        price={isYearly ? "$12" : "$19"}
                        period={isYearly ? "/mo billed yearly" : "/mo"}
                        desc="For design agencies."
                        features={["Unlimited Size", "API Access", "SSO Integration", "Priority Support", "Team Management"]}
                        btnText="Contact Sales"
                        variant="outline"
                    />
                </div>
            </div>
        </section>
    )
}

function PriceCard({ tier, price, period, desc, features, btnText, variant, popular }: any) {
    return (
        <div className={`relative flex flex-col p-8 rounded-3xl border ${popular ? "border-blue-500 bg-blue-50/5 dark:bg-blue-900/10 shadow-2xl shadow-blue-500/10 z-10 scale-105" : "border-border bg-background"}`}>
            {popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>}
            
            <div className="mb-8">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">{tier}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{price}</span>
                    {period && <span className="text-sm text-muted-foreground">{period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-4">{desc}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        {f}
                    </li>
                ))}
            </ul>

            <Button variant={variant === 'default' ? 'default' : 'outline'} className={`w-full rounded-xl h-12 ${variant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`} onClick={() => toast.success("Coming soon!")}>
                {btnText}
            </Button>
        </div>
    )
}