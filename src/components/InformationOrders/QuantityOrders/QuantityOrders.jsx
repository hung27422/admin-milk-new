import classNames from "classnames/bind";
import styles from "./QuantityOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function QuantityOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("quantity-item")}>{data?.quantity}</h3>
    </div>
  );
}
QuantityOrders.propTypes = {
  data: PropTypes.object,
};
export default QuantityOrders;
