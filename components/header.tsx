"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ImageIcon,
  FileText,
  Video,
  RefreshCw,
  ChevronDown,
  Menu,
  X,
  Zap,
  HelpCircle,
  Mail,
  Info,
  Sun,
  Moon
} from "lucide-react";

// UI Imports
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Assets
import logo from "@/public/logo2.png"; // Ensure this path is correct

// --- Data Configuration ---

const compressionTools = [
  {
    title: "Image Compressor",
    description: "Compress JPEG, PNG, WebP, GIF",
    href: "/compress/image",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file sizes",
    href: "/compress/pdf",
    icon: FileText,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Video Compressor",
    description: "Compress MP4, WebM, MOV",
    href: "/compress/video",
    icon: Video,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  }
];

const conversionTools = [
  {
    title: "Image Converter",
    description: "Convert between image formats",
    href: "/convert/image",
    icon: RefreshCw,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "PDF Converter",
    description: "Images ↔ PDF conversion",
    href: "/convert/pdf",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  }
];

const directLinks = [
  { title: "About", href: "/about", icon: Info },
  { title: "Contact", href: "/contact", icon: Mail },
  { title: "FAQ", href: "/faq", icon: HelpCircle },
];

// --- Sub-Components ---

interface DropdownProps {
  title: string;
  items: typeof compressionTools;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function Dropdown({ title, items, isOpen, onToggle, onClose }: DropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          isOpen
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50"
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", item.bgColor)}>
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Component ---

export function Header() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Logo Section */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"> */}
                <Image src={logo} width={60} height={60} alt="SnapFile Logo" />
            {/* </div> */}
            <span>Snap<span className="text-blue-600">File</span></span>
        </Link>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Dropdown
              title="Compress"
              items={compressionTools}
              isOpen={openDropdown === "compress"}
              onToggle={() => toggleDropdown("compress")}
              onClose={closeDropdowns}
            />
            <Dropdown
              title="Convert"
              items={conversionTools}
              isOpen={openDropdown === "convert"}
              onToggle={() => toggleDropdown("convert")}
              onClose={closeDropdowns}
            />
            
            {/* Direct Links (About, Contact, FAQ) */}
            {directLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* 3. Desktop Actions (Theme & CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
               <Link href="/compress">Get Started</Link>
            </Button>
          </div>

          {/* 4. Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
             {/* Mobile Theme Toggle (Optional, can also keep inside menu) */}
             <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
             </Button>

            <button
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              
              {/* Compression Tools */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Compress
                </div>
                <div className="space-y-1">
                  {compressionTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", tool.bgColor)}>
                        <tool.icon className={cn("w-5 h-5", tool.color)} />
                      </div>
                      <div>
                        <div className="font-medium">{tool.title}</div>
                        <div className="text-sm text-slate-500">{tool.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Conversion Tools */}
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Convert
                </div>
                <div className="space-y-1">
                  {conversionTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", tool.bgColor)}>
                        <tool.icon className={cn("w-5 h-5", tool.color)} />
                      </div>
                      <div>
                        <div className="font-medium">{tool.title}</div>
                        <div className="text-sm text-slate-500">{tool.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* General Links (About, Contact) */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  {directLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <link.icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" asChild>
                    <Link href="/compress">Get Started</Link>
                </Button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}