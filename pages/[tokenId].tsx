import Header from '@/components/header';
import Loading from '@/components/loading';
import { useWalletAddress } from '@/context/WalletAddress';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export type CryptoPunk = {
  id?: string;
  tokenId?: string;
  image: any;
  traits: any;
};

export type CryptoPunkResponse = {
  media: Array<Record<string, any>>;
  metadata: any;
};

const fetchCryptoPunk = async (tokenId: string): Promise<CryptoPunk> => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_NETWORK}${process.env.NEXT_PUBLIC_ETHEREUM_NFT_RPC}${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${process.env.NEXT_PUBLIC_CRYPTO_PUNK_CONTRACT}&tokenId=${tokenId}`
  );
  const data: CryptoPunkResponse = await response.json();

  return {
    image: data.media[0].thumbnail,
    traits: data.metadata.attributes,
  };
};

const DetailPage = () => {
  const { query } = useRouter();
  const { address } = useAccount();
  const { walletAddress } = useWalletAddress();

  const [data, setData] = useState<CryptoPunk | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMetadata() {
      setLoading(true);
      const data = await fetchCryptoPunk(query?.tokenId as string);
      setData(data);
      setLoading(false);
    }

    getMetadata();
  }, [query?.tokenId]);

  if (!walletAddress && !address) {
    return <Loading />;
  }

  if (loading) return <Loading />;

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <Header />
      <main className='flex flex-col items-center flex-1 w-[1/2] text-white pt-10'>
        <div className='text-black rounded bg-slate-200 min-w-[450px] flex px-4'>
          <div className='relative w-48 h-60'>
            <Image src={data?.image} alt='' fill />
          </div>
          <div className='flex flex-col justify-center p-4'>
            <h1 className='mb-6 text-3xl font-bold'>
              CryptoPunk #{query?.tokenId}
            </h1>

            <ul className='flex flex-col justify-center'>
              {data &&
                data?.traits.map((item: any, index: number) => (
                  <li key={index}>
                    <span className='font-bold'>
                      {item.trait_type.toUpperCase()}
                    </span>{' '}
                    {item.value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
