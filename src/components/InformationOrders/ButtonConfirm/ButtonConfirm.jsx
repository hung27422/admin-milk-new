import classNames from "classnames/bind";
import styles from "./ActionOrders.module.scss";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import useQueryOrders from "../../../hooks/useQueryOrders";
import { Button } from "@mui/material";
// import { client } from "../../../apollo";
const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
    updateOrder(id: $updateOrderId, input: $input) {
      orderUpdatedPayload {
        message
      }
    }
  }
`;
const cx = classNames.bind(styles);
function ButtonConfirm({ data }) {
  const apiTokenLocal = localStorage.getItem("apiToken");
  let result = data.items;
  const { refetch } = useQueryOrders();
  const [update_order, { error }] = useMutation(UPDATE_ORDER);
  if (error) {
    console.log("Lỗi xác nhận đơn hàng: ", error);
  }

  // console.log("result Button: ", result);
  const handleUpdateOrder = async () => {
    for (const item of result) {
      const orderUpdateOrderInput = {
        updateOrderId: item?.orderId,
        input: {
          cancelReason: null,
          phone: data?.phone || "null",
          shippingAddress: data?.shippingAddress || null,
          status: "CONFIRMED",
          userName: data?.userName || null,
        },
      };
      try {
        const result = await update_order({
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
        console.log("Đã update đơn hàng:", result);
        refetch();
      } catch (error) {
        console.error("Lỗi khi update đơn hàng:", error);
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Button
        style={{
          backgroundColor: "green",
          color: "var(--white)",
          marginTop: "10px",
        }}
        onClick={handleUpdateOrder}
      >
        Xác nhận
      </Button>
    </div>
  );
}
ButtonConfirm.propTypes = {
  data: PropTypes.object,
  result: PropTypes.object,
};
export default ButtonConfirm;
