import { motion } from "framer-motion";
import { useState } from "react";
import { usePageSEO } from "@/hooks/use-page-seo";
import Layout from "@/components/Layout";
import ContactScene from "@/components/scenes/ContactScene";
import HeartbeatBg from "@/components/scenes/HeartbeatBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import { Mail, Phone, MapPin, Send, Calendar, ArrowRight, Globe, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const ContactPage = () => {
  usePageSEO({
    title: "Contact HealthAuras — Book a Demo or Talk to Our Team",
    description: "Get in touch with HealthAuras for product demos, pricing, or support. Talk to our team about AI Receptionist, Clinic Management, or Hospital ERP solutions.",
    keywords: "contact HealthAuras, book demo healthcare software, clinic software demo, hospital ERP demo, healthcare AI support, healthauras contact",
    canonical: "https://healthauras.software/contact",
  });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", product: "", message: "", type: "demo" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // NOTE: We are now calling our secure Cloudflare Pages Function endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "HealthAuras <hello@healthauras.software>",
          to: [form.email],
          cc: ["hello@healthauras.software", "sourabhverma@healthauras.software"],
          subject: `Thank you for contacting HealthAuras - Request Received`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #020817; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b; color: #f8fafc;">
              <div style="background-color: #064e3b; padding: 40px 30px; text-align: center; border-bottom: 2px solid #34d399; position: relative; overflow: hidden;">
                <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: -0.5px; font-weight: 800;">Health<span style="color: #34d399;">Auras</span></h1>
                <p style="color: #6ee7b7; margin-top: 8px; font-size: 14px; opacity: 0.9;">AI-Powered Healthcare Ecosystem</p>
              </div>
              
              <div style="padding: 40px 30px; background-color: #0f172a;">
                <h2 style="color: #f8fafc; margin-top: 0; font-size: 24px; font-weight: 600;">Hello ${form.name},</h2>
                <p style="color: #cbd5e1; font-size: 16px; line-height: 1.7;">Thank you for getting in touch! We have successfully received your <strong><span style="color: #34d399; text-transform: capitalize;">${form.type}</span></strong> inquiry.</p>
                <p style="color: #cbd5e1; font-size: 16px; line-height: 1.7;">Our dedicated healthcare success team is currently reviewing your details. We guarantee a response within 24 hours.</p>
                
                <div style="background-color: #1e293b; padding: 24px; border-radius: 12px; margin: 36px 0; border: 1px solid #334155; border-left: 4px solid #34d399;">
                  <h3 style="margin-top: 0; color: #f8fafc; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Summary of Your Request</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; width: 140px; font-size: 15px;">Organization:</td>
                      <td style="padding: 8px 0; color: #f1f5f9; font-weight: 500; font-size: 15px;">${form.company || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 15px;">Interested In:</td>
                      <td style="padding: 8px 0; color: #f1f5f9; font-weight: 500; font-size: 15px;">${form.product || 'General Platform'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 15px; vertical-align: top;">Message:</td>
                      <td style="padding: 8px 0; color: #f1f5f9; font-weight: 400; font-size: 15px; line-height: 1.6;">${form.message}</td>
                    </tr>
                  </table>
                </div>
                
                <p style="color: #cbd5e1; font-size: 16px; line-height: 1.7; margin-bottom: 40px;">If you have any immediate questions, please feel free to reply directly to this email.</p>
                
                <div style="text-align: center; margin-bottom: 20px;">
                  <a href="https://healthauras.software" style="background-color: #34d399; color: #020817; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; transition: all 0.2s;">Explore HealthAuras</a>
                </div>
              </div>
              
              <div style="background-color: #020817; padding: 24px; text-align: center; border-top: 1px solid #1e293b;">
                <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.5;">© ${new Date().getFullYear()} HealthAuras Software. All rights reserved.<br/>Indore, MP, India</p>
              </div>
            </div>
          `
        })
      });

      if (response.ok) {
        toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
        setForm({ name: "", email: "", company: "", product: "", message: "", type: "demo" });
      } else {
        const errorData = await response.json();
        toast({ title: "Failed to send", description: errorData.message || "Please try again later.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Could not connect to the server. Check your connection or API configuration.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
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
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
                Let's <span className="glow-text">Connect</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
                Schedule a demo, ask questions, or explore how HealthAuras can transform your practice.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}>
              <ContactScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM + INFO ─── */}
      <section className="relative min-h-screen flex items-center py-24">
        <HeartbeatBg />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div {...fadeUp} className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "hello@healthauras.software" },
                    { icon: Phone, label: "Phone", value: "+91 8770508997" },
                    { icon: MapPin, label: "Office", value: "Indore, MP" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0">
                        <c.icon className="w-5 h-5 text-emerald-400" />
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
                  <Calendar className="w-5 h-5 text-emerald-400" />
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
                        form.type === t ? "bg-emerald-400 text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
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
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
                    />
                  </div>
                ))}
                
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Interested In</label>
                  <select
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a product...</option>
                    <option value="AI Receptionist">AI Receptionist</option>
                    <option value="Clinic Management System">Clinic Management System</option>
                    <option value="Hospital ERP System">Hospital ERP System</option>
                    <option value="Custom AI Add-ons">Custom AI Add-ons</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your needs..."
                    rows={4}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary-glow w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY REACH OUT ─── */}
      <section className="relative min-h-[60vh] flex items-center py-24">
        <EcosystemBg />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16 space-y-4">
            <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-emerald-400/80 px-3 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/5">
              Why Connect
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              We're Here to <span className="glow-text">Help</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Clock, title: "24hr Response", desc: "Our team responds to every inquiry within 24 hours — guaranteed." },
              { icon: Globe, title: "Global Support", desc: "Available worldwide with localized support in 15+ languages." },
              { icon: MessageSquare, title: "Dedicated Success", desc: "Every client gets a dedicated success manager from day one." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 text-center group">
                <div className="w-14 h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-400/15 transition-colors">
                  <item.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
