import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroScene from "@/components/HeroScene";
import SystemScene from "@/components/SystemScene";
import SectionHeading from "@/components/SectionHeading";
import {
  Brain, Shield, Zap, BarChart3, Users, Clock,
  Stethoscope, FileText, ArrowRight, Play
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const features = [
  { icon: Brain, title: "AI Diagnostics", desc: "Advanced neural networks analyze patient data for precise diagnostics and early detection." },
  { icon: Shield, title: "HIPAA Compliant", desc: "Enterprise-grade security ensuring full regulatory compliance for healthcare data." },
  { icon: Zap, title: "Real-time Processing", desc: "Instant data processing for time-critical medical decisions and patient care." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Comprehensive insights into practice performance and patient outcomes." },
  { icon: Users, title: "Patient Engagement", desc: "AI-powered communication tools to improve patient satisfaction and retention." },
  { icon: Clock, title: "Workflow Automation", desc: "Automate repetitive tasks and streamline clinical workflows." },
];

const overviewCards = [
  { icon: Stethoscope, title: "Clinical Intelligence", value: "98%", desc: "Diagnostic accuracy" },
  { icon: Users, title: "Patient Records", value: "10M+", desc: "Records processed" },
  { icon: FileText, title: "Documents", value: "50K+", desc: "Daily processed" },
  { icon: Clock, title: "Time Saved", value: "4hrs", desc: "Per provider daily" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative hero-gradient overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="container mx-auto px-4 pt-12 md:pt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...fadeUp} className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Next-Gen Healthcare AI
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The Future of
              <span className="glow-text block">Healthcare AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Empower your medical practice with intelligent automation, predictive analytics, and seamless patient management powered by cutting-edge AI.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="btn-outline-glow inline-flex items-center gap-2">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Overview Stats */}
    <section className="section-padding">
      <SectionHeading label="Platform Overview" title="Powering Healthcare Excellence" description="Our AI platform processes millions of data points to deliver actionable insights for healthcare providers." />
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {overviewCards.map((c, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
            <c.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="font-display text-3xl md:text-4xl font-bold glow-text mb-1">{c.value}</div>
            <div className="font-semibold text-sm mb-1">{c.title}</div>
            <div className="text-xs text-muted-foreground">{c.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* 3D System Visualization */}
    <section className="section-padding relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div {...fadeUp}>
          <SystemScene />
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-2">System Architecture</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Intelligent <span className="glow-text">Connected</span> Ecosystem
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform creates a unified ecosystem connecting every aspect of healthcare delivery — from patient intake to billing, all powered by a central AI core.
          </p>
          <ul className="space-y-3">
            {["Unified patient data layer", "Real-time AI decision support", "Seamless EHR integration", "Automated compliance monitoring"].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding">
      <SectionHeading label="Features" title="Everything You Need" description="A comprehensive suite of AI-powered tools designed specifically for modern healthcare providers." />
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="glass-card-hover p-8 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Demo */}
    <section className="section-padding relative">
      <div className="hero-gradient absolute inset-0 rotate-180" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-16 text-center max-w-4xl mx-auto glow-border">
          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Ready to <span className="glow-text">Transform</span> Your Practice?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of healthcare providers who are already using MedAIPro to deliver better patient outcomes and streamline operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Schedule a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow">
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
