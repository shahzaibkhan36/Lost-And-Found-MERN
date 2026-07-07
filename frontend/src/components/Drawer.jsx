import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiStar,
  FiSearch,
  FiList,
  FiUsers,
  FiShield,
  FiUser,
  FiInfo,
  FiMail,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

function DrawerItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-2.5 mx-2 my-0.5 rounded-lg text-black font-medium hover:bg-white/20 transition text-left"
      style={{ width: "calc(100% - 16px)" }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function Drawer({ open, onClose }) {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  const go = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    setConfirmingLogout(false);
    onClose();
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-50 bg-drawer-gradient shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 pb-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1.5 shadow">
                <Logo size={36} />
              </div>
              <div>
                <p className="text-black font-bold text-lg leading-none">FOUND</p>
                <p className="text-black/70 text-[11px]">Discover. Connect. Search.</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close menu" className="text-black/70 p-1">
              <FiX size={22} />
            </button>
          </div>
          <div className="inline-block bg-white/20 rounded px-2.5 py-1">
            <span className="text-black font-bold">Navigation Menu</span>
          </div>
        </div>

        <nav className="py-2">
          <DrawerItem icon={<FiHome />} label="Get Started" onClick={() => go("/")} />
          {!isLoggedIn && (
            <>
              <DrawerItem icon={<FiLogIn />} label="Login" onClick={() => go("/login")} />
              <DrawerItem icon={<FiUserPlus />} label="Register" onClick={() => go("/register")} />
            </>
          )}
          {isLoggedIn && (
            <>
              <DrawerItem icon={<FiStar />} label="Welcome" onClick={() => go("/welcome")} />
              <DrawerItem icon={<FiSearch />} label="Lost & Found" onClick={() => go("/lost-found")} />
              <DrawerItem icon={<FiList />} label="Report List" onClick={() => go("/report-list")} />
              <DrawerItem icon={<FiUsers />} label="Users" onClick={() => go("/users")} />
              {user?.role === "admin" && (
                <DrawerItem icon={<FiShield />} label="Admin Dashboard" onClick={() => go("/admin")} />
              )}
              <DrawerItem icon={<FiUser />} label="Profile" onClick={() => go("/profile")} />
            </>
          )}
          <hr className="border-white/50 my-2 mx-2" />
          <DrawerItem icon={<FiInfo />} label="About Us" onClick={() => go("/about")} />
          <DrawerItem icon={<FiMail />} label="Contact" onClick={() => go("/contact")} />
        </nav>

        {isLoggedIn && (
          <div className="px-4 mt-4">
            {!confirmingLogout ? (
              <button
                onMouseEnter={() => setHoverLogout(true)}
                onMouseLeave={() => setHoverLogout(false)}
                onClick={() => setConfirmingLogout(true)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white font-bold transition ${
                  hoverLogout ? "bg-red-600 shadow-lg" : "bg-red-600/80"
                }`}
              >
                <FiLogOut size={hoverLogout ? 26 : 24} />
                <span className={hoverLogout ? "text-lg" : "text-base"}>Logout</span>
              </button>
            ) : (
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <p className="font-bold text-black mb-1">Confirm Logout</p>
                <p className="text-black/70 text-sm mb-3">
                  Are you sure you want to logout? You'll need to sign in again.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setConfirmingLogout(false)}
                    className="px-3 py-1.5 rounded-lg text-navy-700 font-medium hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="h-6" />
      </aside>
    </>
  );
}
