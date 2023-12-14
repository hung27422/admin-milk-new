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
import { useContext } from "react";
import { AdminMilkContext } from "../../../../components/AdminContextMilk/AdminContextMilk";
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
const cancelReasonShipper = [
  {
    id: 1,
    name: "Người nhận không nghe máy",
  },
  {
    id: 2,
    name: "Người nhận từ chối nhận hàng",
  },
];
const cancelReasonNvbh = [
  {
    id: 1,
    name: "Thông tin đặt hàng không hợp lí",
  },
  {
    id: 2,
    name: "Gọi xác nhận người đặt không thành công",
  },
];
const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: orderUpdateOrderInput!) {
    updateOrder(input: $input) {
      string
    }
  }
`;
export default function ButtonCancelShip({ data }) {
  console.log("data ne", data);
  const [open, setOpen] = React.useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const { roleName } = useContext(AdminMilkContext);
  const { refetch } = useQueryOrders();

  const [reasonName, setReasonName] = useState();
  const [reasonId, setReasonId] = useState(1);
  const handleCancelReason = (value, id) => {
    setReasonName(value);
    setReasonId(id);
  };
  const handleCancelOrders = async () => {
    const orderUpdateOrderInput = {
      input: {
        id: data?.id,
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
        input: orderUpdateOrderInput.input,
      },
    });
    refetch();
    console.log("Hủy đơn hàng thành công: ", result);
    setOpen(false);
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "red",
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
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Hủy với lí do:
          </span>
          {roleName?.name === "shipper" && (
            <div style={{ textAlign: "center" }}>
              {cancelReasonShipper.map((item) => {
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
                  marginRight: "5px",
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
                  marginLeft: "5px",
                }}
                onClick={handleCancelOrders}
              >
                Hủy đơn hàng
              </Button>
            </div>
          )}
          {roleName?.name === "nvbh" && (
            <div style={{ textAlign: "center" }}>
              {cancelReasonNvbh.map((item) => {
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
                  marginRight: "5px",
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
                  marginLeft: "5px",
                }}
                onClick={handleCancelOrders}
              >
                Hủy đơn hàng
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
ButtonCancelShip.propTypes = {
  data: PropTypes.object,
};
