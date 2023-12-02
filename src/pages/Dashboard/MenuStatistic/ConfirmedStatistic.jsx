import PropTypes from "prop-types";
import { TableInfoConfirmed } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function ConfirmedStatistic({ data }) {
  return (
    <TableInfoConfirmed
      confirmed={data}
      status={data?.map((i) => i.status).flat()}
    />
  );
}

export default ConfirmedStatistic;
ConfirmedStatistic.propTypes = {
  data: PropTypes.array,
};
