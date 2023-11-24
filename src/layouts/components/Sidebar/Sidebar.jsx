import { useContext } from "react";
import images from "../../../assets/Images/Image";
import MenuItem from "../../../components/MenuItem/MenuItem";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { AdminMilkContext } from "../../../components/AdminContextMilk/AdminContextMilk";

const cx = classNames.bind(styles);
function Sidebar() {
  const { roleName } = useContext(AdminMilkContext);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={images.logo} alt="" className={cx("img-logo")} />
      </div>
      <div className={cx("container")}>
        {roleName?.name === "nvbh" && (
          <div className={cx("menu")}>
            <MenuItem to={"/AdminOrders"} title={"Order Management"} />
            <MenuItem to={"/AdminProducts"} title={"Product Management"} />
          </div>
        )}
        {roleName?.name === "Admin" && (
          <div className={cx("menu")}>
            <MenuItem to={"/DashboardAdmin"} title={"Dashboard"} />
            <MenuItem to={"/AdminOrders"} title={"Order Management"} />
            <MenuItem to={"/AdminProducts"} title={"Product Management"} />
            <MenuItem to={"/AdminUsers"} title={"User Management"} />
          </div>
        )}
        {roleName?.name === "nvk" && (
          <div className={cx("menu")}>
            <MenuItem to={"/AdminInventory"} title={"Admin Inventory"} />
            <MenuItem to={"/AdminProducts"} title={"Product Management"} />
          </div>
        )}
        <div className={cx("menu")}>
          <MenuItem to={"/PageInfoUser"} title={"My Account"} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
