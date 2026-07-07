import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiArrowLeft } from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import FormField from "../components/FormField.jsx";
import api from "../api/axios.js";

export default function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { email, code, newPassword: password });
      navigate("/password-updated");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 relative flex items-center justify-center px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>

        <form onSubmit={handleSubmit} className="glass-card w-full max-w-[460px] p-6 sm:p-8 text-center">
          <h1 className="gradient-text font-extrabold text-3xl tracking-tight">
            New Password
          </h1>
          <p className="text-white/70 font-light mt-2 mb-8">
            Create a new password for your account
          </p>

          <div className="space-y-5">
            <FormField
              label="New Password"
              icon={<FiLock />}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormField
              label="Confirm Password"
              icon={<FiLock />}
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger font-medium text-sm mt-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full py-4 flex items-center justify-center mt-8"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
