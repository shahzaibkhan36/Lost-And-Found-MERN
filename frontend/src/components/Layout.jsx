import { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Drawer from "./Drawer.jsx";

export default function Layout({ children, showFooter = true }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-app-gradient">
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <main className="flex-1 flex flex-col relative">{children}</main>
      {showFooter && <Footer />}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
