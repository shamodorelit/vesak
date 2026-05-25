"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import * as htmlToImage from "html-to-image";
import { Upload, Download, Share2, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Template } from "./TemplateSelection";

const VESAK_GREETINGS = [
  "Wishing you a serene Wesak Day filled with peace, love, and spiritual awakening.",
  "May the light of Lord Buddha guide you toward wisdom and compassion. Happy Wesak Day!",
  "On this sacred occasion, may you find true happiness and inner calm in your life.",
  "May Wesak bring harmony to your home and peace to your heart.",
  "Let us celebrate the birth, enlightenment, and passing of Lord Buddha with kindness and gratitude.",
  "Wishing you a blessed Wesak filled with good thoughts, good words, and good deeds.",
  "May the teachings of the Buddha inspire you to walk the path of peace and righteousness.",
  "On this holy Wesak Day, may your life be filled with positivity and spiritual strength.",
  "Let the spirit of Wesak bring hope, forgiveness, and compassion to everyone.",
  "Wishing you and your family a joyful Wesak filled with blessings and enlightenment.",
];

interface Props {
  template: Template;
  onClose: () => void;
}

export function CardEditor({ template, onClose }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  
  // Text Editor State
  const [greetingText, setGreetingText] = useState(VESAK_GREETINGS[1]);
  const [greetingColor, setGreetingColor] = useState("#FFFFFF");
  const [greetingSize, setGreetingSize] = useState(16);
  const [greetingWidth, setGreetingWidth] = useState(250);
  const [toName, setToName] = useState("");
  const [fromName, setFromName] = useState("");
  const [templateBase64, setTemplateBase64] = useState<string>("");

  useEffect(() => {
    // Pre-load the template image as base64 to ensure html-to-image captures it on mobile Safari
    fetch(template.image)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTemplateBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      });
  }, [template.image]);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const textDragRef = useRef<HTMLDivElement>(null);
  const toDragRef = useRef<HTMLDivElement>(null);
  const fromDragRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      // Small delay to ensure styles are applied
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Safari/iOS workaround: Render once and discard to force the browser to cache and draw the canvas
      try {
        await htmlToImage.toPng(cardRef.current, { cacheBust: true, skipFonts: true });
      } catch (e) {
        // Ignore errors on first pass
      }
      
      // Second pass for the actual capture
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      
      setGeneratedCard(dataUrl);
    } catch (error) {
      console.error("Error generating card", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToWhatsApp = async () => {
    if (!generatedCard) return;

    try {
      if (navigator.share) {
        const response = await fetch(generatedCard);
        const blob = await response.blob();
        const file = new File([blob], "Vesak_Greeting_Card.png", { type: "image/png" });

        const shareData = {
          title: "Happy Vesak Day!",
          text: "Make yours here: https://vesak-alpha.vercel.app/",
          files: [file],
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return; 
        }
      }

      // Fallback
      const text = encodeURIComponent(`Happy Vesak Day! ✨\nMake yours here: https://vesak-alpha.vercel.app/`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    } catch (error) {
      console.error("Error sharing:", error);
      const text = encodeURIComponent(`Happy Vesak Day! ✨\nMake yours here: https://vesak-alpha.vercel.app/`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  const handleDownload = () => {
    if (!generatedCard) return;
    const link = document.createElement("a");
    link.href = generatedCard;
    link.download = `Vesak_Greeting_Card.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto pt-6 pb-10">
      <div className="relative w-full max-w-5xl glass rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl mt-12 md:mt-0">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
        >
          <X size={24} />
        </button>

        {/* Editor Panel */}
        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-[var(--glass-border)] max-h-[85vh] overflow-y-auto pb-24">
          <h2 className="text-2xl font-bold">Customize Card</h2>
          
          {template.type === "photo" && (
            <div className="space-y-2">
              <label className="text-sm font-medium opacity-80">Upload Photo</label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-[var(--color-vesak-gold)] bg-[var(--color-vesak-gold)]/10" : "border-[var(--glass-border)] hover:border-gray-400"}`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-70">
                  {isDragActive ? "Drop photo here" : "Drag & drop or click to upload"}
                </p>
              </div>
              
              {photo && (
                <div className="flex items-center gap-4 mt-4 bg-black/5 p-3 rounded-lg">
                  <ZoomOut size={16} className="opacity-60" />
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="flex-1 accent-[var(--color-vesak-gold)]"
                  />
                  <ZoomIn size={16} className="opacity-60" />
                </div>
              )}
            </div>
          )}

          {/* Text Controls */}
          <div className="space-y-4 pt-4 border-t border-[var(--glass-border)]">
            <h3 className="text-lg font-semibold">Greeting Text</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm opacity-80 block mb-1">To</label>
                <input 
                  type="text" 
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full bg-black/10 dark:bg-white/10 rounded-lg px-3 py-2 border border-transparent focus:border-[var(--color-vesak-gold)] outline-none"
                />
              </div>
              <div>
                <label className="text-sm opacity-80 block mb-1">From</label>
                <input 
                  type="text" 
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-black/10 dark:bg-white/10 rounded-lg px-3 py-2 border border-transparent focus:border-[var(--color-vesak-gold)] outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm opacity-80">Message</label>
                <button 
                  onClick={() => setGreetingText(VESAK_GREETINGS[Math.floor(Math.random() * VESAK_GREETINGS.length)])}
                  className="text-xs bg-[var(--color-vesak-gold)]/20 text-[var(--color-vesak-gold)] hover:bg-[var(--color-vesak-gold)]/40 px-2 py-1 rounded transition-colors"
                >
                  Random Greeting
                </button>
              </div>
              <textarea 
                value={greetingText}
                onChange={(e) => setGreetingText(e.target.value)}
                rows={3}
                className="w-full bg-black/10 dark:bg-white/10 rounded-lg px-3 py-2 border border-transparent focus:border-[var(--color-vesak-gold)] outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 items-center bg-black/5 p-3 rounded-lg">
              <div className="flex flex-col col-span-1">
                <label className="text-xs opacity-70 mb-1">Font Size: {greetingSize}px</label>
                <input 
                  type="range" 
                  min="12" max="48" 
                  value={greetingSize} 
                  onChange={(e) => setGreetingSize(Number(e.target.value))}
                  className="accent-[var(--color-vesak-gold)] w-full"
                />
              </div>
              <div className="flex flex-col col-span-1">
                <label className="text-xs opacity-70 mb-1">Box Width: {greetingWidth}px</label>
                <input 
                  type="range" 
                  min="150" max="400" 
                  value={greetingWidth} 
                  onChange={(e) => setGreetingWidth(Number(e.target.value))}
                  className="accent-[var(--color-vesak-gold)] w-full"
                />
              </div>
              <div className="flex flex-col items-center col-span-1">
                <label className="text-xs opacity-70 mb-1">Color</label>
                <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-400">
                  <input 
                    type="color" 
                    value={greetingColor} 
                    onChange={(e) => setGreetingColor(e.target.value)}
                    className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !!generatedCard}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              generatedCard ? "bg-green-500" : "bg-gradient-to-r from-[var(--color-vesak-gold)] to-[var(--color-vesak-orange)] hover:opacity-90"
            }`}
          >
            {isGenerating ? "Generating..." : generatedCard ? "Card Generated!" : "Generate Card"}
          </button>
        </div>

        {/* Preview Panel */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex items-center justify-center bg-black/20 min-h-[50vh]">
          {!generatedCard ? (
            <div className="relative shadow-2xl rounded-xl overflow-hidden w-full max-w-md mx-auto flex-shrink-0">
              {/* The Actual Card Canvas to Capture */}
              <div ref={cardRef} className="relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                <img src={templateBase64 || template.image} alt="Template" className="w-full h-auto block z-0 pointer-events-none" />
                
                {/* User Photo Area */}
                {template.type === "photo" && photo && (
                  <div className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
                    <Draggable nodeRef={dragRef}>
                      <div ref={dragRef} className="cursor-move">
                        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform 0.1s ease-out' }}>
                          {/* Use standard img tag here to avoid Next/Image complexities during html2canvas */}
                          <img 
                            src={photo} 
                            alt="User upload" 
                            draggable="false"
                            style={{ maxWidth: 'none', width: '300px' }}
                          />
                        </div>
                      </div>
                    </Draggable>
                  </div>
                )}
                
                {/* Draggable 'To' Box */}
                {toName && (
                  <div className="absolute inset-0 z-20 overflow-hidden flex items-start justify-start p-8 pointer-events-none">
                    <Draggable nodeRef={toDragRef}>
                      <div 
                        ref={toDragRef} 
                        className="cursor-move pointer-events-auto font-bold border-2 border-current px-2 py-1 rounded shadow-sm bg-black/20 backdrop-blur-sm drop-shadow-md hover:ring-2 ring-white/50 ring-dashed transition-shadow"
                        style={{ color: greetingColor, fontSize: `${Math.max(12, greetingSize * 0.7)}px` }}
                      >
                        To: {toName}
                      </div>
                    </Draggable>
                  </div>
                )}
                
                {/* Greeting Text Box (Draggable) */}
                <div className="absolute inset-0 z-20 overflow-hidden flex items-center justify-center pointer-events-none">
                  <Draggable nodeRef={textDragRef}>
                    <div 
                      ref={textDragRef} 
                      className="cursor-move pointer-events-auto flex flex-col p-4 hover:ring-2 ring-white/50 ring-dashed rounded-lg transition-shadow bg-transparent"
                      style={{ 
                        color: greetingColor, 
                        fontSize: `${greetingSize}px`,
                        width: `${greetingWidth}px`,
                        maxWidth: '90%'
                      }}
                    >
                      <div className="text-center font-medium drop-shadow-md whitespace-pre-wrap leading-tight text-shadow-sm w-full h-full flex items-center justify-center">
                        {greetingText}
                      </div>
                    </div>
                  </Draggable>
                </div>

                {/* Draggable 'From' Box */}
                {fromName && (
                  <div className="absolute inset-0 z-20 overflow-hidden flex items-end justify-end p-8 pointer-events-none">
                    <Draggable nodeRef={fromDragRef}>
                      <div 
                        ref={fromDragRef} 
                        className="cursor-move pointer-events-auto font-bold border-2 border-current px-2 py-1 rounded shadow-sm bg-black/20 backdrop-blur-sm drop-shadow-md hover:ring-2 ring-white/50 ring-dashed transition-shadow"
                        style={{ color: greetingColor, fontSize: `${Math.max(12, greetingSize * 0.7)}px` }}
                      >
                        From: {fromName}
                      </div>
                    </Draggable>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative shadow-[0_0_40px_rgba(255,215,0,0.4)] rounded-xl overflow-hidden border-2 border-[var(--color-vesak-gold)] w-full max-w-md mx-auto">
                  <img src={generatedCard} alt="Generated Card" className="w-full h-auto block" />
                  
                  {/* Confetti effect overlay */}
                  <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-4xl animate-bounce">✨🎉✨</span>
                  </motion.div>
                </div>
                
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium backdrop-blur-sm transition-colors"
                  >
                    <Download size={20} /> Download
                  </button>
                  <button 
                    onClick={shareToWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl font-medium shadow-lg transition-colors"
                  >
                    <Share2 size={20} /> Share
                  </button>
                </div>
                
                <button 
                  onClick={() => setGeneratedCard(null)}
                  className="text-sm opacity-70 hover:opacity-100 underline"
                >
                  Edit Card Again
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
