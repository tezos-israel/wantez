import React from "react";
import { AuthProvider } from "react-use-auth";
import { useRouter } from "next/router";

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider
      navigate={router.push}
      auth0_domain="dev-f1oauz37.eu.auth0.com"
      auth0_client_id="l8Y9T9AGl31xhc311XswLoaZeQaHW5cA"
    >
      <Component {...pageProps} />
    </AuthProvider>
  );
}
