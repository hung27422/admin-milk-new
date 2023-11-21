import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/index.jsx";
import Auth0Provider from "./auth0/Auth0Provider.jsx";
import AdminContextMilk from "./components/AdminContextMilk/AdminContextMilk.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider>
      <ApolloProvider client={client}>
        <AdminContextMilk>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </AdminContextMilk>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);
