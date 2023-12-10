import classNames from "classnames/bind";
import styles from "./AdminCategory.module.scss";
import TableInfoCategory from "../../components/TableInfoCategory/TableInfoCategory";
import useCategory from "../../hooks/useQuerryCategory";
import ButtonAddCategory from "./ButtonAddCategory";
const cx = classNames.bind(styles);
function AdminCategory() {
  const { data } = useCategory();
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Information Category</h2>
      <div className={cx("btn-add-category")}>
        <ButtonAddCategory data={data?.categories} />
      </div>
      <TableInfoCategory data={data?.categories} />
    </div>
  );
}

export default AdminCategory;
