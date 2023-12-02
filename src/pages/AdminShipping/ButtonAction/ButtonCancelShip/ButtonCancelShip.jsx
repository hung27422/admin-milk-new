import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "../../AdminShipping.module.scss";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import useQueryOrders from "../../../../hooks/useQueryOrders";
const cx = classNames.bind(styles);
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
const cancelReason = [
  {
    id: 1,
    name: "Hủy với lí do người nhận không nghe máy",
  },
  {
    id: 2,
    name: "Hủy với lí do người nhận từ chối nhận hàng",
  },
];
const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: Int!, $input: orderUpdateOrderInput!) {
    updateOrder(id: $updateOrderId, input: $input) {
      orderUpdatedPayload {
        message
      }
    }
  }
`;
export default function ButtonCancelShip({ data }) {
  const [open, setOpen] = React.useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const { refetch } = useQueryOrders();

  const [reasonName, setReasonName] = useState();
  const [reasonId, setReasonId] = useState(1);
  const handleCancelReason = (value, id) => {
    setReasonName(value);
    setReasonId(id);
  };
  const handleCancelOrders = async () => {
    const orderUpdateOrderInput = {
      updateOrderId: data?.id,
      input: {
        cancelReason: reasonName,
        phone: data?.phone,
        shippingAddress: data?.shippingAddress,
        status: "CANCELLED",
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
    console.log("Hủy đơn hàng thành công: ", result);
    setOpen(false);
    refetch();
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          marginTop: "10px",
          width: "100px",
        }}
        onClick={() => setOpen(true)}
      >
        Hủy đơn
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Hủy đơn hàng</h2>
          <div style={{ textAlign: "center" }}>
            {cancelReason.map((item) => {
              return (
                <div key={item.id} className={cx("box-cancel")}>
                  <div>
                    <input
                      className={cx("input-cancel")}
                      name="name"
                      type="radio"
                      id={item.id}
                      checked={item.id === reasonId}
                      value={item?.name}
                      onChange={(e) =>
                        handleCancelReason(e.target.value, item.id)
                      }
                    ></input>
                    <span className={cx("name-cancel")}>{item?.name}</span>
                  </div>
                </div>
              );
            })}
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                marginTop: "20px",
              }}
              onClick={() => setOpen(false)}
            >
              Trở lại
            </Button>
            <Button
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--white)",
                marginTop: "20px",
              }}
              onClick={handleCancelOrders}
            >
              Hủy đơn hàng
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonCancelShip.propTypes = {
  data: PropTypes.object,
};
