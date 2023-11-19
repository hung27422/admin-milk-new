import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "./ButtonInformation.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ButtonInformation({ data }) {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIdOrder = () => {
    setOpen(true);
  };
  let total = 0;
  return (
    <div>
      <Button
        style={{ backgroundColor: "var(--primary)", color: "var(--white)" }}
        onClick={handleIdOrder}
      >
        Xem thông tin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("header")}>
            <h3 className={cx("title")}>Xem thông tin sản phẩm</h3>
            {data?.status === "CREATED" && (
              <h3 className={cx("status")}>Chưa xác nhận</h3>
            )}
            {data?.status === "CONFIRMED" && (
              <h3 className={cx("status")}>Đã xác nhận</h3>
            )}
            {data?.status === "SHIPPING" && (
              <h3 className={cx("status")}>Đang giao</h3>
            )}
            {data?.status === "DELIVERED" && (
              <h3 className={cx("status")}>Đã giao</h3>
            )}
            {data?.status === "DONE" && (
              <h3 className={cx("status")}>Hoàn thành</h3>
            )}
          </div>
          {data?.items?.map((item, i) => (
            <div key={item?.id + i} className={cx("box-product")}>
              <div className={cx("box-info-product")}>
                <img
                  className={cx("img-product")}
                  src="https://www.thmilk.vn/wp-content/uploads/2019/11/UHT-180-socola-800x800-2-1.png"
                  alt=""
                />
                <div className={cx("info-product")}>
                  <span className={cx("name-product")}>{item?.name}</span>
                  <span className={cx("quantity-product")}>
                    x {item?.quantity}
                  </span>
                  <span className={cx("price-product")}>{item?.price} VNĐ</span>
                </div>
              </div>
              <div className={cx("id-item")}>
                <span>Mã đơn hàng: {item?.id}</span>
              </div>
            </div>
          ))}
          {data?.items.forEach((element) => {
            total += element.subtotal;
          })}
          <div className={cx("total-price")}>Tổng tiền: {total} VNĐ</div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonInformation.propTypes = {
  data: PropTypes.object,
};
