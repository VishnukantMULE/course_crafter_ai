import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="902861204745-1diu19d24714a9l7glec4dkm51h0tkd0.apps.googleusercontent.com">

  <React.StrictMode>

      <App />

  </React.StrictMode>
</GoogleOAuthProvider>
);
 