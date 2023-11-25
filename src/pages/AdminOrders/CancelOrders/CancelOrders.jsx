import { TableInfoCancel } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
import useQueryOrders from "../../../hooks/useQueryOrders";

function CancelOrders() {
  const { data } = useQueryOrders();
  return (
    <div>
      <h2>Cancel Orders</h2>
      <TableInfoCancel
        cancel={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default CancelOrders;
