import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroScene from "@/components/HeroScene";
import SystemScene from "@/components/SystemScene";
import SectionHeading from "@/components/SectionHeading";
import {
  Bot, Building2, Hospital, Pill, HeartPulse, CalendarCheck,
  ClipboardList, ArrowRight, Play, Check, MessageSquare,
  Timer, Zap, Brain, TrendingUp, Send, User
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const products = [
  {
    icon: Bot,
    title: "AI Receptionist",
    desc: "Automates patient calls, messages, and appointment scheduling, ensuring faster response times and reduced workload.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Appointment System",
    desc: "Manages doctor availability and schedules appointments efficiently with automated reminders.",
  },
  {
    icon: ClipboardList,
    title: "Patient Management System",
    desc: "Stores patient records, history, and reports securely in one centralized platform.",
  },
  {
    icon: Pill,
    title: "AI Prescription Intelligence",
    desc: "Analyzes prescriptions to extract medicines, dosage, and treatment insights for faster and more accurate decisions.",
  },
  {
    icon: Hospital,
    title: "AI Hospital Management System",
    desc: "Provides end-to-end automation for hospital operations, including workflow management and staff coordination.",
  },
  {
    icon: HeartPulse,
    title: "AI Health Assistant",
    desc: "Supports patients with medication reminders, health tracking, and personalized care assistance.",
  },
];

const whyUs = [
  { icon: Timer, text: "Reduce patient wait time" },
  { icon: Zap, text: "Automate repetitive tasks" },
  { icon: TrendingUp, text: "Improve operational efficiency" },
  { icon: Brain, text: "Enable faster decision-making" },
  { icon: Building2, text: "Scalable for clinics, hospitals & networks" },
];

const demoMessages = [
  { role: "patient" as const, text: "I want to book an appointment" },
  { role: "ai" as const, text: "Sure! Which doctor would you like to consult?" },
  { role: "patient" as const, text: "Dr. Sarah — General Physician" },
  { role: "ai" as const, text: "Dr. Sarah is available tomorrow at 10:00 AM and 2:30 PM. Which slot works for you?" },
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
              AI Healthcare Platform
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI-Powered Healthcare Platform for{" "}
              <span className="glow-text">Clinics, Hospitals & Pharma</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              We design intelligent systems to automate patient interactions, streamline operations, and enable faster, smarter medical decisions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow inline-flex items-center gap-2">
                <Play className="w-4 h-4" /> Explore Platform
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Platform Overview */}
    <section className="section-padding relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div {...fadeUp}>
          <SystemScene />
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary">Platform Overview</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Built for Every <span className="glow-text">Healthcare Scale</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform is designed to support healthcare providers at every level — from small clinics to large hospitals.
          </p>
          <div className="space-y-4">
            {[
              { label: "Small Clinics", text: "AI-driven tools that handle calls, messages, and appointment scheduling, reducing manual work and improving response time." },
              { label: "Growing Clinics", text: "Complete management systems to handle patient records, appointments, billing, and daily operations efficiently." },
              { label: "Large Hospitals", text: "Advanced AI-powered systems that manage complex workflows, improve coordination, and enable real-time decision-making." },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-sm font-semibold text-primary mb-1">{item.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Products */}
    <section className="section-padding">
      <SectionHeading label="Solutions" title="Our Healthcare AI Solutions" description="A comprehensive suite of AI-powered tools designed for modern healthcare providers." />
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.08 }} className="glass-card-hover p-8 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-4 mt-8 text-center">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          View all products in detail <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding">
      <SectionHeading label="Why Us" title="Designed for Efficiency, Accuracy, and Scale" description="Our platform is built to transform how healthcare is delivered." />
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 rounded-xl glass-card-hover"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Demo Chat */}
    <section className="section-padding">
      <SectionHeading label="Live Demo" title="See AI in Action" description="Watch how our AI Receptionist handles a real patient conversation." />
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div {...fadeUp} className="glass-card p-6 space-y-4">
          {demoMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.4 }}
              className={`flex gap-3 ${msg.role === "ai" ? "" : "flex-row-reverse"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-primary/20" : "bg-accent/20"}`}>
                {msg.role === "ai" ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-accent" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.role === "ai" ? "bg-primary/10 border border-primary/20 rounded-tl-sm" : "bg-accent/10 border border-accent/20 rounded-tr-sm"}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex-1 h-10 rounded-full bg-white/5 border border-white/10 flex items-center px-4 text-sm text-muted-foreground">
              Type a message...
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Send className="w-4 h-4 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="section-padding relative">
      <div className="hero-gradient absolute inset-0 rotate-180" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-16 text-center max-w-4xl mx-auto glow-border">
          <motion.div {...fadeUp} className="space-y-6">
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Transform Your Healthcare Operations with <span className="glow-text">AI</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether you run a small clinic or a large hospital — our AI platform helps you deliver faster, smarter, and more efficient care.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow">
                Explore Platform
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
