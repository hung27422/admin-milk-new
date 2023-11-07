import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/index.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </ApolloProvider>
  </React.StrictMode>
);
