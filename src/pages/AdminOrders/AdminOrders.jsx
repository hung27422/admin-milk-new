import classNames from "classnames/bind";
import styles from "./AdminOrders.module.scss";
import MenuAdmin from "../../layouts/components/MenuAdmin/MenuAdmin";
import { useState } from "react";
import Unconfirmed from "./Unconfirmed/Unconfirmed";
import Confirmed from "./Confirmed/Confirmed";
import Shipment from "./Shipment/Shipment";
import CompleteOrders from "./CompleteOrders/CompleteOrders";
import DeliveredOrders from "./DeliveredOrders/DeliveredOrders";
import CancelOrders from "./CancelOrders/CancelOrders";
const cx = classNames.bind(styles);
function AdminOrders() {
  const [activeId, setActiveId] = useState("1");
  const handleActivePage = (id) => {
    setActiveId(id);
  };
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Order</h2>
      <div className={cx("menu")}>
        <MenuAdmin
          id={"1"}
          active={activeId}
          title={"Chưa xác nhận"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdmin
          id={"2"}
          active={activeId}
          title={"Đã xác nhận"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdmin
          id={"3"}
          active={activeId}
          title={"Giao hàng"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdmin
          id={"4"}
          active={activeId}
          title={"Đã giao"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdmin
          id={"5"}
          active={activeId}
          title={"Hoàn thành"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdmin
          id={"6"}
          active={activeId}
          title={"Đã hủy"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
      </div>
      <div>
        {activeId === "1" && <Unconfirmed />}
        {activeId === "2" && <Confirmed />}
        {activeId === "3" && <Shipment />}
        {activeId === "4" && <DeliveredOrders />}
        {activeId === "5" && <CompleteOrders />}
        {activeId === "6" && <CancelOrders />}
      </div>
    </div>
  );
}

export default AdminOrders;
