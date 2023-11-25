import { TableInfoConfirmed } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
import useQueryOrders from "../../../hooks/useQueryOrders";
function WaitShipping() {
  const { data, error } = useQueryOrders();
  if (error) console.log("Lỗi ở useQueryOrders", error);
  return (
    <div>
      <TableInfoConfirmed
        confirmed={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default WaitShipping;
