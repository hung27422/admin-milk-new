import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
// import { useEffect } from "react";
import PropTypes from "prop-types";
import useQueryOrders from "../../../../hooks/useQueryOrders";

const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: orderUpdateOrderInput!) {
    updateOrder(input: $input) {
      string
    }
  }
`;
function ButtonShipping({ data }) {
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { refetch } = useQueryOrders();
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const handleUpdateShipping = async () => {
    const orderUpdateOrderInput = {
      updateOrderId: data?.id,
      input: {
        id: data?.id,
        cancelReason: null,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "SHIPPING",
        userName: data?.userName,
      },
    };
    const result = await updateOrder({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        input: orderUpdateOrderInput.input,
      },
    });
    console.log("Update giao đơn hàng thành công: ", result);
    refetch();
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          width: "100px",
        }}
        onClick={handleUpdateShipping}
      >
        Giao hàng
      </Button>
    </div>
  );
}

export default ButtonShipping;
ButtonShipping.propTypes = {
  data: PropTypes.object,
};
