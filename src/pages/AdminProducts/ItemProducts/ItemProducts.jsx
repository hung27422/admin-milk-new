import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ItemProducts.module.scss";
const cx = classNames.bind(styles);
function ItemProducts({ data }) {
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("img-item")}
        src="https://www.thmilk.vn/wp-content/uploads/2019/11/UHT-180-ID-457x396.png"
        alt=""
      />
      <span className={cx("name-item")}>{data?.name}</span>
    </div>
  );
}

export default ItemProducts;
ItemProducts.propTypes = {
  data: PropTypes.object,
};
