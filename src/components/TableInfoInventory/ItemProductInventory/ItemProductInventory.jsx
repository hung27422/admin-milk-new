import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import UseQueryProduct from "../../../hooks/useQuerryProduct";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function ItemProductInventory({ data: dataInventory }) {
  const { data } = UseQueryProduct();
//   useEffect(() => {
//     console.log(data);
//   }, [data]);
  return (
    <div className={cx("id-product")}>
      {data?.products?.map((item) => {
        if (item?.id === dataInventory?.productId) {
          return (
            <div key={item?.id}>
              <div className={cx("info-item")}>
                <img className={cx("img-item")} src={item?.images} alt="" />
                <span className={cx("name-item")}>{item?.name}</span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ItemProductInventory;
ItemProductInventory.propTypes = {
  data: PropTypes.object,
};
