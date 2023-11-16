import classNames from "classnames/bind";
import styles from "./AddressUserOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function AddressUserOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <h3 key={data?.id} className={cx("total-item")}>
        {data?.shippingAddress}
      </h3>
    </div>
  );
}
AddressUserOrders.propTypes = {
  data: PropTypes.object,
};
export default AddressUserOrders;
