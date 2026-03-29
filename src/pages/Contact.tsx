import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", type: "demo" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", company: "", message: "", type: "demo" });
  };

  return (
    <Layout>
      <section className="section-padding hero-gradient relative">
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold">
              Let's <span className="glow-text">Connect</span>
            </h1>
            <p className="text-lg text-muted-foreground">Schedule a demo, ask questions, or explore how MedAIPro can transform your practice.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4 grid md:grid-cols-[1fr_1.5fr] gap-10 max-w-5xl">
          {/* Info */}
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: "hello@medaipro.com" },
                  { icon: Phone, label: "Phone", value: "+1 (888) 555-0123" },
                  { icon: MapPin, label: "Office", value: "San Francisco, CA" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{c.label}</div>
                      <div className="text-sm font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h4 className="font-display font-semibold">Book a Demo</h4>
              </div>
              <p className="text-sm text-muted-foreground">Get a personalized 30-minute walkthrough of the platform tailored to your practice.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="flex gap-3">
                {(["demo", "general", "support"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                      form.type === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "demo" ? "Book Demo" : t === "general" ? "General Inquiry" : "Support"}
                  </button>
                ))}
              </div>
              {[
                { name: "name" as const, label: "Full Name", placeholder: "John Doe" },
                { name: "email" as const, label: "Email", placeholder: "john@clinic.com", type: "email" },
                { name: "company" as const, label: "Organization", placeholder: "Your clinic or hospital" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{f.label}</label>
                  <input
                    required
                    type={f.type || "text"}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your needs..."
                  rows={4}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-primary-glow w-full inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
