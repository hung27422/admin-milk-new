import TableInfoUser from "../../components/TableInfoUser/TableInfoUser";
import useQueryUser from "../../hooks/useQueryUser";
import classNames from "classnames/bind";
import styles from "./AdminUser.module.scss";
// import { useEffect } from "react";
const cx = classNames.bind(styles);
function AdminUser() {
  const { data, error } = useQueryUser();
  if (error) console.log("Lỗi ở useQueryUser", error);

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information User</h2>
      <div className={cx("btn-action")}></div>
      <TableInfoUser data={data?.users} />
    </div>
  );
}

export default AdminUser;
