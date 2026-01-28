"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const codeString = `const Developer = {
  name: "Aryan Kaushal",
  role: "Software Engineer",
  status: "B.Tech in IT @ IIIT Lucknow",
  skills: ["Next.js", "SwiftUI", "Node.js", "Python"],
  solve: (problem) => problem.isComplex ? "Optimized" : "Solved"
};`;

export function CodeWindow() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter & Backspace Effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const typeSpeed = 70;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const animate = () => {
      if (isTyping) {
        if (text.length < codeString.length) {
          setText(codeString.slice(0, text.length + 1));
          timeout = setTimeout(animate, typeSpeed + Math.random() * 20);
        } else {
          setIsTyping(false);
          timeout = setTimeout(animate, pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(codeString.slice(0, text.length - 1));
          timeout = setTimeout(animate, deleteSpeed);
        } else {
          setIsTyping(true);
          timeout = setTimeout(animate, 500);
        }
      }
    };

    timeout = setTimeout(animate, typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg cursor-pointer"
    >
      {/* Glow Behind */}
      <div className="absolute -inset-5 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Window Container */}
      <div className="relative h-[320px] overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-sm flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3 shrink-0">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-4 text-xs font-medium text-zinc-500">portfolio.tsx</div>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
          <pre className="whitespace-pre-wrap">
            <code className="text-zinc-300">
              <span className="text-purple-400">const</span> <span className="text-blue-400">Developer</span> = {"{"}
              {"\n"}
              {text.split("\n").slice(1).map((line, i, arr) => (
                 <div key={i} dangerouslySetInnerHTML={{
                     __html: line
                       .replace(/name:/g, '<span class="text-zinc-400">name:</span>')
                       .replace(/"Aryan Kaushal"/g, '<span class="text-green-400">"Aryan Kaushal"</span>')
                       .replace(/role:/g, '<span class="text-zinc-400">role:</span>')
                       .replace(/"Software Engineer"/g, '<span class="text-green-400">"Software Engineer"</span>')
                       .replace(/status:/g, '<span class="text-zinc-400">status:</span>')
                       .replace(/"B.Tech in IT @ IIIT Lucknow"/g, '<span class="text-green-400">"B.Tech in IT @ IIIT Lucknow"</span>')
                       .replace(/skills:/g, '<span class="text-zinc-400">skills:</span>')
                       .replace(/"Next.js"/g, '<span class="text-green-400">"Next.js"</span>')
                       .replace(/"SwiftUI"/g, '<span class="text-green-400">"SwiftUI"</span>')
                       .replace(/"Node.js"/g, '<span class="text-green-400">"Node.js"</span>')
                       .replace(/"Python"/g, '<span class="text-green-400">"Python"</span>')
                       .replace(/solve:/g, '<span class="text-zinc-400">solve:</span>')
                       .replace(/\(problem\)/g, '<span class="text-orange-400">(problem)</span>')
                       .replace(/=>/g, '<span class="text-purple-400">=></span>')
                       .replace(/problem.isComplex/g, '<span class="text-blue-400">problem.isComplex</span>')
                       .replace(/\?/g, '<span class="text-purple-400">?</span>')
                       .replace(/"Optimized"/g, '<span class="text-green-400">"Optimized"</span>')
                       .replace(/: "Solved"/g, '<span class="text-purple-400">:</span> <span class="text-green-400">"Solved"</span>')
                 }} />
              ))}
              <span className="inline-block h-4 w-2 bg-primary align-middle animate-pulse" />
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
