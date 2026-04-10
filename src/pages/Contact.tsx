import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { usePageSEO } from "@/hooks/use-page-seo";
import Layout from "@/components/Layout";
import ContactScene from "@/components/scenes/ContactScene";
import HeartbeatBg from "@/components/scenes/HeartbeatBg";
import EcosystemBg from "@/components/scenes/EcosystemBg";
import { Mail, Phone, MapPin, Send, Calendar, Globe, Clock, MessageSquare, Handshake, Briefcase, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const PARTNER_TYPES = [
  { value: "Hospital / Medical Centre", label: "Hospital / Medical Centre", desc: "Implement HealthAuras across your facility to improve patient outcomes at scale." },
  { value: "Clinic / Polyclinic", label: "Clinic / Polyclinic", desc: "Automate scheduling, billing & reception for your clinic with AI." },
  { value: "Healthcare Technology Company", label: "Healthcare Technology Company", desc: "Build joint solutions or integrate your product on top of HealthAuras APIs." },
  { value: "Pharmaceutical / Lab Company", label: "Pharmaceutical / Lab Company", desc: "Connect your services and inventory into our healthcare data ecosystem." },
  { value: "Investor / Strategic Partner", label: "Investor / Strategic Partner", desc: "Join us in scaling AI-powered healthcare to clinics and hospitals globally." },
];

const CAREER_ROLES = [
  "Frontend Developer (React / TypeScript)",
  "Backend Developer (Node.js / Python)",
  "AI / ML Engineer",
  "Healthcare Sales Executive",
  "Customer Success Manager",
  "Business Development Manager",
  "UI / UX Designer",
  "Other",
];

type TabType = "demo" | "partner" | "support" | "career";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
  });

