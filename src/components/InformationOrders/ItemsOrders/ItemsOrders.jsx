import classNames from "classnames/bind";
import styles from "./ItemsOrders.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function ItemOrders({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2021/02/HILO-457x396.png"
          alt=""
          className={cx("img-item")}
        />
        <h3 className={cx("name-item")}>{data?.name}</h3>
      </div>
    </div>
  );
}
ItemOrders.propTypes = {
  data: PropTypes.object,
};
export default ItemOrders;
