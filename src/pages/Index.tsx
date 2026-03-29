import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroScene from "@/components/HeroScene";
import SectionHeading from "@/components/SectionHeading";
import {
  Bot, CalendarCheck, ClipboardList, Pill, Hospital, HeartPulse,
  ArrowRight, CheckCircle2, Send, User
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const solutions = [
  { icon: Bot, title: "AI Receptionist", desc: "Handles calls, messages & scheduling automatically." },
  { icon: CalendarCheck, title: "Smart Appointments", desc: "Efficient booking with automated reminders." },
  { icon: ClipboardList, title: "Patient Management", desc: "Centralized records, history & reports." },
  { icon: Pill, title: "Prescription AI", desc: "Fast medicine analysis & dosage insights." },
  { icon: Hospital, title: "Hospital Management", desc: "End-to-end workflow automation at scale." },
  { icon: HeartPulse, title: "Health Assistant", desc: "Medication reminders & health tracking." },
];

const benefits = [
  "Reduce patient wait time",
  "Automate daily operations",
  "Improve care accuracy",
  "Scale from clinic to hospital",
];

const demoMessages = [
  { role: "patient" as const, text: "I'd like to book an appointment" },
  { role: "ai" as const, text: "Sure! Which doctor would you like to see?" },
  { role: "patient" as const, text: "Dr. Sarah — General Physician" },
  { role: "ai" as const, text: "She's available tomorrow at 10 AM or 2:30 PM. Which works?" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative hero-gradient overflow-hidden min-h-[85vh] flex items-center">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp} className="relative z-10 space-y-7">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Healthcare AI Platform
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Smarter Care,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">
                Powered by AI
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Automate operations, reduce wait times, and deliver better patient experiences — from small clinics to large hospitals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow">
                Explore Platform
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Solutions */}
    <section className="section-padding">
      <SectionHeading label="Solutions" title="What We Build" description="Modular AI tools that work independently or together." />
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {solutions.map((s, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.07 }} className="glass-card-hover p-6 md:p-8 group">
            <div className="w-11 h-11 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4 group-hover:bg-emerald-400/20 transition-colors">
              <s.icon className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-display text-base md:text-lg font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why Us — compact */}
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div {...fadeUp} className="glass-card p-8 md:p-12 grid md:grid-cols-[1fr_1fr] gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Why Healthcare Teams{" "}
              <span className="text-emerald-400">Choose Us</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built for efficiency, accuracy, and growth at every scale.
            </p>
          </div>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-medium">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* Demo Chat */}
    <section className="section-padding">
      <SectionHeading label="Demo" title="See AI in Action" />
      <div className="container mx-auto px-4 max-w-md">
        <motion.div {...fadeUp} className="glass-card p-5 space-y-3">
          {demoMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.35 }}
              className={`flex gap-2.5 ${msg.role === "ai" ? "" : "flex-row-reverse"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-emerald-400/20" : "bg-primary/20"}`}>
                {msg.role === "ai" ? <Bot className="w-3.5 h-3.5 text-emerald-400" /> : <User className="w-3.5 h-3.5 text-primary" />}
              </div>
              <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "ai" ? "bg-emerald-400/10 border border-emerald-400/20 rounded-tl-sm" : "bg-primary/10 border border-primary/20 rounded-tr-sm"}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-9 rounded-full bg-white/5 border border-white/10 flex items-center px-4 text-xs text-muted-foreground">Type a message...</div>
            <div className="w-9 h-9 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding relative">
      <div className="hero-gradient absolute inset-0 rotate-180" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="glass-card glow-border p-10 md:p-14 text-center max-w-3xl mx-auto space-y-5">
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Ready to transform your <span className="text-emerald-400">healthcare operations</span>?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline-glow">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
