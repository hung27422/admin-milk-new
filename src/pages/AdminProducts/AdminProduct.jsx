import TableInfoProduct from "../../components/TableInfoProducts/TableInfoProduct";
import classNames from "classnames/bind";
import styles from "./AdminProduct.module.scss";
import UseQueryProduct from "../../hooks/useQuerryProduct";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import ButtonAddProduct from "./ButtonActions/ButtonAddProduct/ButtonAddProduct";

const cx = classNames.bind(styles);
function AdminProduct() {
  const [data, error, refetch] = UseQueryProduct();
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    setInterval(() => {
      refetch();
    }, [5000]);
    return () => clearInterval();
  });
  // console.log("UseQueryProduct", data);
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
      <TableInfoProduct data={data?.products} />
    </div>
  );
}

export default AdminProduct;
