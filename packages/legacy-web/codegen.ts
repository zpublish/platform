import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: './graphql/schema/**/*.ts',
  // schema: 'http://127.0.0.1:3030/api/graphql',
  // schema: './graphql/schemas/index.ts',
  overwrite: true,
  schema: 'graphql/schemas/index.ts',
  documents: [
    'pages/**/*.{ts,tsx,gql,graphql,}',
    'components/**/*.{ts,tsx,gql,graphql,}',
    'graphql/**/*.{ts,tsx,gql,graphql}',
    // if you wish to watch @/src, for example
    // 'src/**/*.{ts,tsx,gql,graphql,}',
  ],
  require: ['ts-node/register'],
  emitLegacyCommonJSImports: true,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  // documents: ['graphql/**/*.{ts,tsx}'],
  // generates: {
  //   './graphql/__generated__/': {
  //     preset: 'client',
  //     plugins: [],
  //     presetConfig: {
  //       gqlTagName: 'gql',
  //     }
  //   }
  // },
  generates: {
    // 'graphql/types.generated.ts': {
    //   plugins: [
    //     'typescript',
    //     'typescript-resolvers',
    //     'typescript-react-apollo',
    //   ],
    //   config: {
    //     // useIndexSignature: true,
    //     withHOC: false,
    //     withHooks: true,
    //     withComponent: false,
    //     reactApolloVersion: 3,
    //     preResolveTypes: true,
    //   },
    // },
    'graphql/types/resolvers.ts': {
      plugins: [
        {
            "add": {
                "content": "import { GraphQLContext } from '../../pages/api/graphql';"
            }
        },
        'typescript', 'typescript-resolvers'
      ],
      config: {
        useIndexSignature: true,
        "customResolverFn": "(\n  parent: TParent,\n  args: TArgs,\n  context: GraphQLContext,\n  info: GraphQLResolveInfo\n) => Promise<TResult> | TResult;\n"
      },
    },
    'graphql/types/': {
      preset: 'client',
      // presetConfig: {
      //   dedupeFragments: true,
      // }
    },
  },
  // ignoreNoDocuments: true, // for better experience with the watcher
};

export default config;