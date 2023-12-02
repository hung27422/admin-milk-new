import PropTypes from "prop-types";
import { TableInfoCancel } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function CancelledStatistic({ data }) {
  return (
    <TableInfoCancel cancel={data} status={data?.map((i) => i.status).flat()} />
  );
}

export default CancelledStatistic;
CancelledStatistic.propTypes = {
  data: PropTypes.array,
};
