import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../AdminUser.module.scss";
const cx = classNames.bind(styles);
function ImageUser({ data }) {
  if (data?.imageURL === null || data?.imageURL === "null") {
    return (
      <div>
        <img
          className={cx("img-user")}
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt=""
        ></img>
      </div>
    );
  }
  return (
    <div>
      <img className={cx("img-user")} src={data?.imageURL} alt="" />
    </div>
  );
}

export default ImageUser;
ImageUser.propTypes = {
  data: PropTypes.object,
};
