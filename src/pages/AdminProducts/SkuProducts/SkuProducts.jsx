import PropTypes from "prop-types";
function SkuProducts({ data }) {
  return (
    <h2
      style={{ color: "var(--text-color)", fontFamily: "var(--font-primary)" }}
    >
      {data?.sku}
    </h2>
  );
}

export default SkuProducts;
SkuProducts.propTypes = {
  data: PropTypes.object,
};
