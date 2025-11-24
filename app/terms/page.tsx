export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground">Last updated: November 24, 2025</p>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 leading-7 text-muted-foreground">
        <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
                By accessing our website at SnapFile, you agree to be bound by these terms of service, all applicable laws and regulations, 
                and agree that you are responsible for compliance with any applicable local laws.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
            <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on SnapFile&apos;s website 
                for personal, non-commercial transitory viewing only.
            </p>
        </section>
      </div>
    </div>
  );
}