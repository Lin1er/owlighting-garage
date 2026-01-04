"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#00C2FF"
        glarePosition="all"
        scale={1.05}
        transitionSpeed={2000}
      >
        <div className="bg-surface border border-primary/10 rounded-2xl p-6 h-full max-w-[calc(100vw-2rem)] hover:border-primary/30 transition-all group">
          <div className="md:text-5xl text-4xl mb-4 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-primary">{title}</h3>
          <p className="text-muted text-justify leading-relaxed">{description}</p>
        </div>
      </Tilt>
    </motion.div>
  );
}
