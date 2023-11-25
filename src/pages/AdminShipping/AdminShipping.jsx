import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AdminShipping.module.scss";
import MenuAdmin from "../../layouts/components/MenuAdmin/MenuAdmin";
import WaitShipping from "./WaitShipping/WaitShipping";
import DoneShipping from "./DoneShipping/DoneShipping";
const cx = classNames.bind(styles);
function AdminShipping() {
  const [activeId, setActiveId] = useState("1");
  const handleActivePage = (id) => {
    setActiveId(id);
  };
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Shipping</h2>
      <div className={cx("menu")}>
        <MenuAdmin
          id={"1"}
          active={activeId}
          title={"Đang đợi giao"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />{" "}
        <MenuAdmin
          id={"2"}
          active={activeId}
          title={"Giao thành công"}
          onClick={(e) => handleActivePage(e.currentTarget.id)}
        />
      </div>
      <div>
        {activeId === "1" && <WaitShipping />}
        {activeId === "2" && <DoneShipping />}
      </div>
    </div>
  );
}

export default AdminShipping;
