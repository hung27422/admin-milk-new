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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
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
        onClick={handleOpen}
      >
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
