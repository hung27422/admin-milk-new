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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
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
