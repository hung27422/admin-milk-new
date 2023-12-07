import classNames from "classnames/bind";
import styles from "./AdminDiscount.module.scss";
import TableInfoDiscount from "../../components/TableInfoDiscount/TableInfoDiscount";
import useQueryDiscount from "../../hooks/useQueryDiscount";
import ButtonAddDiscount from "./ButtonAddDiscount";
const cx = classNames.bind(styles);

function AdminDiscount() {
  const { data, error } = useQueryDiscount();
  if (error) console.log("Lỗi query discounts", error);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Discount</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <ButtonAddDiscount data={data?.discounts} />
      </div>
      <TableInfoDiscount data={data?.discounts} />
    </div>
  );
}

export default AdminDiscount;
