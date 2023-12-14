import { gql, useQuery } from "@apollo/client";
import { TableInfoUnconfirmed } from "../../../components/TableInfoOrders/TableInfoOrdersWrapper";

function Unconfirmed() {
  const apiTokenLocal = localStorage.getItem("apiToken");
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
  if (error) console.log(error);
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
