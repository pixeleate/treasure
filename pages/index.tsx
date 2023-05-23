import type { NextPage } from 'next';
import Head from 'next/head';
import { ConnectKitButton } from 'connectkit';
import { Label } from '@/components/label';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useRouter } from 'next/router';
import { useWalletAddress } from '@/context/WalletAddress';

const Home: NextPage = () => {
  const router = useRouter();
  const { setWalletAddress } = useWalletAddress();

  const onSumbitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const walletAddressFromForm = form.get('wallet-address');

    setWalletAddress(walletAddressFromForm);

    router.push('/inventory');

    // 0x0000000000000000000000000000000000000000
  };

  return (
    <div className='flex justify-center min-h-screen bg-black'>
      <Head>
        <title>CryptoPunk Explorer</title>
        <meta
          name='description'
          content='An App to explore CryptoPunk Inventory of a wallet'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center'>
        <h1 className='my-10 text-5xl font-bold text-center text-white uppercase lg:text-9xl'>
          CryptoPunks Explorer
        </h1>
        <div className='flex flex-col items-center justify-center flex-1 w-2/5'>
          <form
            onSubmit={onSumbitHandler}
            className='flex items-end w-full gap-4'
          >
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label className='text-white' htmlFor='wallet-address'>
                Wallet Address
              </Label>
              <Input
                name='wallet-address'
                className='text-white'
                type='text'
                id='wallet-address'
                placeholder='0x000...0000'
                required
              />
            </div>
            <Button className='flex-1 px-10' type='submit'>
              Explore
            </Button>
          </form>
          <span className='py-8 text-lg font-semibold text-white'>OR</span>
          <ConnectKitButton.Custom>
            {({ show, isConnected }) => {
              if (isConnected) {
                router.push('/inventory');
              }
              return (
                <Button className='w-full' onClick={show}>
                  Connect Wallet
                </Button>
              );
            }}
          </ConnectKitButton.Custom>
        </div>
      </main>
    </div>
  );
};

export default Home;
