import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import ProductsScene from "@/components/scenes/ProductsScene";
import { Link } from "react-router-dom";
import {
  Bot, Building2, Hospital, Pill, HeartPulse,
  ArrowRight, Check, Phone, MessageSquare, CalendarCheck,
  ClipboardList, CreditCard, FileStack, Brain, Activity,
  BellRing, Users
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const tiers = [
  {
    icon: Bot,
    badge: "Small Clinics",
    title: "AI Receptionist",
    desc: "Intelligent virtual receptionist that handles patient calls, messages, and appointment scheduling automatically — reducing workload and improving patient response time.",
    features: [
      { icon: Phone, text: "Automated call handling" },
      { icon: MessageSquare, text: "SMS & WhatsApp replies" },
      { icon: CalendarCheck, text: "Smart appointment scheduling" },
      { icon: BellRing, text: "Reminders & follow-ups" },
    ],
    color: "from-primary/20 to-blue-500/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Building2,
    badge: "Growing Clinics & Diagnostics",
    title: "Clinic Management System",
    desc: "A complete AI-powered clinic management platform that handles appointments, patient records, billing, and documents — all in one unified system.",
    features: [
      { icon: CalendarCheck, text: "Appointment management" },
      { icon: ClipboardList, text: "Patient records & history" },
      { icon: CreditCard, text: "Billing & invoicing" },
      { icon: FileStack, text: "Document management" },
    ],
    color: "from-cyan-500/20 to-primary/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Hospital,
    badge: "Large Hospitals",
    title: "AI Hospital Management System",
    desc: "An advanced, enterprise-grade AI system that automates hospital workflows, improves cross-department coordination, and enables real-time decision-making at scale.",
    features: [
      { icon: Activity, text: "Real-time workflow automation" },
      { icon: Users, text: "Cross-department coordination" },
      { icon: Brain, text: "AI-driven decision support" },
      { icon: CreditCard, text: "Revenue cycle management" },
    ],
    color: "from-violet-500/20 to-primary/10",
    borderColor: "border-violet-500/30",
  },
];

const addons = [
  {
    icon: Pill,
    title: "Prescription Intelligence",
    desc: "AI-powered system that helps doctors analyze prescriptions, extract key medical data, check drug interactions, and improve treatment accuracy in seconds.",
    features: ["Prescription analysis", "Drug interaction alerts", "Dosage optimization", "E-prescribing"],
  },
  {
    icon: HeartPulse,
    title: "Patient AI Assistant",
    desc: "A personal health companion for patients — track medications, receive smart reminders, manage health records, and stay on top of their wellness journey.",
    features: ["Medication tracking", "Smart reminders", "Health record access", "Wellness insights"],
  },
];

const ProductsPage = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10 pt-16 pb-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            Product Suite
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            AI Solutions for <span className="glow-text">Every Scale</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From small clinics to large hospitals — our modular AI platform reduces manual work,
            improves efficiency, and enables faster, smarter healthcare delivery.
          </p>
        </motion.div>
        <ProductsScene />
      </div>
    </section>

    {/* Tiered Products */}
    <section className="section-padding">
      <SectionHeading
        label="Solutions by Scale"
        title="Built for Your Practice Size"
        description="Choose the solution that fits your needs today and scale seamlessly as you grow."
      />
      <div className="container mx-auto px-4 space-y-10">
        {tiers.map((t, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border ${t.borderColor} bg-gradient-to-br ${t.color} backdrop-blur-sm p-8 md:p-10 grid md:grid-cols-[1fr_1fr] gap-8 items-center overflow-hidden`}
          >
            {/* Subtle glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-primary/80 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                {t.badge}
              </span>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <t.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold">{t.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {t.features.map((f, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-white/5"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Add-on Modules */}
    <section className="section-padding">
      <SectionHeading
        label="Add-on Modules"
        title="Intelligent Add-ons"
        description="Enhance any solution with these powerful AI-powered modules."
      />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        {addons.map((a, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-8 space-y-5"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <a.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold">{a.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {a.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Start with <span className="glow-text">What You Need</span>
          </h2>
          <p className="text-muted-foreground">
            Whether you're a small clinic or a large hospital — get started with the right solution and scale as you grow. No lock-in contracts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline-glow">
              Request a Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ProductsPage;
