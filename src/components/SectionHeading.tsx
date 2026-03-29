import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ label, title, description }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-3xl mx-auto mb-16"
  >
    {label && (
      <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5">
        {label}
      </span>
    )}
    <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">{title}</h2>
    {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
  </motion.div>
);

export default SectionHeading;
