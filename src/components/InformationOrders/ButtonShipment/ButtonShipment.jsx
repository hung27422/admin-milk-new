import { gql } from "@apollo/client";
import Button from "../../Button/Button";
import PropTypes from "prop-types";
import { client } from "../../../apollo";

function ButtonShipment({ data }) {
  const UPDATE_ORDER = gql`
    mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
      updateOrder(id: $updateOrderId, input: $input) {
        orderCreatedPayload {
          message
        }
      }
    }
  `;
  const handleUpdateOrder = async () => {
    const orderUpdateOrderInput = {
      updateOrderId: data?.orderId,
      input: {
        status: "SHIPPING",
        shippingAddress: "null",
        cancelReason: null,
      },
    };

    try {
      const result = await client.mutate({
        mutation: UPDATE_ORDER,
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk4NTAzOTUsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.xxTUpAsxG5-y-Jv-6FAjYUPSK-iuYsxW2SOIkxxmY6RIW1GgS1SYjstm0bQJ__TGNUYlhAAo7RSbBNe9XE1NiQ`,
          },
        },
        variables: {
          updateOrderId: orderUpdateOrderInput.updateOrderId,
          input: orderUpdateOrderInput.input,
        },
      });
      console.log("Đã update giao đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi update đơn hàng:", error);
    }
  };
  return (
    <Button action onClick={handleUpdateOrder}>
      Giao hàng
    </Button>
  );
}
ButtonShipment.propTypes = {
  data: PropTypes.object,
};
export default ButtonShipment;
