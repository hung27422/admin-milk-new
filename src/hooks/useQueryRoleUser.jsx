import { gql, useQuery } from "@apollo/client";

function useQueryRoleUser() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data, error, refetch } = useQuery(
    gql`
      query Roles {
        roles {
          description
          id
          name
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  return { data, error, refetch };
}

export default useQueryRoleUser;
