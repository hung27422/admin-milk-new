import classNames from "classnames/bind";
import styles from "./MenuAdmin.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function MenuAdmin({ title, id, onClick, active }) {
  return (
    <div
      className={cx("wrapper", active === id ? "active" : "")}
      id={id}
      onClick={onClick}
    >
      <div className={cx("box-menu")}>
        <h2 className={cx("title")}>{title}</h2>
      </div>
    </div>
  );
}
MenuAdmin.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.string,
};
export default MenuAdmin;
