import { gql, useQuery } from "@apollo/client";
import { TableInfoComplete } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";
// import { useEffect } from "react";
function CompleteOrders() {
  const apiTokenLocal = localStorage.getItem("apiToken");
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
            Product {
              images
            }
          }
          status
          total
          userId
          phone
          userName
          pointDeductionAmount
        }
      }
    `,
    {
      variables: { amount: 50, page: 1 },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
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
