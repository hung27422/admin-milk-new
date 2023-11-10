import { gql, useQuery } from "@apollo/client";
import { TableInfoUnconfirmed } from "../../../components/TableInfo/TableInfoWrapper";
// import { useEffect } from "react";
// import { useEffect } from "react";
function Unconfirmed() {
  const { data } = useQuery(
    gql`
      query Orders($amount: Int!, $page: Int!) {
        orders(amount: $amount, page: $page) {
          cancelReason
          date
          id
          items {
            id
            orderId
            price
            quantity
            sku
            subtotal
            name
          }
          shippingAddress
          status
          total
          userId
        }
      }
    `,
    {
      variables: { amount: 15, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2OTk4NTAzOTUsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.xxTUpAsxG5-y-Jv-6FAjYUPSK-iuYsxW2SOIkxxmY6RIW1GgS1SYjstm0bQJ__TGNUYlhAAo7RSbBNe9XE1NiQ`,
        },
      },
    }
  );
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
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
