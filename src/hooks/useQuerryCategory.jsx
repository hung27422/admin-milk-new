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
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0MzgxMzVlOC1lNDgwLTQ5NGQtOTRhNy1kNWJkY2ZkMDdlNmUiLCJuYW1lIjoiTWFjIiwianRpIjoiNDM4MTM1RTgtRTQ4MC00OTRELTk0QTctRDVCRENGRDA3RTZFIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDAzODY1MDYsImlzcyI6IklmV2hhdCIsImF1ZCI6IklmV2hhdENsaWVudCJ9.JKWzPcwZIjmehF8A-7QuaVE_hOhP_WkwRTIUXFpHE_vVqQZNzhPYwbynRy1DqbfQPo9BDYwP0fbHbYIsIPnYkg`,
        },
      },
    }
  );
  return [category, error];
}

export default UseCategory;
