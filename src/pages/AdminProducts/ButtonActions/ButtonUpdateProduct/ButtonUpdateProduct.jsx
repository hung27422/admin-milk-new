import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "../ButtonAction.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import UseQueryProduct from "../../../../hooks/useQuerryProduct";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $updateProductId: Int!
    $input: productUpdateProductInput!
  ) {
    updateProduct(id: $updateProductId, input: $input) {
      productUpdatedPayload {
        message
      }
    }
  }
`;
export default function ButtonUpdateProduct({ data }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState({});
  const { refetch } = UseQueryProduct();
  const [updateProduct, { error }] = useMutation(UPDATE_PRODUCT);
  if (error) console.log(error);
  const handleValueInput = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const hanldeUpdateProduct = async () => {
    const productUpdateProductInput = {
      input: {
        categoryId: Number(value?.categoryId) || data?.categoryId,
        description: value?.description || data?.description,
        images: value?.images || data?.images,
        name: value?.name || data?.name,
        price: Number(value?.price) || data?.price,
        sku: value?.sku || data?.sku,
      },
      updateProductId: data?.id,
    };
    const result = await updateProduct({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
        },
      },
      variables: {
        input: productUpdateProductInput.input,
        updateProductId: productUpdateProductInput.updateProductId,
      },
    });
    console.log("Cập nhật product thành công: ", result);
    setOpen(false);
    refetch;
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--secondary)", color: "var(--white)" }}
        onClick={() => setOpen(true)}
      >
        Update
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Nhập thông tin sản phẩm</h2>
          <div className={cx("form-input")}>
            <label>
              <TextField
                id="categoryId"
                label={"categoryId: " + data?.categoryId}
                variant="outlined"
                onChange={(e) => handleValueInput("categoryId", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="description"
                label={"description: " + data?.description}
                variant="outlined"
                onChange={(e) =>
                  handleValueInput("description", e.target.value)
                }
              />
            </label>
            <label>
              <TextField
                id="images"
                label={"images: " + data?.images}
                variant="outlined"
                onChange={(e) => handleValueInput("images", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="name"
                label={"name: " + data?.name}
                variant="outlined"
                onChange={(e) => handleValueInput("name", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="price"
                label={"price: " + data?.price + " VNĐ"}
                variant="outlined"
                onChange={(e) => handleValueInput("price", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="sku"
                label={"sku: " + data?.sku}
                variant="outlined"
                onChange={(e) => handleValueInput("sku", e.target.value)}
              />
            </label>
          </div>
          <div className={cx("btn-action")}>
            <Button
              style={{
                color: "var(--white)",
                backgroundColor: "var(--secondary)",
              }}
              onClick={() => setOpen(false)}
            >
              Thoát
            </Button>
            <Button
              style={{
                color: "var(--white)",
                backgroundColor: "var(--secondary)",
              }}
              onClick={hanldeUpdateProduct}
            >
              Lưu
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonUpdateProduct.propTypes = {
  data: PropTypes.object,
};
