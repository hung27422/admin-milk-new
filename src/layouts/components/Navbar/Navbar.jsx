import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);
function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>TH Milk Portal</h1>
      </div>
    </div>
  );
}

export default Navbar;
