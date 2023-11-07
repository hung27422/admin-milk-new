import classNames from "classnames/bind";
import styles from "./TotalOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function TotalOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("total-item")}>{data.quantity * data.price} VNĐ</h3>
    </div>
  );
}
TotalOrders.propTypes = {
  data: PropTypes.object,
};
export default TotalOrders;
