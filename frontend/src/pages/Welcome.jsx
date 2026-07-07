import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiZap, FiShield, FiSearch, FiBell, FiLock } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function InfoPill({ icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-white text-sm">
      {icon}
      {label}
    </div>
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center px-4 py-10 lg:py-16">
        <div className="glass-card w-full max-w-2xl lg:max-w-4xl p-6 sm:p-10 lg:p-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-brand-cyan text-sm font-medium">
            <HiOutlineSparkles /> Welcome back
          </div>
          <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl tracking-tight">
            Hi, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-white/80 mt-3 mb-8 max-w-md mx-auto">
            Ready to reconnect with what matters? Report an item, browse the community
            board, or manage what you've already posted.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <InfoPill icon={<FiShield />} label="Secure & Trusted" />
            <InfoPill icon={<FiZap />} label="Lightning Fast" />
            <InfoPill icon={<FiLock />} label="Privacy First" />
          </div>

          <button
            onClick={() => navigate("/lost-found")}
            className="btn-gradient px-8 py-4 flex items-center gap-3 text-lg mx-auto"
          >
            Report Lost / Found Item
            <FiArrowRight />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-left">
            <button
              onClick={() => navigate("/report-list")}
              className="glass-card p-4 hover:bg-white/12 transition text-white"
            >
              <FiSearch className="text-brand-cyan mb-2" size={22} />
              <p className="font-bold">Browse Reports</p>
              <p className="text-white/70 text-sm">Search lost & found listings</p>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="glass-card p-4 hover:bg-white/12 transition text-white"
            >
              <FiBell className="text-brand-magenta mb-2" size={22} />
              <p className="font-bold">My Reports</p>
              <p className="text-white/70 text-sm">Manage what you've posted</p>
            </button>
            <button
              onClick={() => navigate("/users")}
              className="glass-card p-4 hover:bg-white/12 transition text-white"
            >
              <FiShield className="text-brand-cyan mb-2" size={22} />
              <p className="font-bold">Community</p>
              <p className="text-white/70 text-sm">See who's part of Lost & Found</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
