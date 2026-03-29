import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import AboutScene from "@/components/scenes/AboutScene";
import { Eye, Target, BookOpen, Lightbulb, Heart, Globe } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries of what AI can do for healthcare." },
  { icon: Heart, title: "Patient-First", desc: "Every feature designed with patient outcomes in mind." },
  { icon: Globe, title: "Accessibility", desc: "Making advanced healthcare tech available worldwide." },
];

const AboutPage = () => (
  <Layout>
    <section className="hero-gradient relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10 pt-16 pb-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">About Us</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            Redefining <span className="glow-text">Healthcare</span>
          </h1>
          <p className="text-lg text-muted-foreground">We're on a mission to make AI-powered healthcare accessible, efficient, and human-centered.</p>
        </motion.div>
        <AboutScene />
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        <motion.div {...fadeUp} className="glass-card-hover p-10 space-y-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Eye className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            A world where every healthcare provider has access to intelligent tools that enhance clinical decisions, streamline operations, and ultimately save more lives.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="glass-card-hover p-10 space-y-4">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
            <Target className="w-7 h-7 text-accent" />
          </div>
          <h3 className="font-display text-2xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To build the most comprehensive, intelligent, and user-friendly healthcare AI platform that bridges the gap between cutting-edge technology and daily clinical practice.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <SectionHeading label="Our Story" title="From Vision to Reality" />
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div {...fadeUp} className="glass-card p-10 space-y-6">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Healthora was founded in 2022 by a team of physicians, AI researchers, and healthcare technologists who shared a common frustration: the tools available to healthcare providers were decades behind what modern technology could offer.
            </p>
            <p>
              Starting with a simple AI-powered scheduling assistant, we quickly expanded into a comprehensive platform as providers told us about their biggest pain points — from drowning in paperwork to struggling with billing complexities.
            </p>
            <p>
              Today, Healthora serves thousands of healthcare providers across 30+ countries, processing millions of patient interactions and helping clinicians spend more time on what matters most: their patients.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
      <SectionHeading label="Values" title="What Drives Us" />
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <v.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default AboutPage;
