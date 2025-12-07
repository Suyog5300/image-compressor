"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedTool {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode; // Changed from LucideIcon to ReactNode
}

interface ContentSection {
  title: string;
  content: string | React.ReactNode;
}

interface Step {
  title: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
}

interface ToolPageLayoutProps {
  // Hero Section
  title: string;
  description: string;
  icon: React.ReactNode; // Changed to accept rendered component
  iconBg: string; // Removed iconColor as it should be on the icon node itself
  badge?: string;
  
  // Breadcrumb
  breadcrumbs: { label: string; href?: string }[];
  
  // Tool Component
  children: React.ReactNode;
  
  // SEO Content Sections
  mainTitle?: string;
  intro?: string;
  sections?: ContentSection[];
  
  // Steps & Features (Prevent map errors)
  steps?: Step[];
  features?: Feature[];
  
  // FAQ
  faqs?: FAQ[];
  
  // Related Tools
  relatedTools?: RelatedTool[];
  
  // CTA
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ToolPageLayout({
  title,
  description,
  icon,
  iconBg,
  badge,
  breadcrumbs = [], // Default empty array
  children,
  mainTitle,
  intro,
  sections = [],
  steps = [], // Default empty array
  features = [], // Default empty array
  faqs = [],
  relatedTools = [],
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Try our free compression tools today.",
  ctaButtonText = "Start Now",
  ctaButtonHref = "/compress"
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-500">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 dark:text-white font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <div className={`w-20 h-20 rounded-2xl ${iconBg} flex items-center justify-center mx-auto mb-6`}>
              {/* Icon is now rendered directly */}
              {icon}
            </div>
            {badge && (
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                {badge}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* Steps Section (If provided) */}
      {steps.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {steps.map((step, index) => (
                 <div key={index} className="text-center">
                   <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                     {index + 1}
                   </div>
                   <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                   <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* Features Section (If provided) */}
      {features.length > 0 && (
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Sections */}
      {(mainTitle || intro || sections.length > 0) && (
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {mainTitle && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-6 text-center"
                >
                  {mainTitle}
                </motion.h2>
              )}
              
              {intro && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-12 text-center max-w-3xl mx-auto"
                >
                  {intro}
                </motion.p>
              )}

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {typeof section.content === 'string' ? (
                        <p className="whitespace-pre-line">{section.content}</p>
                      ) : (
                        section.content
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Common questions about this tool
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem 
                      value={`faq-${index}`} 
                      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Related Tools</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Explore more compression and conversion tools
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={tool.href}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        {/* Icon rendered directly */}
                        <div className="mb-4">
                          {tool.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                          {tool.description}
                        </p>
                        <span className="text-blue-500 text-sm font-medium flex items-center gap-1">
                          Try Now <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">{ctaTitle}</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
            <Link href={ctaButtonHref}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {ctaButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}