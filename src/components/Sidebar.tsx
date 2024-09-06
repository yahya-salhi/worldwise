import { Outlet } from "react-router-dom";
import Logo from "./Logo";

import styeles from "./Sidebar.module.css";
import AppNav from "./AppNav";

export default function Sidebar() {
  return (
    <div className={styeles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styeles.footer}>
        <p className={styeles.copyright}>
          &copy; copyright {new Date().getFullYear()}
          by yahya salhi
        </p>
      </footer>
    </div>
  );
}
