import { Auth0Provider } from "@auth0/auth0-react";
import PropTypes from "prop-types";
function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-726yamkp1xzya72d.us.auth0.com"
      clientId="ejDalqrZaOlHtEKE9cpyXfRlLwCQqV0I"
      authorizationParams={{
        redirect_uri: "https://admin-milk-new.vercel.app/",
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.element,
};
