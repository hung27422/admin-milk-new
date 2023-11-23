import { gql, useQuery } from "@apollo/client";
import { TableInfoComplete } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
// import { useEffect } from "react";
function CompleteOrders() {
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZmFkYWI2Ni02YzlmLTQ3MzgtOTU1NC04OTUwYTg2Mzg5ODEiLCJuYW1lIjoiYWRtaW4iLCJqdGkiOiI5RkFEQUI2Ni02QzlGLTQ3MzgtOTU1NC04OTUwQTg2Mzg5ODEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwMDczODA5NiwiaXNzIjoiSWZXaGF0IiwiYXVkIjoiSWZXaGF0Q2xpZW50In0._JL6OR_9ll0F34MzHyLU64TMpBIQkwrXZpviB96qeiQjqn4xpINoDVffawc7KvWfculfcW_fHiGV4tJRIkgL8g`,
        },
      },
    }
  );
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div>
      <h2>Confirmed</h2>
      <TableInfoComplete
        complete={data?.orders}
        status={data?.orders.map((i) => i.status).flat()}
      />
    </div>
  );
}

export default CompleteOrders;
