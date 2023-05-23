import Header from '@/components/header';

import { useQuery } from 'urql';
import { useAccount } from 'wagmi';

import { InventoryByAddressQuery } from '@/generated/graphql';
import { InventoryByAddress } from '@/graphql/app.queries';
import Link from 'next/link';
import Image from 'next/image';
import { useWalletAddress } from '@/context/WalletAddress';
import truncateEthAddress from '@/lib/truncateEthAddress';
import Loading from '@/components/loading';

const InventoryPage = () => {
  const { address } = useAccount();
  const { walletAddress } = useWalletAddress();

  const [result] = useQuery<InventoryByAddressQuery>({
    pause: !walletAddress && !address,
    query: InventoryByAddress,
    variables: {
      address: walletAddress || address,
    },
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <Header />
      <main className='flex flex-col items-center flex-1 w-[1/2] text-white'>
        <h1 className='my-8 text-3xl font-bold'>
          {data?.punks.length}{' '}
          <span>
            {walletAddress
              ? `CryptoPunk Owned by ${truncateEthAddress(walletAddress)}`
              : 'CryptoPunk Owned'}
          </span>
        </h1>
        <ul className='flex gap-4'>
          {data?.punks.map((punk) => {
            return (
              <li key={punk?.id}>
                <Link href={`/${punk.tokenId}`}>
                  <div className='flex flex-col items-center p-4 rounded bg-slate-200'>
                    <div className='relative w-20 h-20'>
                      <Image
                        src={`https://unpkg.com/cryptopunk-icons@1.1.0/app/assets/punk${punk.tokenId}.png`}
                        alt={`CryptoPunk #${punk?.tokenId}`}
                        fill
                      />
                    </div>
                    <div className='py-4 text-black'>
                      CryptoPunk
                      <span>#{punk?.tokenId}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default InventoryPage;
