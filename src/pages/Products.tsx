import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import {
  Bot, CalendarCheck, Users, Pill, CreditCard, FileStack,
  ArrowRight, Check
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
    desc: "Intelligent virtual assistant that handles patient calls, schedules appointments, answers FAQs, and triages urgency — 24/7 without human intervention.",
    features: ["Natural language processing", "Multi-language support", "Call routing & escalation", "Appointment confirmation"],
  },
  {
    icon: CalendarCheck,
    title: "Smart Appointment System",
    desc: "AI-optimized scheduling that reduces no-shows, maximizes provider utilization, and gives patients convenient self-booking options.",
    features: ["Auto-optimization", "SMS/email reminders", "Waitlist management", "Calendar sync"],
  },
  {
    icon: Users,
    title: "Patient Management",
    desc: "Comprehensive patient records with AI-assisted charting, intake automation, and longitudinal health tracking across visits.",
    features: ["Digital intake forms", "AI-assisted charting", "Health timeline", "Insurance verification"],
  },
  {
    icon: Pill,
    title: "Prescription AI",
    desc: "Intelligent prescription management with drug interaction checking, formulary optimization, and e-prescribing workflows.",
    features: ["Drug interaction alerts", "Dosage recommendations", "E-prescribing", "Refill automation"],
  },
  {
    icon: CreditCard,
    title: "Automated Billing",
    desc: "End-to-end revenue cycle management with AI-powered coding, claim submission, and denial management.",
    features: ["Auto-coding (ICD/CPT)", "Claim scrubbing", "Payment processing", "Financial reporting"],
  },
  {
    icon: FileStack,
    title: "Document System",
    desc: "Intelligent document management with OCR, auto-classification, template generation, and secure sharing.",
    features: ["OCR scanning", "Auto-classification", "Template builder", "Secure sharing"],
  },
];

const ProductsPage = () => (
  <Layout>
    <section className="section-padding hero-gradient relative">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">Product Suite</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            Modular <span className="glow-text">AI Modules</span>
          </h1>
          <p className="text-lg text-muted-foreground">Six powerful modules that work independently or together as a unified healthcare intelligence platform.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <SectionHeading label="Modules" title="Complete Healthcare Suite" description="Each module is designed to excel independently while seamlessly integrating with the others." />
      <div className="container mx-auto px-4 space-y-8">
        {products.map((p, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover p-8 md:p-10 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {p.features.map((f, j) => (
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

    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Start with <span className="glow-text">Any Module</span></h2>
          <p className="text-muted-foreground">Choose the modules you need today and expand as your practice grows. No lock-in contracts.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="btn-outline-glow">Request Pricing</Link>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ProductsPage;
