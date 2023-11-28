import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import { TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import PropTypes from "prop-types";
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
const UPDATE_INVENTORY = gql`
  mutation UpdateInventory(
    $updateInventoryId: Int!
    $input: inventoryUpdateInventoryInput!
  ) {
    updateInventory(id: $updateInventoryId, input: $input) {
      inventoryUpdatedPayload {
        message
      }
    }
  }
`;
export default function ButtonUpdateInventory({ data }) {
  const [open, setOpen] = React.useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [updateInventory] = useMutation(UPDATE_INVENTORY);
  const [quantity, setQuantity] = useState();
  const { refetch } = useGetQueryInventory();
  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleUpdateInventory = async () => {
    const inventoryUpdateInventoryInput = {
      updateInventoryId: data?.id,
      input: {
        availability: true,
        quantity: parseInt(quantity),
      },
    };
    const result = await updateInventory({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        updateInventoryId: inventoryUpdateInventoryInput.updateInventoryId,
        input: inventoryUpdateInventoryInput.input,
      },
    });
    console.log("Update số lượng kho thành công ", result);
    refetch();
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          textAlign: "center",
        }}
        onClick={() => setOpen(true)}
      >
        Update
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Cập nhật số lượng kho</h2>
          <div className={cx("btn-action")}>
            <TextField
              id="update-inventory"
              label="Nhập số lượng"
              variant="outlined"
              onChange={(e) => handleChangeQuantity(e.target.value)}
            />
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                textAlign: "center",
                marginLeft: "20px",
              }}
              onClick={handleUpdateInventory}
            >
              Cập nhật
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonUpdateInventory.propTypes = {
  data: PropTypes.object,
};
