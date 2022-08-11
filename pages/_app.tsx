import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

import Layout from "../components/Layout";

const client = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
