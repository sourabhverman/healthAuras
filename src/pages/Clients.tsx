import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import ClientsScene from "@/components/scenes/ClientsScene";
import { Link } from "react-router-dom";
import {
  AlertTriangle, CheckCircle, Building2, Hospital, Heart,
  TrendingUp, Shield, Clock, ArrowRight
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const problems = [
  { icon: AlertTriangle, problem: "Manual appointment scheduling", solution: "AI-powered smart scheduling with auto-optimization" },
  { icon: AlertTriangle, problem: "Paper-based patient records", solution: "Fully digital, searchable patient management" },
  { icon: AlertTriangle, problem: "Billing errors & delays", solution: "Automated billing with 99.8% accuracy" },
  { icon: AlertTriangle, problem: "Long patient wait times", solution: "AI receptionist reduces wait by 60%" },
];

const useCases = [
  { icon: Building2, title: "Private Clinics", desc: "Streamline daily operations for small to mid-size practices with AI automation.", stats: "40% efficiency boost" },
  { icon: Hospital, title: "Hospitals", desc: "Enterprise-grade solutions for multi-department coordination and patient flow.", stats: "10K+ beds managed" },
  { icon: Heart, title: "Specialty Practices", desc: "Tailored modules for cardiology, dermatology, orthopedics, and more.", stats: "25+ specialties" },
];

const benefits = [
  { icon: TrendingUp, title: "Revenue Growth", value: "+35%", desc: "Average revenue increase within 6 months" },
  { icon: Clock, title: "Time Saved", value: "4hrs/day", desc: "Per provider in administrative tasks" },
  { icon: Shield, title: "Error Reduction", value: "92%", desc: "Fewer billing and documentation errors" },
  { icon: CheckCircle, title: "Patient Satisfaction", value: "96%", desc: "Average patient satisfaction score" },
];

const ClientsPage = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10 pt-16 pb-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">For Healthcare Providers</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            Built for <span className="glow-text">Every Practice</span>
          </h1>
          <p className="text-lg text-muted-foreground">From solo clinics to hospital networks, Healthora adapts to your unique workflow and scales with your growth.</p>
        </motion.div>
        <ClientsScene />
      </div>
    </section>

    {/* Problems vs Solutions */}
    <section className="section-padding">
      <SectionHeading label="Problems We Solve" title="From Challenges to Solutions" description="See how Healthora transforms common healthcare pain points into competitive advantages." />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
        {problems.map((p, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 flex gap-6">
            <div className="flex-shrink-0 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-destructive" />
              </div>
              <div className="w-px h-6 bg-border mx-auto" />
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-destructive font-semibold uppercase mb-1">Problem</div>
                <p className="text-sm text-muted-foreground">{p.problem}</p>
              </div>
              <div>
                <div className="text-xs text-primary font-semibold uppercase mb-1">Solution</div>
                <p className="text-sm">{p.solution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Use Cases */}
    <section className="section-padding">
      <SectionHeading label="Use Cases" title="Trusted Across Healthcare" />
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
        {useCases.map((u, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <u.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{u.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{u.desc}</p>
            <span className="text-sm font-semibold text-primary">{u.stats}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Benefits */}
    <section className="section-padding">
      <SectionHeading label="Benefits" title="Measurable Impact" description="Real results from real healthcare providers using Healthora." />
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {benefits.map((b, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
            <b.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="font-display text-3xl font-bold glow-text mb-1">{b.value}</div>
            <div className="font-semibold text-sm mb-1">{b.title}</div>
            <div className="text-xs text-muted-foreground">{b.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">See It In <span className="glow-text">Action</span></h2>
          <p className="text-muted-foreground">Get a personalized demo tailored to your practice type and workflow.</p>
          <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">Book a Demo <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ClientsPage;
