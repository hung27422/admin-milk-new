import classNames from "classnames/bind";
import styles from "./ItemsOrders.module.scss";
const cx = classNames.bind(styles);
function ItemOrders() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("info-item")}>
        <img
          src="https://www.thmilk.vn/wp-content/uploads/2021/02/HILO-457x396.png"
          alt=""
          className={cx("img-item")}
        />
        <h3 className={cx("name-item")}>Sữa TH Milk tiệt trùng 120ml</h3>
      </div>
    </div>
  );
}

export default ItemOrders;
