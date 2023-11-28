import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import useQueryOrders from "../../../../hooks/useQueryOrders";
import { useEffect } from "react";
import PropTypes from "prop-types";

const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
    updateOrder(id: $updateOrderId, input: $input) {
      orderUpdatedPayload {
        message
      }
    }
  }
`;

function ButtonDoneShip({ data }) {
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { refetch } = useQueryOrders();
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleUpdateDelivered = async () => {
    const orderUpdateOrderInput = {
      updateOrderId: data?.id,
      input: {
        cancelReason: null,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "DELIVERED",
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
        updateOrderId: orderUpdateOrderInput.updateOrderId,
        input: orderUpdateOrderInput.input,
      },
    });
    console.log("Update giao đơn hàng thành công: ", result);
    refetch();
  };
  return (
    <Button
      style={{
        backgroundColor: "var(--secondary)",
        color: "var(--white)",
        width: "100px",
      }}
      onClick={handleUpdateDelivered}
    >
      Đã giao
    </Button>
  );
}

export default ButtonDoneShip;
ButtonDoneShip.propTypes = {
  data: PropTypes.object,
};
