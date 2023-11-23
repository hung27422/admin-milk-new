import classNames from "classnames/bind";
import styles from "./LoginAdmin.module.scss";
import Login from "../../auth0/Login";
const cx = classNames.bind(styles);
function LoginAdmin() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-group")}>
        <h2 className={cx("title")}>Đăng nhập</h2>
        <div className={cx("btn-login")}>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
