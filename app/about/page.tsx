/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Privacy First Compression",
  description: "Learn how SnapFile uses WebAssembly to compress files locally without server uploads.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
          We make the internet lighter.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          SnapFile was built to prove that you don&apos;t need to sacrifice privacy for performance.
        </p>
      </div>

      {/* The Story Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every day, millions of gigabytes are wasted on unoptimized images and documents. This slows down websites, eats up storage, and costs money.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Existing tools force you to upload your sensitive data to their servers. We asked: <span className="text-foreground font-semibold">&quot;Why can&apos;t the browser handle this?&quot;</span>
          </p>
        </div>
        <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
           <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
              <span className="text-blue-500 font-bold text-lg">Serverless Architecture</span>
           </div>
        </div>
      </div>

      {/* Tech Stack Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-24">
        <FeatureCard 
            icon={<Cpu className="w-8 h-8 text-blue-500" />}
            title="WebAssembly Power"
            desc="We use FFmpeg.wasm and advanced canvas algorithms to run heavy compression tasks directly on your device CPU."
        />
        <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-green-500" />}
            title="Zero-Knowledge Privacy"
            desc="Since files are processed in your browser, they never touch our servers (Free Tier). Your data remains yours."
        />
      </div>

      {/* CTA */}
      <div className="text-center bg-muted/20 rounded-3xl p-12">
        <h3 className="text-2xl font-bold mb-4">Ready to optimize?</h3>
        <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/compress">Start Compressing Now</Link>
        </Button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
    return (
        <Card className="bg-background hover:bg-muted/30 transition-colors">
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="p-3 w-fit rounded-xl bg-muted">{icon}</div>
                <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{desc}</p>
                </div>
            </CardContent>
        </Card>
    )
}