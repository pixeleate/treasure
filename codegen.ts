import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.CRYPTOPUNKS_API_URL,
  documents: './graphql/app.queries.ts',
  generates: {
    './generated/': {
      preset: 'client',
    },
  },
};
export default config;
