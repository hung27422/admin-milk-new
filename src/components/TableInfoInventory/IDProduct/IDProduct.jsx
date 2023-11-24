import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function IDProduct({ data }) {
  return (
    <div className={cx("id-product")}>
      <h2>{data?.productId}</h2>
    </div>
  );
}

export default IDProduct;
IDProduct.propTypes = {
  data: PropTypes.object,
};
