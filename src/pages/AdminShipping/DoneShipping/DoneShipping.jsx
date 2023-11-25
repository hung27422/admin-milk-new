import { TableInfoShipment } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
import useQueryOrders from "../../../hooks/useQueryOrders";
function DoneShipping() {
  const { data, error } = useQueryOrders();
  if (error) console.log("Lỗi ở useQueryOrders", error);
  return (
    <div>
      <TableInfoShipment
        shipment={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default DoneShipping;
