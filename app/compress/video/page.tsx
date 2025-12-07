import { Metadata } from "next";
import { FileText, FileVideo, ImageIcon, RefreshCw } from "lucide-react";
import CompressDashboard from "@/app/compress/page";
import { ToolPageLayout } from "@/components/tool-layout";

export const metadata: Metadata = {
  title: "Free Video Compressor - Reduce MP4, WebM Video Size Online",
  description:
    "Compress videos online without losing quality. Reduce MP4, WebM, and MOV file sizes by up to 70%. Browser-based video compression - fast, free, and private.",
  keywords: [
    "video compressor",
    "compress video",
    "reduce video size",
    "mp4 compressor",
    "compress video for email",
    "video size reducer",
    "online video compressor",
    "compress video online",
    "shrink video file",
  ],
  openGraph: {
    title: "Free Video Compressor - Reduce Video File Size Online",
    description:
      "Compress MP4, WebM, and MOV videos by up to 70%. Browser-based processing keeps your videos private.",
    type: "website",
  },
};

const seoContent = {
  mainTitle: "The Complete Guide to Video Compression",
  intro: `Video files are among the largest files most people work with. A single minute of 4K footage can exceed 500MB, making sharing, uploading, and storage challenging. Video compression reduces file sizes to manageable levels while maintaining visual quality—a balance that's both art and science. This guide explains how video compression works and how to get the best results.`,

  sections: [
    {
      title: "Why Video Files Are So Large",
      content: `To understand compression, it helps to know why raw video files are enormous.

**Frame Rate and Duration** - Video is a sequence of images. At 30 frames per second, a 1-minute video contains 1,800 individual images. At 60fps, that doubles to 3,600 frames.

**Resolution** - Each frame contains millions of pixels. A 1080p frame has over 2 million pixels; 4K has over 8 million. Each pixel requires color data.

**Color Depth** - Standard video uses 24 bits per pixel to represent 16.7 million colors. High Dynamic Range (HDR) content uses even more.

**Audio** - Uncompressed stereo audio at CD quality adds about 10MB per minute to the file size.

Modern video codecs use sophisticated compression to reduce these numbers dramatically, but there's still substantial room for optimization, especially for web and mobile delivery.`,
    },
    {
      title: "How Video Compression Works",
      content: `Video compression employs multiple techniques working together:

**Spatial Compression** analyzes each frame to find redundant information within a single image. If an area of the frame is solid blue sky, it's more efficient to describe it as "this rectangle is all blue" than to store color data for each pixel.

**Temporal Compression** is where the real magic happens. Consecutive video frames are usually very similar—most of the image stays the same from frame to frame. Instead of storing complete frames, compressed video stores "keyframes" and then only the differences between subsequent frames.

**Chroma Subsampling** takes advantage of how human vision works. We're more sensitive to brightness (luminance) than color (chrominance), so video formats reduce color resolution more aggressively than brightness with little perceptible impact.

**Bitrate Optimization** adjusts compression intensity based on scene complexity. Static scenes with little motion need fewer bits; fast action sequences get more.`,
    },
    {
      title: "Understanding Video Codecs",
      content: `A codec (coder-decoder) is the algorithm that compresses and decompresses video. Different codecs offer different tradeoffs:

**H.264/AVC** - The most widely compatible codec. Virtually every device can play H.264 video. It offers good compression but isn't the most efficient by modern standards.

**H.265/HEVC** - Provides approximately 50% better compression than H.264 at equivalent quality. Widely supported on modern devices but may have licensing complications.

**VP9** - Google's open-source codec, commonly used on YouTube. Comparable to HEVC in efficiency. Excellent browser support.

**AV1** - The newest major codec, offering 30% better compression than HEVC. Rapidly gaining support in browsers and devices, but encoding is slower.

Our compressor uses modern codecs to maximize compression while maintaining broad compatibility with playback devices and platforms.`,
    },
    {
      title: "Video Compression Use Cases",
      content: `**Social Media Upload**
Platforms like Instagram, TikTok, and Twitter will recompress your videos anyway—often aggressively. Pre-compressing gives you more control over quality and dramatically speeds up upload times.

**Email and Messaging**
Most email providers cap attachments at 25MB. WhatsApp limits videos to 16MB. Compression is essential for sharing video through these channels.

**Web Video Hosting**
If you host videos on your own website, compression reduces bandwidth costs and improves loading times for visitors. A 100MB video that loads slowly will cause visitors to leave before it plays.

**Video Editing Projects**
Proxy editing workflows use compressed versions for editing, then relink to originals for final export. This lets you edit 4K+ footage smoothly on modest hardware.

**Storage and Archiving**
Long-term video storage benefits from compression. A home video collection that would fill a 4TB drive might fit on a 1TB drive after compression.`,
    },
    {
      title: "Choosing the Right Compression Settings",
      content: `The right settings depend on how your video will be used:

**For Web Streaming**
Target 1-5 Mbps for 720p, 5-10 Mbps for 1080p. Use H.264 for maximum compatibility or AV1/VP9 for better quality at lower bitrates on modern browsers.

**For Social Media**
Follow platform-specific recommendations. Generally, 1080p at 8-12 Mbps provides good quality. Platforms will recompress, so slightly higher quality source material yields better results after their processing.

**For Archiving**
Higher quality is worthwhile for archival copies you'll keep long-term. 15-25 Mbps for 1080p provides near-transparent quality for most content.

**For Email/Messaging**
Prioritize small file size. 480p or 720p at 1-3 Mbps is usually sufficient for clips shared via messaging. Quality matters less than deliverability.`,
    },
    {
      title: "Browser-Based Video Compression",
      content: `Traditional video compression required installing desktop software like HandBrake or Adobe Media Encoder. Our browser-based approach offers significant advantages:

**No Installation Required** - Start compressing immediately without downloading or installing software. Works on any computer with a modern web browser.

**Privacy Preservation** - Your videos are processed entirely within your browser using WebAssembly. They never upload to any server, eliminating privacy concerns about sensitive content.

**Cross-Platform Compatibility** - Works identically on Windows, Mac, Linux, and ChromeOS. No separate versions to download or update.

**Accessible Anywhere** - Use any computer with internet access—work computer, library computer, friend's laptop—without leaving traces or installing software.

We use FFmpeg compiled to WebAssembly, bringing the power of professional-grade video processing to your browser.`,
    },
    {
      title: "Tips for Better Video Compression",
      content: `**Trim First, Compress Second**
Remove unwanted footage before compression. Every extra second of video adds to processing time and file size.

**Consider Resolution**
If your video will primarily be viewed on phones or embedded in web pages, 1080p is usually sufficient. Delivering 4K when the display is 800 pixels wide wastes bandwidth.

**Test with Short Clips**
Before compressing a long video, test your settings on a 30-second excerpt. This lets you verify quality without waiting for the full file to process.

**Match Source Quality**
Compressing a 720p video at 4K settings wastes processing time and might actually increase file size. Match output resolution to source material or lower.

**Avoid Recompression Chains**
Each compression pass loses some quality. If you've already compressed a video, avoid compressing it again if possible. Keep original source files for this reason.`,
    },
  ],

  faqs: [
    {
      q: "How long does video compression take?",
      a: "Processing time depends on video length, resolution, and your computer's capabilities. A 1-minute 1080p video typically compresses in 30-60 seconds on a modern computer. Longer videos or higher resolutions take proportionally longer. The first video may take extra time as the processing engine initializes.",
    },
    {
      q: "Will compression reduce my video quality?",
      a: "Some quality reduction is inherent in compression, but modern codecs minimize visible impact. At our default settings, most viewers cannot distinguish compressed from original video during normal playback. You can adjust the quality slider to find your preferred balance between file size and visual quality.",
    },
    {
      q: "What video formats do you support?",
      a: "We support the most common video formats including MP4 (H.264/H.265), WebM (VP8/VP9), MOV, and AVI. Our compressor outputs MP4 with H.264 encoding for maximum compatibility with all devices and platforms.",
    },
    {
      q: "Is there a maximum video length?",
      a: "Free users can process videos up to 5 minutes long and 100MB in size. Pro users can handle videos up to 30 minutes and 500MB. For longer videos, we recommend desktop software like HandBrake or consider splitting your video into segments.",
    },
    {
      q: "Why is browser-based video compression slower than desktop software?",
      a: "Browser-based processing uses WebAssembly, which is slightly slower than native code. However, you gain privacy (no uploads), convenience (no installation), and accessibility (works on any computer). For most users, the tradeoff is worthwhile. Heavy users compressing many videos may prefer desktop tools.",
    },
    {
      q: "Can I compress videos on my phone?",
      a: "Yes, our compressor works on mobile browsers including Chrome and Safari on iOS and Android. However, video compression is CPU-intensive, so processing may be slower on mobile devices and can consume significant battery. For large videos, we recommend using a computer.",
    },
    {
      q: "Will the audio be compressed too?",
      a: "Yes, we compress both video and audio tracks. Audio is encoded to AAC format at a bitrate appropriate for the overall quality setting. For most content, audio compression is imperceptible even to careful listeners.",
    },
    {
      q: "Can I compress a video to a specific file size?",
      a: "Currently, you adjust quality settings to influence file size. The exact output size depends on video content complexity—simple scenes compress more than detailed action. We're working on a 'target size' feature for a future update.",
    },
  ],
};

