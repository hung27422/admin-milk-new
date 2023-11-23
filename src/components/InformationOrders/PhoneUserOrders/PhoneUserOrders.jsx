import classNames from "classnames/bind";
import styles from "./PhoneUserOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function PhoneUserOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div key={data?.id}>
        <h3 className={cx("quantity-item")}>{data?.phone}</h3>
      </div>
    </div>
  );
}

PhoneUserOrders.propTypes = {
  data: PropTypes.object,
};

export default PhoneUserOrders;
