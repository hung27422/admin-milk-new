import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ItemProducts.module.scss";
const cx = classNames.bind(styles);
function ItemProducts({ data }) {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("img-item")} src={data?.images} alt="" />
      <span className={cx("name-item")}>{data?.name}</span>
    </div>
  );
}

export default ItemProducts;
ItemProducts.propTypes = {
  data: PropTypes.object,
};
