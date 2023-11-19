import PropTypes from "prop-types";
import UseCategory from "../../../hooks/useQuerryCategory";
function CategoryProducts({ data }) {
  const [category, error] = UseCategory();
  if (error) {
    console.log("Lỗi query category: ", error);
  }
  return (
    <div>
      {category?.category?.id === data.categoryId ? (
        <span
          style={{
            color: "var(--text-color)",
            fontFamily: "var(--font-primary)",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {category?.category?.name}
        </span>
      ) : (
        <span>{data.categoryId}</span>
      )}
    </div>
  );
}

export default CategoryProducts;
CategoryProducts.propTypes = {
  data: PropTypes.object,
};
