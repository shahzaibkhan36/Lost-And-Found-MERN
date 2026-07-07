import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiSmile } from "react-icons/fi";
import Layout from "../components/Layout.jsx";

export default function LostFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center px-4 py-10 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>

        <div className="text-center mb-10 mt-8">
          <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl">
            What happened?
          </h1>
          <p className="text-white/80 mt-2">
            Tell us whether you lost something or found something
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <button
            onClick={() => navigate("/report/lost")}
            className="glass-card p-8 flex flex-col items-center gap-4 hover:bg-white/12 hover:-translate-y-1 transition group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-cyan/80 to-brand-cyan/40 flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-105 transition">
              <FiSearch />
            </div>
            <div>
              <p className="text-white font-bold text-xl">I Lost Something</p>
              <p className="text-white/70 text-sm mt-1">
                Report a lost item and let the community help you find it
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/report/found")}
            className="glass-card p-8 flex flex-col items-center gap-4 hover:bg-white/12 hover:-translate-y-1 transition group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-magenta/80 to-brand-magenta/40 flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-105 transition">
              <FiSmile />
            </div>
            <div>
              <p className="text-white font-bold text-xl">I Found Something</p>
              <p className="text-white/70 text-sm mt-1">
                Report a found item and help reunite it with its owner
              </p>
            </div>
          </button>
        </div>

        <div className="glass-card mt-10 p-4 max-w-2xl w-full flex items-center gap-3">
          <span className="text-yellow-400 text-xl">⚠</span>
          <p className="text-white/85 text-sm">
            Please provide accurate details to help ensure a safe and successful match.
          </p>
        </div>
      </div>
    </Layout>
  );
}
