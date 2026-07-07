import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiX,
  FiMapPin,
  FiUser,
  FiPhone,
  FiImage,
  FiCheckCircle,
} from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function ReportCard({ report, onClaim, claiming, currentUserId }) {
  const isOwner = report.userId?._id === currentUserId;
  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
        {report.imageUrl ? (
          <img src={report.imageUrl} alt={report.item} className="w-full h-full object-cover" />
        ) : (
          <FiImage className="text-white/40" size={28} />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className={`inline-block text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1 ${
                report.type === "lost"
                  ? "bg-brand-cyan/20 text-brand-cyan"
                  : "bg-brand-magenta/20 text-brand-magenta"
              }`}
            >
              {report.type}
            </span>
            <p className="text-white font-bold text-lg leading-tight">{report.item}</p>
          </div>
          {report.isClaimed && (
            <span className="flex items-center gap-1 text-green-400 text-sm font-medium shrink-0">
              <FiCheckCircle /> Claimed
            </span>
          )}
        </div>

        <p className="text-white/75 text-sm mt-1 line-clamp-2">{report.description}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/70 text-sm">
          <span className="flex items-center gap-1">
            <FiMapPin size={14} /> {report.location}
          </span>
          <span className="flex items-center gap-1">
            <FiUser size={14} /> {report.name}
          </span>
          <span className="flex items-center gap-1">
            <FiPhone size={14} /> {report.contact}
          </span>
        </div>

        {!report.isClaimed && !isOwner && (
          <button
            onClick={() => onClaim(report._id)}
            disabled={claiming === report._id}
            className="btn-gradient mt-3 self-start px-5 py-2 text-sm"
          >
            {claiming === report._id ? "Claiming..." : "Claim This Item"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReportList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | lost | found
  const [claiming, setClaiming] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter !== "all") params.type = filter;
      if (search) params.search = search;
      const { data } = await api.get("/reports", { params });
      setReports(data.reports);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchReports, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filter]);

  const handleClaim = async (id) => {
    setClaiming(id);
    try {
      await api.put(`/reports/${id}/claim`);
      fetchReports();
    } catch (err) {
      setError(err.response?.data?.message || "Claim failed.");
    } finally {
      setClaiming(null);
    }
  };

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 relative max-w-3xl lg:max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition shrink-0"
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl">Report List</h1>
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="glass-input pl-11 pr-11"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "lost", "found"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition ${
                filter === f
                  ? "btn-gradient"
                  : "bg-white/10 border border-white/20 text-white/80 hover:bg-white/15"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {error && <p className="text-danger font-medium text-sm mb-4">{error}</p>}

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card p-10 text-center text-white/70">
            No reports found. Try a different search or filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
            {reports.map((r) => (
              <ReportCard
                key={r._id}
                report={r}
                onClaim={handleClaim}
                claiming={claiming}
                currentUserId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
