import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Layout from "../components/Layout.jsx";
import DeveloperCard from "../components/DeveloperCard.jsx";
import shahzaibPhoto from "../assets/team/shahzaib.jpg";
import mohsinPhoto from "../assets/team/mohsin.jpg";
import malikPhoto from "../assets/team/malik.jpg";

const FLUTTER_REPO = "https://github.com/shahzaibkhan36/LostAndFoundApp.git";

const developers = [
  {
    photo: shahzaibPhoto,
    name: "Shahzaib Khan",
    role: "MERN Stack Developer",
    description:
      "Built this full MERN stack web version of the project — the Node/Express/MongoDB API and the React frontend you're using right now.",
    links: {
      email: "shahzaibkhan3855@gmail.com",
      whatsapp: "923343943555",
      github: "https://github.com/shahzaibkhan36",
      linkedin: "http://linkedin.com/in/shahzaibkhan36",
      portfolio: "https://shahzaib-portfolio-beige.vercel.app/",
    },
  },
  {
    photo: mohsinPhoto,
    name: "Mohsin Khan",
    role: "Flutter UI Designer",
    description:
      "Designed the original mobile app's UI/UX in Figma/Canva and implemented the Flutter frontend for the Lost & Found mobile app.",
    links: {
      email: "mohsin.codes1@gmail.com",
      whatsapp: "923118892269",
      github: "https://github.com/mohsin-khann",
      linkedin: "https://www.linkedin.com/in/mohsin-afridi-75655b210",
      portfolio: "https://mohsin-khan-portofolio.vercel.app/",
    },
  },
  {
    photo: malikPhoto,
    name: "Malik Iatazaz Altaf",
    role: "Flutter Backend Developer",
    description:
      "Built the backend of the original Flutter mobile app — authentication, Firebase integration, and data handling for reports.",
    links: {
      email: "malikiatazazaltaf@gmail.com",
      whatsapp: "923225075905",
      github: "https://github.com/MalikIatazazAltaf",
      linkedin: "https://www.linkedin.com/in/malik-iatazaz-altaf-aa1a692ba",
      portfolio: "https://malik-iatazaz-altaf.lovable.app/",
    },
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition shrink-0"
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl lg:text-4xl">
            About This Project
          </h1>
        </div>

        <div className="glass-card p-6 sm:p-8 mb-10">
          <p className="text-white/85 leading-relaxed">
            Lost &amp; Found started as a Final Year Project: a mobile app built in{" "}
            <span className="text-white font-semibold">Flutter</span>, designed to help
            people report and reconnect with lost or found belongings within their
            community. This website is a full{" "}
            <span className="text-white font-semibold">MERN stack</span> (MongoDB,
            Express, React, Node.js) rebuild of that original app — same idea, same
            look and feel, now as a fast, responsive web platform.
          </p>
          <a
            href={FLUTTER_REPO}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/15 transition"
          >
            <FaGithub size={18} />
            View the original Flutter mobile app on GitHub
          </a>
          <p className="text-white/50 text-xs mt-2">
            The mobile app was designed and built by Mohsin Khan and Malik Iatazaz Altaf.
          </p>
        </div>

        <h2 className="text-white font-bold text-xl sm:text-2xl mb-6 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {developers.map((dev) => (
            <DeveloperCard key={dev.name} {...dev} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
