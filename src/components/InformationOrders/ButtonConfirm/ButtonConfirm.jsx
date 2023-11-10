import classNames from "classnames/bind";
import styles from "./ActionOrders.module.scss";
import Button from "../../Button/Button";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
// import { client } from "../../../apollo";
const cx = classNames.bind(styles);
function ButtonConfirm({ data }) {
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
  console.log("Lỗi update đơn hàng", error);
  const handleUpdateOrder = async () => {
    const orderUpdateOrderInput = {
      updateOrderId: data?.orderId,
      input: {
        status: "CONFIRMED",
        shippingAddress: "null",
        cancelReason: null,
      },
    };

    try {
      const result = update_order({
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
      console.log("Đã update đơn hàng:", result);
    } catch (error) {
      console.error("Lỗi khi update đơn hàng:", error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Button action onClick={handleUpdateOrder}>
        Xác nhận
      </Button>
    </div>
  );
}
ButtonConfirm.propTypes = {
  data: PropTypes.object,
};
export default ButtonConfirm;
