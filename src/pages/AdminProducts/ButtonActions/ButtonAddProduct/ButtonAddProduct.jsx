import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "../ButtonAction.module.scss";
import { TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
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
        apiToken
        message
      }
    }
  }
`;
export default function ButtonAddProduct() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState({});
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
        categoryId: value.categoryId,
        description: value.description,
        images: value.images,
        name: value.name,
        price: value.price,
        sku: value.sku,
      },
    };
    try {
      const result = await createProduct({
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
          },
        },
        variables: {
          input: productCreateProductInput,
        },
      });
      console.log("Đã tạo product thành công:", result);
    } catch (error) {
      console.error("Lỗi khi tạo product:", error);
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
