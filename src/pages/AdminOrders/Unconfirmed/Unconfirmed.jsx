import { gql, useQuery } from "@apollo/client";
import { TableInfoUnconfirmed } from "../../../components/TableInfo/TableInfoWrapper";
import { useEffect } from "react";
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
      variables: { amount: 3, page: 1 },
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJuYW1lIjoibnVsbCIsImp0aSI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjk5NTg4NTYzLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.-CPSL6LvcH6h3EfYnE15reqBQ0qJxckC1nJ2-FR0ZckA2pl34pftHPqP_oT0yk5lakZcTY7vUo9BrTKRsakqDw`,
        },
      },
    }
  );
  useEffect(() => {
    console.log(data?.orders[0].status);
  }, [data]);
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
