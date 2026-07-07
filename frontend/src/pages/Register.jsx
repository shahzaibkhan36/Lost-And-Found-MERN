import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import FormField from "../components/FormField.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/welcome");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account.");
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

        <form onSubmit={handleSubmit} className="glass-card w-full max-w-[500px] p-6 sm:p-8">
          <h1 className="gradient-text font-extrabold text-3xl tracking-tight text-center">
            Create Account
          </h1>
          <p className="text-white/70 font-light text-center mt-2 mb-8">
            Join the community and start reconnecting
          </p>

          <div className="space-y-5">
            <FormField
              label="Full Name"
              icon={<FiUser />}
              placeholder="Jane Doe"
              value={form.name}
              onChange={update("name")}
              required
            />
            <FormField
              label="Email"
              icon={<FiMail />}
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={update("email")}
              required
            />
            <FormField
              label="Password"
              icon={<FiLock />}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
              required
              suffix={
                <button type="button" onClick={() => setShowPassword((s) => !s)} tabIndex={-1}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
            <FormField
              label="Confirm Password"
              icon={<FiLock />}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.confirm}
              onChange={update("confirm")}
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
              "Sign Up"
            )}
          </button>

          <p className="text-center text-white/70 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
