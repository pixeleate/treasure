import { FC, ReactNode, createContext, useContext, useState } from 'react';

export const WalletAddressContext = createContext<any>(null);

export const WalletAddressProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <WalletAddressContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletAddressContext.Provider>
  );
};

export const useWalletAddress = () => {
  const context = useContext(WalletAddressContext);
  if (context === undefined) {
    throw new Error(
      'useWalletAddress must be used within a WalletAddressProvider'
    );
  }
  return context;
};
