"use client";

import { motion } from "framer-motion";

export function Hero() {
  const scrollToTemplates = () => {
    document.getElementById("templates-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full glass text-sm font-medium mb-6 animate-pulse">
            ✨ Spread light and joy this Vesak ✨
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Create Your Personalized <br />
            <span className="text-gradient drop-shadow-lg">Vesak Card</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Upload your photo, customize your greeting, and share Vesak happiness instantly with your loved ones.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTemplates}
            className="px-8 py-4 mb-12 rounded-full bg-gradient-to-r from-[var(--color-vesak-gold)] to-[var(--color-vesak-orange)] text-white font-bold text-lg shadow-[0_0_30px_rgba(255,165,0,0.5)] hover:shadow-[0_0_40px_rgba(255,165,0,0.8)] transition-shadow"
          >
            Start Creating
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.2)] border border-[var(--color-vesak-gold)]/30 aspect-video bg-black/5 dark:bg-white/5 flex items-center justify-center z-20"
          >
            <video 
              className="w-full h-full object-cover"
              src="/templates/Video 1.mp4" 
              controls 
              autoPlay 
              muted 
              loop 
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero foreground lanterns - using framer motion for parallax/floating effect */}
      <motion.div 
        className="absolute bottom-10 left-10 w-24 h-32 md:w-32 md:h-40 bg-gradient-to-b from-orange-400 to-yellow-300 rounded-lg opacity-80 blur-[2px]"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)" }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-32 right-10 w-16 h-20 md:w-20 md:h-28 bg-gradient-to-b from-purple-400 to-pink-300 rounded-lg opacity-60 blur-[2px]"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)" }}
        animate={{ y: [0, -30, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
}
