import PropTypes from "prop-types";
import { TableInfoComplete } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function CompeleteStatistic({ data }) {
  return (
    <TableInfoComplete
      complete={data}
      status={data?.map((i) => i.status).flat()}
    />
  );
}

export default CompeleteStatistic;
CompeleteStatistic.propTypes = {
  data: PropTypes.array,
};
