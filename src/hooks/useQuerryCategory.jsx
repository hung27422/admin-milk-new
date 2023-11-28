import { gql, useQuery } from "@apollo/client";

function UseCategory() {
  const apiTokenLocal = localStorage.getItem("apiToken");
  const { data: category, error } = useQuery(
    gql`
      query Category($categoryId: Int!) {
        category(id: $categoryId) {
          description
          id
          name
        }
      }
    `,
    {
      variables: {
        categoryId: 1,
      },
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
    }
  );
  return [category, error];
}

export default UseCategory;
