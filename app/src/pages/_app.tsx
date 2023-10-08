import createEmotionCache from '@/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '../styles/global.css';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState} >
          <Head>
            <meta
                name="description"
                content="Web library for the Gutenberg Project"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}
