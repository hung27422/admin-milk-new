import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function QuantityInventory({ data }) {
  return (
    <div className={cx("id-product")}>
      <h2>{data?.quantity}</h2>
    </div>
  );
}

export default QuantityInventory;
QuantityInventory.propTypes = {
  data: PropTypes.object,
};
