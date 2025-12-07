import { Metadata } from "next";
import Link from "next/link";
import { 
  HelpCircle, 
  Shield, 
  Zap, 
  FileImage, 
  FileText, 
  Video,
  Settings,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | SnapFile",
  description: "Find answers to common questions about SnapFile's free online compression and conversion tools. Learn about privacy, supported formats, file limits, and more.",
  keywords: [
    "snapfile faq",
    "compression questions",
    "how to compress files",
    "image compression help",
    "pdf compression questions",
    "file converter help"
  ]
};

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: HelpCircle,
    faqs: [
      {
        question: "What is SnapFile?",
        answer: "SnapFile is a free online tool for compressing and converting files directly in your browser. We support image compression (JPEG, PNG, WebP, GIF), PDF compression, video compression (MP4, WebM, MOV), and format conversion. All processing happens locally on your device for complete privacy."
      },
      {
        question: "Is SnapFile really free?",
        answer: "Yes! All basic compression and conversion features are completely free with no hidden fees, watermarks, or account requirements. We offer optional premium features for power users, but most people find the free version meets all their needs."
      },
      {
        question: "Do I need to create an account?",
        answer: "No account is required. Simply visit SnapFile and start compressing or converting files immediately. There's no sign-up process, no email verification, and no personal information collected."
      },
      {
        question: "Does SnapFile work on mobile devices?",
        answer: "Yes! SnapFile is fully responsive and works on smartphones and tablets. Since it's browser-based, you don't need to install any apps—just visit our website in your mobile browser and start compressing."
      },
      {
        question: "Can I use SnapFile offline?",
        answer: "Once the page has loaded, SnapFile can work without an internet connection. The compression algorithms run entirely in your browser, so you can process files even in airplane mode or areas without connectivity."
      }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    faqs: [
      {
        question: "Are my files uploaded to your servers?",
        answer: "No. This is our key differentiator. All file processing happens directly in your browser using WebAssembly technology. Your files never leave your device—nothing is uploaded to any server. We literally cannot see your files."
      },
      {
        question: "How does browser-based processing work?",
        answer: "We use WebAssembly (WASM) to run professional-grade compression algorithms directly in your web browser. WebAssembly allows near-native performance, meaning our browser-based tool is just as fast as desktop software while keeping your files completely private."
      },
      {
        question: "Is it safe to compress sensitive documents?",
        answer: "Absolutely. Since your files never leave your device, SnapFile is one of the safest options for sensitive documents. There's no network transfer, no server storage, and no third-party access. Your confidential files remain confidential."
      },
      {
        question: "Do you store any data about my files?",
        answer: "No. We don't store file contents, metadata, names, or any information about what you process. We use minimal analytics to understand site usage (page views, feature popularity), but this never includes any file data."
      },
      {
        question: "Can I use SnapFile for confidential business documents?",
        answer: "Yes. Our browser-based architecture makes SnapFile suitable for confidential business use. Many professionals use SnapFile for sensitive documents precisely because nothing is uploaded to external servers."
      }
    ]
  },
  {
    id: "compression",
    title: "Compression",
    icon: Zap,
    faqs: [
      {
        question: "How much can files be compressed?",
        answer: "Results vary by file type and content. Images typically compress 60-90%, PDFs 40-80%, and videos 40-70%. Files with lots of detail or that are already optimized will compress less. Our tool shows you the exact reduction for each file."
      },
      {
        question: "Will compression affect quality?",
        answer: "Our algorithms are designed to maximize size reduction while minimizing visible quality loss. At default settings, most users cannot distinguish between original and compressed files. You can adjust quality settings to find your ideal balance."
      },
      {
        question: "What's the difference between lossy and lossless compression?",
        answer: "Lossy compression (JPEG, most video) permanently removes some data to achieve smaller sizes—the quality loss is usually imperceptible. Lossless compression (PNG) reduces size without removing any data, but achieves smaller reductions. Choose based on your quality needs."
      },
      {
        question: "Can I compress multiple files at once?",
        answer: "Yes! SnapFile supports batch processing. Select multiple files or drag and drop a group. All files will be processed simultaneously, and you can download them individually or as a batch."
      },
      {
        question: "What's the maximum file size I can compress?",
        answer: "For images: 100MB each. For PDFs: 100MB. For videos: 500MB. Since processing happens locally, these limits are based on typical browser memory constraints rather than upload limits. Very large files may process slower on less powerful devices."
      }
    ]
  },
  {
    id: "images",
    title: "Image Compression & Conversion",
    icon: FileImage,
    faqs: [
      {
        question: "What image formats are supported?",
        answer: "We support JPEG/JPG, PNG, WebP, GIF, and BMP for both compression and conversion. You can compress any of these formats and convert between them freely."
      },
      {
        question: "Should I use JPEG or PNG?",
        answer: "Use JPEG for photographs and images with many colors—it provides excellent compression. Use PNG for graphics with text, logos, screenshots, or anything needing transparency. PNG preserves sharp edges better but creates larger files for photos."
      },
      {
        question: "What is WebP and should I use it?",
        answer: "WebP is a modern image format by Google that offers 25-35% smaller files than JPEG/PNG at equivalent quality, plus supports transparency. Most modern browsers support it. Use WebP for websites when you want maximum compression."
      },
      {
        question: "What happens to transparency when compressing?",
        answer: "Transparency is preserved in PNG and WebP formats. JPEG doesn't support transparency—when compressing transparent images to JPEG, transparent areas become white. GIF supports simple on/off transparency."
      },
      {
        question: "How do I choose the right quality setting?",
        answer: "For web use: 70-80% offers the best balance of size and quality. For email/sharing: 75-85% is usually ideal. For archival: 90-100% preserves maximum quality. Start with our defaults and adjust based on your results."
      }
    ]
  },
  {
    id: "pdf",
    title: "PDF Compression & Conversion",
    icon: FileText,
    faqs: [
      {
        question: "How does PDF compression work?",
        answer: "PDF compression primarily optimizes embedded images (downsampling, recompression) while preserving text quality. We also apply object compression and remove redundancies. Text remains crisp and searchable after compression."
      },
      {
        question: "Will links and bookmarks be preserved?",
        answer: "Yes. Our compression maintains PDF functionality including hyperlinks, bookmarks, form fields, and document structure. Only embedded images are optimized—interactive features remain intact."
      },
      {
        question: "Can I compress password-protected PDFs?",
        answer: "Currently, our browser-based tool works with unprotected PDFs. To compress protected documents, you'll need to remove protection first using Adobe Acrobat or similar software, then reapply after compression."
      },
      {
        question: "How do I convert images to PDF?",
        answer: "Use our PDF Converter tool, select 'Images to PDF' mode, then add your images. Each image becomes one page in the PDF. The order matches your selection order."
      },
      {
        question: "Can I extract images from a PDF?",
        answer: "Yes! Our PDF Converter's 'PDF to Images' mode extracts each page as a separate image. You can choose PNG (best quality), JPEG (smaller), or WebP (best compression) as the output format."
      }
    ]
  },
  {
    id: "video",
    title: "Video Compression",
    icon: Video,
    faqs: [
      {
        question: "What video formats are supported?",
        answer: "We support MP4, WebM, and MOV—the most common video formats for web and mobile. These cover the vast majority of video files you're likely to encounter."
      },
      {
        question: "How long does video compression take?",
        answer: "Processing time depends on video length, resolution, and your device's capabilities. A typical 1-minute 1080p video takes 30-90 seconds. Longer or higher-resolution videos take proportionally longer."
      },
      {
        question: "Can I compress 4K videos?",
        answer: "Yes, but 4K compression is processor-intensive and may take longer. For web sharing, consider downscaling to 1080p during compression—viewers on most devices won't benefit from 4K resolution anyway."
      },
      {
        question: "Will audio quality be affected?",
        answer: "Audio is compressed alongside video, but we use quality settings that preserve clarity for speech and music. The audio impact is minimal compared to the visual compression."
      },
      {
        question: "What's the best format for sharing videos online?",
        answer: "MP4 with H.264 codec is the most universally compatible—it works on virtually all devices and platforms. For modern web use, WebM offers better compression with good browser support."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Questions",
    icon: Settings,
    faqs: [
      {
        question: "What browsers are supported?",
        answer: "SnapFile works in all modern browsers: Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your preferred browser for best performance. Internet Explorer is not supported."
      },
      {
        question: "Why is compression slow on my device?",
        answer: "Compression speed depends on your device's processor. Older devices, tablets, or smartphones may process files more slowly than modern computers. For large files, ensure you have sufficient RAM available by closing other tabs/apps."
      },
      {
        question: "What is WebAssembly?",
        answer: "WebAssembly (WASM) is a technology that allows high-performance code to run in web browsers. It enables SnapFile to run professional-grade compression algorithms at near-native speed without requiring you to install any software."
      },
      {
        question: "Can I integrate SnapFile into my application?",
        answer: "Currently, SnapFile is available only as a web tool. We're considering API access for developers in the future. Contact us if you have specific integration needs."
      },
      {
        question: "What happens if compression fails?",
        answer: "If compression fails, you'll see an error indicator on the affected file. Common causes include corrupt files, unsupported variants of formats, or insufficient device memory. Try refreshing the page and processing fewer files at once."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about SnapFile&apos;s compression and conversion tools.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <category.icon className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{category.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Contact Support
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Try Our Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2 className="text-2xl font-bold mb-6">About SnapFile&apos;s Compression Technology</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              SnapFile represents a new approach to file compression—one that prioritizes user privacy 
              without sacrificing quality or convenience. Unlike traditional online compression tools 
              that upload your files to remote servers, SnapFile processes everything directly in your 
              web browser.
            </p>

            <h3 className="text-xl font-semibold mb-4">How Browser-Based Compression Works</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              When you use SnapFile, your files are processed using WebAssembly (WASM) technology. 
              WebAssembly allows high-performance code to run in web browsers at near-native speed. 
              This means you get the same quality compression you&apos;d expect from desktop software, 
              but without installing anything and without your files ever leaving your device.
            </p>

            <h3 className="text-xl font-semibold mb-4">Privacy by Design</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Privacy isn&apos;t an afterthought at SnapFile—it&apos;s built into our architecture. Because 
              all processing happens in your browser, we physically cannot access your files. There&apos;s 
              no server upload, no temporary storage, and no data retention. This makes SnapFile 
              ideal for sensitive documents, personal photos, confidential business files, and 
              anything else you want to keep private.
            </p>

            <h3 className="text-xl font-semibold mb-4">Professional-Grade Results</h3>
            <p className="text-slate-600 dark:text-slate-400">
              SnapFile uses the same compression algorithms found in professional software. For images, 
              we employ perceptual compression that identifies and removes data the human eye cannot 
              perceive. For PDFs, we optimize embedded images while preserving text quality. For videos, 
              we use modern codecs to achieve maximum compression with minimal quality loss. The result 
              is smaller files that look indistinguishable from the originals in most viewing conditions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Compressing?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Try SnapFile&apos;s free compression tools today. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/compress-image">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Compress Images
              </Button>
            </Link>
            <Link href="/compress-pdf">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Compress PDFs
              </Button>
            </Link>
            <Link href="/compress-video">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Compress Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}