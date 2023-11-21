import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import UseQueryProduct from "../../../../hooks/useQuerryProduct";
// import UseQueryProduct from "../../../../hooks/useQuerryProduct";
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
  const [refetch] = UseQueryProduct();

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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZmFkYWI2Ni02YzlmLTQ3MzgtOTU1NC04OTUwYTg2Mzg5ODEiLCJuYW1lIjoiYWRtaW4iLCJqdGkiOiI5RkFEQUI2Ni02QzlGLTQ3MzgtOTU1NC04OTUwQTg2Mzg5ODEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwMDczODA5NiwiaXNzIjoiSWZXaGF0IiwiYXVkIjoiSWZXaGF0Q2xpZW50In0._JL6OR_9ll0F34MzHyLU64TMpBIQkwrXZpviB96qeiQjqn4xpINoDVffawc7KvWfculfcW_fHiGV4tJRIkgL8g`,
        },
      },
      variables: {
        input: productDeleteProductInput.input,
      },
    });
    console.log("Xóa product thành công: ", result);
    setOpen(false);
    refetch;
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
