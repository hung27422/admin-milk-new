import { gql, useQuery } from "@apollo/client";

function useQueryPoint({ userId }) {
  const { data, refetch } = useQuery(
    gql`
      query PointByUserId($userId: String!) {
        pointByUserId(userId: $userId) {
          id
          point
          userId
        }
      }
    `,
    {
      variables: {
        userId,
      },
    }
  );
  return { data, refetch };
}

export default useQueryPoint;
