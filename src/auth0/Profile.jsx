import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { useAuth0 } from "@auth0/auth0-react";
import classNames from "classnames/bind";
import styles from "./Auth0.module.scss";
import useGetUserRoles from "../hooks/useGetUserRoles";

import { useEffect } from "react";
import { AdminMilkContext } from "../components/AdminContextMilk/AdminContextMilk";
import { NavLink } from "react-router-dom";
const cx = classNames.bind(styles);

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    marginRight: "12px",
  },
}));

export default function Profile() {
  const { user, logout } = useAuth0();
  const { fetchRoles } = useGetUserRoles();
  const { setRoleName } = React.useContext(AdminMilkContext);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  const handleLogout = () => {
    logoutWithRedirect();
  };
  useEffect(() => {
    fetchRoles().then((result) => {
      if (!result) {
        return;
      }
      console.log(result);
      result?.map((item) => {
        return setRoleName(item);
      });
    });
  }, [user]);

  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className={cx("box-item")}>
              <NavLink to={"/PageInfoUser"} className={cx("account")}>
                Tài khoản của tôi
              </NavLink>
            </div>
            <div className={cx("box-item")}>
              <div onClick={handleLogout}>Logout</div>
            </div>
          </React.Fragment>
        }
      >
        <Button>
          <img className={cx("avatar")} src={user.picture} alt="avatar" />
        </Button>
      </HtmlTooltip>
    </div>
  );
}
