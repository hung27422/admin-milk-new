import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);
function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>TH Milk Portal</h1>
        <div className={"btn-login"}>
          <NavLink to={"/LoginAdmin"} className={cx("login")}>
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
