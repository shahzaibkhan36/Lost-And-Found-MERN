import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLogOut,
  FiImage,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState(false);

  const fetchMyReports = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/reports", { params: { mine: true } });
      setReports(data.reports);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/reports/${id}`);
    setConfirmDeleteId(null);
    fetchMyReports();
  };

  const handleBecomeAdmin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError("");
    setAdminSuccess(false);
    try {
      const { data } = await api.post("/auth/become-admin", { code: adminCode });
      updateUser(data.user);
      setAdminSuccess(true);
      setAdminCode("");
    } catch (err) {
      setAdminError(err.response?.data?.message || "Could not verify admin code.");
    } finally {
      setAdminLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 max-w-3xl lg:max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition"
              aria-label="Go back"
            >
              <FiArrowLeft />
            </button>
            <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl">Profile</h1>
          </div>
          <button
            onClick={() => setConfirmLogout(true)}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>

        <div className="glass-card p-6 flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white font-bold text-xl flex items-center gap-2">
              {user?.name}
              {user?.role === "admin" && (
                <span className="text-[10px] font-bold uppercase bg-brand-magenta/20 text-brand-magenta px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </p>
            <p className="text-white/70 text-sm">{user?.email}</p>
          </div>
        </div>

        {user?.role === "admin" ? (
          <button
            onClick={() => navigate("/admin")}
            className="glass-card p-4 mb-8 w-full flex items-center gap-3 hover:bg-white/12 transition text-left"
          >
            <FiShield className="text-brand-magenta" size={22} />
            <div>
              <p className="text-white font-bold">Open Admin Dashboard</p>
              <p className="text-white/70 text-sm">Manage all users and reports</p>
            </div>
          </button>
        ) : (
          <form onSubmit={handleBecomeAdmin} className="glass-card p-5 mb-8">
            <p className="text-white font-bold flex items-center gap-2 mb-1">
              <FiShield className="text-brand-cyan" /> Become Admin
            </p>
            <p className="text-white/70 text-sm mb-3">
              Have the admin code? Enter it below to unlock the admin dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Admin code"
                className="glass-input flex-1"
                required
              />
              <button
                type="submit"
                disabled={adminLoading}
                className="btn-gradient px-6 py-3 whitespace-nowrap"
              >
                {adminLoading ? "Verifying..." : "Unlock Admin"}
              </button>
            </div>
            {adminError && <p className="text-danger text-sm mt-2">{adminError}</p>}
            {adminSuccess && (
              <p className="text-green-400 text-sm mt-2">You're now an admin! The Admin link is now available in the menu.</p>
            )}
          </form>
        )}

        <h2 className="text-white font-bold text-lg mb-4">My Reports</h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card p-8 text-center text-white/70">
            You haven't reported any items yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
            {reports.map((r) => (
              <div key={r._id} className="glass-card p-4 flex gap-4 relative">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                  {r.imageUrl ? (
                    <img src={r.imageUrl} alt={r.item} className="w-full h-full object-cover" />
                  ) : (
                    <FiImage className="text-brand-blue" />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1 ${
                      r.type === "lost"
                        ? "bg-brand-cyan/20 text-brand-cyan"
                        : "bg-brand-magenta/20 text-brand-magenta"
                    }`}
                  >
                    {r.type} {r.isClaimed ? "· Claimed" : ""}
                  </span>
                  <p className="text-white font-semibold">{r.item}</p>
                  <p className="text-white/70 text-sm flex items-center gap-1 mt-0.5">
                    <FiMapPin size={13} /> {r.location}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setMenuOpenId(menuOpenId === r._id ? null : r._id)}
                    className="text-brand-blue p-1"
                  >
                    <FiMoreVertical />
                  </button>
                  {menuOpenId === r._id && (
                    <div className="absolute right-0 top-8 bg-navy-800 border border-white/15 rounded-lg shadow-xl overflow-hidden z-10 w-32">
                      <button
                        onClick={() => {
                          setMenuOpenId(null);
                          navigate(`/report/${r.type}`, { state: { edit: r } });
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-brand-blue hover:bg-white/10"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpenId(null);
                          setConfirmDeleteId(r._id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/10"
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <p className="font-bold text-navy-900 text-lg mb-2">Confirm Delete</p>
            <p className="text-navy-700/80 text-sm mb-5">
              Are you sure you want to delete this report? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg text-navy-700 font-medium hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmLogout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <p className="font-bold text-navy-900 text-lg mb-2">Confirm Logout</p>
            <p className="text-navy-700/80 text-sm mb-5">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-2 rounded-lg text-navy-700 font-medium hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
