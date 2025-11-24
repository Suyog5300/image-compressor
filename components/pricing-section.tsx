"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function PricingSection() {
  return (
    <section className="py-12" id="pricing">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Transparent Pricing</h2>
        <p className="text-muted-foreground">Choose the plan that fits your workflow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <PricingCard title="Free" price="$0" features={["5MB Limit per file", "5 Files per batch", "Standard Quality", "Browser Processing"]} />
        <PricingCard title="Pro" price="$5" popular features={["1GB Limit per file", "Unlimited Batching", "Ultra Compression (AI)", "Video & PDF Pro Engine", "Priority Support"]}/>
        <PricingCard title="Teams" price="$15" features={["Unlimited Everything", "API Access", "SSO Integration", "Dedicated Account Mgr"]} />
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PricingCard({ title, price, features, popular }: any) {
  return (
    <Card className={`flex flex-col ${popular ? "border-blue-500 shadow-lg scale-105 z-10" : "opacity-90"}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription><span className="text-3xl font-bold text-foreground">{price}</span>/mo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-sm">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> {f}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={popular ? "default" : "outline"} onClick={() => toast.success("Coming soon!")}>{popular ? "Upgrade Now" : "Choose Plan"}</Button>
      </CardFooter>
    </Card>
  );
}