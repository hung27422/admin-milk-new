import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function MenuItem({ to, title }) {
  const location = useLocation();
  const now = "You're Here";
  return (
    <NavLink
      to={to}
      className={cx("wrapper", { active: location.pathname === to })}
    >
      <h2 className={cx("title")}>{title}</h2>
      {location.pathname === to ? (
        <div className={cx("now")}>
          <span className={cx("title-now")}>{now}</span>
        </div>
      ) : null}
    </NavLink>
  );
}
MenuItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
};
export default MenuItem;
