import classNames from "classnames/bind";
import styles from "./Auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";

const cx = classNames.bind(styles);
function Login() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div className={"btn-login"}>
      <div to={"/LoginAdmin"} className={cx("login")} onClick={handleLogin}>
        Log in
      </div>
    </div>
  );
}

export default Login;
