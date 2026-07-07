import { useNavigate } from "react-router-dom";
import { FiSearch, FiZap, FiUsers, FiArrowRight, FiShield } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiThumbsUp } from "react-icons/fi";
import Layout from "../components/Layout.jsx";

function FeatureIcon({ icon, label, color }) {
  return (
    <div className="flex flex-col items-center gap-3 animate-floaty">
      <div
        className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `linear-gradient(to bottom right, ${color}cc, ${color}80)`,
          boxShadow: `0 10px 25px ${color}55`,
        }}
      >
        <span className="text-white text-3xl lg:text-4xl">{icon}</span>
      </div>
      <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">{label}</span>
    </div>
  );
}

function Highlight({ icon, title, desc }) {
  return (
    <div className="glass-card p-4 lg:p-6 flex items-center lg:flex-col lg:text-center gap-4 lg:gap-3 w-full h-full">
      <div className="bg-navy-700/60 border border-white/20 rounded-xl p-3 text-white text-xl shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white font-bold">{title}</p>
        <p className="text-white/85 text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* ambient gradient blobs */}
        <div className="absolute -top-10 -right-16 w-52 h-52 rounded-full bg-brand-cyan/10 blur-2xl pointer-events-none" />
        <div className="absolute top-72 -left-10 w-40 h-40 rounded-full bg-brand-magenta/10 blur-2xl pointer-events-none" />

        <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24 flex flex-col items-center text-center gap-10 lg:gap-14">
          <div>
            <h1 className="gradient-text font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight">
              Lost &amp; Found
            </h1>
            <p className="text-white/90 font-light text-lg sm:text-xl lg:text-2xl mt-3 tracking-wide">
              Reconnect with What Matters
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <FeatureIcon icon={<FiSearch />} label="Report Lost" color="#00DBDE" />
            <div className="h-0.5 w-8 bg-gradient-to-r from-brand-cyan/50 via-white/80 to-brand-magenta/50" />
            <FeatureIcon icon={<HiOutlineSparkles />} label="Find & Match" color="#FC00FF" />
            <div className="h-0.5 w-8 bg-gradient-to-r from-brand-cyan/50 via-white/80 to-brand-magenta/50" />
            <FeatureIcon icon={<FiThumbsUp />} label="Reunite" color="#00DBDE" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-md lg:max-w-4xl">
            <Highlight
              icon={<FiShield />}
              title="Secure & Trusted"
              desc="Your data is protected with enterprise-grade security"
            />
            <Highlight
              icon={<FiZap />}
              title="Lightning Fast"
              desc="Smart matching finds items in seconds"
            />
            <Highlight
              icon={<FiUsers />}
              title="Community Driven"
              desc="Join thousands helping each other find lost belongings"
            />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="btn-gradient px-8 py-4 flex items-center gap-3 text-lg"
          >
            Get Started
            <span className="bg-white/20 rounded-full p-1.5">
              <FiArrowRight />
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
