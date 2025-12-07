import { Metadata } from "next";
import { FileText, ImageIcon, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-layout";
import { PdfConverterDashboard } from "@/components/pdf-converter";

export const metadata: Metadata = {
  title: "Free PDF Converter - Images to PDF & PDF to Images",
  description: "Convert JPG/PNG to PDF or extract images from PDF documents. fast, free, and private browser-based processing.",
};

const steps = [
  {
    title: "Select Mode",
    description: "Choose 'Images to PDF' to combine files, or 'PDF to Images' to extract pages.",
  },
  {
    title: "Upload Files",
    description: "Drag and drop your images or PDF documents into the upload area.",
  },
  {
    title: "Convert & Download",
    description: "Process your files instantly and download the result.",
  },
];

const features = [
  {
    title: "Two-Way Conversion",
    description: "Combine images into a PDF or turn PDF pages back into images.",
  },
  {
    title: "Private Processing",
    description: "All conversions happen in your browser. No files are uploaded to servers.",
  },
  {
    title: "Format Control",
    description: "Choose between PNG, JPG, or WebP when extracting images from PDF.",
  },
];

const faqs = [
  {
    question: "How do I combine multiple images into a PDF?",
    answer: "Simply select 'Images to PDF' mode, then drag and drop your images or click to select them. All selected images will be combined into a single PDF, with each image becoming one page. The order of pages matches the order you select the images."
  },
  {
    question: "What image formats can I convert to PDF?",
    answer: "You can convert JPEG, PNG, WebP, and GIF images to PDF. All common image formats are supported. For best results, use high-quality source images."
  },
  {
    question: "Can I convert a PDF back to images?",
    answer: "Yes! Use the 'PDF to Images' mode to extract each page of your PDF as a separate image file. You can choose to export as PNG (best quality), JPEG (smaller files), or WebP (best compression)."
  },
  {
    question: "Is there a limit on the number of images I can combine?",
    answer: "There's no hard limit on the number of images. However, combining many large images will create a large PDF and may take longer to process. For best performance, compress your images first if the PDF doesn't need to be print-quality."
  },
  {
    question: "Will the image quality be preserved in the PDF?",
    answer: "Yes, images are embedded at their original quality. The PDF will maintain the resolution and quality of your source images. For smaller PDFs, consider compressing images before conversion."
  },
  {
    question: "Are my files private during conversion?",
    answer: "Absolutely. All conversion happens locally in your browser. Your images and PDFs never leave your device—nothing is uploaded to any server. This makes our tool safe for sensitive documents."
  },
];

const relatedTools = [
  {
    title: "PDF Compressor",
    description: "Reduce PDF file sizes",
    href: "/compress/pdf",
    // FIX: Pass as a JSX Element, not the function
    icon: <FileText className="w-10 h-10 text-blue-500" />
  },
  {
    title: "Image Compressor",
    description: "Compress images before converting",
    href: "/compress/image",
    // FIX: Pass as a JSX Element
    icon: <ImageIcon className="w-10 h-10 text-blue-500" />
  },
  {
    title: "Image Converter",
    description: "Convert between image formats",
    href: "/convert/image",
    // FIX: Pass as a JSX Element
    icon: <RefreshCw className="w-10 h-10 text-blue-500" />
  }
];

const contentSections = [
  {
    title: "Why Convert Images to PDF?",
    content: `Converting images to PDF offers several advantages for document management, sharing, and archival. PDF (Portable Document Format) has become the universal standard for document exchange because it preserves formatting across all devices and platforms.

**Document Consolidation:** Combine multiple images—receipts, scanned documents, photos, or screenshots—into a single, organized file. Instead of sending 10 separate image attachments, send one PDF that's easier to manage and review.

**Professional Presentation:** PDFs look more professional than loose image files. When submitting documents, portfolios, or reports, a well-organized PDF makes a better impression than a folder of images.`,
  },
  {
    title: "Why Convert PDF to Images?",
    content: `Converting PDF pages to images is useful in many scenarios where you need more flexibility than the PDF format provides.

**Social Media Sharing:** Most social platforms don't support PDF uploads. Converting PDF pages to images lets you share document content on Instagram, Twitter, Facebook, and other platforms that accept image formats.

**Presentation Slides:** Insert PDF content into PowerPoint, Google Slides, or Keynote by converting pages to images. This is often easier than trying to embed PDFs directly.`,
  },
  {
    title: "Browser-Based Conversion Technology",
    content: `SnapFile performs all PDF conversion directly in your browser using JavaScript libraries. Here's how it works:

**Images to PDF:** We use the jsPDF library to create PDF documents in your browser. Images are read using the FileReader API, rendered to a canvas for processing, and then embedded into the PDF structure.

**PDF to Images:** We use PDF.js to parse and render PDF pages. Each page is rendered to an HTML5 canvas at the specified resolution, then exported as your chosen image format.

**Privacy Guarantee:** Because everything runs in your browser, your files never leave your device. There are no uploads, no server processing, and no data retention.`,
  },
];

export default function ConvertPdfPage() {
  return (
    <ToolPageLayout
      title="PDF Converter"
      description="Convert images to PDF or extract PDF pages as images. Free, instant, and completely private browser-based conversion."
      
      // FIX: Pass the rendered icon element with className
      icon={<FileText className="w-10 h-10 text-blue-500" />}
      iconBg="bg-blue-100"
      
      badge="Two-Way Conversion"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "PDF Converter" }
      ]}
      
      mainTitle="Complete Guide to PDF Conversion"
      intro="Learn how to effectively convert between PDF and image formats for different use cases and platforms."
      
      // Pass the arrays
      steps={steps}
      features={features}
      sections={contentSections}
      faqs={faqs}
      relatedTools={relatedTools}
      
      ctaTitle="Need to Compress Your PDFs?"
      ctaDescription="Reduce PDF file sizes while maintaining quality."
      ctaButtonText="Try PDF Compressor"
      ctaButtonHref="/compress/pdf"
    >
      <PdfConverterDashboard />
    </ToolPageLayout>
  );
}