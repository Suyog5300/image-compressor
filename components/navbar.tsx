"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { setTheme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-[#2e3354] rounded-lg flex items-center justify-center text-white">
                <Zap className="h-5 w-5 fill-[#34adc4] text-[#34adc4]" />
            </div>
            <span>SnapFile</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/compress" className="text-muted-foreground hover:text-foreground transition-colors">Product</Link>
          <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-4">
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
          
          <Button asChild className="hidden md:inline-flex bg-[#2e3354] hover:bg-[#2e3354]/90 text-white rounded-full px-6">
             <Link href="/compress">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}