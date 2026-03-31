import { Link } from "react-router-dom";
import healthoraIcon from "@/assets/healthora-icon.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={healthoraIcon} alt="HealthAura" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-lg">Health<span className="text-emerald-400">Aura</span></span>
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
                  <Link to={item.to} className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} HealthAura. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
