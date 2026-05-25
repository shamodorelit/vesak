"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Placeholder audio setup - replace src with actual Vesak audio if provided
    audioRef.current = new Audio();
    audioRef.current.loop = true;
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      // In a real scenario with a valid src, play would work
      // audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="glass max-w-6xl mx-auto rounded-full px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-vesak-gold)] to-[var(--color-vesak-orange)] flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold text-center">☸</span>
          </div>
          <h1 className="font-bold text-base sm:text-lg block">
            <span className="text-gradient">Payable Vesak</span> Card Maker
          </h1>
        </div>

      </div>
    </motion.header>
  );
}
