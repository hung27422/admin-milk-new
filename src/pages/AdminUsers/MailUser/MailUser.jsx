import classNames from "classnames/bind";
import styles from "../AdminUser.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";

function MailUser({ data }) {
  return (
    <div>
      <span className={cx("email-user")}>{data?.email}</span>
    </div>
  );
}

export default MailUser;
MailUser.propTypes = {
  data: PropTypes.object,
};
