import TableInfoUser from "../../components/TableInfoUser/TableInfoUser";
import useQueryUser from "../../hooks/useQueryUser";
import classNames from "classnames/bind";
import styles from "./AdminUser.module.scss";
import { TextField } from "@mui/material";
import { useState } from "react";
// import { useEffect } from "react";
const cx = classNames.bind(styles);
function AdminUser() {
  const { data, error } = useQueryUser();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) console.log("Lỗi ở useQueryUser", error);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = data?.users.filter((user) =>
    user.name.toString().includes(searchTerm)
  );
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information User</h2>
      <div className={cx("search-user")}>
        <TextField
          style={{ width: "500px", marginBottom: "10px" }}
          id="search"
          label="Tìm kiếm user"
          variant="outlined"
          onChange={handleSearchChange}
        />
      </div>
      <div className={cx("btn-action")}></div>
      <TableInfoUser data={filteredData} />
    </div>
  );
}

export default AdminUser;
