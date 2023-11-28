import { gql, useQuery } from "@apollo/client";

function useQueryUser() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query Users($amount: Int!, $page: Int!) {
        users(amount: $amount, page: $page) {
          email
          id
          imageURL
          name
          phoneNumber
          role {
            description
            id
            name
          }
          token
          address {
            city
            detail
            district
            id
            isDefault
            name
            phone
            userId
            ward
          }
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
        page: 1,
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryUser;
