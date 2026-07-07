import { FiMenu } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const guestLinks = [{ to: "/", label: "Get Started" }];

const memberLinks = [
  { to: "/welcome", label: "Welcome" },
  { to: "/lost-found", label: "Lost & Found" },
  { to: "/report-list", label: "Report List" },
  { to: "/users", label: "Users" },
];

const infoLinks = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ onMenuClick }) {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    ...(isLoggedIn ? memberLinks : guestLinks),
    ...(isLoggedIn && user?.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
    ...infoLinks,
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-[60px] lg:h-[72px] px-4 lg:px-8 flex items-center justify-between bg-navy-700 shadow-md shrink-0">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <Logo size={40} />
        <div className="flex flex-col leading-tight">
          <span className="text-white font-bold text-lg lg:text-xl">FOUND</span>
          <span className="text-white text-[10px] lg:text-xs opacity-90">
            Discover. Connect. Search.
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive(link.to)
                ? "bg-white/15 text-white"
                : "text-white/75 hover:text-white hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop right side auth actions */}
      <div className="hidden lg:flex items-center gap-3 shrink-0">
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/85 hover:text-white hover:bg-white/10 transition text-sm font-medium"
            >
              <span className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
              {user?.name?.split(" ")[0]}
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="btn-ghost px-4 py-2 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost px-4 py-2 text-sm">
              Login
            </Link>
            <Link to="/register" className="btn-gradient px-4 py-2 text-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile / tablet menu button */}
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="lg:hidden text-white p-2 rounded-full hover:bg-white/10 transition"
      >
        <FiMenu size={22} />
      </button>
    </header>
  );
}
