import { Metadata } from "next";
import { FileText, Minimize2, RefreshCw } from "lucide-react";
import ImageConverterDashboard from "@/components/image-converter";
import { ToolPageLayout } from "@/components/tool-layout";

export const metadata: Metadata = {
  title: "Free Image Converter - PNG to JPG, WebP, GIF Online",
  description:
    "Convert images between formats instantly. Change PNG to JPG, convert to WebP, or transform any image format. Free, fast, and private browser-based conversion.",
  keywords: [
    "image converter",
    "png to jpg",
    "jpg to png",
    "convert to webp",
    "image format converter",
    "online image converter",
    "free image converter",
    "webp converter",
    "change image format",
    "photo converter",
  ],
  openGraph: {
    title: "Free Image Converter - Change Image Formats Instantly",
    description:
      "Convert between PNG, JPG, WebP, GIF, and BMP formats. Browser-based processing means your images stay private.",
    type: "website",
  },
};

const steps = [
  {
    title: "Upload Images",
    description: "Drag & drop your PNG, JPG, or WebP files onto the converter.",
  },
  {
    title: "Choose Format",
    description: "Select your desired output format (JPG, PNG, WebP, GIF).",
  },
  {
    title: "Download",
    description: "Instantly download your converted images individually or as a ZIP.",
  },
];

const features = [
  {
    title: "Instant Conversion",
    description: "Convert images in your browser without uploading to a server.",
  },
  {
    title: "Batch Processing",
    description: "Convert multiple images at once to save time.",
  },
  {
    title: "High Quality",
    description: "Maintain the best possible quality during format changes.",
  },
];