const steps = [
  {
    title: "Upload Video",
    description: "Drag & drop your MP4, WebM, or MOV file into the compressor.",
  },
  {
    title: "Adjust Settings",
    description: "Choose your desired quality level to balance size vs clarity.",
  },
  {
    title: "Compress & Save",
    description: "Wait for the browser to process the video, then download the smaller file.",
  },
];

const features = [
  {
    title: "Format Support",
    description: "Works with MP4, WebM, MOV, and AVI files.",
  },
  {
    title: "Privacy First",
    description: "Videos are compressed locally in your browser. No server uploads.",
  },
  {
    title: "High Compression",
    description: "Reduce file sizes by up to 70% with minimal quality loss.",
  },
];

export default function VideoCompressorPage() {
  return (
    <ToolPageLayout
      title="Video Compressor"
      description="Compress videos by up to 70% while preserving quality. Perfect for social media, email, and web hosting. Browser-based processing keeps your videos private."
      
      // Pass the Icon Element, not a function
      icon={<FileVideo className="w-10 h-10 text-violet-500" />}
      iconBg="bg-violet-100"
      
      // Pass Breadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Video Compressor" },
      ]}
      
      // Pass Steps & Features
      steps={steps}
      features={features}

      // Pass SEO Content
      mainTitle={seoContent.mainTitle}
      intro={seoContent.intro}
      sections={seoContent.sections}
      faqs={seoContent.faqs.map(f => ({ question: f.q, answer: f.a }))}

      // FIX: Correctly structured relatedTools array
      relatedTools={[
        { 
          title: "Image Compressor", 
          href: "/compress/image", 
          description: "Reduce image file size",
          icon: <ImageIcon className="w-10 h-10 text-pink-500" />
        },
        { 
          title: "PDF Compressor", 
          href: "/compress/pdf", 
          description: "Shrink PDF documents",
          icon: <FileText className="w-10 h-10 text-red-500" />
        },
        { 
          title: "Image Converter", 
          href: "/convert/image", 
          description: "Convert image formats",
          icon: <RefreshCw className="w-10 h-10 text-emerald-500" />
        },
      ]}
    >
      <CompressDashboard
        allowedTypes={{ "video/*": [".mp4", ".webm", ".mov", ".avi"] }}
        maxSizeMB={100}
        mode="video"
        title="Video Compressor"
      />
    </ToolPageLayout>
  );
}