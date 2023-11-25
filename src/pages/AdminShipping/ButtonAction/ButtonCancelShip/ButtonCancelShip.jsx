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
      orderCreatedPayload {
        message
      }
    }
  }
`;
export default function ButtonCancelShip({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
        },
      },
      variables: {
        updateOrderId: orderUpdateOrderInput.updateOrderId,
        input: orderUpdateOrderInput.input,
      },
    });
    console.log("Hủy đơn hàng thành công: ", result);
    refetch();
  };
  return (
    <div>
      <Button onClick={handleOpen}>Hủy đơn</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Hủy đơn hàng</h2>
          <div>
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
            <Button onClick={handleCancelOrders}>Hủy đơn hàng</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonCancelShip.propTypes = {
  data: PropTypes.object,
};
