import classNames from "classnames/bind";
import styles from "../AdminUser.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
function RoleUser({ data }) {
  return (
    <div>
      <span className={cx("role-user")}>{data?.role.name}</span>
    </div>
  );
}

export default RoleUser;
RoleUser.propTypes = {
  data: PropTypes.object,
};
