import classNames from "classnames/bind";
import styles from "../AdminUser.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
function PhoneUser({ data }) {
  return (
    <div>
      <span className={cx("phone-user")}>{data?.phoneNumber}</span>
    </div>
  );
}

export default PhoneUser;
PhoneUser.propTypes = {
  data: PropTypes.object,
};
