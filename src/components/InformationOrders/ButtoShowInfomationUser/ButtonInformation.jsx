import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import styles from "./ButtonInformation.module.scss";
import PropTypes from "prop-types";
import useQueryReview from "../../../hooks/useQueryReview";
import useQueryOrders from "../../../hooks/useQueryOrders";
import { useEffect } from "react";
import { useState } from "react";
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
function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}-${hours} `;

  return formattedDate;
}
export default function ButtonInformation({ data, reviewsPr }) {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { data: dataReviews } = useQueryReview();
  const { data: dataOrders } = useQueryOrders();
  //Loop lấy order có status là "DONE" nè
  useEffect(() => {
    dataOrders?.orders.filter((item) => {
      if (item.status === "DONE") {
        setDone((prev) => [item, ...prev]);
      }
    });
  }, [dataOrders]);
  useEffect(() => {
    done.find((order) => {
      dataReviews?.reviews.find((review) => {
        if (Number(order?.id) === Number(review.orderId)) {
          setReviews((reviews) => [review, ...reviews]);
        }
      });
    });
  }, [dataReviews?.reviews, done]);
  // useEffect(() => {
  //   if (done) {
  //     console.log("done", done);
  //   }
  //   if (dataOrders) {
  //     console.log("dataOrders", dataOrders);
  //   }
  //   if (reviews) {
  //     console.log("reviews", reviews);
  //   }
  // }, [dataOrders, done, reviews]);
  const handleIdOrder = () => {
    setOpen(true);
  };
  let total = 0;
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          cursor: "pointer",
        }}
        onClick={handleIdOrder}
      >
        Xem thông tin đơn hàng
      </Button>
      <Modal
        open={open}
        onClick={() => setOpen(false)}
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
          <div className={cx("box-main")}>
            {data?.items?.map((item, i) => {
              const matchingReview = reviews?.find(
                (review) => review.productId === item?.productId
              );
              return (
                <div key={item?.id + i} className={cx("box-product")}>
                  <div className={cx("box-info")}>
                    <div className={cx("box-info-product")}>
                      <img
                        className={cx("img-product")}
                        src={item?.Product?.images}
                        alt=""
                      />
                      <div className={cx("info-product")}>
                        <span className={cx("name-product")}>{item?.name}</span>
                        <span className={cx("quantity-product")}>
                          x {item?.quantity}
                        </span>
                        <span className={cx("price-product")}>
                          {item?.price} VNĐ
                        </span>
                      </div>
                    </div>
                    <div className={cx("id-item")}>
                      <span>Mã đơn hàng: {data?.id}</span>
                    </div>
                  </div>
                  <div className={cx("review-product")}>
                    {reviewsPr && (
                      <div>
                        <h2 className={cx("review-title")}>
                          Đánh giá sản phẩm của khách hàng:
                        </h2>
                        <div className={cx("info-user")}>
                          <span>Tên: {data?.userName}</span>
                          <span>SĐT: {data?.phone}</span>
                        </div>
                        {matchingReview ? (
                          <div className={cx("info-review")}>
                            <span className={cx("type-review")}>
                              Nội dung : {matchingReview.detail}
                            </span>
                            <span className={cx("type-review")}>
                              Ngày :{" "}
                              {formatDateString(matchingReview.createdDate)} :
                            </span>
                            <span className={cx("type-review")}>
                              Loại : {matchingReview.rating}
                            </span>
                          </div>
                        ) : (
                          <span
                            style={{
                              display: "block",
                              color: "var(--text-color)",
                              fontSize: "18px",
                              marginLeft: "24px",
                              padding: "8px 0",
                            }}
                          >
                            Khách hàng chưa đánh giá
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {data?.items.forEach((element) => {
              total += element.subtotal;
            })}
            <div className={cx("show-info")}>
              {data?.cancelReason && (
                <span className={cx("reason-cancel")}>
                  Hủy với lí do: {data?.cancelReason}
                </span>
              )}
              <div className={cx("info-price")}>
                <div className={cx("total-price")}>Tổng tiền: {total} VNĐ</div>
                <div className={cx("final-total-price")}>
                  Thành tiền: {data?.total} VNĐ
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonInformation.propTypes = {
  data: PropTypes.object,
  reviewsPr: PropTypes.bool,
};
