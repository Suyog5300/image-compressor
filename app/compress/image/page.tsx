import { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import CompressDashboard from "@/app/compress/page";
import { ToolPageLayout } from "@/components/tool-layout";

export const metadata: Metadata = {
  title: "Free Image Compressor - Reduce JPG, PNG, WebP Size Online",
  description:
    "Compress images online without quality loss. Reduce JPG, PNG, and WebP file sizes by up to 90% for free. Privacy-first browser-based compression - no uploads required.",
  keywords: [
    "image compressor",
    "compress jpg",
    "compress png",
    "reduce image size",
    "optimize images",
    "webp compressor",
    "image optimizer",
    "photo compressor",
    "bulk image compression",
    "lossless image compression",
  ],
  openGraph: {
    title: "Free Image Compressor - Reduce File Size Without Quality Loss",
    description:
      "Compress JPG, PNG, and WebP images by up to 90%. Browser-based processing means your photos never leave your device.",
    type: "website",
  },
};

const seoContent = {
  mainTitle: "The Complete Guide to Image Compression",
  intro: `Image compression is the process of reducing file size while maintaining acceptable visual quality. Whether you're a web developer optimizing site performance, a photographer managing large libraries, or simply trying to share photos via email, understanding image compression is essential in today's digital world.`,

  sections: [
    {
      title: "Why Image Compression Matters",
      content: `Large image files are one of the primary causes of slow-loading websites. According to Google's research, 53% of mobile users abandon sites that take longer than 3 seconds to load. Since images often account for 50-80% of a webpage's total weight, compression directly impacts user experience and SEO rankings.

Beyond web performance, compressed images save storage space, reduce bandwidth costs, and make file sharing more practical. Email providers typically limit attachments to 25MB—a single high-resolution photo can exceed this limit before compression.`,
    },
    {
      title: "Understanding Lossy vs. Lossless Compression",
      content: `There are two fundamental approaches to image compression:

**Lossy Compression** removes some image data permanently to achieve smaller file sizes. This is ideal for photographs where minor quality reduction is imperceptible. JPEG uses lossy compression, which is why it's the standard format for web photos.

**Lossless Compression** reduces file size without discarding any data—the original image can be perfectly reconstructed. PNG uses lossless compression, making it ideal for graphics, logos, and images requiring transparency. However, lossless files are typically larger than lossy equivalents.

Our image compressor intelligently applies the appropriate method based on your file type and quality settings.`,
    },
    {
      title: "Supported Image Formats",
      content: `SnapFile's image compressor supports all major web formats:

**JPEG/JPG** - The most common format for photographs. Our compressor removes unnecessary metadata, optimizes encoding, and reduces color information that's invisible to the human eye.

**PNG** - Ideal for graphics with transparency. We apply advanced PNG optimization techniques including palette reduction and DEFLATE optimization.

**WebP** - Google's modern format offering superior compression. We optimize WebP files while maintaining their quality advantages.

**GIF** - For simple animations and graphics. We reduce color palettes and optimize frame data without breaking animations.`,
    },
    {
      title: "How Browser-Based Compression Works",
      content: `Unlike traditional online compressors that upload your files to remote servers, SnapFile processes everything directly in your browser using WebAssembly technology.

WebAssembly (Wasm) allows us to run compiled compression algorithms at near-native speed in your browser. This means your images never leave your device—they're processed locally using your computer's CPU.

The benefits are significant: complete privacy (no server uploads), instant processing (no upload/download time), offline capability (works without internet after initial load), and zero risk of data retention on third-party servers.`,
    },
    {
      title: "Optimizing Images for Different Use Cases",
      content: `**For Websites & Blogs**
Web images should balance quality with loading speed. We recommend using 75-85% quality for hero images and 60-70% for thumbnails. Always use responsive images with srcset for different screen sizes.

**For Email Attachments**
Most email providers cap attachments at 25MB total. Compress images to 70-80% quality for acceptable visual quality while meeting size limits. Consider using WebP for recipients with modern email clients.

**For Social Media**
Each platform has different requirements. Instagram recommends 1080x1080 pixels for posts; Facebook suggests 1200x630 for link previews. Compress after resizing to optimal dimensions.

**For E-Commerce**
Product images directly impact conversions. Use 85-90% quality for main product photos, but compress thumbnails more aggressively. Consistent image dimensions improve page layout stability.`,
    },
    {
      title: "Image Compression Best Practices",
      content: `**Start with the right size** - Resize images to their display dimensions before compression. Compressing a 4000px image to display at 400px wastes potential savings.

**Choose appropriate formats** - Use JPEG for photographs, PNG for graphics with transparency, and WebP for maximum compression when browser support allows.

**Batch process consistently** - When compressing multiple images for the same purpose, use identical settings to ensure visual consistency across your site or project.

**Keep originals** - Always maintain original, uncompressed files. You can always recompress, but you can't restore quality once it's lost.

**Test compression levels** - Start at 80% quality and reduce until you notice degradation. The optimal setting varies by image content—photographs tolerate more compression than graphics with sharp edges.`,
    },
  ],

  faqs: [
    {
      q: "How much can I reduce my image file size?",
      a: "Typically, you can reduce image file sizes by 60-90% without noticeable quality loss. The exact reduction depends on the original image's characteristics—photographs with lots of detail compress differently than simple graphics. Our intelligent compression algorithm automatically optimizes based on image content.",
    },
    {
      q: "Will compressing images reduce their quality?",
      a: "Our compressor uses 'perceptually lossless' techniques, removing data that's invisible to the human eye. At our default 80% quality setting, most users cannot distinguish between the original and compressed versions. You can adjust the quality slider to find your preferred balance between file size and visual quality.",
    },
    {
      q: "What's the maximum file size I can compress?",
      a: "Free users can compress images up to 5MB each, with 5 images at a time. Pro users can process images up to 500MB with batch sizes of 50 files. All processing happens in your browser, so there's no upload time regardless of file size.",
    },
    {
      q: "Can I compress multiple images at once?",
      a: "Yes! Simply drag and drop multiple images into the upload area. Free users can process up to 5 images simultaneously; Pro users can handle up to 50. All files are compressed in parallel for maximum speed.",
    },
    {
      q: "Is my data safe when using this tool?",
      a: "Absolutely. Your images are processed entirely within your browser—they never leave your device. We use WebAssembly technology to run compression algorithms locally, ensuring complete privacy. Unlike server-based compressors, there's no risk of your photos being stored or accessed by anyone else.",
    },
    {
      q: "What's the difference between compressing and resizing images?",
      a: "Compression reduces file size by optimizing how data is encoded without changing dimensions. Resizing changes the actual pixel dimensions of an image. For best results, resize to your target dimensions first, then compress. We focus on compression—for resizing, we recommend dedicated image editing tools.",
    },
    {
      q: "Which image format should I use for my website?",
      a: "For photographs, JPEG offers the best balance of quality and file size. For graphics with transparency or sharp edges (logos, icons), use PNG. WebP provides superior compression for both types but requires browser support verification. Consider using picture elements to serve WebP with JPEG/PNG fallbacks.",
    },
    {
      q: "Does image compression affect SEO?",
      a: "Yes, positively! Compressed images load faster, improving Core Web Vitals scores that Google uses as ranking factors. Specifically, they help with Largest Contentful Paint (LCP) and overall page speed. Faster pages also reduce bounce rates, indirectly boosting SEO through improved user engagement metrics.",
    },
  ],
};

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout
      title="Image Compressor"
      description="Compress images by up to 90% without visible quality loss. Privacy-first processing means your photos never leave your device."
      icon={<ImageIcon className="w-10 h-10" />}
      iconBg="bg-blue-100"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compress", href: "/compress" },
        { label: "Image", href: "/compress/image" },
      ]}
      relatedTools={[
        { title: "PDF Compressor", href: "/compress/pdf", description: "Reduce PDF file sizes", icon: null },
        { title: "Video Compressor", href: "/compress/video", description: "Compress video files", icon: null },
        { title: "Image Converter", href: "/convert/image", description: "Convert between image formats", icon: null },
      ]}
    >
      <CompressDashboard
        allowedTypes={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
        maxSizeMB={5}
        mode="image"
        title="Image Compressor"
      />
    </ToolPageLayout>
  );
}