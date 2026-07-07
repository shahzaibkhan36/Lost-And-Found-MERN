import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp, FaGlobe } from "react-icons/fa";
import Layout from "../components/Layout.jsx";
import shahzaibPhoto from "../assets/team/shahzaib.jpg";

const contactLinks = [
  {
    href: "mailto:shahzaibkhan3855@gmail.com",
    label: "Email",
    value: "shahzaibkhan3855@gmail.com",
    icon: <FiMail />,
    color: "#EA4335",
  },
  {
    href: "https://wa.me/923343943555",
    label: "WhatsApp",
    value: "+92 334 3943555",
    icon: <FaWhatsapp />,
    color: "#25D366",
  },
  {
    href: "https://github.com/shahzaibkhan36",
    label: "GitHub",
    value: "github.com/shahzaibkhan36",
    icon: <FaGithub />,
    color: "#333333",
  },
  {
    href: "http://linkedin.com/in/shahzaibkhan36",
    label: "LinkedIn",
    value: "linkedin.com/in/shahzaibkhan36",
    icon: <FaLinkedin />,
    color: "#0A66C2",
  },
  {
    href: "https://shahzaib-portfolio-beige.vercel.app/",
    label: "Portfolio",
    value: "shahzaib-portfolio-beige.vercel.app",
    icon: <FaGlobe />,
    color: "#00B8A9",
  },
];

export default function Contact() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition shrink-0"
              aria-label="Go back"
            >
              <FiArrowLeft />
            </button>
            <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl lg:text-4xl">
              Contact
            </h1>
          </div>

          <div className="glass-card p-6 sm:p-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-lg mb-4">
              <img src={shahzaibPhoto} alt="Shahzaib Khan" className="w-full h-full object-cover" />
            </div>
            <p className="text-white font-bold text-xl">Shahzaib Khan</p>
            <p className="text-brand-cyan text-sm font-semibold mt-1 mb-6">
              MERN Stack Developer
            </p>
            <p className="text-white/75 text-sm max-w-md mb-8">
              Have a question about this project, found a bug, or want to collaborate?
              Reach out through any of the channels below.
            </p>

            <div className="w-full flex flex-col gap-3">
              {contactLinks.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition text-left"
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 shadow-md"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-white/50 text-xs">{c.label}</p>
                    <p className="text-white font-medium truncate">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
