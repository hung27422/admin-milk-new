import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../../../auth0/Login";
import Profile from "../../../auth0/Profile";
const cx = classNames.bind(styles);
function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>TH Milk Portal</h1>
        <div className={"btn-login"}>
          {!isAuthenticated ? <Login /> : <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
