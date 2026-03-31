import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeroScene from "@/components/HeroScene";
import NeuralNetworkBg from "@/components/scenes/NeuralNetworkBg";
import SpineFlowBg from "@/components/scenes/SpineFlowBg";
import DataFlowBg from "@/components/scenes/DataFlowBg";
import HeartbeatBg from "@/components/scenes/HeartbeatBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import {
  Bot, CalendarCheck, ClipboardList, Pill, Hospital, HeartPulse,
  ArrowRight, CheckCircle2, Brain, Activity, Building2,
  CreditCard, FileStack, Shield, Users, Stethoscope,
  MonitorSmartphone, Zap, Globe
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => (
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
              Complete Healthcare Ecosystem
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
              End-to-End Healthcare{" "}
              <span className="glow-text">Solutions</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              From AI receptionists to full hospital management — we build, integrate, and manage complete healthcare systems at every scale.
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

    {/* ─── AI-POWERED PRODUCTS ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <NeuralNetworkBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            AI-Powered Products
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Intelligent Systems for <span className="glow-text">Modern Healthcare</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our AI products handle the complexity so your team can focus on patient care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Bot, title: "AI Receptionist", desc: "Handles calls, messages, scheduling, and patient queries automatically — 24/7 without human intervention.", tag: "Small Clinics" },
            { icon: Brain, title: "AI Decision Support", desc: "Clinical insights, drug interaction checks, and dosage optimization powered by medical AI models.", tag: "All Scales" },
            { icon: HeartPulse, title: "Patient AI Assistant", desc: "Personal health companion for medication tracking, reminders, health records, and wellness insights.", tag: "Patients" },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center group-hover:bg-emerald-400/15 transition-colors">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground px-2 py-0.5 rounded-full border border-border/50">{item.tag}</span>
              </div>
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── NON-AI MANAGEMENT SYSTEMS ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <SpineFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Management Systems
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Robust Systems <span className="glow-text">Without the Complexity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Core healthcare management tools — reliable, scalable, and built for real-world operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Building2, title: "Clinic Management System",
              desc: "Appointments, patient records, billing, and document management in one unified platform.",
              features: [
                { icon: CalendarCheck, text: "Appointment scheduling" },
                { icon: ClipboardList, text: "Patient records" },
                { icon: CreditCard, text: "Billing & invoicing" },
                { icon: FileStack, text: "Document management" },
              ],
            },
            {
              icon: Hospital, title: "Hospital Management System",
              desc: "Enterprise-grade system for multi-department coordination, workflow automation, and operations.",
              features: [
                { icon: Activity, text: "Workflow automation" },
                { icon: Users, text: "Department coordination" },
                { icon: Shield, text: "Compliance & security" },
                { icon: CreditCard, text: "Revenue management" },
              ],
            },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.12 }} className="glass-card-hover p-8 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-display text-2xl font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {item.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-background/40 border border-border/30">
                    <f.icon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                    <span className="text-xs font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── DATA & INTEGRATIONS ─── */}
    <section className="relative min-h-[80vh] flex items-center py-24">
      <DataFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Connected Platform
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            One Platform, <span className="glow-text">Fully Connected</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every system talks to every other — seamless data flow, no silos, no manual handoffs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Globe, label: "Cloud Infrastructure" },
            { icon: Shield, label: "HIPAA Compliant" },
            { icon: MonitorSmartphone, label: "Multi-Device" },
            { icon: Zap, label: "Real-time Sync" },
            { icon: Users, label: "Role-based Access" },
            { icon: Stethoscope, label: "Clinical APIs" },
            { icon: Pill, label: "Pharmacy Integration" },
            { icon: Activity, label: "Live Analytics" },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }} className="glass-card p-5 text-center space-y-3 group hover:border-emerald-400/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center mx-auto group-hover:bg-emerald-400/15 transition-colors">
                <item.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold block">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── WHY HEALTHORA ─── */}
    <section className="relative min-h-[70vh] flex items-center py-24">
      <HeartbeatBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="glass-card p-10 md:p-14 max-w-4xl mx-auto grid md:grid-cols-[1fr_1fr] gap-10 items-center">
          <div className="space-y-5">
            <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              Why HealthAuras
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold">
              Built for <span className="glow-text">Real Healthcare</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We don't just build software — we build complete solutions that transform how healthcare operates at every level.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "End-to-end system coverage",
              "AI + traditional management",
              "Scales from clinic to hospital",
              "Reduce operations cost by 60%",
              "24/7 automated patient handling",
              "HIPAA-compliant architecture",
            ].map((b, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-medium">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="relative py-24">
      <EcosystemBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Ready to build your <span className="glow-text">healthcare ecosystem</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Whether you need a single AI receptionist or a complete hospital system — we have you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
              Book a Demo <ArrowRight className="w-4 h-4" />
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

export default Index;
