import TableInfoInventory from "../../components/TableInfoInventory/TableInfoInventory";
import classNames from "classnames/bind";
import styles from "./AdminInventory.module.scss";
import useGetQueryInventory from "../../hooks/useGetQueryInventory";
const cx = classNames.bind(styles);
function AdminInventory() {
  const { data, error } = useGetQueryInventory();
  if (error) console.log("Lỗi ở useGetQueryInventory", error);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Inventory</h2>
      <TableInfoInventory data={data?.inventories} />
    </div>
  );
}

export default AdminInventory;
