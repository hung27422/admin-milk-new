import { gql, useQuery } from "@apollo/client";
import { TableInfoShipment } from "../../../components/TableInfo/TableInfoWrapper";
import { useEffect } from "react";
// import { useEffect } from "react";
function Shipment() {
  const { data } = useQuery(
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAxMjIwNzYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.CrLN44kEsNkqYTm61eiB6lhgz4jHzjgOI_irWGAY-M7hiVibCc7RU8TJ6ub0ZEK3SpMwkUxpavOFzTj4CyXA8A`,
        },
      },
    }
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <h2>Shipment</h2>
      <TableInfoShipment
        shipment={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default Shipment;
