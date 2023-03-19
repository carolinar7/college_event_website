import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>College Events</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
     </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
