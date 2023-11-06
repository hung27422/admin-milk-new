import classNames from "classnames/bind";
import styles from "./QuantityOrders.module.scss";
const cx = classNames.bind(styles);
function QuantityOrders() {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("quantity-item")}>2</h3>
    </div>
  );
}

export default QuantityOrders;
