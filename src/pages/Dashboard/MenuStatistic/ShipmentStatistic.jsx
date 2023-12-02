import PropTypes from "prop-types";
import { TableInfoShipment } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function ShipmentStatistic({ data }) {
  return (
    <TableInfoShipment
      shipment={data}
      status={data?.map((i) => i.status).flat()}
    />
  );
}

export default ShipmentStatistic;
ShipmentStatistic.propTypes = {
  data: PropTypes.array,
};
