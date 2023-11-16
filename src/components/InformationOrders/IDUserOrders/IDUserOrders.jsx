import classNames from "classnames/bind";
import styles from "./IDUserOrders.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function IDUserOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info-item")} key={data?.id}>
        <h3 className={cx("name-item")}>{data?.userId}</h3>
      </div>
    </div>
  );
}

IDUserOrders.propTypes = {
  data: PropTypes.object,
};

export default IDUserOrders;
