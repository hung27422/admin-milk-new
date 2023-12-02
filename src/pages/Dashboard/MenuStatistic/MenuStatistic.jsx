import { useState } from "react";
import MenuAdmin from "../../../layouts/components/MenuAdmin/MenuAdmin";
import classNames from "classnames/bind";
import styles from "./MenuStatistic.module.scss";
import PropTypes from "prop-types";
import UnconfirmedStatis from "./UnconfirmedStatistic";
import ConfirmedStatistic from "./ConfirmedStatistic";
import ShipmentStatistic from "./ShipmentStatistic";
import DeliveryStatistic from "./DeliveryStatistic";
import CompeleteStatistic from "./CompeleteStatistic";
import CancelledStatistic from "./CancelledStatistic";
const cx = classNames.bind(styles);

function MenuStatistic({ data }) {
  const [activeId, setActiveId] = useState("1");
  const handleActivePage = (id) => {
    setActiveId(id);
  };
  return (
    <div className={cx("wrapper")}>
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
        {activeId === "1" && <UnconfirmedStatis data={data} />}
        {activeId === "2" && <ConfirmedStatistic data={data} />}
        {activeId === "3" && <ShipmentStatistic data={data} />}
        {activeId === "4" && <DeliveryStatistic data={data} />}
        {activeId === "5" && <CompeleteStatistic data={data} />}
        {activeId === "6" && <CancelledStatistic data={data} />}
      </div>
    </div>
  );
}

export default MenuStatistic;
MenuStatistic.propTypes = {
  data: PropTypes.array,
};
