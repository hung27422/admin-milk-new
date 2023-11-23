import { gql, useQuery } from "@apollo/client";

function UseCategory() {
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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5ZmFkYWI2Ni02YzlmLTQ3MzgtOTU1NC04OTUwYTg2Mzg5ODEiLCJuYW1lIjoiYWRtaW4iLCJqdGkiOiI5RkFEQUI2Ni02QzlGLTQ3MzgtOTU1NC04OTUwQTg2Mzg5ODEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcwMDczODA5NiwiaXNzIjoiSWZXaGF0IiwiYXVkIjoiSWZXaGF0Q2xpZW50In0._JL6OR_9ll0F34MzHyLU64TMpBIQkwrXZpviB96qeiQjqn4xpINoDVffawc7KvWfculfcW_fHiGV4tJRIkgL8g`,
        },
      },
    }
  );
  return [category, error];
}

export default UseCategory;
