import PropTypes from "prop-types";
function IDProduct({ data }) {
  return <h3>{data?.id}</h3>;
}

export default IDProduct;
IDProduct.propTypes = {
  data: PropTypes.object,
};
