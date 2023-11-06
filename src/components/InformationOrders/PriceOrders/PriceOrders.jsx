import classNames from "classnames/bind";
import styles from "./PriceOrders.module.scss";
const cx = classNames.bind(styles);
function PriceOrders() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("price-item")}>100000 VNĐ</h3>
    </div>
  );
}

export default PriceOrders;
