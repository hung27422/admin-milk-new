import classNames from "classnames/bind";
import styles from "./PriceOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function PriceOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      {data?.map((item) => (
        <div key={item?.id}>
          <h3 className={cx("price-item")}>{item?.price} VNĐ</h3>
        </div>
      ))}
    </div>
  );
}

PriceOrders.propTypes = {
  data: PropTypes.array,
};

export default PriceOrders;
