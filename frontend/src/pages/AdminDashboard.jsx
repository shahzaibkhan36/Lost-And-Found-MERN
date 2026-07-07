import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUsers,
  FiList,
  FiSearch,
  FiSmile,
  FiCheckCircle,
  FiShield,
  FiTrash2,
  FiImage,
  FiMapPin,
} from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass-card p-4 lg:p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl shrink-0"
        style={{ background: `linear-gradient(to bottom right, ${color}cc, ${color}80)` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-white font-extrabold text-2xl leading-none">{value ?? "—"}</p>
        <p className="text-white/70 text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState("reports"); // reports | users
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, reportsRes, usersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/reports"),
        api.get("/users"),
      ]);
      setStats(statsRes.data.stats);
      setReports(reportsRes.data.reports);
      setUsers(usersRes.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDeleteReport = async (id) => {
    await api.delete(`/admin/reports/${id}`);
    setReports((r) => r.filter((rep) => rep._id !== id));
    setStats((s) => (s ? { ...s, totalReports: s.totalReports - 1 } : s));
  };

  const handleDeleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers((u) => u.filter((usr) => usr._id !== id));
    setStats((s) => (s ? { ...s, totalUsers: s.totalUsers - 1 } : s));
  };

  const handleToggleRole = async (target) => {
    const newRole = target.role === "admin" ? "user" : "admin";
    await api.put(`/admin/users/${target._id}/role`, { role: newRole });
    setUsers((list) =>
      list.map((u) => (u._id === target._id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 max-w-3xl lg:max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition shrink-0"
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl lg:text-4xl">
            Admin Dashboard
          </h1>
        </div>

        {error && <p className="text-danger font-medium text-sm mb-4">{error}</p>}

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={<FiUsers />} label="Total Users" value={stats?.totalUsers} color="#00DBDE" />
              <StatCard icon={<FiList />} label="Total Reports" value={stats?.totalReports} color="#FC00FF" />
              <StatCard icon={<FiSearch />} label="Lost Items" value={stats?.lostCount} color="#22E5FF" />
              <StatCard icon={<FiSmile />} label="Found Items" value={stats?.foundCount} color="#3E7ACF" />
              <StatCard
                icon={<FiCheckCircle />}
                label="Claimed"
                value={stats?.claimedCount}
                color="#45B7D1"
              />
              <StatCard
                icon={<FiShield />}
                label="Unclaimed"
                value={stats?.unclaimedCount}
                color="#00DBDE"
              />
              <StatCard icon={<FiShield />} label="Admins" value={stats?.adminCount} color="#FC00FF" />
            </div>

            <div className="flex gap-2 mb-6">
              {["reports", "users"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition ${
                    tab === t
                      ? "btn-gradient"
                      : "bg-white/10 border border-white/20 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {t === "reports" ? "All Reports" : "All Users"}
                </button>
              ))}
            </div>

            {tab === "reports" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
                {reports.map((r) => (
                  <div key={r._id} className="glass-card p-4 flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                      {r.imageUrl ? (
                        <img src={r.imageUrl} alt={r.item} className="w-full h-full object-cover" />
                      ) : (
                        <FiImage className="text-white/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1 ${
                          r.type === "lost"
                            ? "bg-brand-cyan/20 text-brand-cyan"
                            : "bg-brand-magenta/20 text-brand-magenta"
                        }`}
                      >
                        {r.type} {r.isClaimed ? "· Claimed" : ""}
                      </span>
                      <p className="text-white font-semibold truncate">{r.item}</p>
                      <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                        <FiMapPin size={12} /> {r.location}
                      </p>
                      <p className="text-white/50 text-xs mt-0.5 truncate">
                        by {r.userId?.name || "Unknown"} · {r.userId?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReport(r._id)}
                      className="text-red-400 hover:text-red-300 p-2 h-fit"
                      aria-label="Delete report"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                {reports.length === 0 && (
                  <p className="text-white/60 col-span-full text-center py-10">No reports yet.</p>
                )}
              </div>
            )}

            {tab === "users" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
                {users.map((u) => (
                  <div key={u._id} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold shrink-0">
                      {u.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate flex items-center gap-2">
                        {u.name}
                        {u.role === "admin" && (
                          <span className="text-[10px] font-bold uppercase bg-brand-magenta/20 text-brand-magenta px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </p>
                      <p className="text-white/60 text-xs truncate">{u.email}</p>
                    </div>
                    {u._id !== user?.id && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleRole(u)}
                          className="btn-ghost px-3 py-1.5 text-xs"
                        >
                          {u.role === "admin" ? "Revoke Admin" : "Make Admin"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-400 hover:text-red-300 p-2"
                          aria-label="Delete user"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
