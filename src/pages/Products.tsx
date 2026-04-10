import { motion } from "framer-motion";
import { usePageSEO } from "@/hooks/use-page-seo";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import ProductHeroScene from "@/components/scenes/ProductHeroScene";
import ReceptionistScene from "@/components/scenes/ReceptionistScene";
import ClinicScene from "@/components/scenes/ClinicScene";
import HospitalScene from "@/components/scenes/HospitalScene";
import AddonsScene from "@/components/scenes/AddonsScene";
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
    desc: "Intelligent virtual receptionist that handles patient calls, messages, and appointment scheduling automatically.",
    features: [
      { icon: Phone, text: "Automated call handling" },
      { icon: MessageSquare, text: "SMS & WhatsApp replies" },
      { icon: CalendarCheck, text: "Smart scheduling" },
      { icon: BellRing, text: "Reminders & follow-ups" },
    ],
    Scene: ReceptionistScene,
  },
  {
    icon: Building2,
    badge: "Growing Clinics",
    title: "Clinic Management System",
    desc: "AI-powered clinic management — appointments, records, billing, and documents in one unified platform.",
    features: [
      { icon: CalendarCheck, text: "Appointment management" },
      { icon: ClipboardList, text: "Patient records" },
      { icon: CreditCard, text: "Billing & invoicing" },
      { icon: FileStack, text: "Document management" },
    ],
    Scene: ClinicScene,
  },
  {
    icon: Hospital,
    badge: "Large Hospitals",
    title: "AI Hospital Management",
    desc: "Enterprise-grade AI system that automates workflows, coordinates departments, and enables real-time decisions.",
    features: [
      { icon: Activity, text: "Workflow automation" },
      { icon: Users, text: "Department coordination" },
      { icon: Brain, text: "AI decision support" },
      { icon: CreditCard, text: "Revenue management" },
    ],
    Scene: HospitalScene,
  },
];

const addons = [
  {
    icon: Pill,
    title: "Prescription Intelligence",
    desc: "Analyze prescriptions, check drug interactions, and optimize dosage in seconds.",
    features: ["Prescription analysis", "Drug interaction alerts", "Dosage optimization", "E-prescribing"],
  },
  {
    icon: HeartPulse,
    title: "Patient AI Assistant",
    desc: "Personal health companion — medication tracking, reminders, records, and wellness insights.",
    features: ["Medication tracking", "Smart reminders", "Health record access", "Wellness insights"],
  },
];

const ProductsPage = () => {
  usePageSEO({
    title: "AI Healthcare Products — AI Receptionist, Clinic Software, Hospital ERP | HealthAuras",
    description: "Explore HealthAuras products: AI Receptionist for small clinics, Clinic Management System for growing practices, and full Hospital ERP. Automated scheduling, billing, EMR, WhatsApp & SMS.",
    keywords: "AI receptionist for clinics, clinic management software, hospital ERP software, medical billing automation, smart appointment scheduling, WhatsApp SMS healthcare, EMR software India, healthcare AI products, doctor appointment system, healthauras products",
    canonical: "https://healthauras.software/products",
  });
  return (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden min-h-[60vh] flex items-center">
      <ProductHeroScene />
      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
            Product Suite
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            AI Solutions for <span className="glow-text">Every Scale</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Modular AI platform that reduces manual work, improves efficiency, and enables smarter healthcare delivery.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Tiered Products */}
    <section className="py-16 md:py-24">
      <SectionHeading
        label="Solutions by Scale"
        title="Built for Your Practice Size"
        description="Choose the solution that fits your needs and scale seamlessly as you grow."
      />
      <div className="container mx-auto px-4 space-y-8">
        {tiers.map((t, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <t.Scene />
            <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-[1fr_1fr] gap-8 items-center">
              <div className="space-y-5">
                <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-primary/80 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                  {t.badge}
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">{t.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/40">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Add-on Modules */}
    <section className="py-16 md:py-24">
      <SectionHeading
        label="Add-on Modules"
        title="Intelligent Add-ons"
        description="Enhance any solution with powerful AI-powered modules."
      />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        {addons.map((a, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <AddonsScene />
            <div className="relative z-10 p-8 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                <a.icon className="w-6 h-6 text-primary" />
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Start with <span className="glow-text">What You Need</span>
          </h2>
          <p className="text-muted-foreground">
            Get started with the right solution and scale as you grow. No lock-in contracts.
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
};

export default ProductsPage;
