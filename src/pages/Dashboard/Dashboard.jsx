import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminMilkContext } from "../../components/AdminContextMilk/AdminContextMilk";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import BoxReport from "./BoxReport";
import { DatePicker } from "@mui/x-date-pickers";
import useQueryOrders from "../../hooks/useQueryOrders";
import MenuStatistic from "./MenuStatistic/MenuStatistic";
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
// Lấy ngày hiện tại
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
const dateNow = `${currentYear}-${currentMonth}-${currentDay}`;

function Dashboard() {
  const { roleName } = useContext(AdminMilkContext);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [orders, setOrders] = useState(null);
  const [ordersNow, setOrdersNow] = useState(null);
  const [orderCancelled, setOrderCancelled] = useState(null);
  const [orderCreated, setOrderCreated] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [orderShipment, setOrderShipment] = useState(null);
  const [orderDelivered, setOrderDelivered] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(null);
  const [ordersItem, setOrdersItem] = useState(null);
  const [orderItemNow, setOrdersItemNow] = useState();
  const [orderItemCancelled, setOrderItemCancelled] = useState(null);
  const { data } = useQueryOrders();
  useEffect(() => {
    if (data) {
      //Lấy order từ ngày ...  đến ngày ....
      const filteredOrders = data?.orders.filter((item) => {
        const orderDate = formatDateString(item?.date);
        return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
      });
      //Lấy order của ngày hiện tại
      const filteredOrdersNow = data?.orders.filter((item) => {
        const orderDateNow = formatDateString(item?.date);
        return orderDateNow === formatDateString(dateNow);
      });
      //Lấy orders có status là CANCELLED
      const filteredOrdersCancelled = data?.orders.filter((item) => {
        if (item?.status === "CANCELLED") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      //Lấy orders có status là CREATED
      const filteredOrdersCreated = data?.orders.filter((item) => {
        if (item?.status === "CREATED") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      //Lấy orders có status là CONFIRMED
      const filteredOrdersConfirmed = data?.orders.filter((item) => {
        if (item?.status === "CONFIRMED") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      //Lấy orders có status là SHIPPING
      const filteredOrdersShipping = data?.orders.filter((item) => {
        if (item?.status === "SHIPPING") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      //Lấy orders có status là DELIVERED
      const filteredOrdersDelivered = data?.orders.filter((item) => {
        if (item?.status === "DELIVERED") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      //Lấy orders có status là DONE
      const filteredOrdersDone = data?.orders.filter((item) => {
        if (item?.status === "DONE") {
          const orderDate = formatDateString(item?.date);
          return orderDate >= selectedStartDate && orderDate <= selectedEndDate;
        }
        return false;
      });
      setOrderCompleted(filteredOrdersDone);
      setOrderDelivered(filteredOrdersDelivered);
      setOrderShipment(filteredOrdersShipping);
      setOrderConfirmed(filteredOrdersConfirmed);
      setOrderCreated(filteredOrdersCreated);
      setOrderCancelled(filteredOrdersCancelled);
      setOrdersNow(filteredOrdersNow);
      setOrders(filteredOrders);
    }
  }, [data, selectedEndDate, selectedStartDate]);

  useEffect(() => {
    //Lấy mảng items mới của tất cả orders
    if (orders && orders.length > 0) {
      const allItems = orders.flatMap((order) => order.items);
      setOrdersItem(allItems);
    }
    //Lấy mảng items mới của orders đã CANCELLED
    if (orderCancelled && orderCancelled.length > 0) {
      const allItems = orderCancelled.flatMap((order) => order.items);
      setOrderItemCancelled(allItems);
    }
    //Lấy mảng items mới của orders hiện tại
    if (ordersNow && ordersNow.length > 0) {
      const allItems = ordersNow.flatMap((order) => order.items);
      setOrdersItemNow(allItems);
    }
  }, [orderCancelled, orders, ordersNow]);

  useEffect(() => {}, [orderCancelled]);

  useEffect(() => {}, [ordersNow]);
  useEffect(() => {
    console.log("orders", orders);
    console.log("ordersItem", ordersItem);
    console.log("ordersDateNow", ordersNow);
    console.log("ordersCancelled", orderCancelled);
  }, [orderCancelled, orders, ordersItem, ordersNow]);

  //Lấy total của tất cả đơn hàng
  const totalDate =
    ordersItem?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0) || 0;
  //Lấy total của đơn hàng hủy
  const totalDateCancelled =
    orderItemCancelled?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0) || 0;
  //Lấy total của đơn hàng hiện tại
  const totalDateNow =
    orderItemNow?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0) || 0;

  const handleStartDateChange = (date) => {
    setSelectedStartDate(formatDateString(date.toISOString()));
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(formatDateString(date.toISOString()));
  };
  if (roleName?.name === "nvbh")
    return <Navigate to="/AdminOrders" replace={true} />;
  if (roleName?.name === "shipper")
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
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoxReport
                  title={"Tổng tiền"}
                  total={totalDate - totalDateCancelled}
                  widthPrimary={true}
                />
                <BoxReport
                  title={"Tổng số lượng đơn"}
                  quantity={orders?.length || 0}
                  widthPrimary={true}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoxReport
                  title={"Chờ xác nhận"}
                  quantity={orderCreated?.length || 0}
                  widthSecondary
                />
                <BoxReport
                  title={"Đã xác nhận"}
                  quantity={orderConfirmed?.length || 0}
                  widthSecondary
                />
                <BoxReport
                  title={"Đang giao"}
                  quantity={orderShipment?.length || 0}
                  widthSecondary
                />
                <BoxReport
                  title={"Đã giao"}
                  quantity={orderDelivered?.length || 0}
                  widthSecondary
                />
                <BoxReport
                  title={"Hoàn thành"}
                  quantity={orderCompleted?.length || 0}
                  widthSecondary
                />
                <BoxReport
                  title={"Số đơn hủy"}
                  quantity={orderCancelled?.length || 0}
                  widthSecondary
                />
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoxReport
                  title={"Tổng tiền"}
                  total={totalDateNow !== undefined ? totalDateNow : 0}
                  widthPrimary
                />
                <BoxReport
                  title={"Tổng số lượng đơn"}
                  quantity={ordersNow?.length || 0}
                  widthPrimary
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoxReport
                  title={"Chờ xác nhận"}
                  quantity={
                    ordersNow.filter((item) => item.status === "CREATED").length
                  }
                  widthSecondary
                />
                <BoxReport
                  title={"Đã xác nhận"}
                  quantity={
                    ordersNow.filter((item) => item.status === "CONFIRMED")
                      .length
                  }
                  widthSecondary
                />
                <BoxReport
                  title={"Đang giao"}
                  quantity={
                    ordersNow.filter((item) => item.status === "SHIPPING")
                      .length
                  }
                  widthSecondary
                />
                <BoxReport
                  title={"Đã giao"}
                  quantity={
                    ordersNow.filter((item) => item.status === "DELIVERED")
                      .length
                  }
                  widthSecondary
                />
                <BoxReport
                  title={"Hoàn thành"}
                  quantity={
                    ordersNow.filter((item) => item.status === "DONE").length
                  }
                  widthSecondary
                />
                <BoxReport
                  title={"Số đơn hủy"}
                  quantity={
                    ordersNow.filter((item) => item.status === "CANCELLED")
                      .length
                  }
                  widthSecondary
                />
              </div>
            </div>
          )}
        </div>
        <div className={cx("info-order")}>
          <h3 className={cx("title")}>Thông tin đơn hàng</h3>
          {orders?.length !== 0 ? (
            <MenuStatistic data={orders} />
          ) : (
            <MenuStatistic data={ordersNow} />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