const seoContent = {
  mainTitle: "The Complete Guide to Image Format Conversion",
  intro: `Image format conversion is a common need for designers, developers, and everyday users alike. Whether you need to convert a PNG to JPEG for smaller file sizes, transform images to WebP for web optimization, or change formats for compatibility with specific applications, understanding when and how to convert is essential. This guide covers everything you need to know about image formats and conversion.`,

  sections: [
    {
      title: "Understanding Image Formats",
      content: `Different image formats serve different purposes. Choosing the right format depends on your use case:

**JPEG (JPG)** - The standard for photographs. Uses lossy compression to achieve small file sizes. Doesn't support transparency. Best for photos, screenshots, and images with many colors and gradients.

**PNG** - Ideal for graphics, logos, and images requiring transparency. Uses lossless compression, resulting in larger files but perfect quality preservation. Supports alpha transparency for smooth edges.

**WebP** - Google's modern format offering excellent compression for both photos and graphics. Supports transparency and animation. Smaller files than both JPEG and PNG at equivalent quality. Growing browser support makes it increasingly practical.

**GIF** - The classic format for simple animations and graphics with limited colors. Supports transparency (but not partial transparency). Limited to 256 colors, making it unsuitable for photographs.

**BMP** - Uncompressed bitmap format. Large files but perfect quality. Rarely used for web but sometimes required by specific applications.`,
    },
    {
      title: "When to Convert: Common Use Cases",
      content: `**PNG → JPEG**
When you need smaller file sizes for photos or screenshots. JPEG files are typically 60-80% smaller than PNG for photographic content. Convert when transparency isn't needed and some quality loss is acceptable.

**JPEG → PNG**
When you need to edit an image without further quality loss. PNG's lossless format prevents the cumulative degradation that occurs with repeated JPEG saves. Also useful when you need to add transparency.

**Any Format → WebP**
For web optimization. WebP typically produces files 25-35% smaller than JPEG and 25-50% smaller than PNG at equivalent quality. Modern browsers and platforms support WebP, making it an excellent choice for websites.

**Photo → GIF**
Only for simple graphics or animations. Converting a full-color photo to GIF dramatically reduces quality due to the 256-color limit. Use GIF only for simple graphics, icons, or animated content.

**For Print: Use High-Quality Source**
If converting for print purposes, always start with the highest quality source available. Print requires higher resolution than screen display—typically 300 DPI versus 72-150 DPI for web.`,
    },
    {
      title: "Transparency and Format Choices",
      content: `Transparency is a crucial consideration in format selection:

**Full Transparency Support**
PNG and WebP support alpha transparency, allowing pixels to be partially transparent. This enables smooth edges against any background—essential for logos, icons, and overlays.

**Binary Transparency**
GIF supports only "on/off" transparency—each pixel is either fully transparent or fully opaque. This creates jagged edges on curved elements and isn't suitable for anti-aliased graphics.

**No Transparency**
JPEG doesn't support any form of transparency. Transparent areas are typically filled with white or black when converting from PNG to JPEG. If you need transparency, JPEG isn't an option.

**Background Considerations**
When converting a transparent PNG to JPEG, you'll need to decide what color replaces the transparent areas. Our converter uses white by default, which works well for most documents and web use.`,
    },
    {
      title: "Quality and Compression in Conversion",
      content: `Format conversion often involves recompression, which can affect quality:

**Lossless to Lossy**
Converting PNG (lossless) to JPEG (lossy) always involves some quality loss. The amount depends on the JPEG quality setting. Higher quality means larger files but better visual fidelity.

**Lossy to Lossless**
Converting JPEG to PNG doesn't restore lost quality—the PNG will preserve the JPEG's existing compression artifacts perfectly, but you can't recover detail that was already discarded.

**Lossy to Lossy**
Converting between lossy formats (e.g., JPEG to WebP) compounds quality loss. Each compression pass discards more information. For best results, always convert from the highest-quality source available.

**Generation Loss**
Every time you save a JPEG, you lose quality. Converting JPEG→PNG→JPEG creates two generations of loss. Minimize conversion chains by keeping original files and converting directly from them.`,
    },
    {
      title: "Browser-Based Conversion Advantages",
      content: `Our converter processes images entirely in your browser using HTML5 Canvas and JavaScript:

**Complete Privacy**
Your images never leave your device. There's no upload to any server, no data collection, and no risk of your private photos being stored elsewhere. This is especially important for sensitive images.

**No Software Installation**
Use any modern web browser without installing applications. Works on Windows, Mac, Linux, and ChromeOS without platform-specific downloads.

**Instant Processing**
Because there's no upload/download overhead, conversion is nearly instantaneous. A typical image converts in under a second, regardless of your internet speed.

**Offline Capability**
After the initial page load, conversion works even without an internet connection. The processing code runs locally in your browser.

**Consistent Results**
Browser-based conversion produces predictable, consistent results across different computers and operating systems.`,
    },
    {
      title: "Best Practices for Image Conversion",
      content: `**Keep Original Files**
Always maintain your original images. Store uncompressed or lossless versions as "masters" and convert copies for specific uses. You can always reconvert from the original, but you can't recover quality once lost.

**Convert for Purpose**
Don't use one format for everything. Convert to JPEG for photos on web, PNG for graphics needing transparency, and WebP for maximum web optimization when browser support allows.

**Batch Convert Consistently**
When converting multiple images for the same purpose, use identical settings to ensure visual consistency across your project.

**Test Before Bulk Conversion**
When processing many images, convert a few samples first to verify the output meets your needs before converting the entire batch.

**Consider File Size Implications**
Converting to a lossless format (like PNG) from a lossy format (like JPEG) will likely increase file size without improving quality. Only do this when you need lossless storage for editing purposes.

**Use Appropriate Dimensions**
Convert at the dimensions you'll actually use. There's no benefit to converting a 4000px image if it will be displayed at 400px—resize first, then convert.`,
    },
  ],

  faqs: [
    {
      q: "Will I lose quality when converting images?",
      a: "It depends on the conversion. Converting to JPEG always involves some quality loss because JPEG uses lossy compression. Converting to PNG or WebP (lossless mode) preserves quality perfectly. Converting from a lossy format like JPEG to any other format cannot restore already-lost quality—it preserves what remains.",
    },
    {
      q: "What happens to transparency when I convert PNG to JPEG?",
      a: "Since JPEG doesn't support transparency, transparent areas are filled with a background color—by default, white. If you need transparency, convert to WebP or keep the PNG format instead.",
    },
    {
      q: "Should I use WebP instead of JPEG and PNG?",
      a: "For web use, WebP is often the best choice—it produces smaller files than both JPEG and PNG while maintaining quality. However, ensure your audience's browsers support WebP (most modern browsers do). For maximum compatibility with older systems, JPEG and PNG remain safer choices.",
    },
    {
      q: "Can I convert animated GIFs?",
      a: "Our current tool converts single images and will capture the first frame of an animated GIF. For animated GIF conversion while preserving animation, you'll need specialized video/animation conversion tools.",
    },
    {
      q: "What's the maximum file size I can convert?",
      a: "Free users can convert images up to 10MB each, with 5 images at a time. Since processing happens in your browser, very large images may be slow on less powerful devices. For best performance with large files, we recommend using a desktop computer.",
    },
    {
      q: "Why is my PNG larger after converting from JPEG?",
      a: "PNG uses lossless compression, while JPEG uses lossy compression that discards data to achieve smaller sizes. Converting JPEG to PNG preserves all remaining data (including compression artifacts) in a lossless format, which requires more storage. This doesn't mean quality improved—it just means the existing data is stored without further loss.",
    },
    {
      q: "How do I choose between PNG and WebP?",
      a: "If browser compatibility is paramount (older browsers, email clients), use PNG. If you're optimizing for modern web delivery and can verify browser support, WebP typically produces files 25-50% smaller than PNG with equivalent quality. Many websites serve WebP with PNG fallbacks.",
    },
    {
      q: "Is my data safe when converting?",
      a: "Absolutely. Your images are processed entirely in your browser—they never upload to any server. We use browser-native Canvas APIs to perform the conversion locally on your device. No data is collected, stored, or transmitted.",
    },
  ],
};

export default function ImageConverterPage() {
  return (
    <ToolPageLayout
      title="Image Converter"
      description="Transform images between formats instantly. Convert PNG to JPEG for smaller files, create WebP for web optimization, or change any image format—all privately in your browser."
      
      // Pass the ICON ELEMENT, not the function
      icon={<RefreshCw className="w-10 h-10 text-purple-500" />}
      iconBg="bg-purple-100"
      
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Image Converter" },
      ]}
      
      // Pass the arrays
      steps={steps}
      features={features}

      mainTitle={seoContent.mainTitle}
      intro={seoContent.intro}
      sections={seoContent.sections}
      faqs={seoContent.faqs.map(f => ({ question: f.q, answer: f.a }))}

      // Pass icons as elements here too
      relatedTools={[
        { 
          title: "Image Compressor", 
          href: "/compress/image", 
          description: "Reduce image file size",
          icon: <Minimize2 className="w-10 h-10 text-blue-500" />
        },
        { 
          title: "PDF Converter", 
          href: "/convert/pdf", 
          description: "Convert PDF documents",
          icon: <FileText className="w-10 h-10 text-blue-500" />
        },
        { 
          title: "PDF Compressor", 
          href: "/compress/pdf", 
          description: "Shrink PDF files",
          icon: <Minimize2 className="w-10 h-10 text-blue-500" />
        },
      ]}
    >
      <ImageConverterDashboard />
    </ToolPageLayout>
  );
}