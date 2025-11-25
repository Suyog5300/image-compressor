"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Heart, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/10 pt-16 pb-8 backdrop-blur-lg">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                SnapFile
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The modern, privacy-first file compressor. We use WebAssembly to compress images, PDFs, and videos directly in your browser—no server uploads required for free users.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://twitter.com" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
              <SocialLink href="https://github.com" icon={<Github className="w-4 h-4" />} label="GitHub" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="/compress">Compress Images</FooterLink></li>
              <li><FooterLink href="/compress">Compress PDF</FooterLink></li>
              <li><FooterLink href="/compress">Video Optimization</FooterLink></li>
              <li><FooterLink href="/#pricing">Pricing & Plans</FooterLink></li>
              <li><FooterLink href="/about">How it Works</FooterLink></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/contact">Contact Support</FooterLink></li>
              <li><FooterLink href="/blog">Blog (Coming Soon)</FooterLink></li>
              {/* <li><FooterLink href="/api-docs">API Documentation</FooterLink></li> */}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
              <li className="flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">GDPR Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} SnapFile Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Systems Operational</span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="hover:text-blue-500 transition-colors duration-200 block w-fit"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full bg-background hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 border-border/50" asChild aria-label={label}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </Button>
  );
}