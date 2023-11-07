import classNames from "classnames/bind";
import styles from "./ActionOrders.module.scss";
import Button from "../../Button/Button";
import PropTypes from "prop-types";
import { gql } from "@apollo/client";
import { client } from "../../../apollo";
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
      const result = await client.mutate({
        mutation: UPDATE_ORDER,
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJuYW1lIjoibnVsbCIsImp0aSI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjk5NTg4NTYzLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.-CPSL6LvcH6h3EfYnE15reqBQ0qJxckC1nJ2-FR0ZckA2pl34pftHPqP_oT0yk5lakZcTY7vUo9BrTKRsakqDw`,
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
