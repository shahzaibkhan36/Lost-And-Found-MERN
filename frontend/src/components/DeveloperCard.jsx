import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaGlobe } from "react-icons/fa";

const BRAND_COLORS = {
  email: "#EA4335",
  whatsapp: "#25D366",
  github: "#333333",
  linkedin: "#0A66C2",
  portfolio: "#00B8A9",
};

function IconLink({ href, label, icon, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition hover:scale-110 hover:brightness-110"
      style={{ backgroundColor: color }}
    >
      {icon}
    </a>
  );
}

export default function DeveloperCard({ photo, name, role, description, links }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center h-full">
      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-lg mb-4 shrink-0">
        <img src={photo} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-white font-bold text-lg">{name}</p>
      <p className="text-brand-cyan text-sm font-semibold mt-0.5 mb-3">{role}</p>
      <p className="text-white/75 text-sm leading-relaxed mb-5">{description}</p>

      <div className="flex items-center gap-2.5 mt-auto flex-wrap justify-center">
        {links.email && (
          <IconLink
            href={`mailto:${links.email}`}
            label="Email"
            icon={<FaEnvelope size={15} />}
            color={BRAND_COLORS.email}
          />
        )}
        {links.whatsapp && (
          <IconLink
            href={`https://wa.me/${links.whatsapp}`}
            label="WhatsApp"
            icon={<FaWhatsapp size={17} />}
            color={BRAND_COLORS.whatsapp}
          />
        )}
        {links.github && (
          <IconLink
            href={links.github}
            label="GitHub"
            icon={<FaGithub size={16} />}
            color={BRAND_COLORS.github}
          />
        )}
        {links.linkedin && (
          <IconLink
            href={links.linkedin}
            label="LinkedIn"
            icon={<FaLinkedin size={16} />}
            color={BRAND_COLORS.linkedin}
          />
        )}
        {links.portfolio && (
          <IconLink
            href={links.portfolio}
            label="Portfolio"
            icon={<FaGlobe size={15} />}
            color={BRAND_COLORS.portfolio}
          />
        )}
      </div>
    </div>
  );
}
