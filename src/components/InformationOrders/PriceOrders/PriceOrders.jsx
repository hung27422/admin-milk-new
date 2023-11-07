import classNames from "classnames/bind";
import styles from "./PriceOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function PriceOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("price-item")}>{data?.price} VNĐ</h3>
    </div>
  );
}
PriceOrders.propTypes = {
  data: PropTypes.object,
};
export default PriceOrders;
