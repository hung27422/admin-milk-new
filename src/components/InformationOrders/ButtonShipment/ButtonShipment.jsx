import { gql, useMutation } from "@apollo/client";
import Button from "../../Button/Button";
import PropTypes from "prop-types";
import ButtonInformation from "../ButtoShowInfomationUser/ButtonInformation";

function ButtonShipment({ data }) {
  let result = data.items;

  const UPDATE_ORDER = gql`
    mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
      updateOrder(id: $updateOrderId, input: $input) {
        orderCreatedPayload {
          message
        }
      }
    }
  `;
  const [update_order, { error }] = useMutation(UPDATE_ORDER);
  if (error) {
    console.log("Lỗi xác nhận đơn hàng: ", error);
  }
  const handleUpdateOrder = async () => {
    for (const item of result) {
      console.log(item?.orderId);
      const orderUpdateOrderInput = {
        updateOrderId: item?.orderId,
        input: {
          cancelReason: null,
          phone: data?.phone || "null",
          shippingAddress: data?.shippingAddress || null,
          status: "SHIPPING",
          userName: data?.userName || null,
        },
      };
      try {
        const result = update_order({
          context: {
            headers: {
              authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
            },
          },
          variables: {
            updateOrderId: orderUpdateOrderInput.updateOrderId,
            input: orderUpdateOrderInput.input,
          },
        });
        console.log("Đã update đơn hàng:", result);
      } catch (error) {
        console.error("Lỗi khi update đơn hàng:", error);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <ButtonInformation data={data} />
      <Button action onClick={handleUpdateOrder}>
        Giao hàng
      </Button>
    </div>
  );
}
ButtonShipment.propTypes = {
  data: PropTypes.object,
};
export default ButtonShipment;
