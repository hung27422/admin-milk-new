import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminMilkContext } from "../../components/AdminContextMilk/AdminContextMilk";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import BoxReport from "./BoxReport";
import { DatePicker } from "@mui/x-date-pickers";
import useQueryOrders from "../../hooks/useQueryOrders";
import { TableInfoReport } from "../../components/TableInfoOrders/TableInfoOrdersWrapper";
const cx = classNames.bind(styles);
function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  // const hours = date.getHours().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} `;

  return formattedDate;
}
function Dashboard() {
  const { roleName } = useContext(AdminMilkContext);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [orders, setOrders] = useState(null);
  const [ordersNow, setOrdersNow] = useState(null);
  const [ordersItem, setOrdersItem] = useState(null);
  const [orderItemNow, setOrdersItemNow] = useState();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Tháng là zero-based, nên cộng thêm 1
  const currentDay = currentDate.getDate();
  const dateNow = `${currentYear}-${currentMonth}-${currentDay}`;
  const { data } = useQueryOrders();
  useEffect(() => {
    if (data) {
      const filteredOrdersNow = data?.orders.filter((item) => {
        if (item?.status === "DONE") {
          const orderDateNow = formatDateString(item?.date);
          return orderDateNow === formatDateString(dateNow);
        }
        return false;
      });
      setOrdersNow(filteredOrdersNow);
    }
  }, [data, dateNow]);
  useEffect(() => {
    if (data) {
      const filteredOrders = data?.orders.filter((item) => {
        if (item?.status === "DONE") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      setOrders(filteredOrders);
    }
  }, [data, selectedEndDate, selectedStartDate]);
  useEffect(() => {
    if (orders && orders.length > 0) {
      const allItems = orders.flatMap((order) => order.items);
      setOrdersItem(allItems);
    }
  }, [orders]);
  useEffect(() => {
    if (ordersNow && ordersNow.length > 0) {
      const allItems = ordersNow.flatMap((order) => order.items);
      setOrdersItemNow(allItems);
    }
  }, [ordersNow]);
  useEffect(() => {
    console.log("orders", orders);
    console.log("ordersItem", ordersItem);
    console.log("ordersDateNow", ordersNow);
  }, [orders, ordersItem, ordersNow]);
  const handleStartDateChange = (date) => {
    setSelectedStartDate(formatDateString(date.toISOString()));
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(formatDateString(date.toISOString()));
  };
  const totalDate =
    ordersItem?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0) || 0;
  const totalDateNow =
    orderItemNow?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0) || 0;
  if (roleName?.name === "nvbh")
    return <Navigate to="/AdminOrders" replace={true} />;
  if (roleName?.name === "nvbh")
    return <Navigate to="/AdminShipping" replace={true} />;
  else {
    return (
      <div className={cx("wrapper")}>
        <h2 className={cx("title")}>Báo cáo thống kê</h2>
        <div className={cx("header")}>
          <span className={cx("des")}>Từ</span>
          <DatePicker onChange={handleStartDateChange} />
          <span className={cx("des")}>Đến</span>
          <DatePicker onChange={handleEndDateChange} />
        </div>
        {orders?.length !== 0 ? (
          <h2 className={cx("des-date")}>
            Thống kê từ ngày:{" "}
            <span className={cx("date-choose")}>{selectedStartDate}</span> đến
            ngày: <span className={cx("date-choose")}>{selectedEndDate}</span>
          </h2>
        ) : (
          <h2 className={cx("des-date")}>
            Thống kê của ngày hôm nay:{" "}
            <span className={cx("date-choose")}>
              {formatDateString(dateNow)}
            </span>
          </h2>
        )}
        <div className={cx("content")}>
          {orders?.length !== 0 ? (
            <>
              <BoxReport
                title={"Tổng tiền"}
                total={totalDate !== undefined ? totalDate : 0}
              />
              <BoxReport
                title={"Tổng số lượng đơn"}
                quantity={orders?.length || 0}
              />
            </>
          ) : (
            <>
              <BoxReport
                title={"Tổng tiền"}
                total={totalDateNow !== undefined ? totalDateNow : 0}
              />
              <BoxReport
                title={"Tổng số lượng đơn"}
                quantity={ordersNow?.length || 0}
              />
            </>
          )}
        </div>
        <div className={cx("info-order")}>
          <h3 className={cx("title")}>Thông tin đơn hàng</h3>
          {orders?.length !== 0 ? (
            <TableInfoReport report={orders} />
          ) : (
            <TableInfoReport report={ordersNow} />
          )}
          {ordersNow?.length === 0 && (
            <div className={cx("show-order")}>
              <span>Hôm nay chưa có đơn hàng nào</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
