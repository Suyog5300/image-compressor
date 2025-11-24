"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12">
        
        {/* Left Side: Info */}
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
                <p className="text-muted-foreground text-lg">
                    Have a question about our API, enterprise plans, or just want to say hi? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-sm text-muted-foreground">suyog5300@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Support</h3>
                        <p className="text-sm text-muted-foreground">24/7 Chat Support</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <Card className="border-muted-foreground/10 shadow-lg">
            <CardHeader>
                <CardTitle>Send a message</CardTitle>
                <CardDescription>We usually respond within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea placeholder="How can we help you?" className="min-h-[150px] resize-none" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}