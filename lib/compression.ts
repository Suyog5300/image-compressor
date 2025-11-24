/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export type FileType = 'image' | 'pdf' | 'video' | 'unknown';

export type CompressionResult = {
  file: Blob;
  originalSize: number;
  compressedSize: number;
  url: string;
  type: FileType;
};

// Singleton FFmpeg instance
let ffmpeg: FFmpeg | null = null;

export function getFileType(file: File): FileType {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type === 'application/pdf') return 'pdf';
  if (file.type.startsWith('video/')) return 'video';
  return 'unknown';
}

// --- LOAD FFMPEG CORE (Run once) ---
async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg;
  
  const instance = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  
  await instance.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  ffmpeg = instance;
  return ffmpeg;
}

export async function compressFile(
  file: File, 
  config: { quality: number }, 
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  const type = getFileType(file);

  // --- IMAGE LOGIC ---
  if (type === 'image') {
    try {
      // Scale quality: Slider 0.1-1.0 -> Quality 0.1-1.0
      const options = {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        initialQuality: config.quality, 
        useWebWorker: true,
        onProgress: onProgress 
      };
      
      const compressedBlob = await imageCompression(file, options);
      return {
        file: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        url: URL.createObjectURL(compressedBlob),
        type: 'image',
      };
    } catch (e) {
      throw new Error("Image compression failed.");
    }
  }

  // --- VIDEO LOGIC (Real FFmpeg) ---
  if (type === 'video') {
    try {
      const ffmpegInstance = await loadFFmpeg();
      const { name } = file;
      
      // 1. Write file
      await ffmpegInstance.writeFile(name, await fetchFile(file));

      // 2. CALCULATE COMPRESSION LEVEL
      // Formula: Map 0.1-1.0 to CRF 35-23
      const crf = Math.floor(35 - ((config.quality - 0.1) * (12 / 0.9))); 

      // 3. Run Compression
      await ffmpegInstance.exec([
        '-i', name,
        '-c:v', 'libx264',
        '-crf', crf.toString(), 
        '-preset', 'superfast', 
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4'
      ]);

      // 4. Read result
      const data = await ffmpegInstance.readFile('output.mp4');
      
      // FIX: Type assertion 'as any' fixes the SharedArrayBuffer TS error
      const blob = new Blob([data as any], { type: 'video/mp4' });

      // Clean up
      await ffmpegInstance.deleteFile(name);
      await ffmpegInstance.deleteFile('output.mp4');

      return {
        file: blob,
        originalSize: file.size,
        compressedSize: blob.size,
        url: URL.createObjectURL(blob),
        type: 'video',
      };
    } catch (e) {
      console.error(e);
      throw new Error("Video compression failed.");
    }
  }

  // --- PDF LOGIC ---
  if (type === 'pdf') {
    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      
      // Basic cleanup
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setCreator('');
      
      // Save with object stream compression
      const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
      
      // FIX: Type assertion 'as any' fixes the Uint8Array TS error
      const blob = new Blob([compressedBytes as any], { type: 'application/pdf' });
      
      // Check if we actually made it smaller
      const finalBlob = blob.size < file.size ? blob : file;

      return {
        file: finalBlob,
        originalSize: file.size,
        compressedSize: finalBlob.size, 
        url: URL.createObjectURL(finalBlob),
        type: 'pdf',
      };
    } catch (e) {
      throw new Error("PDF compression failed.");
    }
  }

  throw new Error("Unsupported file type");
}