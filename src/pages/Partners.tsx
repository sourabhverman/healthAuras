import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import PartnersScene from "@/components/scenes/PartnersScene";
import { Link } from "react-router-dom";
import { FlaskConical, Microscope, Plug, Database, Cloud, Lock, ArrowRight, Code2 } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const partners = [
  { icon: FlaskConical, title: "Pharmaceutical", desc: "Integration with major pharma databases for drug interaction checks and prescription validation." },
  { icon: Microscope, title: "Laboratories", desc: "Direct lab result feeds with automated analysis and patient notification systems." },
  { icon: Database, title: "EHR Systems", desc: "Seamless connectivity with Epic, Cerner, Allscripts, and other major EHR platforms." },
  { icon: Cloud, title: "Cloud Providers", desc: "HIPAA-compliant hosting on AWS, Azure, and Google Cloud with 99.99% uptime." },
];

const apiFeatures = [
  { icon: Code2, title: "RESTful API", desc: "Clean, well-documented REST endpoints for all platform features." },
  { icon: Plug, title: "Webhooks", desc: "Real-time event notifications for appointment changes, results, and alerts." },
  { icon: Lock, title: "OAuth 2.0", desc: "Industry-standard authentication with fine-grained permission controls." },
  { icon: Database, title: "FHIR Standard", desc: "Full HL7 FHIR R4 compliance for healthcare data interoperability." },
];

const PartnersPage = () => (
  <Layout>
    <section className="hero-gradient relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="container mx-auto px-4 relative z-10 pt-16 pb-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">Partner Ecosystem</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            Integrated <span className="glow-text">Ecosystem</span>
          </h1>
          <p className="text-lg text-muted-foreground">Connect with industry-leading platforms and extend your capabilities through our robust partner network.</p>
        </motion.div>
        <PartnersScene />
      </div>
    </section>

    <section className="section-padding">
      <SectionHeading label="Partners" title="Industry Integrations" description="We partner with the best in healthcare technology to provide seamless interoperability." />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
        {partners.map((p, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 flex gap-6 items-start group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <p.icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding">
      <SectionHeading label="API Platform" title="Developer-First Integration" description="Build custom integrations with our comprehensive API platform." />
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apiFeatures.map((f, i) => (
          <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="glass-card glow-border p-12 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Become a <span className="glow-text">Partner</span></h2>
          <p className="text-muted-foreground">Join our partner ecosystem and help shape the future of healthcare technology.</p>
          <Link to="/contact" className="btn-primary-glow inline-flex items-center gap-2">Partner With Us <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default PartnersPage;
