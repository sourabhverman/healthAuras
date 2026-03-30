import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PartnersScene from "@/components/scenes/PartnersScene";
import DataFlowBg from "@/components/scenes/DataFlowBg";
import NeuralNetworkBg from "@/components/scenes/NeuralNetworkBg";
import SpineFlowBg from "@/components/scenes/SpineFlowBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import { Link } from "react-router-dom";
import {
  FlaskConical, Microscope, Plug, Database, Cloud, Lock,
  ArrowRight, Code2, Globe, Handshake, Building, Cpu
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const PartnersPage = () => (
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
              Partner Ecosystem
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
              Integrated <span className="glow-text">Ecosystem</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Connect with industry-leading platforms and extend your capabilities through our robust partner network.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products" className="btn-outline-glow">
                Explore Platform
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <PartnersScene />
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── INDUSTRY INTEGRATIONS ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <DataFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Partners
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Industry <span className="glow-text">Integrations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We partner with the best in healthcare technology to provide seamless interoperability.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: FlaskConical, title: "Pharmaceutical", desc: "Integration with major pharma databases for drug interaction checks and prescription validation." },
            { icon: Microscope, title: "Laboratories", desc: "Direct lab result feeds with automated analysis and patient notification systems." },
            { icon: Database, title: "EHR Systems", desc: "Seamless connectivity with Epic, Cerner, Allscripts, and other major EHR platforms." },
            { icon: Cloud, title: "Cloud Providers", desc: "HIPAA-compliant hosting on AWS, Azure, and Google Cloud with 99.99% uptime." },
          ].map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 flex gap-6 items-start group">
              <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-400/15 transition-colors">
                <p.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── API PLATFORM ─── */}
    <section className="relative min-h-screen flex items-center py-24">
      <NeuralNetworkBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            API Platform
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Developer-First <span className="glow-text">Integration</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Build custom integrations with our comprehensive API platform.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Code2, title: "RESTful API", desc: "Clean, well-documented REST endpoints for all platform features." },
            { icon: Plug, title: "Webhooks", desc: "Real-time event notifications for appointment changes, results, and alerts." },
            { icon: Lock, title: "OAuth 2.0", desc: "Industry-standard authentication with fine-grained permission controls." },
            { icon: Database, title: "FHIR Standard", desc: "Full HL7 FHIR R4 compliance for healthcare data interoperability." },
          ].map((f, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 text-center group">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-400/15 transition-colors">
                <f.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── PARTNERSHIP TYPES ─── */}
    <section className="relative min-h-[70vh] flex items-center py-24">
      <SpineFlowBg />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
            Collaboration
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Ways to <span className="glow-text">Partner</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Handshake, title: "Strategic Partners", desc: "Co-develop solutions and go-to-market strategies for healthcare innovation." },
            { icon: Cpu, title: "Technology Partners", desc: "Integrate your technology stack with our platform for enhanced capabilities." },
            { icon: Building, title: "Channel Partners", desc: "Resell and distribute Healthora solutions to your healthcare network." },
          ].map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center group">
              <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-400/15 transition-colors">
                <p.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
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
            Become a <span className="glow-text">Partner</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Join our partner ecosystem and help shape the future of healthcare technology.
          </p>
          <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">
            Partner With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default PartnersPage;
