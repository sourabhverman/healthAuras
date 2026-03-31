import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AboutScene from "@/components/scenes/AboutScene";
import NeuralNetworkBg from "@/components/scenes/NeuralNetworkBg";
import HeartbeatBg from "@/components/scenes/HeartbeatBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import DataFlowBg from "@/components/scenes/DataFlowBg";
import { Link } from "react-router-dom";
import {
  Eye, Target, BookOpen, Lightbulb, Heart, Globe, Users,
  Shield, Zap, Award, ArrowRight, CheckCircle2
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AboutPage = () => (
  <Layout>
    {/* ─── HERO ─── */}
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 hero-gradient" />
      <div className="grid-bg absolute inset-0 opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp} className="space-y-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              About Healthora
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
              Redefining <span className="glow-text">Healthcare</span> Technology
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              We're on a mission to make AI-powered healthcare accessible, efficient, and human-centered — at every scale.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <AboutScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── VISION & MISSION ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <NeuralNetworkBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Our Purpose
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Driven by <span className="glow-text">Purpose</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="glass-card-hover p-10 space-y-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
              <Eye className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every healthcare provider has access to intelligent tools that enhance clinical decisions, streamline operations, and ultimately save more lives.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="glass-card-hover p-10 space-y-4">
            <div className="w-14 h-14 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
              <Target className="w-7 h-7 text-teal-400" />
            </div>
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To build the most comprehensive, intelligent, and user-friendly healthcare AI platform that bridges the gap between cutting-edge technology and daily clinical practice.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── OUR STORY ─── */}
    <section className="relative min-h-[80vh] flex items-center py-24">
      <HeartbeatBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-12 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Our Story
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            From Vision to <span className="glow-text">Reality</span>
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="glass-card p-10 max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Healthora is a new healthcare AI startup built by IIIT and VIT students and collaborators who share a common frustration: too many clinical tools still feel decades behind.</p>
            <p>We began by prototyping an AI scheduling assistant, then expanded based on early partner feedback — reducing administrative load, simplifying documentation, and untangling operational and billing workflows across clinics, pharmacies, and pharma operations.</p>
            <p>Now we’re building a future-ready platform: privacy-first, interoperability-focused (FHIR-ready), and designed to meet real-world healthcare and pharma industry needs — so clinicians can spend more time on what matters most: their patients.</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── VALUES ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <DataFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Our Values
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            What <span className="glow-text">Drives Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide every decision, feature, and interaction.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Lightbulb, title: "Innovation", desc: "Pushing boundaries of what AI can do for healthcare — constantly researching, testing, and delivering breakthroughs." },
            { icon: Heart, title: "Patient-First", desc: "Every feature is designed with patient outcomes in mind. Technology should serve people, not the other way around." },
            { icon: Globe, title: "Accessibility", desc: "Making advanced healthcare technology available worldwide — regardless of practice size or location." },
            { icon: Shield, title: "Trust & Security", desc: "HIPAA-compliant, SOC 2 certified, and built with privacy by design. Your data is always protected." },
            { icon: Zap, title: "Efficiency", desc: "Eliminating manual bottlenecks so healthcare teams can focus on what truly matters — patient care." },
            { icon: Users, title: "Collaboration", desc: "Building alongside healthcare providers — every feature is co-designed with real clinicians." },
          ].map((v, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="glass-card-hover p-8 text-center group">
              <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-400/15 transition-colors">
                <v.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── KEY NUMBERS ─── */}
    <section className="relative min-h-[60vh] flex items-center py-24">
      <EcosystemBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Our Impact
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Principles That <span className="glow-text">Matter</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "Clinician-Led", label: "Built With Providers" },
            { value: "FHIR-Ready", label: "Interoperability" },
            { value: "Privacy-First", label: "Data Protection" },
            { value: "Built to Scale", label: "Future-Proof Architecture" },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card p-8 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold glow-text mb-2">{s.value}</div>
              <div className="text-sm font-semibold text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="relative py-24">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Join the <span className="glow-text">Healthcare Revolution</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Discover how HealthAura can transform your practice with intelligent, end-to-end solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products" className="btn-outline-glow">
              Explore Solutions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
