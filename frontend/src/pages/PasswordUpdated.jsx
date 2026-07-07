import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import Layout from "../components/Layout.jsx";

export default function PasswordUpdated() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="glass-card w-full max-w-[460px] p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center mx-auto mb-5">
            <FiCheckCircle className="text-green-400" size={32} />
          </div>
          <h1 className="gradient-text font-extrabold text-3xl tracking-tight">
            Password Updated!
          </h1>
          <p className="text-white/70 font-light mt-2 mb-8">
            Your password has been changed successfully. You can now sign in with your new password.
          </p>
          <button onClick={() => navigate("/login")} className="btn-gradient w-full py-4">
            Back to Login
          </button>
        </div>
      </div>
    </Layout>
  );
}
