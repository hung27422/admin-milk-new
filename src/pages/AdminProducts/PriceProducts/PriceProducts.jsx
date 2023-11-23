import PropTypes from "prop-types";
function PriceProducts({ data }) {
  return (
    <h2
      style={{ color: "var(--text-color)", fontFamily: "var(--font-primary)" }}
    >
      {data?.price} VNĐ
    </h2>
  );
}

export default PriceProducts;
PriceProducts.propTypes = {
  data: PropTypes.object,
};
