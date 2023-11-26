import TableInfoProduct from "../../components/TableInfoProducts/TableInfoProduct";
import classNames from "classnames/bind";
import styles from "./AdminProduct.module.scss";
import UseQueryProduct from "../../hooks/useQuerryProduct";

import { TextField } from "@mui/material";
import ButtonAddProduct from "./ButtonActions/ButtonAddProduct/ButtonAddProduct";
import useGetQueryInventory from "../../hooks/useGetQueryInventory";

const cx = classNames.bind(styles);
function AdminProduct() {
  const { data, error } = UseQueryProduct();
  const { data: dataInventory } = useGetQueryInventory();
  if (error) {
    console.log("Lỗi ở useQuerryProduct", error);
  }

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Product</h2>
      <div className={cx("header")}>
        <div className={cx("search-product")}>
          <TextField
            style={{ width: "500px" }}
            id="search"
            label="Tìm kiếm sản phẩm"
            variant="outlined"
          />
        </div>
        <div className={cx("btn-add-product")}>
          <ButtonAddProduct />
        </div>
      </div>
      <TableInfoProduct
        data={data?.products}
        dataI={dataInventory?.inventories}
      />
    </div>
  );
}

export default AdminProduct;
