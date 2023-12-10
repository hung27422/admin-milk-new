import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./AdminCategory.module.scss";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import useCategory from "../../hooks/useQuerryCategory";
import useValidate from "../../hooks/useValidate";
const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: productCreateCategoryInput!) {
    createCategory(input: $input) {
      categoryCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonAddCategory() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState({});
  const { refetch } = useCategory();
  const [createCategory, { error: errMutaionCategory }] =
    useMutation(CREATE_CATEGORY);
  const { categorySchema } = useValidate();
  const [error, setError] = useState(null);

  if (errMutaionCategory)
    console.log("Lỗi mutation category", errMutaionCategory);
  const handleValueInput = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleAddCategory = async () => {
    const validationResult = categorySchema.validate(value);
    if (validationResult.error) {
      setError(
        validationResult.error.details
          .map((detail) => detail.message)
          .join(", ")
      );
      return; // Ngăn chặn thực hiện mutation khi có lỗi
    }
    const productCreateCategoryInput = {
      input: {
        description: value?.description,
        name: value?.name,
      },
    };
    const result = await createCategory({
      variables: {
        input: productCreateCategoryInput.input,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    });
    refetch();
    setOpen(false);
    console.log("Tạo category thành công: ", result);
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          marginTop: "10px",
        }}
        onClick={() => setOpen(true)}
      >
        Thêm Category
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("form-group")}>
            <h2 className={cx("title")}>Thêm Category</h2>
            <label className={cx("form-input")}>
              <TextField
                id="name"
                className={cx("value-input")}
                label="Nhập Name"
                variant="outlined"
                onChange={(e) => handleValueInput("name", e.target.value)}
              />
            </label>
            <label className={cx("form-input")}>
              <TextField
                id="description"
                className={cx("value-input")}
                label="Nhập Description"
                variant="outlined"
                onChange={(e) =>
                  handleValueInput("description", e.target.value)
                }
              />
            </label>
            <div style={{ textAlign: "center" }}>
              {error && (
                <span style={{ color: "red", textAlign: "center" }}>
                  {error}
                </span>
              )}
            </div>
            <div className={cx("btn-action")}>
              <Button
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--white)",
                  marginTop: "10px",
                  marginRight: "5px",
                }}
                onClick={() => setOpen(false)}
              >
                Trở lại
              </Button>
              <Button
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--white)",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
                onClick={handleAddCategory}
              >
                Thêm Category
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
