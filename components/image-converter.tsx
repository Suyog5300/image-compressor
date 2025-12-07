/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Image as ImageIcon,
  Loader2,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Shield,
  DownloadCloud,
  X,
  FileWarning,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- CONSTANTS ---
const MAX_FILES = 10;
const MAX_SIZE_MB = 10;

const SUPPORTED_FORMATS = [
  { value: "jpeg", label: "JPEG", ext: ".jpg", mime: "image/jpeg" },
  { value: "png", label: "PNG", ext: ".png", mime: "image/png" },
  { value: "webp", label: "WebP", ext: ".webp", mime: "image/webp" },
  { value: "gif", label: "GIF", ext: ".gif", mime: "image/gif" },
  { value: "bmp", label: "BMP", ext: ".bmp", mime: "image/bmp" },
];

interface ConvertedFile {
  name: string;
  originalFormat: string;
  newFormat: string;
  url: string;
  size: number;
}

export default function ImageConverterDashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [targetFormat, setTargetFormat] = useState("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<Map<string, ConvertedFile>>(new Map());
  const [quality] = useState(0.9);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      convertedFiles.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [convertedFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => {
        if (prevFiles.length + acceptedFiles.length > MAX_FILES) {
          toast.error("Limit Reached", {
            description: `You can only convert ${MAX_FILES} files at a time.`,
          });
          return prevFiles;
        }

        const validFiles: File[] = [];
        const duplicates: string[] = [];

        acceptedFiles.forEach((file) => {
          if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            toast.error(`File too large: ${file.name}`, {
              description: `Maximum ${MAX_SIZE_MB}MB per file.`,
            });
          } else if (prevFiles.some((f) => f.name === file.name)) {
            duplicates.push(file.name);
          } else {
            validFiles.push(file);
          }
        });

        if (duplicates.length > 0) {
          toast.warning(`Skipped ${duplicates.length} duplicate file(s)`);
        }

        if (validFiles.length > 0) {
          toast.success(`Added ${validFiles.length} file(s)`);
          return [...prevFiles, ...validFiles];
        }

        return prevFiles;
      });
    },
    [] 
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"] },
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setConvertedFiles((prev) => {
      const newMap = new Map(prev);
      const file = newMap.get(name);
      if (file) URL.revokeObjectURL(file.url); 
      newMap.delete(name);
      return newMap;
    });
  };

  const clearAll = () => {
    convertedFiles.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles([]);
    setConvertedFiles(new Map());
  };

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const convertImage = async (file: File): Promise<ConvertedFile> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const sourceUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(sourceUrl);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        if (targetFormat === "png" || targetFormat === "webp") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const format = SUPPORTED_FORMATS.find((f) => f.value === targetFormat);
        if (!format) {
          reject(new Error("Unsupported format"));
          return;
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to convert image"));
              return;
            }
            const url = URL.createObjectURL(blob);
            const baseName = file.name.replace(/\.[^.]+$/, "");
            resolve({
              name: `${baseName}${format.ext}`,
              originalFormat: getFileExtension(file.name),
              newFormat: targetFormat,
              url,
              size: blob.size,
            });
          },
          format.mime,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(sourceUrl);
        reject(new Error("Failed to load image"));
      };
      img.src = sourceUrl;
    });
  };

  const handleConvertAll = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    const successfulConversions = new Map<string, ConvertedFile>();
    let successCount = 0;

    for (const file of files) {
      if (convertedFiles.has(file.name)) {
        const existing = convertedFiles.get(file.name)!;
        if (existing.newFormat === targetFormat) {
            successfulConversions.set(file.name, existing);
            continue;
        }
      }

      try {
        const result = await convertImage(file);
        successfulConversions.set(file.name, result);
        successCount++;
      } catch (error: any) {
        console.error(error);
        toast.error(`Failed to convert ${file.name}`, {
          description: error.message || "Unknown error occurred",
        });
      }
    }

    setConvertedFiles((prev) => {
      const newMap = new Map(prev);
      successfulConversions.forEach((value, key) => newMap.set(key, value));
      return newMap;
    });

    setIsProcessing(false);
    if (successCount > 0) {
      toast.success(`Converted ${successCount} file(s) to ${targetFormat.toUpperCase()}`);
    }
  };

  const downloadAll = () => {
    let delay = 0;
    convertedFiles.forEach((converted) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = converted.url;
        link.download = converted.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, delay);
      delay += 200;
    });
    toast.success("Downloading files...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Privacy Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy First: Conversions happen in your browser</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Interface */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Format Selection Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-sm">
            <div className="bg-background/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Target Format</h3>
                    <p className="text-xs text-muted-foreground">Output format for all files</p>
                  </div>
               </div>
               
               <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-background border-border/50 h-11 focus:ring-blue-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label} <span className="text-muted-foreground text-xs ml-1">({format.ext})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>

          {/* 2. Dropzone Area */}
          <div {...getRootProps()} className="group">
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`
                relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer
                ${isDragActive
                    ? "border-blue-500 bg-blue-500/5 ring-4 ring-blue-500/10"
                    : "border-border/50 hover:border-blue-500/30 hover:bg-muted/30"
                }
                min-h-[300px] flex flex-col items-center justify-center text-center p-8
              `}
            >
              <input {...getInputProps()} />

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                animate={{ y: isDragActive ? -10 : 0 }}
                className={`
                  w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300 shadow-xl
                  ${isDragActive ? "bg-blue-500 text-white shadow-blue-500/25" : "bg-background border border-border/50 text-blue-500"}
                `}
              >
                <ImageIcon className="w-10 h-10" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
                Drop images here
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Or click to browse. Supports JPG, PNG, WebP, GIF & BMP up to {MAX_SIZE_MB}MB.
              </p>

              <Button variant="outline" className="rounded-full border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                Browse Files
              </Button>
            </motion.div>
          </div>

          {/* 3. File List & Actions */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {files.map((file) => {
                const converted = convertedFiles.get(file.name);
                const sourceExt = getFileExtension(file.name).toUpperCase();
                const needsReconversion = converted && converted.newFormat !== targetFormat;

                return (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className="relative"
                  >
                    <div className={`
                      flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                      ${converted && !needsReconversion 
                        ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/20" 
                        : "bg-card border-border/50"
                      }
                    `}>
                        {/* Status Icon */}
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                          ${converted && !needsReconversion ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}
                        `}>
                           {converted && !needsReconversion ? <CheckCircle2 className="w-5 h-5" /> : <FileWarning className="w-5 h-5" />}
                        </div>

                        {/* File Meta */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="font-medium truncate">{file.name}</span>
                             <Badge variant="secondary" className="text-[10px] h-5 rounded-md px-1.5">{sourceExt}</Badge>
                             <ArrowRight className="w-3 h-3 text-muted-foreground" />
                             <Badge variant="outline" className="text-[10px] h-5 rounded-md px-1.5 bg-background">{targetFormat.toUpperCase()}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                             {converted && !needsReconversion && (
                               <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                 → {(converted.size / 1024 / 1024).toFixed(2)} MB
                               </span>
                             )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                           {converted && !needsReconversion ? (
                            <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 px-4 shadow-lg shadow-emerald-500/20" asChild>
                              <a href={converted.url} download={converted.name}>
                                <Download className="w-4 h-4 mr-1.5" /> Save
                              </a>
                            </Button>
                          ) : (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                              onClick={() => removeFile(file.name)}
                              disabled={isProcessing}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty State */}
            {files.length === 0 && (
              <div className="h-32 flex items-center justify-center border border-dashed border-border/50 rounded-2xl bg-muted/5">
                <p className="text-sm text-muted-foreground">Files will appear here</p>
              </div>
            )}
          </div>

          {/* Sticky Action Bar */}
          <AnimatePresence>
            {files.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="sticky bottom-6 z-20"
                >
                    <div className="p-3 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
                        <Button variant="ghost" size="sm" onClick={clearAll} disabled={isProcessing} className="text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4 mr-2" /> Clear All
                        </Button>

                        <div className="flex gap-2">
                            {convertedFiles.size > 0 && (
                                <Button variant="outline" onClick={downloadAll} className="rounded-xl">
                                    <DownloadCloud className="w-4 h-4 mr-2" /> Download All
                                </Button>
                            )}
                            <Button
                                onClick={handleConvertAll}
                                disabled={isProcessing}
                                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 border-0 px-6"
                            >
                                {isProcessing ? (
                                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                                ) : (
                                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Convert All</>
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* RIGHT COLUMN: Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                 <Badge variant="outline" className="h-6 w-6 p-0 flex items-center justify-center rounded-full bg-blue-500/10 border-blue-500/20 text-blue-600">i</Badge>
                 Format Guide
              </h3>
              <div className="space-y-4">
                {[
                    { label: "JPEG", desc: "Best for photos. Small size, no transparency." },
                    { label: "PNG", desc: "Lossless. Best for graphics & transparency." },
                    { label: "WebP", desc: "Modern standard. 30% smaller than JPG." },
                    { label: "GIF", desc: "Animations & simple graphics (256 colors)." }
                ].map((item) => (
                    <div key={item.label} className="group p-3 rounded-xl bg-muted/30 hover:bg-muted transition-colors">
                        <p className="font-medium text-sm text-foreground mb-1 group-hover:text-blue-500 transition-colors">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
           {/* Success Card (Only appears when done) */}
           <AnimatePresence>
            {convertedFiles.size > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white shadow-lg">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-1">Conversion Complete!</h3>
                        <p className="text-emerald-100 text-sm mb-4">You have converted {convertedFiles.size} images successfully.</p>
                        <Button onClick={downloadAll} variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-emerald-50 border-0">
                            Download ZIP
                        </Button>
                    </div>
                    {/* Decor */}
                    <CheckCircle2 className="absolute -bottom-4 -right-4 w-24 h-24 text-white/20" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}