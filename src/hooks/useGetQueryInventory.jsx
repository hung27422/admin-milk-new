import { gql, useQuery } from "@apollo/client";

function useGetQueryInventory() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query Inventories($amount: Int!, $offset: Int!) {
        inventories(amount: $amount, offset: $offset) {
          availability
          id
          productId
          quantity
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        amount: 50,
        offset: 0,
      },
    }
  );
  return { data, error, refetch };
}

export default useGetQueryInventory;
