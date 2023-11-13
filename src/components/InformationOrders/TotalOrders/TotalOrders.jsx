import classNames from "classnames/bind";
import styles from "./TotalOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function TotalOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      {data?.map((item) => (
        <h3 key={item?.id} className={cx("total-item")}>
          {item.quantity * item.price} VNĐ
        </h3>
      ))}
    </div>
  );
}
TotalOrders.propTypes = {
  data: PropTypes.array,
};
export default TotalOrders;
