import Link from "next/link";
import { Zap, Github, Twitter, Mail } from "lucide-react";

const compressionLinks = [
  { title: "Image Compressor", href: "/compress-image" },
  { title: "PDF Compressor", href: "/compress-pdf" },
  { title: "Video Compressor", href: "/compress-video" }
];

const conversionLinks = [
  { title: "Image Converter", href: "/convert-image" },
  { title: "PDF Converter", href: "/convert-pdf" }
];

const resourceLinks = [
  { title: "All Tools", href: "/compress" },
  { title: "FAQ", href: "/faq" },
  { title: "Blog", href: "/blog" }
];

const legalLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Cookies", href: "/cookies" }
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SnapFile</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Free online file compression and conversion tools. 100% private, browser-based processing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="/contact" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Compression */}
          <div>
            <h4 className="font-semibold text-white mb-4">Compress</h4>
            <ul className="space-y-2">
              {compressionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conversion */}
          <div>
            <h4 className="font-semibold text-white mb-4">Convert</h4>
            <ul className="space-y-2">
              {conversionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} SnapFile. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Made with ❤️ for privacy-conscious users
          </p>
        </div>
      </div>
    </footer>
  );
}