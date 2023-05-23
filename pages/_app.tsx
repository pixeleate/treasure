import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

import { WagmiConfig, createClient } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { WalletAddressProvider } from '@/context/WalletAddress';

const urqlClient = new Client({
  url: 'https://api.thegraph.com/subgraphs/name/itsjerryokolo/cryptopunks',
  exchanges: [cacheExchange, fetchExchange],
});

const client = createClient(
  getDefaultClient({
    appName: 'Treasure - CryptoPunks Inventory Explorer',
    appDescription: 'App to explore the inventory of CryptoPunks',

    walletConnectProjectId:
      process.env.WALLETCONNECT_PROJECT_ID ||
      '7886f19b4439bbb91743602f2f8f7102',
    chains: [mainnet, polygon, optimism, arbitrum],
  })
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
	   :root {
		--font-sans: ${fontSans.style.fontFamily};
	  }
	}`}</style>

      <Provider value={urqlClient}>
        <WagmiConfig client={client}>
          <ConnectKitProvider>
            <WalletAddressProvider>
              <Component {...pageProps} />
            </WalletAddressProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </Provider>
    </>
  );
};

export default App;
