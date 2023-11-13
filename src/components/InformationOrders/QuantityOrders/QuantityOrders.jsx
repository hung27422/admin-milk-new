import classNames from "classnames/bind";
import styles from "./QuantityOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function QuantityOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      {data.map((item) => (
        <div key={item?.id}>
          <h3 className={cx("quantity-item")}>{item?.quantity}</h3>
        </div>
      ))}
    </div>
  );
}

QuantityOrders.propTypes = {
  data: PropTypes.array,
};

export default QuantityOrders;
