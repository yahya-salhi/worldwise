import Logo from "./Logo";
import PageNav from "./PageNav";
import styeles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styeles.sidebar}>
      <Logo />

      <p>list of cities</p>
      <footer className={styeles.footer}>
        <p className={styeles.copyright}>
          &copy; copyright {new Date().getFullYear()}
          by yahya salhi
        </p>
      </footer>
    </div>
  );
}
