import { useAuth0 } from "@auth0/auth0-react";
import { rolesAPI } from "../utils/apiRoles";
function useGetUserRoles() {
  const { user, isAuthenticated } = useAuth0();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  //rolesAPI expired 30 days
  myHeaders.append("Authorization", `Bearer ${rolesAPI}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const fetchRoles = () =>
    isAuthenticated &&
    fetch(
      `https://dev-726yamkp1xzya72d.us.auth0.com/api/v2/users/${user.sub}/roles`,
      requestOptions
    )
      .then((res) => res?.json())
      // .then((response) => response.text())
      // .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  return { fetchRoles };
}

export default useGetUserRoles;
