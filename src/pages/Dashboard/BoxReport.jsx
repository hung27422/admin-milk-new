import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);
import PropTypes from "prop-types";
function BoxReport({ title, total, quantity, widthPrimary, widthSecondary }) {
  return (
    <div className={cx("box-report", { widthPrimary }, { widthSecondary })}>
      <h3 className={cx("title-report")}>{title}</h3>
      <span className={cx("total-report")}>
        {total !== undefined ? total + " " + "VNĐ" : quantity + " " + "Đơn"}
      </span>
    </div>
  );
}
BoxReport.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number,
  quantity: PropTypes.number,
  widthPrimary: PropTypes.bool,
  widthSecondary: PropTypes.bool,
};
export default BoxReport;
