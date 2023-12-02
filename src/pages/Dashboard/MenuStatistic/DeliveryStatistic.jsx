import PropTypes from "prop-types";
import { TableInfoDelivered } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function DeliveryStatistic({ data }) {
  return (
    <TableInfoDelivered
      delivered={data}
      status={data?.map((i) => i.status).flat()}
    />
  );
}

export default DeliveryStatistic;
DeliveryStatistic.propTypes = {
  data: PropTypes.array,
};
