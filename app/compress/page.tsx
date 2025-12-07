/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  X,
  Settings2,
  Download,
  RefreshCw,
  FileVideo,
  FileText,
  Image as ImageIcon,
  Loader2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  Shield,
  DownloadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { compressFile, CompressionResult, getFileType } from "@/lib/compression";

// --- CONSTANTS ---
const GLOBAL_MAX_FILES_COUNT = 5;

interface CompressDashboardProps {
  allowedTypes?: Accept;
  maxSizeMB?: number;
  mode?: "all" | "image" | "pdf" | "video";
  title?: string;
}

export default function CompressDashboard({
  allowedTypes,
  maxSizeMB = 20,
  mode = "all",
  title = "File Compressor",
}: CompressDashboardProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Map<string, CompressionResult>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState([0.8]);
  const [currentProcessing, setCurrentProcessing] = useState<string | null>(null);

  // Calculate totals
  const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);
  const totalCompressedSize = Array.from(results.values()).reduce(
    (acc, r) => acc + r.compressedSize,
    0
  );
  const totalSaved = totalOriginalSize - totalCompressedSize;
  const savingsPercent =
    totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(0) : 0;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > GLOBAL_MAX_FILES_COUNT) {
        toast.error("Free Plan Limit Reached", {
          description: `You can only compress ${GLOBAL_MAX_FILES_COUNT} files at a time. Upgrade to Pro for unlimited batches.`,
        });
        return;
      }

      const validFiles: File[] = [];

      acceptedFiles.forEach((file) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
          toast.error(`File too large: ${file.name}`, {
            description: `Free plan is limited to ${maxSizeMB}MB per file.`,
          });
        } else if (!files.some((f) => f.name === file.name)) {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);
        toast.success(`Added ${validFiles.length} file(s)`);
      }
    },
    [files, maxSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes || {
      "image/*": [],
      "application/pdf": [],
      "video/*": [],
    },
  });

  const removeFile = (name: string) => {
    setFiles(files.filter((f) => f.name !== name));
    const newResults = new Map(results);
    newResults.delete(name);
    setResults(newResults);
  };

  const clearAll = () => {
    setFiles([]);
    setResults(new Map());
  };

  const downloadAll = () => {
    results.forEach((result, fileName) => {
      const link = document.createElement("a");
      link.href = result.url;
      link.download = `compressed_${fileName}`;
      link.click();
    });
    toast.success("All files downloaded!");
  };

  const handleCompressAll = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    const newResults = new Map(results);
    let successCount = 0;

    for (const file of files) {
      if (newResults.has(file.name)) continue;
      setCurrentProcessing(file.name);

      try {
        if (file.type.startsWith("video/")) {
          toast.info("Initializing Video Engine...", {
            description: "This may take a moment for the first run.",
          });
        }

        const res = await compressFile(file, { quality: quality[0] });

        newResults.set(file.name, res);
        setResults(new Map(newResults));
        successCount++;

        if (res.compressedSize >= res.originalSize) {
          toast.warning(`Could not compress ${file.name} further`, {
            description: "File was already optimized.",
          });
        }
      } catch (error: any) {
        console.error(error);
        toast.error(`Failed to compress ${file.name}`, {
          description: error.message || "Unknown error",
        });
      }
    }

    setCurrentProcessing(null);
    setIsProcessing(false);
    if (successCount > 0) toast.success("Batch Compression Complete!");
  };

  const getModeConfig = () => {
    switch (mode) {
      case "image":
        return {
          icon: ImageIcon,
          color: "blue",
          title: "Drop images here",
          formats: "JPG, PNG, WebP, GIF",
        };
      case "pdf":
        return {
          icon: FileText,
          color: "red",
          title: "Drop PDFs here",
          formats: "PDF documents",
        };
      case "video":
        return {
          icon: FileVideo,
          color: "purple",
          title: "Drop videos here",
          formats: "MP4, WebM, MOV",
        };
      default:
        return {
          icon: UploadCloud,
          color: "gray",
          title: "Drop files here",
          formats: "Images, PDFs, Videos",
        };
    }
  };

  const config = getModeConfig();
  const IconComponent = config.icon;

  return (
    <div className="space-y-8">
      {/* Privacy Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl py-3 px-4">
        <Shield className="w-4 h-4 text-green-600" />
        <span>
          <strong className="text-green-700 dark:text-green-400">100% Private:</strong> Your files
          are processed locally in your browser and never uploaded to any server.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dropzone */}
          <div {...getRootProps()}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className={`
                relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-500/5 scale-[1.02]"
                    : "border-muted-foreground/20 hover:border-blue-500/50 hover:bg-muted/30"
                }
                min-h-[280px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-background to-muted/20
              `}
            >
              <input {...getInputProps()} />

              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] transition-opacity duration-500 ${
                    isDragActive ? "opacity-30" : "opacity-0"
                  } ${config.color === "blue" ? "bg-blue-500" : config.color === "red" ? "bg-red-500" : config.color === "purple" ? "bg-purple-500" : "bg-gray-500"}`}
                />
              </div>

              <motion.div
                animate={{ y: isDragActive ? -5 : 0 }}
                className={`p-5 rounded-2xl mb-6 transition-all ${
                  isDragActive
                    ? config.color === "blue"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : config.color === "red"
                      ? "bg-red-100 dark:bg-red-900/30"
                      : "bg-purple-100 dark:bg-purple-900/30"
                    : "bg-muted"
                }`}
              >
                <IconComponent
                  className={`w-10 h-10 ${
                    config.color === "blue"
                      ? "text-blue-500"
                      : config.color === "red"
                      ? "text-red-500"
                      : config.color === "purple"
                      ? "text-purple-500"
                      : "text-muted-foreground"
                  }`}
                />
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
              <p className="text-muted-foreground mb-4">
                or <span className="text-blue-500 underline">browse files</span>
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <Badge variant="secondary">{config.formats}</Badge>
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  Max {maxSizeMB}MB
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* File List */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {files.map((file) => {
                const result = results.get(file.name);
                const type = getFileType(file);
                const isCurrentlyProcessing = currentProcessing === file.name;

                return (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    layout
                  >
                    <Card
                      className={`group overflow-hidden transition-all duration-300 ${
                        result
                          ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                          : isCurrentlyProcessing
                          ? "border-blue-200 dark:border-blue-800"
                          : "border-border/50 hover:border-border"
                      }`}
                    >
                      <CardContent className="p-0 flex items-center">
                        {/* Type Icon */}
                        <div
                          className={`h-20 w-20 flex items-center justify-center border-r flex-shrink-0 ${
                            type === "image"
                              ? "bg-blue-500/10 text-blue-600"
                              : type === "pdf"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-purple-500/10 text-purple-600"
                          }`}
                        >
                          {type === "image" && <ImageIcon className="w-7 h-7" />}
                          {type === "pdf" && <FileText className="w-7 h-7" />}
                          {type === "video" && <FileVideo className="w-7 h-7" />}
                        </div>

                        {/* Details */}
                        <div className="flex-1 px-5 py-4 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                              <p className="font-medium truncate text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Original: {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>

                            {result ? (
                              <div className="text-right flex-shrink-0">
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span className="font-bold text-green-600">
                                    {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                                <Badge className="mt-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs">
                                  -{(100 - (result.compressedSize / file.size) * 100).toFixed(0)}%
                                  saved
                                </Badge>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                                {isCurrentlyProcessing ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                    <span className="text-blue-500">Compressing...</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                                    <span>Pending</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="px-4 flex items-center gap-2 flex-shrink-0">
                          {result ? (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              asChild
                            >
                              <a href={result.url} download={`compressed_${file.name}`}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          ) : (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => removeFile(file.name)}
                              disabled={isProcessing}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                      {isCurrentlyProcessing && (
                        <Progress value={50} className="h-1 rounded-none" />
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {files.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <UploadCloud className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No files selected</p>
                <p className="text-sm">Drag & drop files above to get started</p>
              </div>
            )}
          </div>

          {/* Action Bar */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-between items-center gap-4 p-4 bg-muted/30 rounded-xl border"
            >
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={clearAll} disabled={isProcessing}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
                {results.size > 0 && (
                  <Button variant="ghost" size="sm" onClick={downloadAll}>
                    <DownloadCloud className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </div>

              <Button
                onClick={handleCompressAll}
                disabled={isProcessing || files.length === 0}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg rounded-full px-8"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Compress All
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Settings Card */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Compression Settings
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quality Level</span>
                    <span className="font-medium text-blue-600">
                      {Math.round(quality[0] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={1}
                    step={0.05}
                    min={0.1}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower = smaller file, reduced quality
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          {results.size > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-700 dark:text-green-400">
                        Compression Complete!
                      </h3>
                      <p className="text-xs text-green-600/80">
                        {results.size} file(s) processed
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original</span>
                      <span>{(totalOriginalSize / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compressed</span>
                      <span className="font-bold text-green-600">
                        {(totalCompressedSize / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Space Saved</span>
                      <span className="font-bold text-green-600">
                        {(totalSaved / 1024 / 1024).toFixed(2)} MB ({savingsPercent}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quota Card */}
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" /> Free Plan Usage
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Files Used</span>
                    <span>
                      {files.length} / {GLOBAL_MAX_FILES_COUNT}
                    </span>
                  </div>
                  <Progress value={(files.length / GLOBAL_MAX_FILES_COUNT) * 100} className="h-2" />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dashed">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                  <Lock className="w-4 h-4 text-blue-500" /> Upgrade to Pro
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> 500MB file limit
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> 50 files at once
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> 4K video support
                  </li>
                </ul>
                <Button className="w-full mt-4" size="sm" variant="outline">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}