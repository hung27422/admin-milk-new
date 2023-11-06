import classNames from "classnames/bind";
import styles from "./ActionOrders.module.scss";
import Button from "../../Button/Button";
const cx = classNames.bind(styles);
function ActionOrders() {
  return (
    <div className={cx("wrapper")}>
      <Button action>Xác nhận</Button>
    </div>
  );
}

export default ActionOrders;
