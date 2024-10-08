import { gql, useQuery } from "@apollo/client";

function useQueryOrders() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
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
      variables: { amount: 100, page: 1 },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      pollInterval: 5000,
    }
  );
  return { data, error, refetch };
}

export default useQueryOrders;
