import classNames from "classnames/bind";
import styles from "./AdminOrders.module.scss";
import MenuAdminOrder from "./MenuAdminOrder/MenuAdminOrder";
import { useState } from "react";
import Unconfirmed from "./Unconfirmed/Unconfirmed";
import Confirmed from "./Confirmed/Confirmed";
import Shipment from "./Shipment/Shipment";
import Complete from "./CompleteOrders/CompleteOrders";
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
        <MenuAdminOrder
          id={"1"}
          active={activeId}
          title={"Chưa xác nhận"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdminOrder
          id={"2"}
          active={activeId}
          title={"Đã xác nhận"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdminOrder
          id={"3"}
          active={activeId}
          title={"Giao hàng"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
        <MenuAdminOrder
          id={"4"}
          active={activeId}
          title={"Hoàn thành"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
      </div>
      <div>
        {activeId === "1" && <Unconfirmed />}
        {activeId === "2" && <Confirmed />}
        {activeId === "3" && <Shipment />}
        {activeId === "4" && <Complete />}
      </div>
    </div>
  );
}

export default AdminOrders;
