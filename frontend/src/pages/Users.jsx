import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiMail } from "react-icons/fi";
import Layout from "../components/Layout.jsx";
import api from "../api/axios.js";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users")
      .then(({ data }) => setUsers(data.users))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 lg:py-12 max-w-3xl lg:max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition"
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          <h1 className="gradient-text font-extrabold text-2xl sm:text-3xl">Community</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {users.map((u) => (
              <div key={u._id} className="glass-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {u.photoURL ? (
                    <img src={u.photoURL} alt={u.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FiUser className="text-white/60" size={20} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">{u.name}</p>
                  <p className="text-white/70 text-sm flex items-center gap-1 truncate">
                    <FiMail size={12} /> {u.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
