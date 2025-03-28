import { Auth0Provider } from "@auth0/auth0-react";
import PropTypes from "prop-types";
function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-hnuclkrw5xevrosx.us.auth0.com"
      clientId="TcjYLbdOTIahgN9pDzHXwTWRFaqHdoII"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/DashboardAdmin/`,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.element,
};
