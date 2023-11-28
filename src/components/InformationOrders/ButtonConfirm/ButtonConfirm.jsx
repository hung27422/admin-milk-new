import classNames from "classnames/bind";
import styles from "./ActionOrders.module.scss";
import Button from "../../Button/Button";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import ButtonInformation from "../ButtoShowInfomationUser/ButtonInformation";
// import { client } from "../../../apollo";
const cx = classNames.bind(styles);
function ButtonConfirm({ data }) {
  const apiTokenLocal = localStorage.getItem("apiToken");
  let result = data.items;
  const UPDATE_ORDER = gql`
    mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
      updateOrder(id: $updateOrderId, input: $input) {
        orderUpdatedPayload {
          message
        }
      }
    }
  `;
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
        const result = update_order({
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
      } catch (error) {
        console.error("Lỗi khi update đơn hàng:", error);
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <ButtonInformation data={data} />
      <Button action onClick={handleUpdateOrder}>
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
