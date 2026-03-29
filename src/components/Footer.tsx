import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg">MedAI<span className="text-primary">Pro</span></span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transforming healthcare with intelligent AI solutions for clinics, hospitals, and medical practices worldwide.
          </p>
        </div>
        {[
          { title: "Platform", items: [{ to: "/products", label: "Products" }, { to: "/clients", label: "Clients" }, { to: "/partners", label: "Partners" }] },
          { title: "Company", items: [{ to: "/about", label: "About" }, { to: "/contact", label: "Contact" }, { to: "/contact", label: "Careers" }] },
          { title: "Resources", items: [{ to: "/contact", label: "Documentation" }, { to: "/contact", label: "API Reference" }, { to: "/contact", label: "Support" }] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.items.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MedAIPro. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
