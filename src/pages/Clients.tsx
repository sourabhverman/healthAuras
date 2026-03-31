import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ClientsScene from "@/components/scenes/ClientsScene";
import NeuralNetworkBg from "@/components/scenes/NeuralNetworkBg";
import SpineFlowBg from "@/components/scenes/SpineFlowBg";
import HeartbeatBg from "@/components/scenes/HeartbeatBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import { Link } from "react-router-dom";
import {
  AlertTriangle, CheckCircle, CheckCircle2, Building2, Hospital, Heart,
  TrendingUp, Shield, Clock, ArrowRight, Users, Stethoscope, Award
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ClientsPage = () => (
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
              For Healthcare Providers
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
              Built for <span className="glow-text">Every Practice</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              From solo clinics to hospital networks, Healthora adapts to your unique workflow and scales with your growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow">
                View Solutions
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <ClientsScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── PROBLEMS VS SOLUTIONS ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <NeuralNetworkBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Problems We Solve
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            From Challenges to <span className="glow-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">See how HealthAura transforms common healthcare pain points into competitive advantages.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { problem: "Manual appointment scheduling", solution: "AI-powered smart scheduling with auto-optimization" },
            { problem: "Paper-based patient records", solution: "Fully digital, searchable patient management" },
            { problem: "Billing errors & delays", solution: "Automated billing with 99.8% accuracy" },
            { problem: "Long patient wait times", solution: "AI receptionist reduces wait by 60%" },
          ].map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 flex gap-6">
              <div className="flex-shrink-0 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="w-px h-6 bg-border mx-auto" />
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-destructive font-semibold uppercase mb-1">Problem</div>
                  <p className="text-sm text-muted-foreground">{p.problem}</p>
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase mb-1">Solution</div>
                  <p className="text-sm">{p.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── USE CASES ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <SpineFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Use Cases
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Trusted Across <span className="glow-text">Healthcare</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Building2, title: "Private Clinics", desc: "Streamline daily operations for small to mid-size practices with AI automation.", stats: "40% efficiency boost" },
            { icon: Hospital, title: "Hospitals", desc: "Enterprise-grade solutions for multi-department coordination and patient flow.", stats: "10K+ beds managed" },
            { icon: Heart, title: "Specialty Practices", desc: "Tailored modules for cardiology, dermatology, orthopedics, and more.", stats: "25+ specialties" },
          ].map((u, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-400/15 transition-colors">
                <u.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{u.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{u.desc}</p>
              <span className="text-sm font-semibold text-emerald-400">{u.stats}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── MEASURABLE IMPACT ─── */}
    <section className="relative min-h-[70vh] flex items-center py-24">
      <HeartbeatBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Benefits
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Measurable <span className="glow-text">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real results from real healthcare providers using HealthAura.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, value: "+35%", title: "Revenue Growth", desc: "Average increase within 6 months" },
            { icon: Clock, value: "4hrs/day", title: "Time Saved", desc: "Per provider in admin tasks" },
            { icon: Shield, value: "92%", title: "Error Reduction", desc: "Fewer billing & doc errors" },
            { icon: CheckCircle2, value: "96%", title: "Patient Satisfaction", desc: "Average satisfaction score" },
          ].map((b, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
              <b.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="font-display text-3xl font-bold glow-text mb-1">{b.value}</div>
              <div className="font-semibold text-sm mb-1">{b.title}</div>
              <div className="text-xs text-muted-foreground">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="relative py-24">
      <EcosystemBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 md:p-16 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            See It In <span className="glow-text">Action</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Get a personalized demo tailored to your practice type and workflow.
          </p>
          <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
            Book a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ClientsPage;
