import classNames from "classnames/bind";
import styles from "./LoginAdmin.module.scss";
import { Button, TextField } from "@mui/material";
const cx = classNames.bind(styles);
function LoginAdmin() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5173/";
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-group")}>
        <h2 className={cx("title")}>Đăng nhập</h2>
        <TextField
          className={cx("input-value")}
          id="outlined-basic"
          label="Nhập email"
          variant="outlined"
          type="email"
        />
        <TextField
          className={cx("input-value")}
          id="outlined-basic"
          label="Nhập mật khẩu"
          variant="outlined"
          type="password"
        />
        <span className={cx("invalid")}>
          Thông tin mật khẩu sai. Hãy nhập lại !
        </span>
        <div className={cx("btn-login")}>
          <Button
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--white)",
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
