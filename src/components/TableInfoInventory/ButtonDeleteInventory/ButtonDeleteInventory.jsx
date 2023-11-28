import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import { gql, useMutation } from "@apollo/client";
import useGetQueryInventory from "../../../hooks/useGetQueryInventory";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DELETE_INVENTORY = gql`
  mutation DeleteInventory($input: inventoryDeleteInventoryInput!) {
    deleteInventory(input: $input) {
      inventoryDeletedPayload {
        message
      }
    }
  }
`;
export default function ButtonDeleteInventory({ data }) {
  //   console.log(data);
  const [open, setOpen] = React.useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [deleteInventory] = useMutation(DELETE_INVENTORY);
  const { refetch } = useGetQueryInventory();
  const handleDeleteInventory = async () => {
    const inventoryDeleteInventoryInput = {
      input: {
        id: data?.id,
      },
    };
    const result = await deleteInventory({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: { input: inventoryDeleteInventoryInput.input },
    });
    console.log("Xóa inventory thành công", result);
    refetch();
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "red",
          color: "var(--white)",
        }}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClick={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Delete Inventory</h2>
          <div className={cx("des-delete-inventory")}>
            Bạn chắc chắn muốn xóa sản phẩm này trong kho với mã kho là:
            <span className={cx("id-item")}> {data?.id} </span> và mã sản phẩm
            là:
            <span className={cx("id-item")}> {data?.productId} </span>
          </div>
          <div className={cx("btn-action")}>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                width: "100px",
                marginRight: "10px",
              }}
              onClick={() => setOpen(false)}
            >
              Trở lại
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                width: "120px",
                marginLeft: "10px",
              }}
              onClick={handleDeleteInventory}
            >
              Xóa
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonDeleteInventory.propTypes = {
  data: PropTypes.object,
};
