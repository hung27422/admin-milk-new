import classNames from "classnames/bind";
import styles from "./Auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { AdminMilkContext } from "../components/AdminContextMilk/AdminContextMilk";

const cx = classNames.bind(styles);
const RENEW_TOKEN = gql`
  mutation RenewToken($input: userRenewTokenInput!) {
    renewToken(input: $input) {
      userCreatedPayload {
        apiToken
        message
      }
    }
  }
`;
function Login() {
  const { loginWithRedirect } = useAuth0();
  const [renewToken] = useMutation(RENEW_TOKEN, {
    fetchPolicy: "network-only",
  });
  const { setApiTokenAdmin } = useContext(AdminMilkContext);

  const handleLogin = async () => {
    const userRenewTokenInput = {
      input: {
        id: "f88edae9-f78b-46a1-93f0-2a7c2d095b0c",
      },
    };

    try {
      const response = await renewToken({
        variables: { input: userRenewTokenInput.input },
      });
      // Access the data from the response
      const userCreatedPayload = response.data.renewToken.userCreatedPayload;
      // Retrieve and store the apiToken
      const token = userCreatedPayload.apiToken;
      setApiTokenAdmin(token);
      localStorage.setItem("apiToken", token);
      console.log("kq", token);
      
    } catch (error) {
      console.error("Lỗi tạo token:", error);
    } finally {
      console.log("Tạo token thành công");
    }
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
