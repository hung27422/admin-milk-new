import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../TableInfoInventory.module.scss";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import useGetQueryInventory from "../../../hooks/useGetQueryInventory";

// import PropTypes from "prop-types";
const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CREATE_INVENTORY = gql`
  mutation CreateInventory($input: inventoryCreateInventoryInput!) {
    createInventory(input: $input) {
      inventoryCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonAddInventory({ data, idIV }) {
  const [open, setOpen] = React.useState(false);
  const [createInventory] = useMutation(CREATE_INVENTORY);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [quantity, setQuantity] = useState();
  const { refetch } = useGetQueryInventory();

  const isIdInInventory = idIV?.includes(data?.id);
  const handleUpdateQuantity = (value) => {
    setQuantity(Number(value));
  };
  const handleCreateInventory = async () => {
    const inventoryCreateInventoryInput = {
      input: {
        availability: true,
        productId: data?.id,
        quantity: quantity,
      },
    };
    console.log(inventoryCreateInventoryInput);
    const result = await createInventory({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: { input: inventoryCreateInventoryInput.input },
    });
    console.log("Tạo inventory thành công: ", result);
    setOpen(false);
    refetch();
  };
  return (
    <div>
      <Button
        disabled={isIdInInventory}
        style={{
          backgroundColor: isIdInInventory ? "#ccc" : "var(--secondary)",
          color: "var(--white)",
        }}
        onClick={() => setOpen(true)}
      >
        {isIdInInventory ? "Đã có trong kho" : "Add Inventory"}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Add Inventory</h2>
          <div className={cx("form-input")}>
            <TextField
              className={cx("input-value")}
              id="outlined-basic"
              label="Nhập số lượng"
              variant="outlined"
              onChange={(e) => handleUpdateQuantity(e.target.value)}
            />
          </div>
          <Button
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--white)",
              textAlign: "center",
              marginTop: "15px",
            }}
            onClick={handleCreateInventory}
          >
            Tạo
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
ButtonAddInventory.propTypes = {
  data: PropTypes.object,
  idIV: PropTypes.array,
};
