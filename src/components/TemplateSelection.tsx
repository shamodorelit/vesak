"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Template {
  id: string;
  name: string;
  image: string;
  type: "photo" | "text-only";
}

export const TEMPLATES: Template[] = [
  { id: "template-1", name: "Vesak Blessings", image: "/templates/Template 1.png", type: "photo" },
  { id: "template-2", name: "Temple Serenity", image: "/templates/Template 2.png", type: "photo" },
  { id: "template-3", name: "Golden Elegance", image: "/templates/Template 3.png", type: "photo" },
  { id: "template-4", name: "Neon Vesak", image: "/templates/Template 4.png", type: "photo" },
  { id: "template-5", name: "Lotus Peace", image: "/templates/Template 5.png", type: "photo" },
  { id: "template-6", name: "Divine Light", image: "/templates/Template 6.png", type: "photo" },
  { id: "template-7", name: "Spiritual Journey", image: "/templates/Template 7.png", type: "photo" },
];

interface Props {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelection({ onSelectTemplate }: Props) {
  return (
    <section id="templates-section" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Choose a <span className="text-gradient">Template</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg opacity-80"
        >
          Select a beautiful design to start personalizing your Vesak greeting.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => onSelectTemplate(template)}
            className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative border border-transparent hover:border-[var(--color-vesak-gold)] transition-all duration-300"
          >
            <div className="relative aspect-square w-full bg-black/5 dark:bg-white/5 p-2">
              <Image 
                src={template.image} 
                alt={template.name} 
                fill 
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium border border-white/30">
                  Select Design
                </span>
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-xs opacity-70 mt-1">
                {template.type === "photo" ? "Photo & Text Customizable" : "Text Only Premium"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
