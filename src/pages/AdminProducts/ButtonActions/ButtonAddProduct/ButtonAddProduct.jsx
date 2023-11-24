import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "../ButtonAction.module.scss";
import { TextField } from "@mui/material";
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
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: productCreateProductInput!) {
    createProduct(input: $input) {
      productCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonAddProduct() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState({});
  const { refetch } = UseQueryProduct();
  const handleValueInput = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const hanldeAddProduct = async () => {
    const productCreateProductInput = {
      input: {
        categoryId: Number(value.categoryId),
        description: value.description,
        images: value.images,
        name: value.name,
        price: Number(value.price),
        sku: value.sku,
      },
    };
    try {
      const result = await createProduct({
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
          },
        },
        variables: {
          input: productCreateProductInput.input,
        },
      });
      console.log("Đã tạo product thành công:", result);
    } catch (error) {
      console.error("Lỗi khi tạo product:", error);
    } finally {
      setOpen(false);
      refetch();
    }
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
        }}
        onClick={() => setOpen(true)}
      >
        Thêm sản phẩm
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
                label="Nhập CategoryId"
                variant="outlined"
                onChange={(e) => handleValueInput("categoryId", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="description"
                label="Nhập Description"
                variant="outlined"
                onChange={(e) =>
                  handleValueInput("description", e.target.value)
                }
              />
            </label>
            <label>
              <TextField
                id="images"
                label="Nhập địa chỉ image"
                variant="outlined"
                onChange={(e) => handleValueInput("images", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="name"
                label="Nhập tên sản phẩm"
                variant="outlined"
                onChange={(e) => handleValueInput("name", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="price"
                label="Nhập giá sản phẩm"
                variant="outlined"
                onChange={(e) => handleValueInput("price", e.target.value)}
              />
            </label>
            <label>
              <TextField
                id="sku"
                label="Nhập Sku sản phẩm"
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
              onClick={hanldeAddProduct}
            >
              Thêm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
