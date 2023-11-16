import { gql, useQuery } from "@apollo/client";

function UseQueryProduct() {
  const { data, error, refetch } = useQuery(
    gql`
      query Products($amount: Int!, $page: Int!) {
        products(amount: $amount, page: $page) {
          categoryId
          description
          id
          images
          name
          price
          sku
        }
      }
    `,
    {
      variables: {
        amount: 10,
        page: 1,
      },
    }
  );
  return [data, error, refetch];
}

export default UseQueryProduct;
