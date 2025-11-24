/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileIcon, X, Settings2, Download, RefreshCw, FileVideo, FileText, Image as ImageIcon, Loader2, Trash2, AlertCircle, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { compressFile, CompressionResult, getFileType } from "@/lib/compression";
import { PricingSection } from "@/components/pricing-section";
import { AboutSection } from "@/components/about-section";
import { AdUnit } from "@/components/ad-unit";

// --- CONSTANTS ---
const MAX_FILE_SIZE_MB = 5;
const MAX_FILES_COUNT = 5;

export default function CompressDashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Map<string, CompressionResult>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState([0.8]);

  // --- VALIDATION LOGIC ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 1. Check File Count Limit
    if (files.length + acceptedFiles.length > MAX_FILES_COUNT) {
      toast.error("Free Plan Limit Reached", {
        description: `You can only compress ${MAX_FILES_COUNT} files at a time. Upgrade to Pro for unlimited batches.`,
      });
      return;
    }

    const validFiles: File[] = [];

    // 2. Check File Size Limit
    acceptedFiles.forEach(file => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File too large: ${file.name}`, {
          description: `Free plan is limited to ${MAX_FILE_SIZE_MB}MB. Upgrade to Pro to upload up to 1GB.`,
        });
      } else {
        // Check for duplicates
        if (!files.some(f => f.name === file.name)) {
            validFiles.push(file);
        }
      }
    });

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      toast.success(`Added ${validFiles.length} file(s)`);
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/*': [],
        'application/pdf': [],
        'video/*': []
    }
  });

  const removeFile = (name: string) => {
    setFiles(files.filter(f => f.name !== name));
    const newResults = new Map(results);
    newResults.delete(name);
    setResults(newResults);
  };

// ... inside CompressDashboard component

  const handleCompressAll = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    const newResults = new Map(results);
    
    let successCount = 0;

    for (const file of files) {
        if (newResults.has(file.name)) continue;

        try {
            // Toast notification for video start (it takes time)
            if (file.type.startsWith('video/')) {
               toast.info("Initializing Video Engine...", { 
                 description: "This may take a moment for the first run." 
               });
            }

            const res = await compressFile(file, { quality: quality[0] });
            
            newResults.set(file.name, res);
            setResults(new Map(newResults)); 
            successCount++;
            
            // Check if file actually got bigger (common with already compressed files)
            if (res.compressedSize >= res.originalSize) {
                toast.warning(`Could not compress ${file.name} further`, {
                    description: "File was already optimized."
                });
            }

        } catch (error: any) {
            console.error(error);
            toast.error(`Failed to compress ${file.name}`, {
                description: error.message || "Unknown error"
            });
        }
    }
    
    setIsProcessing(false);
    if(successCount > 0) toast.success("Batch Compression Complete!");
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen space-y-12">

         <AdUnit slot="1234567890" className="mb-8" />
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Free Plan: {files.length} / {MAX_FILES_COUNT} files used.</p>
        </div>
        
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Settings2 className="w-4 h-4" /> Global Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Compression Level</DialogTitle></DialogHeader>
                <div className="py-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Quality Ratio</span>
                            <span className="text-sm text-muted-foreground">{Math.round(quality[0] * 100)}%</span>
                        </div>
                        <Slider value={quality} onValueChange={setQuality} max={1} step={0.1} min={0.1} />
                        <p className="text-xs text-muted-foreground">Lower % = Smaller size, but lower quality.</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: DROPZONE & LIST --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Dropzone */}
            <div {...getRootProps()}>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                        relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
                        ${isDragActive ? 'border-blue-500 bg-blue-500/5' : 'border-muted-foreground/25 hover:border-blue-500/50 hover:bg-muted/30'}
                        h-64 flex flex-col items-center justify-center text-center p-6 bg-background
                    `}
                >
                    <input {...getInputProps()} />
                    <div className={`p-4 rounded-full mb-4 transition-all ${isDragActive ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-muted'}`}>
                        <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className="text-lg font-semibold">Drop files here</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                        Supports JPG, PNG, PDF, MP4. <br/>
                        <span className="font-medium text-orange-500">Max 5MB per file (Free Tier)</span>
                    </p>
                </motion.div>
            </div>

            {/* File List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {files.map((file) => {
                        const result = results.get(file.name);
                        const type = getFileType(file);
                        const isVideo = type === 'video';
                        
                        return (
                            <motion.div
                                key={file.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                layout
                            >
                                <Card className="group overflow-hidden border-muted-foreground/10 shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-0 flex items-center h-20">
                                        {/* Type Icon */}
                                        <div className={`h-full w-16 flex items-center justify-center border-r ${
                                            type === 'image' ? 'bg-blue-500/10 text-blue-600' :
                                            type === 'pdf' ? 'bg-red-500/10 text-red-600' :
                                            'bg-purple-500/10 text-purple-600'
                                        }`}>
                                            {type === 'image' && <ImageIcon className="w-6 h-6" />}
                                            {type === 'pdf' && <FileText className="w-6 h-6" />}
                                            {type === 'video' && <FileVideo className="w-6 h-6" />}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 px-4 min-w-0 grid gap-1">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium truncate text-sm">{file.name}</p>
                                                <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                                            </div>
                                            
                                            {result ? (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className="text-green-600 font-bold flex items-center">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                        {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                                                    </span>
<span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">
    -{(100 - (result.compressedSize / file.size * 100)).toFixed(0)}%
</span>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-muted-foreground flex items-center">
                                                    {isProcessing ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />}
                                                    {isProcessing ? "Compressing..." : "Pending"}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="px-4 flex items-center gap-2">
                                            {result ? (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100" asChild>
                                                    <a href={result.url} download={`optifile_${file.name}`}>
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                            ) : (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50" onClick={() => removeFile(file.name)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                    {isProcessing && !result && <Progress value={30} className="h-0.5 rounded-none" />}
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                
                {files.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground opacity-50">
                        <p>No files selected yet.</p>
                    </div>
                )}
            </div>

            {/* Bottom Action Bar */}
            {files.length > 0 && (
                <div className="flex justify-end pt-4">
                    <Button onClick={handleCompressAll} disabled={isProcessing} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full px-8">
                        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                        {isProcessing ? "Processing..." : "Compress All"}
                    </Button>
                </div>
            )}
        </div>

        {/* --- RIGHT COLUMN: QUOTA & UPSELL --- */}
        <div className="space-y-6">
            <Card className="bg-muted/30 border-none">
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" /> Free Plan Quota
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Files</span>
                                <span>{files.length} / {MAX_FILES_COUNT}</span>
                            </div>
                            <Progress value={(files.length / MAX_FILES_COUNT) * 100} className="h-2" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Max Size</span>
                                <span>5 MB</span>
                            </div>
                            <Progress value={100} className="h-2 bg-muted text-muted-foreground" />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-dashed">
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                            <Lock className="w-4 h-4 text-blue-500" /> Pro Features Locked
                        </div>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                            <li className="flex gap-2"><X className="w-3 h-3 text-red-400" /> 1GB File Size Uploads</li>
                            <li className="flex gap-2"><X className="w-3 h-3 text-red-400" /> 4K Video Compression</li>
                            <li className="flex gap-2"><X className="w-3 h-3 text-red-400" /> Batch 100+ Files</li>
                        </ul>
                        <Button className="w-full mt-4" size="sm" variant="secondary">Upgrade to Pro</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>

<AdUnit slot="0987654321" className="mt-12" />
      {/* --- BOTTOM SECTIONS --- */}
      <PricingSection />
      <AboutSection />
    </div>
  );
}