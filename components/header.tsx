import { ConnectKitButton } from 'connectkit';
import { useRouter } from 'next/router';
import { Button } from './button';
import Link from 'next/link';
import { useWalletAddress } from '@/context/WalletAddress';

const Header = () => {
  const router = useRouter();
  const { walletAddress } = useWalletAddress();

  return (
    <header className='flex justify-between items-center w-full px-8 py-3 border-b border-white border-opacity-[.2]'>
      <Link href='/'>
        <div className='flex flex-col font-bold text-white uppercase'>
          <span className='text-2xl '>CryptoPunks</span>
          <span className='tracking-[14px]'>Explorer</span>
        </div>
      </Link>
      {!walletAddress ? (
        <ConnectKitButton.Custom>
          {({ show, isConnected, truncatedAddress }) => {
            if (!walletAddress && !isConnected) {
              router.push('/');
            }

            return (
              <Button onClick={show}>
                {!isConnected ? 'Connect Wallet' : truncatedAddress}
              </Button>
            );
          }}
        </ConnectKitButton.Custom>
      ) : (
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      )}
    </header>
  );
};

export default Header;
