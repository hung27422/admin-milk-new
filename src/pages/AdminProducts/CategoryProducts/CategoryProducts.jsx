import PropTypes from "prop-types";
import useCategory from "../../../hooks/useQuerryCategory";
function CategoryProducts({ data }) {
  const { data: category, error } = useCategory();

  if (error) {
    console.log("Lỗi query category: ", error);
  }
  const filterCategory = category?.categories.find(
    (item) => item?.id === data?.categoryId
  );
  return (
    <div>
      <span
        style={{
          color: "var(--text-color)",
          fontFamily: "var(--font-primary)",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {filterCategory?.name}
      </span>
    </div>
  );
}

export default CategoryProducts;
CategoryProducts.propTypes = {
  data: PropTypes.object,
};
