import classNames from "classnames/bind";
import styles from "../AdminUser.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
function NameUser({ data }) {
  return (
    <div>
      <span className={cx("name-user")}>{data?.name}</span>
    </div>
  );
}

export default NameUser;
NameUser.propTypes = {
  data: PropTypes.object,
};
