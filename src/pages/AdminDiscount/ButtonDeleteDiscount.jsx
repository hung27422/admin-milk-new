import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import useQueryDiscount from "../../hooks/useQueryDiscount";
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
const DELETE_DISCOUNT = gql`
  mutation DeleteDiscount($input: orderDeleteDiscountInput!) {
    deleteDiscount(input: $input) {
      string
    }
  }
`;
export default function ButtonDeleteDiscount({ data }) {
  const [open, setOpen] = React.useState(false);
  const [deleteDiscount] = useMutation(DELETE_DISCOUNT);
  const { refetch } = useQueryDiscount();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteDiscount = async () => {
    const orderDeleteDiscountInput = {
      input: {
        id: data?.id,
      },
    };
    const result = await deleteDiscount({
      variables: {
        input: orderDeleteDiscountInput.input,
      },
    });
    setOpen(false);
    refetch();
    console.log("Xóa discount thành công", result);
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span>Bạn có chắc chăn muốn xóa discount có id là: {data?.id}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "white",
                marginRight: "5px",
              }}
              onClick={() => setOpen(false)}
            >
              Trở về
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "white",
                marginLeft: "5px",
              }}
              onClick={handleDeleteDiscount}
            >
              Chắc chắn
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonDeleteDiscount.propTypes = {
  data: PropTypes.object,
};
