import { Metadata } from "next";
import { FileText } from "lucide-react";
import CompressDashboard from "@/app/compress/page";
import { ToolPageLayout } from "@/components/tool-layout";

export const metadata: Metadata = {
  title: "Free PDF Compressor - Reduce PDF File Size Online",
  description:
    "Compress PDF files online for free. Reduce PDF size by up to 80% for email attachments. Secure browser-based processing - your documents never leave your device.",
  keywords: [
    "pdf compressor",
    "compress pdf",
    "reduce pdf size",
    "shrink pdf",
    "pdf optimizer",
    "compress pdf for email",
    "pdf size reducer",
    "online pdf compressor",
    "free pdf compression",
  ],
  openGraph: {
    title: "Free PDF Compressor - Reduce File Size for Email",
    description:
      "Compress PDF documents by up to 80%. Perfect for email attachments. Browser-based processing means your files stay private.",
    type: "website",
  },
};

const seoContent = {
  mainTitle: "The Complete Guide to PDF Compression",
  intro: `PDF compression is essential for anyone who regularly works with documents. Whether you're emailing contracts, uploading reports to cloud storage, or managing a document archive, smaller PDF files mean faster transfers and more efficient storage. This guide covers everything you need to know about reducing PDF file sizes without losing important content.`,

  sections: [
    {
      title: "Why PDF Files Become So Large",
      content: `PDF documents can grow surprisingly large for several reasons. Understanding these causes helps you make informed decisions about compression.

**High-Resolution Images** are the most common culprit. Scanned documents often contain images at 300-600 DPI (dots per inch), which is excellent for printing but excessive for screen viewing. A single scanned page can exceed 5MB.

**Embedded Fonts** add significant weight to PDFs. When a PDF embeds complete font families to ensure consistent rendering, each font can add 100KB-2MB to the file size. Many PDFs embed fonts you're not even using.

**Metadata and Version History** accumulate over time. PDFs can contain editing history, comments, form data, JavaScript, and XML layers that bloat file size without adding visible value.

**Unoptimized Graphics** like vector illustrations, charts, and diagrams may contain unnecessary precision or duplicated elements that could be simplified.`,
    },
    {
      title: "How PDF Compression Works",
      content: `Our PDF compressor uses multiple techniques to reduce file size while preserving document quality and functionality.

**Image Downsampling** reduces embedded image resolution to screen-appropriate levels. For most on-screen viewing, 72-150 DPI is sufficient, compared to the 300+ DPI often found in scanned documents.

**Font Subsetting** replaces full font families with subsets containing only the characters actually used in your document. If your PDF uses just 50 characters from a font, we embed only those 50—not the full 2,000+ character set.

**Object Compression** applies efficient compression algorithms to the PDF's internal structure, reducing the space needed to store text, vectors, and other non-image elements.

**Metadata Stripping** removes unnecessary information like editing history, creator metadata, and hidden layers that don't affect the visible document.`,
    },
    {
      title: "Common PDF Compression Use Cases",
      content: `**Email Attachments**
Most email providers limit attachments to 25MB. Our compressor can typically reduce a 30MB scanned document to under 5MB, ensuring it reaches recipients without bouncing.

**Cloud Storage Optimization**
Services like Google Drive, Dropbox, and OneDrive have storage limits. Compressing PDFs before upload can multiply your effective storage capacity by 3-5x.

**Website Downloads**
If your website offers PDF downloads (manuals, brochures, reports), compressed files improve user experience through faster downloads and lower hosting bandwidth costs.

**Legal and Compliance Documents**
Courts and government agencies often have file size limits for electronic submissions. Proper compression ensures documents meet requirements while remaining fully readable.

**Archive and Backup**
Long-term document storage becomes more practical with compressed files. A 1TB drive can hold 5x more compressed documents than unoptimized originals.`,
    },
    {
      title: "Understanding PDF Quality Settings",
      content: `Compression involves tradeoffs between file size and quality. Here's how to choose the right settings for your needs.

**High Quality (80-90%)** - Minimal visible change from the original. Images remain sharp and text crisp. Best for documents that will be viewed at high zoom levels or printed. Typical reduction: 30-50%.

**Balanced Quality (60-80%)** - Excellent for most purposes. Slight softening of images is visible only under close inspection. Text remains perfectly readable. Typical reduction: 50-70%.

**Maximum Compression (40-60%)** - Noticeable image quality reduction, but text remains clear. Best for documents that will only be quickly referenced on screen. Typical reduction: 70-85%.

For most email and web use cases, we recommend the balanced setting. It provides substantial size reduction while maintaining professional appearance.`,
    },
    {
      title: "Preserving PDF Functionality",
      content: `Unlike some compressors that convert PDFs to images, our tool preserves full PDF functionality:

**Searchable Text** - All text remains selectable and searchable. Optical Character Recognition (OCR) text layers are preserved.

**Hyperlinks** - Internal and external links continue to work, including table of contents navigation.

**Form Fields** - Fillable forms remain functional. Form data already entered is preserved.

**Bookmarks** - PDF navigation bookmarks are maintained for easy document navigation.

**Annotations** - Comments, highlights, and other annotations are preserved unless you specifically choose to remove them.

**Security Settings** - Password protection and permission settings are maintained through the compression process.`,
    },
    {
      title: "PDF Compression Best Practices",
      content: `**Compress Before Sending**
Make PDF compression the final step before sharing. Compressing, then editing, then compressing again is inefficient and can compound quality losses.

**Choose Appropriate Source Resolution**
If you're scanning documents specifically for digital use, scan at 150 DPI instead of 300 DPI. This creates smaller source files that compress even further.

**Consider the Viewing Context**
Documents viewed primarily on phones can tolerate more compression than those viewed on large desktop monitors.

**Test with Sample Pages**
For large documents, compress a few pages first to verify the quality meets your needs before processing the entire file.

**Keep Original Files**
Always maintain uncompressed originals in case you need higher quality for future use. Compression is a one-way process—you can't restore removed data.`,
    },
  ],

  faqs: [
    {
      q: "Will compressing my PDF make it unreadable?",
      a: "No. Our compression algorithms prioritize text clarity, so documents remain perfectly readable at any compression level. Images may show some quality reduction at higher compression settings, but text—which is the most important element of most documents—stays crisp and clear. We recommend starting at 80% quality and adjusting only if you need smaller files.",
    },
    {
      q: "Can I compress a password-protected PDF?",
      a: "Yes, you can compress password-protected PDFs. You'll need to enter the document password to allow processing, but the compression preserves your security settings. The output file will maintain the same password protection and permissions as the original.",
    },
    {
      q: "Why is my compressed PDF sometimes larger than the original?",
      a: "This occasionally happens with PDFs that were already heavily optimized or are primarily text-based with minimal images. Our algorithm detects this and will preserve your original file if compression wouldn't provide meaningful savings. We never make files larger.",
    },
    {
      q: "How long does PDF compression take?",
      a: "Most PDFs compress in 1-5 seconds, depending on the document size and complexity. Large documents (100+ pages) or those with many images may take 10-30 seconds. All processing happens locally in your browser, so there's no upload/download delay.",
    },
    {
      q: "Will hyperlinks and bookmarks still work after compression?",
      a: "Yes. Unlike tools that rasterize PDFs (convert them to images), our compressor maintains the full PDF structure. All links, bookmarks, form fields, and interactive elements continue to function exactly as they did in the original document.",
    },
    {
      q: "Can I compress scanned documents?",
      a: "Absolutely. Scanned PDFs often see the most dramatic size reductions because they contain large images. A 20MB scanned document can often be compressed to 2-3MB while remaining perfectly readable. Any OCR text layers are preserved, maintaining searchability.",
    },
    {
      q: "Is there a limit to how many PDFs I can compress?",
      a: "Free users can compress up to 5 PDFs at a time, with a maximum of 10MB per file. Pro users can process up to 50 PDFs at once with files up to 500MB each. There's no daily or monthly limit on either plan.",
    },
    {
      q: "What's the difference between 'Reduce File Size' in Adobe and SnapFile?",
      a: "Adobe Acrobat's 'Reduce File Size' feature works similarly but requires expensive software. SnapFile provides comparable compression quality for free, directly in your browser. Plus, our privacy-first approach means your documents never leave your device—they're not uploaded to any server.",
    },
  ],
};

export default function PdfCompressorPage() {
  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Compress PDF documents by up to 80% without losing quality. Perfect for email attachments, cloud storage, and document archives. Your files never leave your device."
      icon={<FileText className="w-10 h-10" />}
      iconBg="bg-blue-100"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress", href: "/compress" },
        { label: "PDF Compressor" }
      ]}
      relatedTools={[
        {
          title: "Image Compressor", href: "/compress/image",
          description: "",
          icon: undefined
        },
        {
          title: "Video Compressor", href: "/compress/video",
          description: "",
          icon: undefined
        },
        {
          title: "PDF Converter", href: "/convert/pdf",
          description: "",
          icon: undefined
        },
      ]}
    >
      <CompressDashboard
        allowedTypes={{ "application/pdf": [".pdf"] }}
        maxSizeMB={10}
        mode="pdf"
        title="PDF Compressor"
      />
    </ToolPageLayout>
  );
}