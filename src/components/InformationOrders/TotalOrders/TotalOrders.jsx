import classNames from "classnames/bind";
import styles from "./TotalOrders.module.scss";
const cx = classNames.bind(styles);
function TotalOrders() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("total-item")}>200000 VNĐ</h3>
    </div>
  );
}

export default TotalOrders;
