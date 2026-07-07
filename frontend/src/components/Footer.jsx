import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="min-h-[60px] px-4 sm:px-6 lg:px-10 py-3 lg:py-4 bg-navy-700 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
      <Link to="/" className="flex items-center gap-2">
        <Logo size={30} />
      </Link>

      <div className="flex items-center gap-3 lg:gap-6 flex-wrap justify-center text-white/70 text-xs lg:text-sm">
        <Link to="/about" className="hover:text-white transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-white transition">
          Contact
        </Link>
        <div className="text-right">
          <p className="text-white text-xs font-bold">Contact</p>
          <p className="text-white/80 text-[10px]">shahzaibkhan3855@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-white/80">
        <a
          href="https://github.com/shahzaibkhan36"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="p-1.5 rounded-full transition hover:scale-110"
          style={{ color: "#8b8b8b" }}
        >
          <FaGithub size={16} />
        </a>
        <a
          href="http://linkedin.com/in/shahzaibkhan36"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="p-1.5 rounded-full transition hover:scale-110"
          style={{ color: "#0A66C2" }}
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href="https://wa.me/923343943555"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="p-1.5 rounded-full transition hover:scale-110"
          style={{ color: "#25D366" }}
        >
          <FaWhatsapp size={17} />
        </a>
      </div>
    </footer>
  );
}
