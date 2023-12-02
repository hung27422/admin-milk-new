import PropTypes from "prop-types";
import { TableInfoUnconfirmed } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function UnconfirmedStatistic({ data }) {
  return (
    <TableInfoUnconfirmed
      unconfirmed={data}
      status={data?.map((i) => i.status).flat()}
    />
  );
}

export default UnconfirmedStatistic;
UnconfirmedStatistic.propTypes = {
  data: PropTypes.array,
};
