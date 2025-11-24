export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: November 24, 2025</p>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 leading-7 text-muted-foreground">
        <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p>
                Welcome to SnapFile. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. The Data We Collect</h2>
            <p>
                We do not collect personal data such as names or addresses unless you voluntarily submit them via our contact form. 
                We may collect technical data such as IP address, browser type, and usage data via Google Analytics/AdSense to improve our service.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Local Processing</h2>
            <p>
                <strong>Crucially, files processed on the Free Tier are processed entirely within your browser&apos;s memory.</strong> 
                They are not uploaded to our servers. This ensures maximum security for your documents.
            </p>
        </section>
        
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}