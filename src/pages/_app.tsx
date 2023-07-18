import Layout from "@/components/layout/Layout";
import { GlobalStyles } from "@/styles/GlobalStyles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
