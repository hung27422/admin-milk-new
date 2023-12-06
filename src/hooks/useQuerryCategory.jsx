import { gql, useQuery } from "@apollo/client";

function useCategory() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query Categories($amount: Int!, $page: Int!) {
        categories(amount: $amount, page: $page) {
          description
          id
          name
        }
      }
    `,
    {
      variables: {
        amount: 50,
        page: 1,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  return { data, error, refetch };
}

export default useCategory;
