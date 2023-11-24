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
export default function ButtonAddInventory({ data }) {
  const [open, setOpen] = React.useState(false);
  const [createInventory] = useMutation(CREATE_INVENTORY);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = useState();
  // React.useEffect(() => {
  //   console.log(data);
  // }, []);
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
        },
      },
      variables: { input: inventoryCreateInventoryInput.input },
    });
    console.log("Tạo inventory thành công: ", result);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Add Inventory</Button>
      <Modal
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleCreateInventory}>Tạo</Button>
        </Box>
      </Modal>
    </div>
  );
}
ButtonAddInventory.propTypes = {
  data: PropTypes.object,
};
