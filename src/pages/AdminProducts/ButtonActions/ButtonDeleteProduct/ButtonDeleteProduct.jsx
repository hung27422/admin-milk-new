import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
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
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($input: productDeleteProductInput!) {
    deleteProduct(input: $input) {
      productDeletedPayload {
        message
      }
    }
  }
`;
export default function ButtonDeleteProduct({ data }) {
  const [open, setOpen] = React.useState(false);
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT);
  if (error) console.log("Lỗi xóa product: ", error);

  const handleDeleteProduct = async () => {
    const productDeleteProductInput = {
      input: {
        id: data?.id,
      },
    };
    const result = await deleteProduct({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
        },
      },
      variables: {
        input: productDeleteProductInput.input,
      },
    });
    console.log("Xóa product thành công: ", result);
    setOpen(false);
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "red", color: "var(--white)" }}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>
            Bạn có muốn xóa sản phẩm với id:{" "}
            <span style={{ color: "red" }}>{data?.id}</span> không?{" "}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                marginRight: "5px",
              }}
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                marginLeft: "5px",
              }}
              onClick={handleDeleteProduct}
            >
              Đồng ý
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonDeleteProduct.propTypes = {
  data: PropTypes.object,
};