const ContactPage = () => {
  usePageSEO({
    title: "Contact HealthAuras — Book a Demo, Partner or Join Our Team",
    description: "Get in touch with HealthAuras for product demos, partnerships, support, or career opportunities. AI Receptionist, Clinic Management & Hospital ERP.",
    keywords: "contact HealthAuras, book demo healthcare software, healthcare partnership, health tech career, clinic software demo, hospital ERP demo, healthauras contact",
    canonical: "https://healthauras.software/contact",
  });

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<TabType>("demo");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", company: "", product: "", message: "",
    partnerType: "", position: "", experience: "", coverLetter: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let attachments: { filename: string; content: string }[] | undefined;
      if (tab === "career" && resumeFile) {
        attachments = [{ filename: resumeFile.name, content: await toBase64(resumeFile) }];
      }

      const subjectMap: Record<TabType, string> = {
        demo: "Demo Request Received — HealthAuras",
        partner: "Partnership Inquiry Received — HealthAuras",
        support: "Support Request Received — HealthAuras",
        career: "Career Application Received — HealthAuras",
      };

      const summaryRows =
        tab === "demo"
          ? `<tr><td style="padding:8px 0;color:#94a3b8;width:140px">Organization:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.company || "Not specified"}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8">Interested In:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.product || "General Platform"}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Message:</td><td style="padding:8px 0;color:#f1f5f9;line-height:1.6">${form.message}</td></tr>`
          : tab === "partner"
          ? `<tr><td style="padding:8px 0;color:#94a3b8;width:140px">Organization:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.company || "Not specified"}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8">Partner Type:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.partnerType}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Message:</td><td style="padding:8px 0;color:#f1f5f9;line-height:1.6">${form.message}</td></tr>`
          : tab === "support"
          ? `<tr><td style="padding:8px 0;color:#94a3b8;width:140px">Organization:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.company || "Not specified"}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Issue:</td><td style="padding:8px 0;color:#f1f5f9;line-height:1.6">${form.message}</td></tr>`
          : `<tr><td style="padding:8px 0;color:#94a3b8;width:140px">Role Applied:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.position}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8">Experience:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${form.experience} years</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Cover Letter:</td><td style="padding:8px 0;color:#f1f5f9;line-height:1.6">${form.coverLetter}</td></tr>
             <tr><td style="padding:8px 0;color:#94a3b8">Resume:</td><td style="padding:8px 0;color:#f1f5f9;font-weight:500">${resumeFile ? resumeFile.name + " (attached)" : "Not provided"}</td></tr>`;

      const html = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#020817;border-radius:16px;overflow:hidden;border:1px solid #1e293b;color:#f8fafc;">
          <div style="background:#064e3b;padding:40px 30px;text-align:center;border-bottom:2px solid #34d399;">
            <h1 style="color:#fff;margin:0;font-size:32px;font-weight:800;">Health<span style="color:#34d399;">Auras</span></h1>
            <p style="color:#6ee7b7;margin-top:8px;font-size:14px;">AI-Powered Healthcare Ecosystem</p>
          </div>
          <div style="padding:40px 30px;background:#0f172a;">
            <h2 style="color:#f8fafc;margin-top:0;font-size:24px;font-weight:600;">Hello ${form.name},</h2>
            <p style="color:#cbd5e1;font-size:16px;line-height:1.7;">Thank you for reaching out! We have received your <strong><span style="color:#34d399;text-transform:capitalize;">${tab}</span></strong> request and our team will respond within 24 hours.</p>
            <div style="background:#1e293b;padding:24px;border-radius:12px;margin:36px 0;border:1px solid #334155;border-left:4px solid #34d399;">
              <h3 style="margin-top:0;color:#f8fafc;font-size:15px;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Your Submission</h3>
              <table style="width:100%;border-collapse:collapse;font-size:15px;">${summaryRows}</table>
            </div>
            <div style="text-align:center;margin-bottom:20px;">
              <a href="https://healthauras.software" style="background:#34d399;color:#020817;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;display:inline-block;">Explore HealthAuras</a>
            </div>
          </div>
          <div style="background:#020817;padding:24px;text-align:center;border-top:1px solid #1e293b;">
            <p style="color:#64748b;font-size:13px;margin:0;line-height:1.5;">© ${new Date().getFullYear()} HealthAuras Software. All rights reserved.<br/>Hyderabad, India</p>
          </div>
        </div>`;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "HealthAuras <hello@healthauras.software>",
          to: [form.email],
          cc: ["hello@healthauras.software", "sourabhverma@healthauras.software"],
          subject: subjectMap[tab],
          html,
          ...(attachments ? { attachments } : {}),
        }),
      });

      if (response.ok) {
        const successMsg: Record<TabType, string> = {
          demo: "Demo booked! We'll confirm your slot within 24 hours.",
          partner: "Partnership inquiry received! Our team will be in touch soon.",
          support: "Support ticket raised! We'll respond within 24 hours.",
          career: "Application received! We'll review your profile and get back to you.",
        };
        toast({ title: "Sent successfully!", description: successMsg[tab] });
        setForm({ name: "", email: "", company: "", product: "", message: "", partnerType: "", position: "", experience: "", coverLetter: "" });
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const err = await response.json();
        toast({ title: "Failed to send", description: err.message || "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network Error", description: "Could not connect to the server.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all";

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
                Schedule a demo, explore a partnership, get support, or join our team — we'd love to hear from you.
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
            {/* ── Info panel ── */}
            <motion.div {...fadeUp} className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail,  label: "Email",  value: "hello@healthauras.software" },
                    { icon: Phone, label: "Phone",  value: "+91 8770508997" },
                    { icon: MapPin,label: "Office", value: "Hyderabad, India" },
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
                <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-emerald-400" /><h4 className="font-display font-semibold">Book a Demo</h4></div>
                <p className="text-sm text-muted-foreground">Get a personalised 30-minute walkthrough of the platform tailored to your practice.</p>
              </div>

              <div className="glass-card p-6 space-y-3">
                <div className="flex items-center gap-3"><Handshake className="w-5 h-5 text-emerald-400" /><h4 className="font-display font-semibold">Partner with Us</h4></div>
                <p className="text-sm text-muted-foreground">Hospitals, clinics, health-tech companies, pharma labs — let's build healthcare's future together.</p>
              </div>

              <div className="glass-card p-6 space-y-3">
                <div className="flex items-center gap-3"><Briefcase className="w-5 h-5 text-emerald-400" /><h4 className="font-display font-semibold">Join Our Team</h4></div>
                <p className="text-sm text-muted-foreground">We're hiring passionate people who want to transform healthcare with AI. Upload your resume and apply.</p>
              </div>
            </motion.div>

            {/* ── Form ── */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">

                {/* Tab bar */}
                <div className="flex flex-wrap gap-2">
                  {([
                    { key: "demo",    label: "Book Demo" },
                    { key: "partner", label: "Partner"   },
                    { key: "support", label: "Support"   },
                    { key: "career",  label: "Career"    },
                  ] as { key: TabType; label: string }[]).map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTab(key)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        tab === key ? "bg-emerald-400 text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* ── Common: Name + Email ── */}
                {[
                  { name: "name"  as const, label: "Full Name",  placeholder: "John Doe" },
                  { name: "email" as const, label: "Email",      placeholder: "john@clinic.com", type: "email" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{f.label}</label>
                    <input required type={f.type || "text"} value={form[f.name]} onChange={set(f.name)}
                      placeholder={f.placeholder} className={inputCls} />
                  </div>
                ))}

                {/* ── DEMO fields ── */}
                {tab === "demo" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Organization</label>
                      <input required value={form.company} onChange={set("company")} placeholder="Your clinic or hospital" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Interested In</label>
                      <select required value={form.product} onChange={set("product")} className={inputCls + " appearance-none"}>
                        <option value="" disabled>Select a product…</option>
                        <option>AI Receptionist</option>
                        <option>Clinic Management System</option>
                        <option>Hospital ERP System</option>
                        <option>Custom AI Add-ons</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Message</label>
                      <textarea required value={form.message} onChange={set("message")} placeholder="Tell us about your needs…" rows={4} className={inputCls + " resize-none"} />
                    </div>
                  </>
                )}

                {/* ── PARTNER fields ── */}
                {tab === "partner" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Organization Name</label>
                      <input required value={form.company} onChange={set("company")} placeholder="Your company or hospital name" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Partnership Type</label>
                      <select required value={form.partnerType} onChange={set("partnerType")} className={inputCls + " appearance-none"}>
                        <option value="" disabled>Select how you'd like to collaborate…</option>
                        {PARTNER_TYPES.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                      {form.partnerType && (
                        <p className="text-xs text-emerald-400/80 mt-1.5 leading-relaxed">
                          {PARTNER_TYPES.find((p) => p.value === form.partnerType)?.desc}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Tell us about the collaboration</label>
                      <textarea required value={form.message} onChange={set("message")} rows={4}
                        placeholder="Describe what you're looking to build or integrate with HealthAuras…" className={inputCls + " resize-none"} />
                    </div>
                  </>
                )}

                {/* ── SUPPORT fields ── */}
                {tab === "support" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Organization</label>
                      <input value={form.company} onChange={set("company")} placeholder="Your clinic or hospital" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Describe the issue</label>
                      <textarea required value={form.message} onChange={set("message")} rows={5}
                        placeholder="Explain the issue in detail — steps to reproduce, screenshots info, etc." className={inputCls + " resize-none"} />
                    </div>
                  </>
                )}

                {/* ── CAREER fields ── */}
                {tab === "career" && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Role You're Applying For</label>
                      <select required value={form.position} onChange={set("position")} className={inputCls + " appearance-none"}>
                        <option value="" disabled>Select a position…</option>
                        {CAREER_ROLES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Years of Experience</label>
                      <input required type="number" min={0} max={40} value={form.experience} onChange={set("experience")}
                        placeholder="e.g. 3" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Cover Letter / Why HealthAuras?</label>
                      <textarea required value={form.coverLetter} onChange={set("coverLetter")} rows={4}
                        placeholder="Tell us why you want to work with us and what you'll bring to the team…" className={inputCls + " resize-none"} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Resume / CV <span className="text-muted-foreground/50">(PDF or DOC, max 5 MB)</span></label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer w-full border-2 border-dashed border-border hover:border-emerald-400/50 rounded-lg px-4 py-6 flex flex-col items-center gap-2 transition-colors bg-secondary/30"
                      >
                        <Upload className="w-6 h-6 text-emerald-400" />
                        <span className="text-sm text-muted-foreground">
                          {resumeFile ? resumeFile.name : "Click to upload your resume"}
                        </span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f && f.size <= 5 * 1024 * 1024) setResumeFile(f);
                          else if (f) toast({ title: "File too large", description: "Please upload a file smaller than 5 MB.", variant: "destructive" });
                        }}
                      />
                    </div>
                  </>
                )}

                <button type="submit" disabled={loading} className="btn-primary-glow w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {loading ? "Sending…" : tab === "career" ? "Submit Application" : tab === "partner" ? "Send Partnership Request" : "Send Message"}
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
              { icon: Clock,        title: "24hr Response",      desc: "Our team responds to every inquiry within 24 hours — guaranteed." },
              { icon: Globe,        title: "Global Support",     desc: "Available worldwide with localized support across time zones." },
              { icon: MessageSquare,title: "Dedicated Success",  desc: "Every client gets a dedicated success manager from day one." },
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
