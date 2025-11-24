export function AboutSection() {
  return (
    <section className="py-12 bg-muted/30 rounded-xl my-12 max-w-5xl mx-auto px-8 text-center">
      <h2 className="text-2xl font-bold mb-4">About OptiFile</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        OptiFile is a privacy-first compression engine. Unlike other tools that upload your files to a server, 
        <strong> we process everything locally in your browser</strong> (for the Free tier). 
        This means your sensitive PDFs and Images never leave your device.
      </p>
    </section>
  );
}