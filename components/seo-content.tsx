import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SeoContent() {
  return (
    <section className="mt-24 max-w-4xl mx-auto space-y-12 pb-12">
      {/* Article Section */}
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">
          The Secure, Browser-Based File Compressor
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          In today&apos;s digital landscape, speed is everything. Large images slow down
          websites, heavy PDFs clog up email inboxes, and unoptimized videos eat
          up bandwidth. SnapFile provides a modern solution to these problems by
          harnessing the power of WebAssembly.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Unlike traditional compressors that require you to upload your sensitive
          files to a remote server, <strong>SnapFile processes everything locally on your device</strong>. 
          This means your documents, personal photos, and videos never leave your computer
          (on the Free Tier). We bridge the gap between privacy and performance.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">
          Why Compression Matters?
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>SEO Ranking:</strong> Search engines penalize slow-loading websites. Compressing images improves your Core Web Vitals.</li>
          <li><strong>Email Limits:</strong> Most email providers cap attachments at 25MB. SnapFile helps you shrink PDFs to fit.</li>
          <li><strong>Storage Space:</strong> Reduce file sizes by up to 80% to save space on your phone or hard drive.</li>
        </ul>
      </div>

      {/* FAQ Section - AdSense LOVES FAQs */}
      <div className="bg-muted/20 p-8 rounded-2xl border border-border/50">
        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it safe to upload private documents?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes, absolutely. SnapFile operates on a &quot;Client-Side First&quot; architecture. 
              When you use our Free plan, the compression logic (FFmpeg.wasm) runs directly 
              inside your web browser. Your files are not sent to our servers, ensuring 
              100% data privacy.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>What file formats do you support?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We currently support a wide range of formats including JPG, PNG, WEBP for images, 
              MP4 for video, and standard PDF documents. We are constantly updating our 
              engine to support newer formats like AVIF.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Does compression reduce quality?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We use &quot;Lossy&quot; and &quot;Lossless&quot; compression algorithms. By removing unnecessary 
              metadata and optimizing pixel density, we can significantly reduce file size 
              with little to no visible difference to the human eye. You can adjust the 
              quality slider in the dashboard settings to control this balance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Is SnapFile free to use?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! You can compress up to 5 files at a time (max 5MB each) completely for free. 
              For power users who need to process 4K videos or bulk batches of 100+ images, 
              we offer a Pro plan that utilizes cloud processing power.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}