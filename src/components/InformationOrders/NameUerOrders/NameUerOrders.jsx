import classNames from "classnames/bind";
import styles from "./NameUerOrders.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function NameUerOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div key={data?.id}>
        <h3 className={cx("price-item")}>{data?.userName}</h3>
      </div>
    </div>
  );
}

NameUerOrders.propTypes = {
  data: PropTypes.object,
};

export default NameUerOrders;
