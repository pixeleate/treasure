# Cryptopunks Viewer Dapp


### Using Connectkit - No CryptoPunks
https://github.com/pixeleate/treasure/assets/1545853/f0b3f99a-dd21-46e8-92e8-e81ec872bc17

### Using input field - 2 CryptoPunks in that Wallet / 0x0000000000000000000000000000000000000000
https://github.com/pixeleate/treasure/assets/1545853/83b1ea6e-8cc6-4bfb-b683-8b1b947c0f84

## Objective

Create a web application that allows a user to view their Cryptopunks inventory

## Requirements

The web application should consist of two pages:

### Inventory Page
- Allows a user to connect their wallet to the application or manually input a wallet address in a text input field
- Displays the Cryptopunk token IDs owned by the provided wallet address
- Clicking on any of the token IDs directs the user to the Details Page

### Details Page
- Given a Cryptopunks token ID, the Details Page displays the image and attribute associated with that token.

## Nice to have

- Inventory filters (male/female)
- Animations (preferably using [`framer-motion`](https://github.com/framer/motion))

---

## Local Setup
1. A boilerplate template is set up for you. Fork this repository and install necessary dependencies:
```sh
npm install
```
2. Copy the example environment file and fill in with your own variables (see `Instructions > Inventory Page` below for more info):
```sh
cp .env.sample .env
```
3. `graphql-codegen` is set up to generate types from the subgraph. You can use the client in `lib/client.ts` to query the subgraph after running code generation:
```sh
npm run codegen
```

## Instructions
- Use any front-end framework you want. At Treasure, we use [Next.js](https://nextjs.org)/[Remix](http://remix.run) and [Tailwind CSS](https://tailwindcss.com).
- Use any wallet connection/Web3 framework you want. At Treasure, we use [ConnectKit](https://github.com/family/connectkit)/[RainbowKit](https://www.rainbowkit.com) and [wagmi](https://wagmi.sh).
- Inventory Page should pull data from the [Cryptopunks subgraph](https://thegraph.com/explorer/subgraphs/YqMJatbgbqy1GodtbYZv4U9NzyaScCgSF7CAE5ivAM7?view=Playground&chain=mainnet). Please create an account at The Graph and obtain your own API key to use in the `.env` file.
- Details Page should pull data directly from the [Cryptopunks smart contract](https://etherscan.io/address/0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2).
- Optimize the code for readability and performance.
- Feel free to add comments to explain your thought process.
- When done, please send us a link to your repository.
