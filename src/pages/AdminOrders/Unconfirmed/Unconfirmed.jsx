import { gql, useQuery } from "@apollo/client";
import { TableInfoUnconfirmed } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
import { useEffect } from "react";
// import { useEffect } from "react";
// import { useEffect } from "react";
function Unconfirmed() {
  const { data, error } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          shippingAddress
          items {
            id
            name
            orderId
            price
            productId
            quantity
            sku
            subtotal
          }
          status
          total
          userId
          phone
          userName
        }
      }
    `,
    {
      variables: { amount: 50, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
        },
      },
    }
  );
  useEffect(() => {
    if (error) {
      console.log("Lỗi", error);
    } else if (data) {
      console.log("Chưa xác nhận", data?.orders);
    }
  }, [data, error]);
  return (
    <div>
      <h2>Unconfirmed</h2>
      <TableInfoUnconfirmed
        unconfirmed={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default Unconfirmed;
