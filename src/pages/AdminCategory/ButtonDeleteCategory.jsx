import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "./AdminCategory.module.scss";
import { gql, useMutation } from "@apollo/client";
import useCategory from "../../hooks/useQuerryCategory";
import PropTypes from "prop-types";
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
const DELETE_CATEGORY = gql`
  mutation DeleteCategory($input: productDeleteCategoryInput!) {
    deleteCategory(input: $input) {
      categoryCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonDeleteCategory({ data }) {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [open, setOpen] = React.useState(false);
  const { refetch } = useCategory();
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleUpdateCategory = async () => {
    const productDeleteCategoryInput = {
      input: {
        id: data?.id,
      },
    };
    const result = await deleteCategory({
      variables: {
        input: productDeleteCategoryInput.input,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    });
    refetch();
    setOpen(false);
    console.log("Xóa category thành công: ", result);
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "red",
          color: "var(--white)",
          marginTop: "10px",
        }}
        onClick={() => setOpen(true)}
      >
        DELETE
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Bạn có chắc chắn muốn xóa category có id là {data?.id} không?</h2>
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
              Không
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                marginTop: "10px",
                marginLeft: "5px",
              }}
              onClick={handleUpdateCategory}
            >
              Chắn chắc
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonDeleteCategory.propTypes = {
  data: PropTypes.object,
};
