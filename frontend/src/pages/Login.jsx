import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import FormField from "../components/FormField.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/welcome");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
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
            Login
          </h1>
          <p className="text-white/70 font-light text-center mt-2 mb-8">
            Access your account to continue
          </p>

          <div className="space-y-5">
            <FormField
              label="Email"
              icon={<FiMail />}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              label="Password"
              icon={<FiLock />}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
          </div>

          {error && <p className="text-danger font-medium text-sm mt-4">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient py-4 px-8 flex items-center justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
            <Link to="/register" className="btn-ghost py-4 px-8 text-center">
              Sign Up
            </Link>
          </div>

          <div className="text-center mt-5">
            <Link
              to="/forgot-password"
              className="text-white/70 font-medium underline hover:text-white transition"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
