/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Shield,
  Info,
  FileText,
  ImageIcon,
  FileImage,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConvertedFile {
  id: string;
  name: string;
  originalSize: number;
  convertedSize: number;
  status: "pending" | "converting" | "done" | "error";
  blob?: Blob;
  error?: string;
  type: "image" | "pdf";
}

const imageFormats = [
  { value: "jpeg", label: "JPEG", ext: ".jpg", mime: "image/jpeg" },
  { value: "png", label: "PNG", ext: ".png", mime: "image/png" },
  { value: "webp", label: "WebP", ext: ".webp", mime: "image/webp" }
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function PdfConverterDashboard() {
  const [mode, setMode] = useState<"images-to-pdf" | "pdf-to-images">("images-to-pdf");
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [outputFormat, setOutputFormat] = useState("png");

  // ... (Keep existing logic functions: handleDragOver, imagesToPdf, processImagesToPdf, etc. exactly as they were) ...
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const imagesToPdf = async (imageFiles: File[]): Promise<Blob> => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.src = imageData;
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgRatio = img.width / img.height;
      const pageRatio = pageWidth / pageHeight;
      
      let imgWidth, imgHeight;
      if (imgRatio > pageRatio) {
        imgWidth = pageWidth - 20;
        imgHeight = imgWidth / imgRatio;
      } else {
        imgHeight = pageHeight - 20;
        imgWidth = imgHeight * imgRatio;
      }

      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(imageData, "JPEG", x, y, imgWidth, imgHeight);
    }

    return pdf.output("blob");
  };

  const processImagesToPdf = async (imageFiles: File[]) => {
    const id = Math.random().toString(36).substr(2, 9);
    const totalSize = imageFiles.reduce((acc, f) => acc + f.size, 0);
    
    const newFile: ConvertedFile = {
      id,
      name: `converted_${imageFiles.length}_images.pdf`,
      originalSize: totalSize,
      convertedSize: 0,
      status: "pending",
      type: "pdf"
    };

    setFiles(prev => [...prev, newFile]);
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "converting" as const } : f));

    try {
      const pdfBlob = await imagesToPdf(imageFiles);
      setFiles(prev => prev.map(f => 
        f.id === id ? { 
          ...f, 
          status: "done" as const,
          convertedSize: pdfBlob.size,
          blob: pdfBlob
        } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === id ? { 
          ...f, 
          status: "error" as const,
          error: "Conversion failed. Make sure jsPDF is installed."
        } : f
      ));
    }
  };

  const processPdfToImages = async (pdfFile: File) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newFile: ConvertedFile = {
      id,
      name: pdfFile.name.replace(".pdf", `.${outputFormat}`),
      originalSize: pdfFile.size,
      convertedSize: 0,
      status: "pending",
      type: "image"
    };
    setFiles(prev => [...prev, newFile]);
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "converting" as const } : f));
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFiles(prev => prev.map(f => 
        f.id === id ? { 
          ...f, 
          status: "error" as const,
          error: "PDF to Image requires pdf.js implementation."
        } : f
      ));
    } catch (error) {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "error" as const, error: "Conversion failed" } : f));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (mode === "images-to-pdf") {
      const imageFiles = droppedFiles.filter(f => f.type.startsWith("image/"));
      if (imageFiles.length > 0) processImagesToPdf(imageFiles);
    } else {
      const pdfFiles = droppedFiles.filter(f => f.type === "application/pdf");
      pdfFiles.forEach(processPdfToImages);
    }
  }, [mode, outputFormat]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (mode === "images-to-pdf") {
      const imageFiles = selectedFiles.filter(f => f.type.startsWith("image/"));
      if (imageFiles.length > 0) processImagesToPdf(imageFiles);
    } else {
      const pdfFiles = selectedFiles.filter(f => f.type === "application/pdf");
      pdfFiles.forEach(processPdfToImages);
    }
  };

  const removeFile = (id: string) => { setFiles(prev => prev.filter(f => f.id !== id)); };
  const downloadFile = (file: ConvertedFile) => {
    if (!file.blob) return;
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadAll = () => { files.filter(f => f.status === "done" && f.blob).forEach(downloadFile); };
  const clearFiles = () => { setFiles([]); };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* Privacy Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Secure: Files are processed locally. No uploads.</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT MAIN AREA */}
        <div className="lg:col-span-2 space-y-6">
          
          <Tabs value={mode} onValueChange={(v) => { setMode(v as any); clearFiles(); }}>
            
            {/* Custom Tab Switcher */}
            <TabsList className="grid w-full grid-cols-2 h-14 bg-card border border-border/50 rounded-2xl p-1 mb-6">
              <TabsTrigger 
                value="images-to-pdf" 
                className="rounded-xl h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg shadow-blue-500/20 transition-all"
              >
                <div className="flex items-center gap-2">
                   <ImageIcon className="w-4 h-4" />
                   <span>Images <ArrowRight className="w-3 h-3 inline opacity-50 mx-1" /> PDF</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="pdf-to-images" 
                className="rounded-xl h-full data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg shadow-purple-500/20 transition-all"
              >
                <div className="flex items-center gap-2">
                   <FileText className="w-4 h-4" />
                   <span>PDF <ArrowRight className="w-3 h-3 inline opacity-50 mx-1" /> Images</span>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Mode: PDF to Images Settings */}
            <TabsContent value="pdf-to-images" className="mt-0 mb-6">
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="border-border/50 bg-card/50">
                    <CardContent className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                             <Layers className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Extract pages as:</span>
                       </div>
                       <Select value={outputFormat} onValueChange={setOutputFormat}>
                          <SelectTrigger className="w-[140px] bg-background border-border/50">
                             <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                             {imageFormats.map(f => (
                                <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                             ))}
                          </SelectContent>
                       </Select>
                    </CardContent>
                  </Card>
               </motion.div>
            </TabsContent>

            {/* Dropzone */}
            <div className="relative group">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
                  ${isDragging 
                    ? "border-blue-500 bg-blue-500/5 scale-[1.01]" 
                    : "border-border/50 hover:border-blue-500/30 hover:bg-muted/30"
                  }
                  bg-card/50 backdrop-blur-sm min-h-[320px] flex flex-col items-center justify-center
                `}
              >
                <input
                  type="file"
                  accept={mode === "images-to-pdf" ? "image/*" : "application/pdf"}
                  multiple={mode === "images-to-pdf"}
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {/* Visuals */}
                <motion.div
                  animate={{ scale: isDragging ? 1.1 : 1, y: isDragging ? -10 : 0 }}
                  className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transition-colors duration-300
                    ${mode === 'images-to-pdf' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'}
                  `}
                >
                  {mode === "images-to-pdf" ? <ImageIcon className="w-10 h-10" /> : <FileText className="w-10 h-10" />}
                </motion.div>

                <h3 className="text-2xl font-bold mb-3">
                  {isDragging ? "Drop it here!" : (mode === "images-to-pdf" ? "Drop images here" : "Drop PDF here")}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                   Or click to browse from your device. {mode === "images-to-pdf" ? "Supports JPG, PNG, WebP." : "Process standard PDFs."}
                </p>

                <Button variant="outline" className="rounded-full px-6 relative z-0 pointer-events-none">
                   Select Files
                </Button>
              </div>
            </div>
          </Tabs>

          {/* Results List */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
                    <span className="font-semibold text-sm pl-2">Processed Files ({files.length})</span>
                    {files.some(f => f.status === "done") && (
                      <Button size="sm" onClick={downloadAll} variant="outline" className="h-8 text-xs">
                        <Download className="w-3 h-3 mr-2" /> Download All
                      </Button>
                    )}
                </div>
                
                <div className="divide-y divide-border/50">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${file.type === 'pdf' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'}
                      `}>
                        {file.type === "pdf" ? <FileText className="w-5 h-5" /> : <FileImage className="w-5 h-5" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{formatFileSize(file.originalSize)}</span>
                          {file.status === "done" && (
                            <>
                              <ArrowRight className="w-3 h-3" />
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                {formatFileSize(file.convertedSize)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {file.status === "converting" && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
                        {file.status === "done" && (
                           <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full" onClick={() => downloadFile(file)}>
                                    <Download className="w-4 h-4" />
                                </Button>
                           </div>
                        )}
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => removeFile(file.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
                 <Info className="w-4 h-4" /> About this tool
              </h4>
              <div className="space-y-3">
                 <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                    <p className="font-medium text-blue-700 dark:text-blue-300 text-sm mb-1">Images → PDF</p>
                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                        Merges multiple images into one ordered PDF document. Great for receipts and portfolios.
                    </p>
                 </div>
                 <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
                    <p className="font-medium text-purple-700 dark:text-purple-300 text-sm mb-1">PDF → Images</p>
                    <p className="text-xs text-purple-600/80 dark:text-purple-400/80">
                        Explodes a PDF into separate image files for every page.
                    </p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg">
             <CardContent className="p-6">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                   <Upload className="w-4 h-4" /> Batch Processing
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                   You can drag multiple files at once. Our client-side engine processes them in parallel without slowing down your computer.
                </p>
             </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}