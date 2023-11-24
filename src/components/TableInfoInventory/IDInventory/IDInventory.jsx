import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function IDInventory({ data }) {
  return (
    <div className={cx("id-inventory")}>
      <h2>{data?.id}</h2>
    </div>
  );
}

export default IDInventory;
IDInventory.propTypes = {
  data: PropTypes.object,
};
